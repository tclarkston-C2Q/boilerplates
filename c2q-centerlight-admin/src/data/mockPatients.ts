export type Patient = {
  id: string;
  name: string;
  age: number;
  room: string;
  riskLevel: "Low" | "Medium" | "High";
  primaryDoctor: string;
  status: "Stable" | "Under Observation" | "Critical";
};

export const mockPatients: Patient[] = [
  {
    id: "p-001",
    name: "Eleanor Thompson",
    age: 82,
    room: "A-104",
    riskLevel: "High",
    primaryDoctor: "Dr. Patel",
    status: "Under Observation",
  },
  {
    id: "p-002",
    name: "George Anderson",
    age: 78,
    room: "B-207",
    riskLevel: "Medium",
    primaryDoctor: "Dr. Chen",
    status: "Stable",
  },
  {
    id: "p-003",
    name: "Lillian Brooks",
    age: 89,
    room: "C-312",
    riskLevel: "High",
    primaryDoctor: "Dr. Lopez",
    status: "Critical",
  },
  {
    id: "p-004",
    name: "Samuel Harris",
    age: 76,
    room: "A-118",
    riskLevel: "Low",
    primaryDoctor: "Dr. Patel",
    status: "Stable",
  },
];
