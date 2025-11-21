import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  GluestackUIProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Avatar,
  AvatarFallbackText,
  Divider,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { LineChart } from "react-native-chart-kit";

type PageKey = "dashboard" | "patients" | "doctors" | "vitals";

const NAV_ITEMS: { key: PageKey; label: string; abbr: string }[] = [
  { key: "dashboard", label: "Dashboard", abbr: "D" },
  { key: "patients", label: "Patients", abbr: "P" },
  { key: "doctors", label: "Doctors", abbr: "Dr" },
  { key: "vitals", label: "Patient Vitals", abbr: "V" },
];

// Dummy data
const patients = [
  { id: "P-1001", name: "Evelyn Carter", age: 82, primaryDoctor: "Dr. Lee", risk: "High" },
  { id: "P-1002", name: "Robert Johnson", age: 77, primaryDoctor: "Dr. Alvarez", risk: "Medium" },
  { id: "P-1003", name: "Martha Diaz", age: 80, primaryDoctor: "Dr. Singh", risk: "Low" },
];

const doctors = [
  { id: "D-2001", name: "Dr. Emily Lee", specialty: "Geriatrics", activePatients: 24 },
  { id: "D-2002", name: "Dr. Carlos Alvarez", specialty: "Cardiology", activePatients: 18 },
  { id: "D-2003", name: "Dr. Priya Singh", specialty: "Endocrinology", activePatients: 16 },
];

const dashboardChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [72, 70, 69, 71, 68, 67, 69],
      strokeWidth: 2,
    },
  ],
};

const vitalsChartData = {
  labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm"],
  datasets: [
    {
      data: [118, 121, 115, 117, 120, 116],
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundColor: "#020617",
  backgroundGradientFrom: "#020617",
  backgroundGradientTo: "#020617",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(34,197,94,${opacity})`,
  labelColor: (opacity = 1) => `rgba(148,163,184,${opacity})`,
  style: { borderRadius: 8 },
  propsForDots: {
    r: "4",
  },
};

const windowWidth = Dimensions.get("window").width;

export default function App() {
  const [selectedPage, setSelectedPage] = useState<PageKey>("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <GluestackUIProvider config={config}>
      {/* NativeWind usage on root container */}
      <SafeAreaView className="flex-1 bg-slate-950">
        <Box flex={1} style={{ flexDirection: "row" }}>
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            selected={selectedPage}
            onSelect={setSelectedPage}
          />
          <Box
            flex={1}
            style={{ backgroundColor: "#020617" }}
          >
            <Header
              collapsed={collapsed}
              onToggle={() => setCollapsed(!collapsed)}
              currentPage={selectedPage}
            />
            <Box
              flex={1}
              style={{ paddingHorizontal: 16, paddingVertical: 12 }}
            >
              <Content selectedPage={selectedPage} />
            </Box>
            <Footer />
          </Box>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

// ========== Layout Components ==========

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  selected: PageKey;
  onSelect: (key: PageKey) => void;
}

function Sidebar({
  collapsed,
  onToggle,
  selected,
  onSelect,
}: SidebarProps) {
  const width = collapsed ? 72 : 240;

  return (
    <Box
      style={{
        width,
        backgroundColor: "#020617",
        borderRightWidth: 1,
        borderRightColor: "#1f2937",
      }}
    >
      <Box
        style={{
          paddingHorizontal: 12,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#1f2937",
        }}
      >
        <Pressable onPress={onToggle}>
          <Text
            style={{
              color: "#a5b4fc",
              fontWeight: "700",
              fontSize: collapsed ? 18 : 20,
            }}
          >
            {collapsed ? "c2q" : "c2q centerlight"}
          </Text>
        </Pressable>
        {!collapsed && (
          <Text
            style={{
              color: "#64748b",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Elderly Care Admin
          </Text>
        )}
      </Box>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        <VStack space="xs">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === selected;
            return (
              <Pressable
                key={item.key}
                onPress={() => onSelect(item.key)}
              >
                <HStack
                  alignItems="center"
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    backgroundColor: isActive
                      ? "#0f172a"
                      : "transparent",
                  }}
                >
                  <Box
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: collapsed ? 0 : 8,
                      backgroundColor: isActive
                        ? "#22c55e33"
                        : "#1f2933",
                    }}
                  >
                    <Text
                      style={{
                        color: "#22c55e",
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      {item.abbr}
                    </Text>
                  </Box>
                  {!collapsed && (
                    <Text
                      style={{
                        color: isActive
                          ? "#e5e7eb"
                          : "#9ca3af",
                        fontSize: 14,
                      }}
                    >
                      {item.label}
                    </Text>
                  )}
                </HStack>
              </Pressable>
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
}

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: PageKey;
}

function Header({
  collapsed,
  onToggle,
  currentPage,
}: HeaderProps) {
  const title =
    currentPage === "dashboard"
      ? "Dashboard"
      : currentPage === "patients"
      ? "Patients"
      : currentPage === "doctors"
      ? "Doctors"
      : "Patient Vitals";

  return (
    <Box
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#1f2937",
        backgroundColor: "#020617",
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        space="md"
      >
        <HStack alignItems="center" space="md">
          <Pressable onPress={onToggle}>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 20,
                marginRight: 12,
              }}
            >
              {collapsed ? "☰" : "☷"}
            </Text>
          </Pressable>
          <VStack>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              c2q centerlight health
            </Text>
            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              {title} • Senior Care Operations
            </Text>
          </VStack>
        </HStack>

        <HStack alignItems="center" space="md">
          <Box
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: "#0f172a",
            }}
          >
            <Text
              style={{
                color: "#22c55e",
                fontSize: 12,
              }}
            >
              LIVE • Centerlight Care Hub
            </Text>
          </Box>

          <HStack alignItems="center" space="sm">
            <Avatar size="sm">
              <AvatarFallbackText>TC</AvatarFallbackText>
            </Avatar>
            <VStack>
              <Text
                style={{
                  color: "#e5e7eb",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Admin User
              </Text>
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                }}
              >
                c2q centerlight health
              </Text>
            </VStack>
            <Pressable>
              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: 16,
                  marginLeft: 8,
                }}
              >
                ⚙
              </Text>
            </Pressable>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
}

function Footer() {
  return (
    <Box
      style={{
        borderTopWidth: 1,
        borderTopColor: "#1f2937",
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#020617",
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          style={{
            color: "#6b7280",
            fontSize: 11,
          }}
        >
          © 2025 c2q centerlight health • Elderly Care
          Operations
        </Text>
        <Text
          style={{
            color: "#4b5563",
            fontSize: 11,
          }}
        >
          Centerlight Care Platform v1.0
        </Text>
      </HStack>
    </Box>
  );
}

// ========== Page Switching ==========

interface ContentProps {
  selectedPage: PageKey;
}

function Content({ selectedPage }: ContentProps) {
  switch (selectedPage) {
    case "patients":
      return <PatientsPage />;
    case "doctors":
      return <DoctorsPage />;
    case "vitals":
      return <VitalsPage />;
    default:
      return <DashboardPage />;
  }
}

// ========== Pages ==========

function Card({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <Box
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 16,
        borderRadius: 12,
        marginRight: 12,
      }}
    >
      <Text
        style={{
          color: "#9ca3af",
          fontSize: 12,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "#e5e7eb",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 4,
        }}
      >
        {value}
      </Text>
      {subtitle && (
        <Text
          style={{
            color: "#22c55e",
            fontSize: 11,
            marginTop: 6,
          }}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
}

function DashboardPage() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <VStack space="md">
        <Text
          style={{
            color: "#e5e7eb",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Welcome back, Care Team
        </Text>
        <Text
          style={{
            color: "#9ca3af",
            fontSize: 13,
          }}
        >
          Real-time visibility into elderly care operations
          across the c2q centerlight health network.
        </Text>

        {/* Metrics row */}
        <HStack
          space="sm"
          style={{ marginTop: 12 }}
        >
          <Card
            title="Active Patients"
            value="126"
            subtitle="+4 vs. yesterday"
          />
          <Card
            title="Scheduled Visits (Today)"
            value="38"
            subtitle="92% coverage locked"
          />
          <Card
            title="High-Risk Alerts"
            value="7"
            subtitle="3 require immediate review"
          />
        </HStack>

        {/* Chart */}
        <Box
          style={{
            marginTop: 16,
            backgroundColor: "#0f172a",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#e5e7eb",
              fontSize: 14,
              fontWeight: "500",
              marginBottom: 4,
            }}
          >
            Average Daily Heart Rate (Sample Cohort)
          </Text>
          <Text
            style={{
              color: "#9ca3af",
              fontSize: 11,
              marginBottom: 12,
            }}
          >
            Monitoring baseline stability for elderly
            patients over the last 7 days.
          </Text>
          <LineChart
            data={dashboardChartData}
            width={Math.min(
              windowWidth - 64,
              900
            )}
            height={220}
            chartConfig={chartConfig}
            style={{ borderRadius: 8 }}
            bezier
          />
        </Box>
      </VStack>
    </ScrollView>
  );
}

function PatientsPage() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <VStack space="md">
        <Text
          style={{
            color: "#e5e7eb",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Patients
        </Text>
        <Text
          style={{
            color: "#9ca3af",
            fontSize: 13,
          }}
        >
          Manage elderly patient profiles, risk tiers, and
          primary care assignments.
        </Text>

        <Box
          style={{
            marginTop: 12,
            backgroundColor: "#020617",
            borderWidth: 1,
            borderColor: "#1f2937",
            borderRadius: 12,
          }}
        >
          <HStack
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              backgroundColor: "#0f172a",
            }}
          >
            <Text
              style={{
                flex: 1,
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Patient ID
            </Text>
            <Text
              style={{
                flex: 2,
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Name
            </Text>
            <Text
              style={{
                flex: 1,
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Age
            </Text>
            <Text
              style={{
                flex: 2,
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Primary Doctor
            </Text>
            <Text
              style={{
                flex: 1,
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Risk
            </Text>
          </HStack>
          <Divider bg="#1f2937" />
          {patients.map((p, idx) => (
            <Box
              key={p.id}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                backgroundColor:
                  idx % 2 === 0
                    ? "#020617"
                    : "#020617",
              }}
            >
              <HStack>
                <Text
                  style={{
                    flex: 1,
                    color: "#e5e7eb",
                    fontSize: 12,
                  }}
                >
                  {p.id}
                </Text>
                <Text
                  style={{
                    flex: 2,
                    color: "#e5e7eb",
                    fontSize: 12,
                  }}
                >
                  {p.name}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: "#e5e7eb",
                    fontSize: 12,
                  }}
                >
                  {p.age}
                </Text>
                <Text
                  style={{
                    flex: 2,
                    color: "#e5e7eb",
                    fontSize: 12,
                  }}
                >
                  {p.primaryDoctor}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color:
                      p.risk === "High"
                        ? "#f97316"
                        : p.risk === "Medium"
                        ? "#eab308"
                        : "#22c55e",
                    fontSize: 12,
                  }}
                >
                  {p.risk}
                </Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>
    </ScrollView>
  );
}

function DoctorsPage() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <VStack space="md">
        <Text
          style={{
            color: "#e5e7eb",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Doctors
        </Text>
        <Text
          style={{
            color: "#9ca3af",
            fontSize: 13,
          }}
        >
          Geriatric specialists and care coordinators
          managing Centerlight patients.
        </Text>

        <HStack
          space="md"
          style={{ marginTop: 12, flexWrap: "wrap" }}
        >
          {doctors.map((d) => (
            <Box
              key={d.id}
              style={{
                width: 280,
                backgroundColor: "#0f172a",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <HStack
                alignItems="center"
                space="md"
              >
                <Avatar size="md">
                  <AvatarFallbackText>
                    {d.name
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </AvatarFallbackText>
                </Avatar>
                <VStack>
                  <Text
                    style={{
                      color: "#e5e7eb",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {d.name}
                  </Text>
                  <Text
                    style={{
                      color: "#22c55e",
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {d.specialty}
                  </Text>
                </VStack>
              </HStack>
              <Divider
                bg="#1f2937"
                style={{ marginVertical: 10 }}
              />
              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: 12,
                }}
              >
                Active Patients:{" "}
                <Text
                  style={{
                    color: "#e5e7eb",
                  }}
                >
                  {d.activePatients}
                </Text>
              </Text>
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                  marginTop: 6,
                }}
              >
                Typical panel of high-acuity elderly patients
                with weekly vitals monitoring and on-call
                escalation.
              </Text>
            </Box>
          ))}
        </HStack>
      </VStack>
    </ScrollView>
  );
}

function VitalsPage() {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <VStack space="md">
        <Text
          style={{
            color: "#e5e7eb",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Patient Vitals
        </Text>
        <Text
          style={{
            color: "#9ca3af",
            fontSize: 13,
          }}
        >
          Sample vitals stream for a high-risk patient,
          aligned with Centerlight monitoring protocols.
        </Text>

        <Box
          style={{
            marginTop: 12,
            backgroundColor: "#0f172a",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <HStack
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack>
              <Text
                style={{
                  color: "#e5e7eb",
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Patient: Evelyn Carter
              </Text>
              <Text
                style={{
                  color: "#9ca3af",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                Room 304 • High-risk • Continuous BP
                monitoring
              </Text>
            </VStack>
            <Box
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: "#450a0a",
              }}
            >
              <Text
                style={{
                  color: "#f97316",
                  fontSize: 11,
                }}
              >
                Escalation Watch
              </Text>
            </Box>
          </HStack>

          <LineChart
            data={vitalsChartData}
            width={Math.min(windowWidth - 64, 900)}
            height={220}
            chartConfig={chartConfig}
            style={{ marginTop: 16, borderRadius: 8 }}
            bezier
          />
        </Box>

        {/* Quick vitals summary cards */}
        <HStack
          space="sm"
          style={{ marginTop: 12 }}
        >
          <Box
            style={{
              flex: 1,
              backgroundColor: "#0f172a",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Heart Rate
            </Text>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 20,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              69 bpm
            </Text>
            <Text
              style={{
                color: "#22c55e",
                fontSize: 11,
                marginTop: 6,
              }}
            >
              Stable • within configured range
            </Text>
          </Box>
          <Box
            style={{
              flex: 1,
              backgroundColor: "#0f172a",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              Blood Pressure
            </Text>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 20,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              118 / 76
            </Text>
            <Text
              style={{
                color: "#eab308",
                fontSize: 11,
                marginTop: 6,
              }}
            >
              Slight variance vs. baseline
            </Text>
          </Box>
          <Box
            style={{
              flex: 1,
              backgroundColor: "#0f172a",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: "#9ca3af",
                fontSize: 12,
              }}
            >
              SpO₂
            </Text>
            <Text
              style={{
                color: "#e5e7eb",
                fontSize: 20,
                fontWeight: "600",
                marginTop: 4,
              }}
            >
              97%
            </Text>
            <Text
              style={{
                color: "#22c55e",
                fontSize: 11,
                marginTop: 6,
              }}
            >
              No respiratory risk detected
            </Text>
          </Box>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
