import React from "react";
import { Pressable } from "react-native";
import { AppRoute } from "../../App";
import { Box, VStack, HStack, Text, Divider } from "@gluestack-ui/themed";

type Props = {
  activeRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

const navItems: { key: AppRoute; label: string; short: string }[] = [
  { key: "dashboard", label: "Dashboard", short: "D" },
  { key: "patients", label: "Patients", short: "P" },
  { key: "doctors", label: "Doctors", short: "Dr" },
  { key: "vitals", label: "Patient Vitals", short: "V" },
  { key: "profile", label: "Profile", short: "Me" },
];

const Sidebar: React.FC<Props> = ({
  activeRoute,
  onRouteChange,
  collapsed,
  onToggleCollapsed,
}) => {
  return (
    <Box
      className={`h-full bg-slate-900 border-r border-slate-800 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <VStack className="h-full">
        <HStack className="items-center justify-between px-3 py-4">
          {!collapsed && (
            <Text className="text-c2q-primary font-semibold text-base leading-tight">
              c2q <Text className="text-slate-100">Centerlight{"\n"}Health</Text>
            </Text>
          )}
          <Pressable
            accessibilityRole="button"
            onPress={onToggleCollapsed}
            className="rounded-md border border-slate-700 px-2 py-1"
          >
            <Text className="text-slate-300 text-xs">
              {collapsed ? "›" : "‹"}
            </Text>
          </Pressable>
        </HStack>

        <Divider className="bg-slate-800" />

        <VStack className="flex-1 mt-2">
          {navItems.map((item) => {
            const isActive = activeRoute === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => onRouteChange(item.key)}
                className={`mx-2 my-0.5 rounded-md ${
                  isActive ? "bg-slate-800" : "bg-transparent"
                }`}
              >
                <HStack
                  className={`items-center px-3 py-2 ${
                    isActive ? "border-l-4 border-c2q-primary" : ""
                  }`}
                >
                  <Box
                    className={`mr-2 h-7 w-7 items-center justify-center rounded-md ${
                      isActive ? "bg-c2q-primary" : "bg-slate-800"
                    }`}
                  >
                    <Text className="text-xs font-semibold text-slate-50">
                      {item.short}
                    </Text>
                  </Box>
                  {!collapsed && (
                    <Text
                      className={`text-sm ${
                        isActive
                          ? "text-slate-50 font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {item.label}
                    </Text>
                  )}
                </HStack>
              </Pressable>
            );
          })}
        </VStack>

        <Box className="px-3 py-3">
          <Text className="text-[10px] text-slate-400 uppercase">
            Environment
          </Text>
          <Text className="text-xs text-emerald-400 font-medium">
            Production · Elderly Care
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
