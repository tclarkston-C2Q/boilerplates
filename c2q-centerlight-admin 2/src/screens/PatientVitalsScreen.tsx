import React, { useMemo } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Box, HStack, VStack, Text } from "@gluestack-ui/themed";
import { LineChart } from "react-native-chart-kit";
import { mockVitalTrend } from "../data/mockVitals";

const CHART_PADDING = 120;
const MAX_CHART_WIDTH = 900;

const PatientVitalsScreen: React.FC = () => {
  const chartWidth = useMemo(() => {
    const screenWidth = Dimensions.get("window").width;
    return Math.min(screenWidth - CHART_PADDING, MAX_CHART_WIDTH);
  }, []);
  const labels = mockVitalTrend.map((v) => v.timestampLabel);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 16 }}
      className="flex-1"
    >
      <HStack className="flex-wrap gap-3 mb-4">
        <VitalCard label="Heart Rate" value="76 bpm" description="Last recorded" />
        <VitalCard label="Blood Pressure" value="128 / 81" description="Last recorded" />
        <VitalCard label="SpO₂" value="96%" description="Last recorded" />
        <VitalCard label="Temp" value="98.4°F" description="Last recorded" />
      </HStack>

      <Box className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
        <Text className="text-slate-100 font-semibold text-sm mb-1">
          Heart Rate · Last 7 Readings
        </Text>
        <Text className="text-[11px] text-slate-400 mb-3">
          Dummy trend for a selected elderly patient.
        </Text>

        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: mockVitalTrend.map((v) => v.heartRate),
                strokeWidth: 2,
              },
            ],
          }}
          width={chartWidth}
          height={220}
          yAxisSuffix=" bpm"
          chartConfig={{
            backgroundColor: "#020617",
            backgroundGradientFrom: "#020617",
            backgroundGradientTo: "#020617",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(56,189,248,${opacity})`,
            labelColor: (opacity = 1) => `rgba(148,163,184,${opacity})`,
            propsForDots: {
              r: "3",
            },
            propsForBackgroundLines: {
              strokeDasharray: "",
              stroke: "#1e293b",
            },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </Box>
    </ScrollView>
  );
};

const VitalCard: React.FC<{
  label: string;
  value: string;
  description: string;
}> = ({ label, value, description }) => (
  <Box className="min-w-[150px] flex-1 bg-slate-900 rounded-2xl p-4 border border-slate-800">
    <Text className="text-[11px] text-slate-400 mb-1 uppercase">
      {label}
    </Text>
    <Text className="text-lg text-slate-100 font-semibold mb-1">
      {value}
    </Text>
    <Text className="text-[10px] text-slate-500">{description}</Text>
  </Box>
);

export default PatientVitalsScreen;
