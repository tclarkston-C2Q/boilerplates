import React from 'react';
import { Dimensions } from 'react-native';
import { Box, Heading, Text, VStack } from '@gluestack-ui/themed';
import { LineChart } from 'react-native-chart-kit';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import AdminLayout from '../components/layout/AdminLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'RegionDetail'>;

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#0f172a',
  backgroundGradientTo: '#0f172a',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(52, 211, 153, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(226, 232, 240, ${opacity})`,
  propsForDots: {
    r: '4',
  },
};

const RegionDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const regionName = route.params?.regionName ?? 'Unknown Region';

  const kpiHistoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [72, 78, 80, 84, 88, 92],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <AdminLayout
      navigation={navigation}
      currentRoute="RegionDetail"
      title={regionName}
      subtitle="KPI trajectory and operational health for this region."
    >
      <VStack space="md">
        <Box className="bg-white rounded-2xl shadow p-4">
          <Heading size="sm" className="text-slate-900 mb-1">
            KPI Overview
          </Heading>
          <Text size="xs" className="text-slate-500 mb-3">
            Current KPI: <Text className="font-semibold text-emerald-600">92%</Text> •{' '}
            Target: <Text className="font-semibold text-slate-800">95%</Text>
          </Text>
          <Text size="sm" className="text-slate-600 mb-2">
            This region is trending positively with incremental improvement month over
            month. Variance is within acceptable thresholds.
          </Text>
        </Box>

        <Box className="bg-slate-900 rounded-2xl p-4">
          <Heading size="sm" className="text-slate-100 mb-2">
            KPI Trend (Last 6 Months)
          </Heading>
          <Text size="xs" className="text-slate-400 mb-4">
            Month-over-month KPI performance.
          </Text>
          <LineChart
            data={kpiHistoryData}
            width={Math.min(screenWidth - 64, 480)}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </Box>

        <Box className="bg-white rounded-2xl shadow p-4 mb-2">
          <Heading size="sm" className="text-slate-900 mb-2">
            Operational Notes
          </Heading>
          <Text size="sm" className="text-slate-600 mb-1">
            • Staffing levels are stable; no critical gaps.
          </Text>
          <Text size="sm" className="text-slate-600 mb-1">
            • SLA adherence is above 98% for the last quarter.
          </Text>
          <Text size="sm" className="text-slate-600">
            • Recommended focus area: proactive risk management to keep churn and incident
            volumes low.
          </Text>
        </Box>
      </VStack>
    </AdminLayout>
  );
};

export default RegionDetailScreen;
