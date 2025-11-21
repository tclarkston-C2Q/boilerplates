# c2q centerlight health – Elderly Care Admin Dashboard

Tech stack:
- Expo + React Native Web
- NativeWind (Tailwind-style utilities)
- Gluestack UI
- react-native-chart-kit
- react-native-svg

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the app (choose any target):

```bash
npm run start       # Expo dev tools
npm run web         # Web
npm run android     # Android
npm run ios         # iOS (on macOS)
```

3. Tailwind / NativeWind

Tailwind is already wired through `babel.config.js` and `tailwind.config.js`.
You do **not** need to run a Tailwind CLI watcher for NativeWind to work.

## Pages Included

- **Dashboard** – KPI cards + sample heart rate chart
- **Patients** – Simple grid-style list of elderly patients
- **Doctors** – Doctor cards with specialties and active patient counts
- **Patient Vitals** – Detailed vitals chart and summary metrics

## Layout

- Azure-style collapsible left navigation
- Header with brand, title, and profile/settings
- Footer with versioning and company footer
