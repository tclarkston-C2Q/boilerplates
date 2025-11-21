import React, { useMemo, useState } from "react";
import { ScrollView, TextInput, Pressable } from "react-native";
import { Box, Text, HStack, VStack } from "@gluestack-ui/themed";
import { Search, Filter, UserPlus } from "lucide-react-native";
import { patients } from "../mockData";

interface PatientListProps {
  onSelectPatient: (id: string) => void;
  onOpenAddPatient: () => void;
}

export const PatientList: React.FC<PatientListProps> = ({
  onSelectPatient,
  onOpenAddPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | string>("all");

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <Box className="flex-1">
      <HStack className="mb-4 items-center justify-between">
        <HStack className="items-center flex-1 mr-3">
          <Box className="flex-row items-center bg-slate-900 rounded-lg px-3 py-2 border border-slate-800 flex-1">
            <Search size={16} color="#9ca3af" />
            <TextInput
              placeholder="Search by name or room..."
              placeholderTextColor="#6b7280"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={{
                flex: 1,
                marginLeft: 8,
                color: "#e5e7eb",
                fontSize: 12,
              }}
            />
          </Box>
        </HStack>

        <Pressable
          onPress={() =>
            setStatusFilter((prev) => (prev === "all" ? "critical" : "all"))
          }
          className="flex-row items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 mr-3"
        >
          <Filter size={16} color="#9ca3af" />
          <Text className="text-xs text-slate-300 ml-2">
            {statusFilter === "all" ? "All statuses" : "Critical only"}
          </Text>
        </Pressable>

        <Pressable
          onPress={onOpenAddPatient}
          className="bg-sky-600 rounded-lg px-3 py-2 flex-row items-center"
        >
          <UserPlus size={16} color="#fff" />
          <Text className="text-xs text-white ml-2">Add</Text>
        </Pressable>
      </HStack>

      <ScrollView className="flex-1">
        <VStack className="space-y-3">
          {filteredPatients.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => onSelectPatient(p.id)}
              className="bg-slate-900 rounded-xl px-4 py-3 border border-slate-800"
            >
              <HStack className="justify-between items-center">
                <VStack>
                  <Text className="text-sm font-semibold text-white">
                    {p.name}
                  </Text>
                  <Text className="text-xs text-slate-400">
                    Room {p.roomNumber} • {p.age}y • {p.gender}
                  </Text>
                  <Text className="text-[11px] text-slate-500 mt-1">
                    Dx: {p.primaryDiagnosis}
                  </Text>
                </VStack>
                <Box
                  className={`px-2 py-1 rounded-full ${
                    p.status === "critical"
                      ? "bg-amber-900/60"
                      : p.status === "stable"
                      ? "bg-emerald-900/60"
                      : "bg-slate-800"
                  }`}
                >
                  <Text
                    className={`text-[11px] font-semibold ${
                      p.status === "critical"
                        ? "text-amber-400"
                        : p.status === "stable"
                        ? "text-emerald-400"
                        : "text-slate-200"
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </Text>
                </Box>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};
