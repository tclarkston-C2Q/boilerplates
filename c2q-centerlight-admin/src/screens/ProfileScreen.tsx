import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  InputField,
  Button,
  ButtonText,
  Avatar,
  AvatarImage,
} from "@gluestack-ui/themed";

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState("Care Supervisor");
  const [email, setEmail] = useState("supervisor@c2q-centerlight.health");
  const [role, setRole] = useState("Elderly Care Coordinator");

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 16 }}
      className="flex-1"
    >
      <Box className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
        <HStack className="items-center mb-4">
          <Avatar className="h-12 w-12 mr-3 border border-c2q-primary">
            <AvatarImage
              alt="Profile"
              source={{
                uri: "https://ui-avatars.com/api/?name=C2Q&background=1d4ed8&color=ffffff",
              }}
            />
          </Avatar>
          <VStack>
            <Text className="text-slate-100 font-semibold text-sm">
              {name}
            </Text>
            <Text className="text-[11px] text-slate-400">
              {role}
            </Text>
          </VStack>
        </HStack>

        <VStack className="space-y-3">
          <Field label="Full Name">
            <Input size="md" className="bg-slate-950 border-slate-700">
              <InputField
                value={name}
                onChangeText={setName}
                className="text-slate-100 text-xs"
                placeholder="Enter full name"
              />
            </Input>
          </Field>

          <Field label="Email">
            <Input size="md" className="bg-slate-950 border-slate-700">
              <InputField
                value={email}
                onChangeText={setEmail}
                className="text-slate-100 text-xs"
                placeholder="Enter email"
                keyboardType="email-address"
              />
            </Input>
          </Field>

          <Field label="Role">
            <Input size="md" className="bg-slate-950 border-slate-700">
              <InputField
                value={role}
                onChangeText={setRole}
                className="text-slate-100 text-xs"
                placeholder="Enter role"
              />
            </Input>
          </Field>

          <HStack className="mt-2 space-x-3">
            <Button
              size="sm"
              className="bg-c2q-primary px-4"
              variant="solid"
            >
              <ButtonText className="text-xs text-white">
                Save Changes
              </ButtonText>
            </Button>
            <Button
              size="sm"
              className="border border-slate-600 bg-transparent px-4"
              variant="outline"
            >
              <ButtonText className="text-xs text-slate-200">
                Cancel
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  );
};

const Field: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <VStack className="space-y-1">
    <Text className="text-[11px] text-slate-400 uppercase">
      {label}
    </Text>
    {children}
  </VStack>
);

export default ProfileScreen;
