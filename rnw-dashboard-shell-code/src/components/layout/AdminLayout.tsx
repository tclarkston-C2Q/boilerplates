import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Input,
  InputField,
  Avatar,
  AvatarFallbackText,
} from '@gluestack-ui/themed';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../../App';

type AdminLayoutProps = {
  navigation: NavigationProp<RootStackParamList>;
  currentRoute: keyof RootStackParamList;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems: { key: keyof RootStackParamList; label: string }[] = [
  { key: 'Dashboard', label: 'Dashboard' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({
  navigation,
  currentRoute,
  title,
  subtitle,
  children,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [collapsed, setCollapsed] = React.useState(false);

  const sidebarWidth = collapsed ? 64 : 224;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <HStack className="flex-1">
        {!isMobile && (
          <Box
            className="bg-slate-900 h-full border-r border-slate-800"
            style={{ width: sidebarWidth }}
          >
            <HStack
              className="items-center justify-between px-3 py-4 border-b border-slate-800"
            >
              <Text
                size="sm"
                className={`font-semibold text-slate-100 ${
                  collapsed ? 'hidden' : 'block'
                }`}
                numberOfLines={1}
              >
                Ops Portal
              </Text>
              <Pressable
                onPress={() => setCollapsed((c) => !c)}
                className="p-1 rounded-md bg-slate-800"
              >
                <Text size="sm" className="text-slate-100">
                  {collapsed ? '▶' : '◀'}
                </Text>
              </Pressable>
            </HStack>

            <VStack className="px-2 py-3" space="xs">
              {navItems.map((item) => {
                const isActive = currentRoute === item.key;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => navigation.navigate(item.key)}
                    className={`flex-row items-center px-2 py-2 rounded-xl mb-1 ${
                      isActive ? 'bg-slate-800' : 'bg-transparent'
                    }`}
                  >
                    <Box
                      className={`h-8 w-8 rounded-full items-center justify-center mr-2 ${
                        isActive ? 'bg-sky-500' : 'bg-slate-800'
                      }`}
                    >
                      <Text
                        size="sm"
                        className="text-slate-100 font-semibold"
                      >
                        {item.label.charAt(0)}
                      </Text>
                    </Box>
                    {!collapsed && (
                      <Text
                        size="sm"
                        className={`${
                          isActive ? 'text-slate-50' : 'text-slate-300'
                        }`}
                      >
                        {item.label}
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </VStack>
          </Box>
        )}

        <VStack className="flex-1 bg-slate-100">
          <Box className="bg-white border-b border-slate-200">
            <HStack
              className="px-4 py-3 items-center justify-between"
              space="md"
            >
              <HStack space="md" className="items-center flex-1">
                {isMobile && (
                  <Pressable
                    onPress={() => setCollapsed((c) => !c)}
                    className="mr-2 rounded-md border border-slate-200 px-2 py-1"
                  >
                    <Text size="sm" className="text-slate-800">
                      ☰
                    </Text>
                  </Pressable>
                )}
                <VStack className="flex-1">
                  <Heading size="md" className="text-slate-900" numberOfLines={1}>
                    {title}
                  </Heading>
                  {subtitle && (
                    <Text size="xs" className="text-slate-500" numberOfLines={1}>
                      {subtitle}
                    </Text>
                  )}
                </VStack>
              </HStack>

              <HStack space="md" className="items-center">
                <Box className="hidden md:flex">
                  <Input
                    className="w-48 bg-slate-50 border-slate-200"
                    size="sm"
                  >
                    <InputField placeholder="Search..." />
                  </Input>
                </Box>
                <Avatar size="md">
                  <AvatarFallbackText>TC</AvatarFallbackText>
                </Avatar>
              </HStack>
            </HStack>
          </Box>

          <Box className="flex-1">
            <ScrollView
              contentContainerStyle={{
                padding: 16,
                paddingBottom: 24,
              }}
            >
              {children}
            </ScrollView>
          </Box>
        </VStack>
      </HStack>
    </SafeAreaView>
  );
};

export default AdminLayout;
