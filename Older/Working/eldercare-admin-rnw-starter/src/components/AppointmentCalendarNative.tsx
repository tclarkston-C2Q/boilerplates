import React, { useState } from "react";
import { ScrollView, Pressable } from "react-native";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { appointments } from "../mockData";

const formatDateLabel = (date: string) => date;

export const AppointmentCalendarNative: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("2024-11-14");

  const dateAppointments = appointments.filter(
    (a) => a.date === selectedDate
  );

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-900 text-emerald-200 border-emerald-700";
      case "in-progress":
        return "bg-slate-900 text-slate-100 border-slate-700";
      case "cancelled":
        return "bg-rose-900 text-rose-200 border-rose-700";
      default:
        return "bg-slate-900 text-slate-200 border-slate-600";
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "Telehealth":
        return "bg-sky-900 text-sky-200 border-sky-700";
      case "Follow-up":
        return "bg-amber-900 text-amber-200 border-amber-700";
      default:
        return "bg-slate-900 text-slate-200 border-slate-700";
    }
  };

  const handlePrevDay = () => {
    console.log("Prev date");
  };
  const handleNextDay = () => {
    console.log("Next date");
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
      <VStack className="space-y-4">
        <HStack className="items-center justify-between">
          <HStack className="items-center space-x-2">
            <Box className="w-9 h-9 rounded-lg bg-sky-900/60 items-center justify-center">
              <CalendarIcon size={18} color="#38bdf8" />
            </Box>
            <VStack>
              <Text className="text-sm font-semibold text-slate-50">
                Appointment Calendar
              </Text>
              <Text className="text-xs text-slate-400">
                {formatDateLabel(selectedDate)}
              </Text>
            </VStack>
          </HStack>

          <HStack className="items-center space-x-2">
            <HStack className="items-center bg-slate-900 rounded-lg border border-slate-800">
              <Pressable
                onPress={handlePrevDay}
                className="px-2 py-1 border-r border-slate-800"
              >
                <ChevronLeft size={14} color="#9ca3af" />
              </Pressable>
              <Pressable
                onPress={handleNextDay}
                className="px-2 py-1 border-l border-slate-800"
              >
                <ChevronRight size={14} color="#9ca3af" />
              </Pressable>
            </HStack>

            <Button className="bg-sky-600">
              <Plus size={14} color="#f9fafb" />
              <ButtonText className="text-xs text-slate-50 ml-1">
                New
              </ButtonText>
            </Button>
          </HStack>
        </HStack>

        <Box className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          {dateAppointments.length === 0 ? (
            <Box className="py-10 items-center justify-center">
              <Text className="text-xs text-slate-400">
                No appointments scheduled for this date.
              </Text>
            </Box>
          ) : (
            <VStack className="space-y-3">
              {dateAppointments.map((appointment) => (
                <HStack
                  key={appointment.id}
                  className="items-center justify-between p-3 rounded-lg border border-slate-800"
                >
                  <HStack className="items-center space-x-3">
                    <Box className="w-10 h-10 rounded-lg bg-sky-900/50 items-center justify-center">
                      <Clock size={18} color="#38bdf8" />
                    </Box>
                    <VStack>
                      <Text className="text-sm text-slate-50">
                        {appointment.patientName}
                      </Text>
                      <Text className="text-[11px] text-slate-400">
                        {appointment.type} – {appointment.time}
                      </Text>
                      <Text className="text-[11px] text-slate-500">
                        {appointment.provider}
                      </Text>
                    </VStack>
                  </HStack>

                  <VStack className="items-end space-y-1">
                    <Box
                      className={`px-2 py-1 rounded-full border ${getStatusBadgeStyle(
                        appointment.status
                      )}`}
                    >
                      <Text className="text-[10px] font-semibold">
                        {appointment.status.toUpperCase()}
                      </Text>
                    </Box>
                    <Box
                      className={`px-2 py-1 rounded-full border ${getTypeBadgeStyle(
                        appointment.type
                      )}`}
                    >
                      <Text className="text-[10px] font-semibold">
                        {appointment.type}
                      </Text>
                    </Box>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </ScrollView>
  );
};
