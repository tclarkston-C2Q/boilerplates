import React, { useState } from "react";
import { Pressable, TextInput, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import {
  User,
  Stethoscope,
  Heart,
  Pill,
  Activity,
  Calendar as CalendarIcon,
} from "lucide-react-native";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  emergencyName: z.string().min(2, "Emergency contact is required"),
  emergencyPhone: z.string().min(5, "Phone is required"),
  doctorName: z.string().optional(),
  caregiverName: z.string().optional(),
  medications: z.string().optional(),
  vitalsNotes: z.string().optional(),
  appointmentNotes: z.string().optional(),
});

type WizardForm = z.infer<typeof schema>;

interface AddPatientWizardProps {
  validationEnabled: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

const steps = [
  { id: 1, name: "Patient Info", icon: User },
  { id: 2, name: "Doctor", icon: Stethoscope },
  { id: 3, name: "Caregiver", icon: Heart },
  { id: 4, name: "Medications", icon: Pill },
  { id: 5, name: "Vital Signs", icon: Activity },
  { id: 6, name: "Appointments", icon: CalendarIcon },
];

export const AddPatientWizard: React.FC<AddPatientWizardProps> = ({
  validationEnabled,
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<WizardForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      emergencyName: "",
      emergencyPhone: "",
      doctorName: "",
      caregiverName: "",
      medications: "",
      vitalsNotes: "",
      appointmentNotes: "",
    },
    resolver: validationEnabled ? zodResolver(schema) : undefined,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const goNext = () => {
    if (validationEnabled) {
      handleSubmit(() => {
        if (currentStep < steps.length) {
          setCurrentStep((s) => s + 1);
        } else {
          onComplete();
        }
      })();
    } else {
      if (currentStep < steps.length) {
        setCurrentStep((s) => s + 1);
      } else {
        onComplete();
      }
    }
  };

  const goBack = () => {
    if (currentStep === 1) {
      onCancel();
    } else {
      setCurrentStep((s) => s - 1);
    }
  };

  const renderField = (
    name: keyof WizardForm,
    label: string,
    placeholder: string,
    multiline = false
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Box className="mb-3">
          <Text className="text-xs text-slate-300 mb-1">{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#1e293b",
              paddingHorizontal: 10,
              paddingVertical: multiline ? 8 : 6,
              color: "#e5e7eb",
              fontSize: 12,
              textAlignVertical: multiline ? "top" : "center",
              backgroundColor: "#020617",
            }}
          />
          {validationEnabled && errors[name] && (
            <Text className="text-[11px] text-rose-400 mt-1">
              {errors[name]?.message as string}
            </Text>
          )}
        </Box>
      )}
    />
  );

  const currentIcon = steps.find((s) => s.id === currentStep)?.icon ?? User;

  return (
    <Box className="flex-1">
      <HStack className="mb-4 items-center justify-between">
        <HStack className="items-center space-x-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const active = step.id === currentStep;
            const completed = step.id < currentStep;
            return (
              <HStack key={step.id} className="items-center">
                <Box
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    active
                      ? "bg-sky-600"
                      : completed
                      ? "bg-emerald-600"
                      : "bg-slate-800"
                  }`}
                >
                  <Icon size={16} color="#f9fafb" />
                </Box>
                {step.id !== steps.length && (
                  <Box className="w-4 h-px bg-slate-700 mx-1" />
                )}
              </HStack>
            );
          })}
        </HStack>
        <Text className="text-xs text-slate-400">
          Step {currentStep} of {steps.length}
        </Text>
      </HStack>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Box className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <HStack className="items-center mb-3">
            {currentIcon &&
              React.createElement(currentIcon, {
                size: 18,
                color: "#38bdf8",
              })}
            <Text className="text-sm font-semibold text-white ml-2">
              {steps[currentStep - 1].name}
            </Text>
          </HStack>

          {currentStep === 1 && (
            <VStack>
              {renderField("firstName", "First Name", "Jane")}
              {renderField("lastName", "Last Name", "Doe")}
              {renderField(
                "emergencyName",
                "Emergency Contact Name",
                "John Doe"
              )}
              {renderField(
                "emergencyPhone",
                "Emergency Contact Phone",
                "+1 (555) 555-1234"
              )}
            </VStack>
          )}

          {currentStep === 2 && (
            <VStack>
              {renderField(
                "doctorName",
                "Primary Doctor",
                "Dr. Smith, Geriatrics"
              )}
            </VStack>
          )}

          {currentStep === 3 && (
            <VStack>
              {renderField(
                "caregiverName",
                "Primary Caregiver",
                "Nurse Caitlyn, Night Shift"
              )}
            </VStack>
          )}

          {currentStep === 4 && (
            <VStack>
              {renderField(
                "medications",
                "Medications",
                "List medications and dosing",
                true
              )}
            </VStack>
          )}

          {currentStep === 5 && (
            <VStack>
              {renderField(
                "vitalsNotes",
                "Initial Vital Signs",
                "BP, HR, RR, SpO2, notes...",
                true
              )}
            </VStack>
          )}

          {currentStep === 6 && (
            <VStack>
              {renderField(
                "appointmentNotes",
                "Appointments",
                "Schedule follow-up visits and consults...",
                true
              )}
            </VStack>
          )}
        </Box>
      </ScrollView>

      <HStack className="mt-4 justify-between">
        <Button
          variant="outline"
          className="border-slate-700"
          onPress={goBack}
        >
          <ButtonText className="text-slate-200">
            {currentStep === 1 ? "Cancel" : "Back"}
          </ButtonText>
        </Button>
        <Button className="bg-sky-600" onPress={goNext}>
          <ButtonText className="text-slate-50">
            {currentStep === steps.length ? "Complete" : "Next"}
          </ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};
