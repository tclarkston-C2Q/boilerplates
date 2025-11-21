export type PatientStatus = "stable" | "critical" | "observation";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  roomNumber: string;
  primaryDiagnosis: string;
  admissionDate: string;
  status: PatientStatus;
  allergies: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  provider: string;
  date: string;
  time: string;
  type: "Telehealth" | "Follow-up" | "Initial Consult";
  status: "scheduled" | "completed" | "in-progress" | "cancelled";
}

export interface Vital {
  patientId: string;
  timestamp: string;
  status: "stable" | "critical" | "observation";
  notes?: string;
}

export const patients: Patient[] = [
  {
    id: "p1",
    name: "Eleanor Rigby",
    age: 82,
    gender: "F",
    roomNumber: "301A",
    primaryDiagnosis: "Congestive heart failure",
    admissionDate: "2024-10-01",
    status: "critical",
    allergies: ["Penicillin"],
    emergencyContact: {
      name: "Mark Rigby",
      relationship: "Son",
      phone: "+1 (555) 010-0001",
    },
  },
  {
    id: "p2",
    name: "Harold Finch",
    age: 79,
    gender: "M",
    roomNumber: "204B",
    primaryDiagnosis: "Type 2 diabetes, neuropathy",
    admissionDate: "2024-09-15",
    status: "stable",
    allergies: [],
    emergencyContact: {
      name: "Grace Hendricks",
      relationship: "Partner",
      phone: "+1 (555) 010-0002",
    },
  },
  {
    id: "p3",
    name: "Martha Stewart",
    age: 88,
    gender: "F",
    roomNumber: "112C",
    primaryDiagnosis: "COPD, oxygen therapy",
    admissionDate: "2024-11-02",
    status: "observation",
    allergies: ["Latex"],
    emergencyContact: {
      name: "Julie Stewart",
      relationship: "Daughter",
      phone: "+1 (555) 010-0003",
    },
  },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    patientName: "Eleanor Rigby",
    provider: "Dr. Smith (Cardiology)",
    date: "2024-11-14",
    time: "09:00",
    type: "Follow-up",
    status: "scheduled",
  },
  {
    id: "a2",
    patientId: "p2",
    patientName: "Harold Finch",
    provider: "NP Carter",
    date: "2024-11-14",
    time: "10:30",
    type: "Telehealth",
    status: "completed",
  },
  {
    id: "a3",
    patientId: "p3",
    patientName: "Martha Stewart",
    provider: "Dr. Shaw (Pulmonology)",
    date: "2024-11-14",
    time: "13:00",
    type: "Initial Consult",
    status: "in-progress",
  },
];

export const vitals: Vital[] = [
  {
    patientId: "p1",
    timestamp: "2024-11-14T08:30:00Z",
    status: "critical",
    notes: "BP 90/60, HR 110",
  },
  {
    patientId: "p2",
    timestamp: "2024-11-14T07:45:00Z",
    status: "stable",
    notes: "Vitals within normal range",
  },
  {
    patientId: "p3",
    timestamp: "2024-11-14T09:15:00Z",
    status: "observation",
    notes: "Slight desaturation on exertion",
  },
];
