# Terminal Portfolio Website

Modern, terminal temalı portföy websitesi. ddaniel.dev'den ilham alınarak oluşturulmuştur.

## 🚀 Özellikler

- **Terminal Teması**: Retro terminal görünümü ve hissi
- **Typing Animasyonları**: Gerçekçi terminal yazma efektleri
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Interaktif Bileşenler**: Terminal komutları ile navigasyon
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: JetBrains Mono

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd personal-portfolio
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 🎨 Özelleştirme

### Kişisel Bilgileri Güncelleme

1. **Hero Section** (`src/components/HeroSection.tsx`):
   - İsim ve unvan bilgilerini güncelleyin
   - Tanıtım metnini düzenleyin

2. **About Section** (`src/components/AboutSection.tsx`):
   - Hakkınızda bilgilerini güncelleyin
   - Deneyim ve eğitim bilgilerini düzenleyin

3. **Skills Section** (`src/components/SkillsSection.tsx`):
   - Yeteneklerinizi ve seviyeleri güncelleyin
   - Yeni kategoriler ekleyin

4. **Projects Section** (`src/components/ProjectsSection.tsx`):
   - Projelerinizi ekleyin/düzenleyin
   - GitHub ve demo linklerini güncelleyin

5. **Contact Section** (`src/components/ContactSection.tsx`):
   - Sosyal medya linklerinizi güncelleyin
   - İletişim bilgilerinizi düzenleyin

### Renk Temasını Değiştirme

`tailwind.config.js` dosyasındaki `terminal` renklerini düzenleyerek tema renklerini değiştirebilirsiniz:

```javascript
colors: {
  terminal: {
    bg: '#0a0a0a',      // Arka plan
    text: '#00ff00',    // Ana yeşil renk
    secondary: '#ffffff', // Beyaz metin
    accent: '#ff6b6b',  // Vurgu rengi
    border: '#333333',  // Kenarlık rengi
  }
}
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AboutSection.tsx
│   ├── ContactSection.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── TerminalHeader.tsx
│   └── TypingAnimation.tsx
└── lib/
    └── (yardımcı fonksiyonlar)
```

## 🚀 Deployment

### Vercel (Önerilen)

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com)'e giriş yapın
3. Repository'yi import edin
4. Otomatik deploy edilecektir

### Netlify

1. Projeyi build edin:
```bash
npm run build
```

2. `out` klasörünü Netlify'a upload edin

### Manuel Build

```bash
npm run build
npm start
```

## 🎯 Performans Optimizasyonları

- **Code Splitting**: Next.js otomatik code splitting
- **Image Optimization**: Next.js Image component kullanımı
- **Font Optimization**: Google Fonts optimizasyonu
- **CSS Purging**: Tailwind CSS otomatik purging
- **Lazy Loading**: Framer Motion lazy loading

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🙏 Teşekkürler

- [ddaniel.dev](https://ddaniel.dev) - Tasarım ilhamı
- [Framer Motion](https://framer.com/motion) - Animasyonlar
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide React](https://lucide.dev) - İkonlar
