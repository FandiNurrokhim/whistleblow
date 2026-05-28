🎯 Whistleblowing System UI Guidelines (React + Tailwind)
1. Design Principles
🔒 Trust & Security First → gunakan warna stabil, tidak mencolok
🧠 Low Cognitive Load → form harus mudah dipahami
🕶️ Anonymous-Friendly → tidak intimidatif
⚖️ Neutral & Professional → hindari desain berisik
2. Color System
Tailwind Config
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#1E3A8A',
        light: '#3B82F6',
        dark: '#1E40AF',
      },
      secondary: {
        DEFAULT: '#64748B',
      },
      success: '#16A34A',
      warning: '#F59E0B',
      danger: '#DC2626',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      border: '#E2E8F0',
    }
  }
}
Color Rules
Biru → kepercayaan & legalitas
Abu → netral & profesional
Merah → hanya untuk error penting
❌ Hindari warna neon & gradient berlebihan
3. Typography
Font
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
Hierarchy
Element	Class
Heading 1	text-2xl font-semibold
Heading 2	text-xl font-semibold
Body	text-sm text-gray-700
Label	text-sm font-medium text-gray-600
Helper	text-xs text-gray-500
Rules
Gunakan line-height: leading-relaxed
Hindari ALL CAPS untuk paragraf
Jangan gunakan font dekoratif
4. Layout & Spacing
Container
className="max-w-3xl mx-auto px-6 py-8"
Spacing Rules
Section: mb-6
Form group: mb-4
Button spacing: gap-2
5. Component Styling
Input
className="w-full rounded-md border border-gray-300 focus:border-primary focus:ring-primary text-sm"
Button
Primary
className="bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-md text-sm"
Secondary
className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md text-sm"
Danger
className="bg-danger text-white hover:bg-red-700"
6. Form UX Rules
Wajib
Label jelas & deskriptif
Placeholder informatif
Error message human-friendly
<InputError message="Laporan harus diisi dengan detail yang jelas" />
Hindari
Terlalu banyak field dalam 1 layar
Istilah teknis yang membingungkan
Required field tanpa penjelasan
7. Trust Indicators

Tambahkan elemen berikut:

🔒 Data terenkripsi
🕶️ Laporan anonim
📜 Kebijakan privasi

Contoh:

<p className="text-xs text-gray-500">
  🔒 Laporan Anda aman dan dapat dilakukan secara anonim
</p>