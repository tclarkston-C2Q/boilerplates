import React from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

const Medications: React.FC = () => (
  <ScrollView className="flex-1">
    <Box className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <Text className="text-sm font-semibold text-white mb-1">
        Medications
      </Text>
      <Text className="text-xs text-slate-400">
        Placeholder – extend with medication management views.
      </Text>
    </Box>
  </ScrollView>
);

export default Medications;
