import React, { useState } from "react";
import { PatientList } from "../../src/components/PatientList";
import { PatientDetails } from "../../src/components/PatientDetails";
import { PatientId } from "../../src/types";

export default function PatientsScreen() {
  const [selectedPatientId, setSelectedPatientId] = useState<PatientId>(null);

  if (selectedPatientId) {
    return (
      <PatientDetails
        patientId={selectedPatientId}
        onBack={() => setSelectedPatientId(null)}
      />
    );
  }

  return (
    <PatientList
      onSelectPatient={(id) => setSelectedPatientId(id)}
      onOpenAddPatient={() => {
        // Modal is controlled at layout level via header/sidebar.
      }}
    />
  );
}
