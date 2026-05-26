# 🚀 My Expo App — Vibe Coding Workshop

## What is this?
This is a starter Expo Go project for a hands-on workshop where students build mobile app screens with AI. You will run the app on your phone, then replace the filler screens with your own generated ideas.

## Before you start
- Node.js installed
- Expo Go app on your phone: https://expo.dev/go
- Git installed

## Setup (3 steps)
```bash
git clone [REPO_URL]
cd my-expo-app
npm install
npx expo start --tunnel
```

Then scan the QR code with Expo Go:
- iOS: use the Camera app
- Android: use the Expo Go app

## How to vibe code your screens
1. Open one of the filler files: `app/screen2.tsx`, `app/screen3.tsx`, or `app/screen4.tsx`.
2. Read the Claude prompt in the comment block at the top.
3. Copy that prompt into claude.ai.
4. Paste Claude's generated screen code back into the file.
5. Save and watch your app update instantly with hot reload.

## Project structure
```text
my-expo-app/
├── app/
│   ├── _layout.tsx      # Root tabs layout (Expo Router)
│   ├── index.tsx        # Home screen (pre-built)
│   ├── screen2.tsx      # Filler screen + Claude prompt
│   ├── screen3.tsx      # Filler screen + Claude prompt
│   └── screen4.tsx      # Filler screen + Claude prompt
├── assets/
│   └── images/
│       └── .gitkeep
├── components/
│   └── .gitkeep
├── constants/
│   └── Colors.ts        # Dark neon theme constants
├── app.json             # Expo app config
├── package.json         # Dependencies + scripts
├── tsconfig.json        # TypeScript config
├── .gitignore
└── README.md
```

## Tips
- Save often: Expo hot-reloads your changes in seconds.
- If you hit an error, ask Claude: "Fix this Expo React Native TypeScript error" and paste the message.
- Make your tabs yours: rename labels and icons in `app/_layout.tsx`.
- Keep it simple first, then layer in visual polish.

## Made with
React Native, Expo, Claude AI ✨
