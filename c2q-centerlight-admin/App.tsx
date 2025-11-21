import React from "react";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainLayout from "./src/layout/MainLayout";

export type AppRoute =
  | "dashboard"
  | "patients"
  | "doctors"
  | "vitals"
  | "profile";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <MainLayout />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
