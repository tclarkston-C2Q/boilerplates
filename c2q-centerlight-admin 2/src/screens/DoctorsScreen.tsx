import React from "react";
import { ScrollView } from "react-native";
import {
  Box,
  HStack,
  VStack,
  Text,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { mockDoctors } from "../data/mockDoctors";

const DoctorsScreen: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 16 }}
      className="flex-1"
    >
      <Box className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
        <Text className="text-slate-100 font-semibold text-sm mb-1">
          Medical Staff
        </Text>
        <Text className="text-[11px] text-slate-400 mb-3">
          Attending physicians with current geriatric patient loads.
        </Text>

        <HStack className="mb-2 px-2">
          <HeaderCell label="Name" flex={1.4} />
          <HeaderCell label="Specialty" flex={1.4} />
          <HeaderCell label="# Patients" />
          <HeaderCell label="On Call" />
        </HStack>

        <VStack>
          {mockDoctors.map((doctor) => (
            <HStack
              key={doctor.id}
              className="px-2 py-2 rounded-lg mb-1 bg-slate-950/60"
            >
              <Cell flex={1.4}>
                <Text className="text-xs text-slate-100">{doctor.name}</Text>
              </Cell>
              <Cell flex={1.4}>
                <Text className="text-xs text-slate-300">{doctor.specialty}</Text>
              </Cell>
              <Cell>
                <Text className="text-xs text-slate-300">{doctor.patients}</Text>
              </Cell>
              <Cell>
                {doctor.onCall ? (
                  <Badge
                    className="rounded-full px-2 py-0.5 bg-emerald-500/15"
                    size="sm"
                    variant="outline"
                    action="muted"
                  >
                    <BadgeText className="text-[10px] text-emerald-300">
                      On Call
                    </BadgeText>
                  </Badge>
                ) : (
                  <Badge
                    className="rounded-full px-2 py-0.5 bg-slate-700/40"
                    size="sm"
                    variant="outline"
                    action="muted"
                  >
                    <BadgeText className="text-[10px] text-slate-300">
                      Off Duty
                    </BadgeText>
                  </Badge>
                )}
              </Cell>
            </HStack>
          ))}
        </VStack>
      </Box>
    </ScrollView>
  );
};

const HeaderCell: React.FC<{ label: string; flex?: number }> = ({ label, flex = 1 }) => (
  <Box className="justify-center" style={{ flex }}>
    <Text className="text-[10px] text-slate-500 uppercase">{label}</Text>
  </Box>
);

const Cell: React.FC<{ flex?: number; children: React.ReactNode }> = ({
  flex = 1,
  children,
}) => (
  <Box className="justify-center" style={{ flex }}>
    {children}
  </Box>
);

export default DoctorsScreen;
