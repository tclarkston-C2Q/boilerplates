import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Divider,
} from '@gluestack-ui/themed';
import { LineChart, BarChart } from 'react-native-chart-kit';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import AdminLayout from '../components/layout/AdminLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const screenWidth = Dimensions.get('window').width;

const statsCards = [
  { label: 'Total Users', value: '1,248', subLabel: 'Last 24h', delta: '+6.2%' },
  { label: 'Active Sessions', value: '312', subLabel: 'Real-time', delta: '+3.1%' },
  { label: 'Conversion Rate', value: '4.7%', subLabel: 'This week', delta: '+0.4%' },
  { label: 'Churn', value: '1.9%', subLabel: 'This month', delta: '-0.3%' },
];

const tableData = [
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

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <AdminLayout
      navigation={navigation}
      currentRoute="Dashboard"
      title="Executive Dashboard"
      subtitle="High-level snapshot of key KPIs and regional performance."
    >
      <VStack space="md">
        <HStack
          space="md"
          flexWrap="wrap"
          className="mb-2"
        >
          {statsCards.map((card) => (
            <Box
              key={card.label}
              className="bg-white rounded-2xl p-4 shadow flex-1 min-w-[160px] mb-4"
            >
              <Text size="xs" className="text-slate-400 mb-1">
                {card.subLabel}
              </Text>
              <Heading size="lg" className="text-slate-900">
                {card.value}
              </Heading>
              <HStack justifyContent="space-between" alignItems="center" className="mt-2">
                <Text size="sm" className="text-slate-600">
                  {card.label}
                </Text>
                <Text
                  size="sm"
                  className={card.delta.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}
                >
                  {card.delta}
                </Text>
              </HStack>
            </Box>
          ))}
        </HStack>

        <HStack space="md" flexWrap="wrap" className="mb-2">
          <Box className="bg-slate-900 rounded-2xl p-4 flex-1 min-w-[260px] mb-4">
            <Heading size="sm" className="text-slate-100 mb-2">
              Daily Activity
            </Heading>
            <Text size="xs" className="text-slate-400 mb-4">
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
          </Box>

          <Box className="bg-slate-900 rounded-2xl p-4 flex-1 min-w-[260px] mb-4">
            <Heading size="sm" className="text-slate-100 mb-2">
              Quarterly Revenue
            </Heading>
            <Text size="xs" className="text-slate-400 mb-4">
              Revenue by quarter (in K)
            </Text>
            <BarChart
              data={barChartData}
              width={Math.min(screenWidth - 64, 420)}
              height={200}
              chartConfig={chartConfig}
              style={{ borderRadius: 16 }}
              fromZero
            />
          </Box>
        </HStack>

        <Box className="bg-white rounded-2xl shadow mb-2 overflow-hidden">
          <Box className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <Heading size="sm" className="text-slate-900">
              Regional Performance
            </Heading>
            <Text size="xs" className="text-slate-500 mt-1">
              Quick view of regional health and KPIs. Tap a row for detail.
            </Text>
          </Box>

          <HStack className="px-4 py-2 bg-slate-100" space="md">
            <Box className="flex-1">
              <Text size="xs" className="font-semibold text-slate-500">
                Region
              </Text>
            </Box>
            <Box className="w-32">
              <Text size="xs" className="font-semibold text-slate-500">
                Status
              </Text>
            </Box>
            <Box className="w-24">
              <Text size="xs" className="font-semibold text-slate-500 text-right">
                KPI
              </Text>
            </Box>
            <Box className="w-12 items-end">
              <Text size="xs" className="font-semibold text-slate-500">
                Trend
              </Text>
            </Box>
          </HStack>
          <Divider />

          <VStack>
            {tableData.map((row, idx) => (
              <Box key={row.name}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('RegionDetail', { regionName: row.name })
                  }
                >
                  <HStack
                    className="px-4 py-3"
                    alignItems="center"
                    space="md"
                  >
                    <Box className="flex-1">
                      <Text size="sm" className="text-slate-800">
                        {row.name}
                      </Text>
                    </Box>
                    <Box className="w-32">
                      <Text
                        size="sm"
                        className={
                          row.status === 'Healthy'
                            ? 'text-emerald-600'
                            : row.status === 'Risk'
                            ? 'text-rose-600'
                            : 'text-amber-600'
                        }
                      >
                        {row.status}
                      </Text>
                    </Box>
                    <Box className="w-24">
                      <Text size="sm" className="text-slate-800 text-right">
                        {row.kpi}
                      </Text>
                    </Box>
                    <Box className="w-12 items-end">
                      <Text
                        size="sm"
                        className={
                          row.trend === '↑'
                            ? 'text-emerald-600'
                            : row.trend === '↓'
                            ? 'text-rose-600'
                            : 'text-slate-500'
                        }
                      >
                        {row.trend}
                      </Text>
                    </Box>
                  </HStack>
                </Pressable>
                {idx < tableData.length - 1 && <Divider />}
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </AdminLayout>
  );
};

export default DashboardScreen;
