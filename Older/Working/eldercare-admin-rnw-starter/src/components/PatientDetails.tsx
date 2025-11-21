import React from "react";
import { ScrollView, Pressable } from "react-native";
import { Box, Text, HStack, VStack } from "@gluestack-ui/themed";
import { patients } from "../mockData";
import { ArrowLeft } from "lucide-react-native";

interface PatientDetailsProps {
  patientId: string | null;
  onBack: () => void;
}

export const PatientDetails: React.FC<PatientDetailsProps> = ({
  patientId,
  onBack,
}) => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Text className="text-slate-400 text-sm">Patient not found.</Text>
      </Box>
    );
  }

  return (
    <ScrollView className="flex-1">
      <Box className="mb-4">
        <Pressable onPress={onBack} className="flex-row items-center mb-3">
          <ArrowLeft size={16} color="#9ca3af" />
          <Text className="text-xs text-slate-400 ml-1">
            Back to patient list
          </Text>
        </Pressable>

        <Text className="text-lg font-semibold text-white">
          {patient.name}
        </Text>
        <Text className="text-xs text-slate-400 mt-1">
          Room {patient.roomNumber} • {patient.age}y • {patient.gender}
        </Text>
      </Box>

      <HStack className="space-x-4 mb-4">
        <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
          <Text className="text-xs text-slate-400 mb-2">Clinical</Text>
          <Text className="text-sm text-slate-200">
            {patient.primaryDiagnosis}
          </Text>
          <Text className="text-[11px] text-slate-400 mt-2">
            Admitted: {patient.admissionDate}
          </Text>
        </Box>

        <Box className="flex-1 bg-slate-900 rounded-xl p-4 border border-slate-800">
          <Text className="text-xs text-slate-400 mb-2">
            Emergency Contact
          </Text>
          <Text className="text-sm text-slate-200">
            {patient.emergencyContact.name}
          </Text>
          <Text className="text-xs text-slate-400">
            {patient.emergencyContact.relationship}
          </Text>
          <Text className="text-xs text-slate-300 mt-1">
            {patient.emergencyContact.phone}
          </Text>
        </Box>
      </HStack>

      <Box className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <Text className="text-xs text-slate-400 mb-2">Allergies</Text>
        {patient.allergies.length === 0 ? (
          <Text className="text-xs text-slate-400">
            No allergies recorded.
          </Text>
        ) : (
          <HStack className="flex-wrap">
            {patient.allergies.map((a) => (
              <Box
                key={a}
                className="bg-slate-800 px-2 py-1 rounded-full mr-2 mb-2"
              >
                <Text className="text-[11px] text-slate-100">{a}</Text>
              </Box>
            ))}
          </HStack>
        )}
      </Box>
    </ScrollView>
  );
};
