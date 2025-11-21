import React from "react";
import { Pressable, View } from "react-native";
import {
  Box,
  HStack,
  Text,
  Switch,
  SwitchThumb,
  Avatar,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { ViewId } from "../navigation";

interface HeaderProps {
  currentView: ViewId;
  onOpenAddPatient: () => void;
  validationEnabled: boolean;
  onToggleValidation: (v: boolean) => void;
}

const titles: Record<ViewId, string> = {
  dashboard: "Dashboard",
  patients: "Patients",
  appointments: "Appointments",
  medications: "Medications",
  vitals: "Vitals & Monitoring",
  team: "Care Team",
  reports: "Reports & Analytics",
  settings: "Settings",
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenAddPatient,
  validationEnabled,
  onToggleValidation,
}) => {
  return (
    <Box className="border-b border-slate-800 bg-slate-900">
      <HStack className="items-center justify-between px-4 py-3">
        <Box>
          <Text className="text-lg md:text-xl font-semibold text-white">
            {titles[currentView]}
          </Text>
          <Text className="text-xs text-slate-400 mt-1">
            Elderly patient management & coordination
          </Text>
        </Box>

        <HStack className="items-center space-x-4">
          <HStack className="items-center">
            <Text className="text-xs text-slate-400 mr-2">
              Wizard validation
            </Text>
            <Switch
              value={validationEnabled}
              onValueChange={onToggleValidation}
              className="bg-slate-700"
            >
              <SwitchThumb
                className={
                  validationEnabled ? "bg-sky-500" : "bg-slate-400"
                }
              />
            </Switch>
          </HStack>

          <Pressable
            onPress={onOpenAddPatient}
            className="md:hidden bg-sky-600 rounded-lg px-3 py-2"
          >
            <Text className="text-xs font-semibold text-white">
              + Add Patient
            </Text>
          </Pressable>

          <HStack className="items-center">
            <Avatar size="md">
              <AvatarFallbackText>Admin</AvatarFallbackText>
            </Avatar>
            <View style={{ marginLeft: 8 }}>
              <Text className="text-xs font-medium text-slate-200">
                Care Admin
              </Text>
              <Text className="text-[10px] text-slate-400">
                ElderCare Facility
              </Text>
            </View>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
};
