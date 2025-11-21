import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { Box, Text, HStack, VStack } from "@gluestack-ui/themed";
import {
  Users,
  Activity,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import { patients, appointments, vitals } from "../mockData";
import { ViewId } from "../navigation";

interface DashboardOverviewProps {
  onNavigate: (view: ViewId) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
}) => {
  const criticalPatients = patients.filter((p) => p.status === "critical")
    .length;
  const totalPatients = patients.length;
  const today = "2024-11-14";
  const todayAppointments = appointments.filter((a) => a.date === today).length;
  const recentVitals = vitals.slice(0, 3);
  const upcomingAppointments = appointments
    .filter((a) => a.status === "scheduled")
    .slice(0, 4);

  const screenWidth = Dimensions.get("window").width - 48;

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [18, 22, 19, 25, 20, 23, 21],
        strokeWidth: 2,
      },
    ],
    legend: ["Active Patients"],
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
      <VStack className="space-y-6">
        <Box>
          <Text className="text-base md:text-lg text-slate-100">
            Dashboard Overview
          </Text>
          <Text className="text-xs text-slate-400">
            Welcome back, here&apos;s what&apos;s happening today
          </Text>
        </Box>

        <HStack className="space-x-4">
          <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
            <HStack className="justify-between items-center">
              <VStack>
                <Text className="text-xs text-slate-400">Total Patients</Text>
                <Text className="text-2xl text-slate-50 mt-1">
                  {totalPatients}
                </Text>
                <Text className="text-[11px] text-emerald-400 mt-1">
                  <TrendingUp size={12} color="#22c55e" /> 2 new admissions
                </Text>
              </VStack>
              <Box className="w-12 h-12 bg-sky-900/60 rounded-lg items-center justify-center">
                <Users size={22} color="#60a5fa" />
              </Box>
            </HStack>
          </Box>

          <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
            <HStack className="justify-between items-center">
              <VStack>
                <Text className="text-xs text-slate-400">Critical Alerts</Text>
                <Text className="text-2xl text-slate-50 mt-1">
                  {criticalPatients}
                </Text>
                <Text
                  className="text-[11px] text-rose-400 mt-1"
                  onPress={() => onNavigate("patients")}
                >
                  View patients →
                </Text>
              </VStack>
              <Box className="w-12 h-12 bg-rose-900/60 rounded-lg items-center justify-center">
                <AlertTriangle size={22} color="#f97373" />
              </Box>
            </HStack>
          </Box>

          <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
            <HStack className="justify-between items-center">
              <VStack>
                <Text className="text-xs text-slate-400">
                  Today&apos;s Appointments
                </Text>
                <Text className="text-2xl text-slate-50 mt-1">
                  {todayAppointments}
                </Text>
                <Text
                  className="text-[11px] text-sky-400 mt-1"
                  onPress={() => onNavigate("appointments")}
                >
                  View schedule →
                </Text>
              </VStack>
              <Box className="w-12 h-12 bg-sky-900/60 rounded-lg items-center justify-center">
                <Calendar size={22} color="#38bdf8" />
              </Box>
            </HStack>
          </Box>

          <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
            <HStack className="justify-between items-center">
              <VStack>
                <Text className="text-xs text-slate-400">Monitoring</Text>
                <Text className="text-2xl text-slate-50 mt-1">
                  {recentVitals.length}
                </Text>
                <Text
                  className="text-[11px] text-emerald-400 mt-1"
                  onPress={() => onNavigate("vitals")}
                >
                  View vitals →
                </Text>
              </VStack>
              <Box className="w-12 h-12 bg-emerald-900/60 rounded-lg items-center justify-center">
                <Activity size={22} color="#34d399" />
              </Box>
            </HStack>
          </Box>
        </HStack>

        <Box className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <Text className="text-sm font-semibold text-slate-50 mb-2">
            Weekly Active Patients
          </Text>
          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#020617",
              backgroundGradientTo: "#020617",
              color: (opacity = 1) => `rgba(96, 165, 250, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
              decimalPlaces: 0,
            }}
            style={{ borderRadius: 12 }}
          />
        </Box>

        <HStack className="space-x-4">
          <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
            <Text className="text-sm font-semibold text-slate-50 mb-3">
              Critical Patients
            </Text>
            <VStack className="space-y-3">
              {patients
                .filter(
                  (p) => p.status === "critical" || p.status === "observation"
                )
                .map((patient) => (
                  <HStack
                    key={patient.id}
                    className={`items-center justify-between p-3 rounded-lg ${
                      patient.status === "critical"
                        ? "bg-rose-950"
                        : "bg-amber-950"
                    }`}
                  >
                    <HStack className="items-center space-x-3">
                      <Box className="w-10 h-10 rounded-full bg-slate-900 items-center justify-center">
                        <Text className="text-xs font-semibold text-slate-50">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Text>
                      </Box>
                      <Box>
                        <Text className="text-sm text-slate-50">
                          {patient.name}
                        </Text>
                        <Text className="text-[11px] text-slate-400">
                          Room {patient.roomNumber}
                        </Text>
                      </Box>
                    </HStack>
                    <Text
                      className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                        patient.status === "critical"
                          ? "bg-rose-900 text-rose-200"
                          : "bg-amber-900 text-amber-200"
                      }`}
                    >
                      {patient.status.toUpperCase()}
                    </Text>
                  </HStack>
                ))}
            </VStack>
          </Box>

          <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
            <Text className="text-sm font-semibold text-slate-50 mb-3">
              Upcoming Appointments
            </Text>
            <VStack className="space-y-3">
              {upcomingAppointments.map((a) => (
                <HStack
                  key={a.id}
                  className="items-center justify-between p-3 border border-slate-800 rounded-lg"
                >
                  <HStack className="items-center space-x-3">
                    <Box className="w-10 h-10 rounded-lg bg-sky-900/50 items-center justify-center">
                      <Clock size={18} color="#38bdf8" />
                    </Box>
                    <Box>
                      <Text className="text-sm text-slate-50">
                        {a.patientName}
                      </Text>
                      <Text className="text-[11px] text-slate-400">
                        {a.type} – {a.time}
                      </Text>
                    </Box>
                  </HStack>
                  <Text className="text-[11px] text-slate-300">
                    {a.provider.split(" ")[1]}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </ScrollView>
  );
};
