import React from "react";
import { Pressable } from "react-native";
import {
  Box,
  HStack,
  Text,
  Input,
  InputField,
  Avatar,
  AvatarImage,
} from "@gluestack-ui/themed";

type Props = {
  title: string;
  onProfilePress: () => void;
};

const Header: React.FC<Props> = ({ title, onProfilePress }) => {
  return (
    <Box className="border-b border-slate-800 bg-slate-950">
      <HStack className="items-center px-4 py-3 space-x-3">
        <Box className="mr-2">
          <Text className="text-slate-100 font-semibold text-lg">
            c2q Centerlight Health
          </Text>
          <Text className="text-xs text-slate-400">
            Elderly Care Operations Console
          </Text>
        </Box>
        <Text className="flex-1 ml-4 text-slate-200 text-sm font-medium">
          {title}
        </Text>
        <Box className="w-52 mr-3">
          <Input
            size="md"
            className="bg-slate-900 border-slate-700 rounded-lg"
          >
            <InputField
              placeholder="Search patients, doctors..."
              placeholderTextColor="#64748b"
              className="text-slate-100 text-xs"
            />
          </Input>
        </Box>
        <Pressable
          onPress={onProfilePress}
          accessibilityRole="button"
          className="flex-row items-center"
        >
          <Avatar className="h-9 w-9 mr-2 border border-c2q-primary">
            <AvatarImage
              alt="Profile"
              source={{
                uri: "https://ui-avatars.com/api/?name=C2Q&background=0f766e&color=ffffff",
              }}
            />
          </Avatar>
          <Box>
            <Text className="text-slate-100 text-xs font-medium">
              Care Supervisor
            </Text>
            <Text className="text-slate-400 text-[10px]">
              Profile & Settings
            </Text>
          </Box>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Header;
