// src/screens/RegionDetailScreen.tsx
import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
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
      <View style={{ gap: 16 }}>
        <View style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          padding: 16,
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 4 }}>
            KPI Overview
          </Text>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            Current KPI:{' '}
            <Text style={{ fontWeight: '600', color: '#059669' }}>92%</Text> • Target:{' '}
            <Text style={{ fontWeight: '600', color: '#1e293b' }}>95%</Text>
          </Text>
          <Text style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>
            This region is trending positively with incremental improvement month
            over month. Variance is within acceptable thresholds.
          </Text>
        </View>

        <View style={{
          backgroundColor: '#0f172a',
          borderRadius: 16,
          padding: 16,
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#f1f5f9', marginBottom: 8 }}>
            KPI Trend (Last 6 Months)
          </Text>
          <Text style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
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
        </View>

        <View style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          padding: 16,
          marginBottom: 8,
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 8 }}>
            Operational Notes
          </Text>
          <Text style={{ fontSize: 14, color: '#475569', marginBottom: 4 }}>
            • Staffing levels are stable; no critical gaps.
          </Text>
          <Text style={{ fontSize: 14, color: '#475569', marginBottom: 4 }}>
            • SLA adherence is above 98% for the last quarter.
          </Text>
          <Text style={{ fontSize: 14, color: '#475569' }}>
            • Recommended focus area: proactive risk management to keep churn and
            incident volumes low.
          </Text>
        </View>
      </View>
    </AdminLayout>
  );
};

export default RegionDetailScreen;
