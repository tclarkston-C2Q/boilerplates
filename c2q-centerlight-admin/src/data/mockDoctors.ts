export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  patients: number;
  onCall: boolean;
};

export const mockDoctors: Doctor[] = [
  {
    id: "d-001",
    name: "Dr. Anika Patel",
    specialty: "Geriatrics",
    patients: 22,
    onCall: true,
  },
  {
    id: "d-002",
    name: "Dr. Marcus Chen",
    specialty: "Cardiology",
    patients: 18,
    onCall: false,
  },
  {
    id: "d-003",
    name: "Dr. Sofia Lopez",
    specialty: "Internal Medicine",
    patients: 25,
    onCall: true,
  },
  {
    id: "d-004",
    name: "Dr. Daniel Rivera",
    specialty: "Palliative Care",
    patients: 14,
    onCall: false,
  },
];
