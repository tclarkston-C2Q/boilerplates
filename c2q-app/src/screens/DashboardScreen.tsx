// src/screens/DashboardScreen.tsx
import React from 'react';
import { Dimensions, Pressable, View, Text } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import AdminLayout from '../components/layout/AdminLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const screenWidth = Dimensions.get('window').width;

type StatCard = {
  label: string;
  value: string;
  subLabel: string;
  delta: string;
};

const statsCards: StatCard[] = [
  { label: 'Total Users', value: '1,248', subLabel: 'Last 24h', delta: '+6.2%' },
  { label: 'Active Sessions', value: '312', subLabel: 'Real-time', delta: '+3.1%' },
  { label: 'Conversion Rate', value: '4.7%', subLabel: 'This week', delta: '+0.4%' },
  { label: 'Churn', value: '1.9%', subLabel: 'This month', delta: '-0.3%' },
];

type RegionRow = {
  name: string;
  status: 'Healthy' | 'Watch' | 'Risk';
  kpi: string;
  trend: '↑' | '↓' | '→';
};

const tableData: RegionRow[] = [
  { name: 'North Region', status: 'Healthy', kpi: '95%', trend: '↑' },
  { name: 'Central Region', status: 'Watch', kpi: '82%', trend: '→' },
  { name: 'South Region', status: 'Risk', kpi: '71%', trend: '↓' },
  { name: 'West Region', status: 'Healthy', kpi: '93%', trend: '↑' },
];

const lineChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [32, 45, 40, 60, 52, 68, 75],
      strokeWidth: 2,
    },
  ],
};

const barChartData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [420, 510, 380, 610],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#0f172a',
  backgroundGradientTo: '#0f172a',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(226, 232, 240, ${opacity})`,
  propsForDots: {
    r: '4',
  },
};

const StatCardComponent: React.FC<{ card: StatCard }> = ({ card }) => (
  <View
    style={{
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      flex: 1,
      minWidth: 160,
      marginBottom: 16,
    }}
  >
    <Text style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>
      {card.subLabel}
    </Text>
    <Text style={{ fontSize: 24, fontWeight: '600', color: '#0f172a' }}>
      {card.value}
    </Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
      <Text style={{ fontSize: 14, color: '#475569' }}>
        {card.label}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: card.delta.startsWith('-') ? '#ef4444' : '#10b981',
        }}
      >
        {card.delta}
      </Text>
    </View>
  </View>
);

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <AdminLayout
      navigation={navigation}
      currentRoute="Dashboard"
      title="Executive Dashboard"
      subtitle="High-level snapshot of key KPIs and regional performance."
    >
      <View style={{ gap: 16 }}>
        {/* KPI Cards */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          {statsCards.map((card) => (
            <StatCardComponent key={card.label} card={card} />
          ))}
        </View>

        {/* Charts */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          <View style={{
            backgroundColor: '#0f172a',
            borderRadius: 16,
            padding: 16,
            flex: 1,
            minWidth: 260,
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#f1f5f9', marginBottom: 8 }}>
              Daily Activity
            </Text>
            <Text style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
              Sessions by day (last 7 days)
            </Text>
            <LineChart
              data={lineChartData}
              width={Math.min(screenWidth - 64, 420)}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 16 }}
            />
          </View>

          <View style={{
            backgroundColor: '#0f172a',
            borderRadius: 16,
            padding: 16,
            flex: 1,
            minWidth: 260,
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#f1f5f9', marginBottom: 8 }}>
              Quarterly Revenue
            </Text>
            <Text style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
              Revenue by quarter (in K)
            </Text>
            <BarChart
              data={barChartData}
              width={Math.min(screenWidth - 64, 420)}
              height={200}
              chartConfig={chartConfig}
              style={{ borderRadius: 16 }}
              yAxisLabel=""
              yAxisSuffix="K"
              fromZero
            />
          </View>
        </View>

        {/* Table */}
        <View style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          marginBottom: 8,
          overflow: 'hidden',
        }}>
          <View style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#f8fafc',
            borderBottomWidth: 1,
            borderBottomColor: '#e2e8f0',
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a' }}>
              Regional Performance
            </Text>
            <Text style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
              Quick view of regional health and KPIs. Tap a row for detail.
            </Text>
          </View>

          {/* Header */}
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: '#f1f5f9',
            gap: 16,
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b' }}>
                Region
              </Text>
            </View>
            <View style={{ width: 128 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b' }}>
                Status
              </Text>
            </View>
            <View style={{ width: 96 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b', textAlign: 'right' }}>
                KPI
              </Text>
            </View>
            <View style={{ width: 48, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b' }}>
                Trend
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: '#e2e8f0' }} />

          {/* Rows */}
          <View>
            {tableData.map((row, idx) => (
              <View key={row.name}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('RegionDetail', { regionName: row.name })
                  }
                >
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    alignItems: 'center',
                    gap: 16,
                  }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, color: '#1e293b' }}>
                        {row.name}
                      </Text>
                    </View>
                    <View style={{ width: 128 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            row.status === 'Healthy'
                              ? '#059669'
                              : row.status === 'Risk'
                                ? '#dc2626'
                                : '#d97706',
                        }}
                      >
                        {row.status}
                      </Text>
                    </View>
                    <View style={{ width: 96 }}>
                      <Text style={{ fontSize: 14, color: '#1e293b', textAlign: 'right' }}>
                        {row.kpi}
                      </Text>
                    </View>
                    <View style={{ width: 48, alignItems: 'flex-end' }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            row.trend === '↑'
                              ? '#059669'
                              : row.trend === '↓'
                                ? '#dc2626'
                                : '#64748b',
                        }}
                      >
                        {row.trend}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                {idx < tableData.length - 1 && (
                  <View style={{ height: 1, backgroundColor: '#e2e8f0' }} />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </AdminLayout>
  );
};

export default DashboardScreen;