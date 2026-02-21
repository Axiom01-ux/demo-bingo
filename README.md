# Bingo Prediction App

A high-fidelity, social prediction market application built with React, TypeScript, and Tailwind CSS.

## Features

- **Dynamic Prediction Markets**: Browse, search, and bet on various categories (Crypto, Tech, Sports, etc.).
- **Real-time Interaction**: Place bets (Yes/No) and see immediate feedback.
- **Leaderboard**: Global rankings based on Win Rate (Accuracy) and Trading Volume.
- **Wallet Management**: Track your balance, active positions, and creation history.
- **Points & Referral System**: Earn "Bingo Points" for every trade and share your unique referral code.
- **Social Sharing**: Generate beautiful, downloadable share posters with interactive QR codes.
- **Responsive Design**: Mobile-first, "crafted" UI optimized for high-density displays.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, FontAwesome
- **Animations**: Motion (framer-motion)
- **Utilities**: 
  - `qrcode.react`: For generating interactive referral QR codes.
  - `html-to-image`: For generating downloadable share posters.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

## Project Structure

- `src/App.tsx`: Main application logic and routing.
- `src/components/`: Reusable UI components (PredictionCard, Leaderboard, Wallet, etc.).
- `src/types.ts`: TypeScript interfaces and enums.
- `src/constants.tsx`: Mock data and static configurations.
- `src/index.css`: Global styles and Tailwind configuration.

## Environment Variables

Declare these in your `.env` file if integrating with real backends:
- `VITE_APP_URL`: The base URL of the deployed application.

---
*Crafted with precision for the next generation of social prediction.*
