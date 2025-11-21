import React from "react";
import { Pressable } from "react-native";
import { Box, Text, VStack, HStack } from "@gluestack-ui/themed";
import {
  Users,
  Activity,
  Calendar,
  Pill,
  Settings,
  FileBarChart,
  HeartHandshake,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { ViewId, pathForView } from "../navigation";

interface SidebarProps {
  currentView: ViewId;
  onOpenAddPatient: () => void;
}

const navItems: { id: ViewId; label: string; icon: any }[] = [
  { id: "dashboard", label: "Dashboard", icon: Activity },
  { id: "patients", label: "Patients", icon: Users },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "medications", label: "Medications", icon: Pill },
  { id: "vitals", label: "Vitals", icon: Activity },
  { id: "team", label: "Care Team", icon: HeartHandshake },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onOpenAddPatient,
}) => {
  const router = useRouter();

  return (
    <Box className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
      <Box className="px-4 py-5 border-b border-slate-800">
        <Text className="text-xl font-semibold text-white">
          Eldercare Admin
        </Text>
        <Text className="text-xs text-slate-400 mt-1">
          Inpatient & home care dashboard
        </Text>
      </Box>

      <VStack className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentView === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => router.push(pathForView(item.id))}
            >
              <HStack
                className={`items-center rounded-lg px-3 py-2 mb-1 ${
                  active ? "bg-slate-800" : "bg-transparent"
                }`}
              >
                <Icon
                  size={18}
                  color={active ? "#60a5fa" : "#9ca3af"}
                  style={{ marginRight: 8 }}
                />
                <Text
                  className={`text-sm ${
                    active ? "text-sky-400" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </Text>
              </HStack>
            </Pressable>
          );
        })}
      </VStack>

      <Box className="px-3 py-4 border-t border-slate-800">
        <Pressable
          onPress={onOpenAddPatient}
          className="bg-sky-600 rounded-lg px-3 py-2 items-center justify-center"
        >
          <Text className="text-sm font-semibold text-white">
            + Add Patient
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};
