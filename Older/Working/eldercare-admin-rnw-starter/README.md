# Eldercare Admin RNW Starter Kit

Tech stack:
- Expo + React Native Web
- expo-router
- NativeWind (Tailwind)
- Gluestack UI
- react-native-chart-kit
- react-hook-form + zod

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run start
   ```

3. Open the **Web** target in Expo Dev Tools.

You should see:
- Left-hand sidebar with blades (Dashboard, Patients, Appointments, etc.)
- Header with profile and **Wizard validation** toggle
- Dashboard with KPI cards and a `react-native-chart-kit` line chart
- Patients page with list + detail view
- Appointments page with a calendar-style list
- Add Patient popup wizard with a multi-step flow and optional validation
