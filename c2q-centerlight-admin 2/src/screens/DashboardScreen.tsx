import React, { useMemo } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Box, HStack, VStack, Text } from "@gluestack-ui/themed";
import { LineChart } from "react-native-chart-kit";

const DashboardScreen: React.FC = () => {
  const chartWidth = useMemo(() => {
    const screenWidth = Dimensions.get("window").width;
    return Math.min(screenWidth - 120, 900);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 16 }}
      className="flex-1"
    >
      <HStack className="flex-wrap gap-3 mb-4">
        <StatCard label="Total Patients" value="128" change="+4 today" />
        <StatCard label="High-Risk Alerts" value="7" change="3 critical" tone="alert" />
        <StatCard label="Scheduled Appointments" value="23" change="Next 24 hours" />
        <StatCard label="Average Occupancy" value="92%" change="Last 7 days" />
      </HStack>

      <HStack className="flex-wrap gap-4">
        <Box className="flex-1 bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <Text className="text-slate-100 font-semibold text-sm mb-1">
            Facility Occupancy Trend
          </Text>
          <Text className="text-slate-400 text-[11px] mb-3">
            Daily occupancy (% beds in use)
          </Text>
          <LineChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: [90, 92, 91, 93, 94, 92, 95],
                  strokeWidth: 2,
                },
              ],
            }}
            width={chartWidth}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: "#020617",
              backgroundGradientFrom: "#020617",
              backgroundGradientTo: "#020617",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(34,197,94,${opacity})`,
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

        <Box className="w-full md:w-72 bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <Text className="text-slate-100 font-semibold text-sm mb-2">
            Care Queue Snapshot
          </Text>
          <VStack className="space-y-2">
            <QueueRow label="Medication rounds" value="12 pending" />
            <QueueRow label="Vitals overdue" value="5 patients" />
            <QueueRow label="Family updates" value="8 calls" />
            <QueueRow label="Transport requests" value="3 open" />
          </VStack>
        </Box>
      </HStack>
    </ScrollView>
  );
};

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  tone?: "default" | "alert";
};

const StatCard: React.FC<StatCardProps> = ({ label, value, change, tone = "default" }) => {
  const badgeBg = tone === "alert" ? "bg-rose-500/20" : "bg-emerald-500/15";
  const badgeText = tone === "alert" ? "text-rose-300" : "text-emerald-300";

  return (
    <Box className="min-w-[150px] flex-1 bg-slate-900 rounded-2xl p-4 border border-slate-800">
      <Text className="text-[11px] text-slate-400 mb-1 uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-xl text-slate-100 font-semibold mb-2">{value}</Text>
      <Box className={`self-start rounded-full px-2 py-0.5 ${badgeBg}`}>
        <Text className={`text-[10px] ${badgeText}`}>{change}</Text>
      </Box>
    </Box>
  );
};

const QueueRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box className="flex-row justify-between items-center">
    <Text className="text-[11px] text-slate-400">{label}</Text>
    <Text className="text-[11px] text-slate-200">{value}</Text>
  </Box>
);

export default DashboardScreen;
