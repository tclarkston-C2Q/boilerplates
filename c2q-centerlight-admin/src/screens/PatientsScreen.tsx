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
import { mockPatients } from "../data/mockPatients";

const PatientsScreen: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 16 }}
      className="flex-1"
    >
      <Box className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
        <Text className="text-slate-100 font-semibold text-sm mb-1">
          Patient Panel
        </Text>
        <Text className="text-[11px] text-slate-400 mb-3">
          Current in-facility patients, risk indicators, and attending physicians.
        </Text>

        <HStack className="mb-2 px-2">
          <HeaderCell label="Name" flex={1.5} />
          <HeaderCell label="Age" />
          <HeaderCell label="Room" />
          <HeaderCell label="Risk" />
          <HeaderCell label="Primary Doctor" flex={1.3} />
          <HeaderCell label="Status" />
        </HStack>

        <VStack>
          {mockPatients.map((p) => (
            <HStack
              key={p.id}
              className="px-2 py-2 rounded-lg mb-1 bg-slate-950/60"
            >
              <Cell flex={1.5}>
                <Text className="text-xs text-slate-100">{p.name}</Text>
              </Cell>
              <Cell>
                <Text className="text-xs text-slate-300">{p.age}</Text>
              </Cell>
              <Cell>
                <Text className="text-xs text-slate-300">{p.room}</Text>
              </Cell>
              <Cell>
                <RiskBadge risk={p.riskLevel} />
              </Cell>
              <Cell flex={1.3}>
                <Text className="text-xs text-slate-300">{p.primaryDoctor}</Text>
              </Cell>
              <Cell>
                <StatusBadge status={p.status} />
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

const RiskBadge: React.FC<{ risk: "Low" | "Medium" | "High" }> = ({ risk }) => {
  let bg = "bg-emerald-500/15";
  let text = "text-emerald-300";
  if (risk === "Medium") {
    bg = "bg-amber-500/15";
    text = "text-amber-300";
  }
  if (risk === "High") {
    bg = "bg-rose-500/15";
    text = "text-rose-300";
  }

  return (
    <Badge
      className={`rounded-full px-2 py-0.5 ${bg}`}
      size="sm"
      variant="outline"
      action="muted"
    >
      <BadgeText className={`text-[10px] ${text}`}>{risk}</BadgeText>
    </Badge>
  );
};

const StatusBadge: React.FC<{
  status: "Stable" | "Under Observation" | "Critical";
}> = ({ status }) => {
  let bg = "bg-emerald-500/15";
  let text = "text-emerald-300";
  if (status === "Under Observation") {
    bg = "bg-sky-500/15";
    text = "text-sky-300";
  }
  if (status === "Critical") {
    bg = "bg-rose-500/20";
    text = "text-rose-300";
  }

  return (
    <Badge
      className={`rounded-full px-2 py-0.5 ${bg}`}
      size="sm"
      variant="outline"
      action="muted"
    >
      <BadgeText className={`text-[10px] ${text}`}>{status}</BadgeText>
    </Badge>
  );
};

export default PatientsScreen;
