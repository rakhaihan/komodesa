# Design Notes — Komodesa

Arah desain visual (dari skill `frontend-design` Anthropic). Dicatat agar konsisten saat iterasi berikutnya.

## Konsep: "Buku Besar Desa" (the living ledger)

Inti produk = gotong royong: panen kecil-kecil banyak petani dijumlahkan koperasi jadi satu kekuatan tawar. Koperasi secara harfiah hidup dari buku besar anggotanya. Itu jangkar identitas visualnya.

Sengaja menghindari 3 "default AI" (cream+serif+terracotta / hitam+neon / broadsheet hairline).

## Token

**Palet** (berakar pada tanah, sawah, gabah — emas sebagai warna "nilai", bukan terracotta):
- `paper` #F2EEE3 — latar kertas hangat
- `card` #FBFAF4 — permukaan terangkat
- `soil` #221C13 / `soil-muted` #6E6353 — tinta
- `line` #E3DCCB — garis ledger
- `brand` (paddy) #2F4A2C / light #3F6139 / dark #1B2F1A — hijau sawah
- `grain` #C68A2E / deep #855A10 — emas gabah = nilai/aksen
- `husk` #9C3D22 — sekam beras merah, dipakai hemat (error/turun)

**Tipografi:**
- Display: Bricolage Grotesque (judul, angka besar) — berkarakter, bukan serif default
- Body: IBM Plex Sans — nuansa "infrastruktur publik/koperasi"
- Data: IBM Plex Mono — figur tabular untuk angka ledger (kelas `.tabular`)

**Signature:** momen "penjumlahan" akuntansi (garis ganda `.sum-rule`) — kontribusi anggota dijumlah jadi total kolektif. Muncul di hero landing.

**Layout:** landing = hero thesis + buku besar penjumlahan + value chain 01–05 (penomoran jujur karena kontennya urutan pipeline nyata). Dashboard = shell dengan garis emas tipis, stat card ala entri ledger.

## Quality floor
Responsif ke mobile, focus ring keyboard di semua elemen interaktif, `prefers-reduced-motion` dihormati, kontras teks aman.

## Catatan iterasi
- Brand hijau dipertahankan (menyimpang dari rekomendasi biru skill `ui-ux-pro-max` sebelumnya) — lebih cocok konteks agraris.
- Kalau nanti terasa terlalu ramai: kurangi satu aksen (prinsip Chanel "remove one accessory").
