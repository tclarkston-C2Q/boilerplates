import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Slot, usePathname } from "expo-router";
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "../src/gluestack-ui.config";
import { viewFromPath, ViewId } from "../src/navigation";
import { Sidebar } from "../src/components/Sidebar";
import { Header } from "../src/components/Header";
import { AddPatientModal } from "../src/components/AddPatientModal";

export default function RootLayout() {
  const pathname = usePathname();
  const currentView: ViewId = viewFromPath(pathname);

  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [validationEnabled, setValidationEnabled] = useState(true);

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box className="flex-1 bg-slate-950">
          <Box className="flex-row h-full">
            <Sidebar
              currentView={currentView}
              onOpenAddPatient={() => setIsAddPatientOpen(true)}
            />

            <Box className="flex-1">
              <Header
                currentView={currentView}
                onOpenAddPatient={() => setIsAddPatientOpen(true)}
                validationEnabled={validationEnabled}
                onToggleValidation={setValidationEnabled}
              />

              <Box className="flex-1 p-4 md:p-6">
                <Slot />
              </Box>
            </Box>
          </Box>

          <AddPatientModal
            open={isAddPatientOpen}
            onOpenChange={setIsAddPatientOpen}
            validationEnabled={validationEnabled}
          />
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
