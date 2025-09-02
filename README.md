# Terminal Portfolio Website

Modern terminal-themed portfolio website inspired by ddaniel.dev.

## 🚀 Features

- **Terminal Theme**: Retro terminal look and feel
- **Typing Animations**: Realistic terminal typing effects
- **Responsive Design**: Perfect display on all devices
- **Interactive Components**: Navigation with terminal commands
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Scroll Navigation**: Right-side navigation dots with active section highlighting
- **Hidden Scrollbar**: Clean, modern appearance without visible scrollbars

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: JetBrains Mono

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd personal-portfolio
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open in your browser:**
```
http://localhost:3000
```

## 🎨 Customization

### Updating Personal Information

1. **Hero Section** (`src/components/HeroSection.tsx`):
   - Update name and title information
   - Edit introduction text

2. **About Section** (`src/components/AboutSection.tsx`):
   - Update your personal information
   - Edit experience and education details

3. **Skills Section** (`src/components/SkillsSection.tsx`):
   - Update your skills and proficiency levels
   - Add new categories

4. **Projects Section** (`src/components/ProjectsSection.tsx`):
   - Add/edit your projects
   - Update GitHub and demo links

5. **Contact Section** (`src/components/ContactSection.tsx`):
   - Update your social media links
   - Edit contact information

### Changing Color Theme

You can change theme colors by editing the `terminal` colors in `tailwind.config.js`:

```javascript
colors: {
  terminal: {
    bg: '#0a0a0a',      // Background
    text: '#00ff00',    // Main green color
    secondary: '#ffffff', // White text
    accent: '#ff6b6b',  // Accent color
    border: '#333333',  // Border color
  }
}
```

## 📁 Project Structure

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
│   ├── ScrollIndicator.tsx
│   ├── SkillsSection.tsx
│   ├── TerminalHeader.tsx
│   └── TypingAnimation.tsx
└── lib/
    └── (utility functions)
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your project to GitHub
2. Sign in to [Vercel](https://vercel.com)
3. Import your repository
4. It will be automatically deployed

### Netlify

1. Build the project:
```bash
npm run build
```

2. Upload the `out` folder to Netlify

### Manual Build

```bash
npm run build
npm start
```

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic Next.js code splitting
- **Image Optimization**: Next.js Image component usage
- **Font Optimization**: Google Fonts optimization
- **CSS Purging**: Tailwind CSS automatic purging
- **Lazy Loading**: Framer Motion lazy loading

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [ddaniel.dev](https://ddaniel.dev) - Design inspiration
- [Framer Motion](https://framer.com/motion) - Animations
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide React](https://lucide.dev) - Icons
