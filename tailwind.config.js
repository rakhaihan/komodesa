/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palet "Buku Besar Desa" — berakar pada tanah, sawah, dan gabah
        paper: '#f2eee3', // latar kertas anyaman hangat
        card: '#fbfaf4', // permukaan terangkat
        soil: { DEFAULT: '#221c13', muted: '#6e6353' }, // tinta tanah vulkanik
        line: '#e3dccb', // garis ledger
        brand: { DEFAULT: '#2f4a2c', light: '#3f6139', dark: '#1b2f1a' }, // hijau sawah
        grain: { DEFAULT: '#c68a2e', deep: '#855a10' }, // emas gabah = nilai
        husk: '#9c3d22', // sekam beras merah — dipakai hemat
        // alias agar kelas lama tetap jalan; accent = emas gabah (warna "nilai")
        accent: { DEFAULT: '#855a10', light: '#c68a2e' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      transitionDuration: { DEFAULT: '200ms' },
    },
  },
  plugins: [],
}
