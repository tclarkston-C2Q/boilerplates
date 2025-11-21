import React from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";

const Team: React.FC = () => (
  <ScrollView className="flex-1">
    <Box className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <Text className="text-sm font-semibold text-white mb-1">
        Care Team
      </Text>
      <Text className="text-xs text-slate-400">
        Placeholder – extend with staff directory and scheduling.
      </Text>
    </Box>
  </ScrollView>
);

export default Team;
