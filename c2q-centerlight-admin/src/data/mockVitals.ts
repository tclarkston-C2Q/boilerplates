export type VitalSnapshot = {
  timestampLabel: string;
  heartRate: number;
  systolic: number;
  diastolic: number;
  spo2: number;
};

export const mockVitalTrend: VitalSnapshot[] = [
  { timestampLabel: "Mon", heartRate: 72, systolic: 124, diastolic: 78, spo2: 97 },
  { timestampLabel: "Tue", heartRate: 75, systolic: 126, diastolic: 80, spo2: 96 },
  { timestampLabel: "Wed", heartRate: 70, systolic: 122, diastolic: 76, spo2: 98 },
  { timestampLabel: "Thu", heartRate: 78, systolic: 130, diastolic: 82, spo2: 95 },
  { timestampLabel: "Fri", heartRate: 74, systolic: 125, diastolic: 79, spo2: 97 },
  { timestampLabel: "Sat", heartRate: 73, systolic: 123, diastolic: 77, spo2: 98 },
  { timestampLabel: "Sun", heartRate: 76, systolic: 128, diastolic: 81, spo2: 96 },
];
