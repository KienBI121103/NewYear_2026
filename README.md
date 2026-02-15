# 🐴 Vietnamese Lunar New Year 2026 Fortune Teller

A beautifully crafted web application for Vietnamese Lunar New Year (Tết Nguyên Đán 2026 - Year of the Horse) that offers personalized fortune-telling experiences with traditional Vietnamese cultural elements.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://kienbi121103.github.io/NewYear_2026/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

### 🎭 Interactive Fortune-Telling Experience
- **Traditional bamboo stick drawing** - Authentic Vietnamese fortune-telling simulation with interactive shaking animation
- **Personalized fortunes** - Get customized predictions based on your name, birth year, and chosen topic
- **Vietnamese zodiac integration** - Detailed information about your zodiac animal with lucky colors and numbers
- **Lunar age calculation** - Automatic calculation of your Vietnamese lunar age

### 🎨 Rich Visual Design
- **Warm amber/golden color palette** - Inspired by traditional Vietnamese Tết aesthetics
- **High-contrast white topic cards** - Clean, readable design with dark red/black text
- **Dynamic background effects** - Falling cherry blossoms (hoa đào/hoa mai), clouds, gold coins, and more
- **Traditional decorations** - Cây nêu (New Year pole), lanterns, firecrackers, and Dong Ho folk art
- **Horse mascot illustration** - Custom "Tiểu Dã & Xích Thố" horse shadow metaphor

### 🎵 Audio Experience
- **Local MP3 music player** - Four Vietnamese Tết songs with auto-play and smooth transitions
- **Traditional instrument SFX** - Web Audio API synthesis of:
  - Trống hội (festival drum)
  - Bamboo clacking sounds
  - Firecrackers with pentatonic fanfare
  - Wooden fish percussion
- **Volume controls** - Adjustable music player with mute/unmute functionality

### 🎊 Interactive Elements
- **Click fireworks** - Canvas confetti effects on user interaction
- **Smooth animations** - Framer Motion animations throughout
- **Device motion support** - Shake your phone to draw fortune sticks
- **Screenshot sharing** - Download your fortune results to share

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js 14.2.35](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Styling & Animation
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 11](https://www.framer.com/motion/)** - Animation library
- **[canvas-confetti 1.9.4](https://github.com/catdad/canvas-confetti)** - Confetti effects

### Audio
- **HTML5 Audio API** - MP3 music playback
- **Web Audio API** - Real-time SFX synthesis

### Additional Tools
- **[html2canvas 1.4.1](https://html2canvas.hertzen.com/)** - Screenshot capture
- **Google Fonts** - Be Vietnam Pro, Playfair Display, Dancing Script, Pattaya, Montserrat

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KienBI121103/NewYear_2026.git
   cd NewYear_2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `out/` directory with static export enabled.

### Deploy to GitHub Pages

The project is configured for GitHub Pages deployment with automatic basePath handling:

1. **Set GitHub Pages source** to the `gh-pages` branch in repository settings
2. **Push to main branch** to trigger deployment:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. **View live site** at `https://[username].github.io/NewYear_2026/`

The app automatically detects GitHub Pages basePath (`/NewYear_2026`) at runtime for proper asset loading.

## 📁 Project Structure

```
NewYear_2026/
├── public/
│   ├── images/
│   │   └── horse-mascot.png          # Horse illustration
│   └── music/                         # MP3 music files
│       ├── van-su-nhu-y.mp3
│       ├── tet-dong-day.mp3
│       ├── di-de-tro-ve.mp3
│       └── ve-nha-la-co-tet.mp3
├── src/
│   ├── app/
│   │   ├── globals.css               # Global styles & theme
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page with screen router
│   ├── components/
│   │   ├── BackgroundEffects.tsx     # All visual decorations
│   │   ├── ChibiHorseMascot.tsx      # SVG horse mascot (legacy)
│   │   ├── HorseShadowBanner.tsx     # Tiểu Dã & Xích Thố animation
│   │   ├── LandingScreen.tsx         # Input form screen
│   │   ├── MusicPlayer.tsx           # HTML5 Audio player
│   │   ├── ResultScreen.tsx          # Fortune display
│   │   └── ShakingScreen.tsx         # Bamboo tube animation
│   ├── hooks/
│   │   ├── useSoundSystem.ts         # Web Audio API SFX
│   │   └── useSound.ts               # Legacy sound hook
│   └── lib/
│       └── generateFortune.ts        # Fortune generation logic
├── next.config.js                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind CSS config
└── package.json
```

## 🎨 Customization

### Colors
Edit the color palette in [src/app/globals.css](src/app/globals.css):
- Primary: Warm amber/brown tones (`#2A0E04` to `#8B3A18`)
- Accent: Deep red (`#CC2222`, `#8B1A1A`)
- Gold: `#D4A017`, `#FFD700`

### Music
Replace MP3 files in `public/music/` and update the `PLAYLIST` array in [src/components/MusicPlayer.tsx](src/components/MusicPlayer.tsx).

### Fortune Content
Modify fortune data in [src/lib/generateFortune.ts](src/lib/generateFortune.ts) to add new fortunes or topics.

## 🎵 Music Credits

1. **Vạn Sự Như Ý** - Trúc Nhân
2. **Tết Đong Đầy** - KHOA x Kay Trần
3. **Đi Để Trở Về** - Soobin Hoàng Sơn
4. **Về Nhà Là Có Tết** - Bùi Công Nam

*All music files are for demonstration purposes. Please ensure proper licensing for production use.*

## 🔍 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Web Audio API and Device Motion features require HTTPS in production.

## 📝 Development Phases

### Phase 1
- Initial Next.js setup
- Basic fortune-telling logic
- Landing and result screens

### Phase 2
- Visual enhancements
- Background decorations
- Animation improvements

### Phase 3
- Vietnamese calligraphy
- Horse shadow banner
- YouTube music integration
- Cây nêu decorations

### Phase 4 (Current)
- **MP3 music player** (replacing YouTube)
- **Traditional drum SFX**
- **Warm amber color palette**
- **Horse mascot image**
- **White topic cards** with high contrast

## 🐛 Known Issues

- MetadataBase warning in build (cosmetic, doesn't affect functionality)
- Audio autoplay may be blocked by browser policies (user interaction required)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Vietnamese cultural traditions and fortune-telling practices
- Dong Ho folk art inspiration
- Vietnamese Tết music artists
- Open source community

## 📧 Contact

- **GitHub**: [@KienBI121103](https://github.com/KienBI121103)
- **Live Demo**: [https://kienbi121103.github.io/NewYear_2026/](https://kienbi121103.github.io/NewYear_2026/)

---

**Chúc Mừng Năm Mới! 🎊🐴 Happy Year of the Horse 2026!**
