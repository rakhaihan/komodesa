export type CommodityTrend = {
  commodityName: string
  volumeChangePct: number
  priceChangePct: number
}

export type AiSource = 'gemini' | 'openai' | 'claude' | 'template'

export function activeProvider(): AiSource {
  if (process.env.GEMINI_API_KEY) return 'gemini'
  if (process.env.OPENAI_API_KEY) return 'openai'
  if (process.env.ANTHROPIC_API_KEY) return 'claude'
  return 'template'
}

export function templateRecommendation(t: CommodityTrend): string {
const vUp = t.volumeChangePct >= 0
  const pUp = t.priceChangePct >= 0

  if (vUp && pUp)
    return `Produksi ${t.commodityName} naik ${t.volumeChangePct}% dan harga naik ${t.priceChangePct}%. Momentum bagus — pertahankan atau tambah luas tanam, dan prioritaskan komoditas ini di penawaran ke buyer.`
  if (!vUp && pUp)
    return `Harga ${t.commodityName} naik ${t.priceChangePct}% sementara produksi turun ${Math.abs(t.volumeChangePct)}%. Peluang harga bagus — dorong anggota meningkatkan produksi untuk menangkap harga yang sedang tinggi.`
  if (vUp && !pUp)
    return `Produksi ${t.commodityName} naik ${t.volumeChangePct}% tapi harga turun ${Math.abs(t.priceChangePct)}%. Waspadai kelebihan pasokan — pertimbangkan diversifikasi atau cari buyer baru sebelum menambah luas tanam.`
  return `Produksi dan harga ${t.commodityName} sama-sama menurun. Evaluasi kelayakan komoditas ini dan pertimbangkan alihkan sebagian lahan ke komoditas dengan tren lebih baik.`
}

function buildPrompt(t: CommodityTrend): string {
  return `Kamu adalah analis pertanian untuk koperasi desa. Berdasarkan data berikut,
berikan 1-2 kalimat rekomendasi singkat dan actionable untuk koperasi:

Komoditas: ${t.commodityName}
Perubahan volume produksi: ${t.volumeChangePct}%
Perubahan harga pasar: ${t.priceChangePct}%

Jawab dalam Bahasa Indonesia, langsung ke rekomendasi tanpa basa-basi.`
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function callGeminiOnce(t: CommodityTrend): Promise<Response> {
  const model = process.env.GEMINI_MODEL || 'gemini-flash-latest'
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(t) }] }],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    }
  )
}

async function generateGemini(t: CommodityTrend): Promise<string> {
  let res = await callGeminiOnce(t)
  if (res.status === 429) {
    await sleep(2000)
    res = await callGeminiOnce(t)
  }
  if (!res.ok) throw new Error(`Gemini API error (${res.status})`)
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
  if (!text) throw new Error('Gemini API tidak mengembalikan teks')
  return text
}

async function generateOpenAI(t: CommodityTrend): Promise<string> {
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 200,
      messages: [{ role: 'user', content: buildPrompt(t) }],
    }),
  })
  if (!res.ok) throw new Error(`OpenAI API error (${res.status})`)
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('OpenAI API tidak mengembalikan teks')
  return text
}

async function generateClaude(t: CommodityTrend): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
      max_tokens: 200,
      messages: [{ role: 'user', content: buildPrompt(t) }],
    }),
  })
  if (!res.ok) throw new Error(`Claude API error (${res.status})`)
  const data = await res.json()
  const text = data.content?.[0]?.text?.trim()
  if (!text) throw new Error('Claude API tidak mengembalikan teks')
  return text
}

export async function generateCommodityRecommendation(
  t: CommodityTrend
): Promise<string> {
  const provider = activeProvider()
  if (provider === 'gemini') return generateGemini(t)
  if (provider === 'openai') return generateOpenAI(t)
  if (provider === 'claude') return generateClaude(t)
  return templateRecommendation(t)
}
