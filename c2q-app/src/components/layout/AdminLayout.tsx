// src/components/layout/AdminLayout.tsx
import React from 'react';
import {
  ScrollView,
  useWindowDimensions,
  Pressable,
  View,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';

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

const Sidebar: React.FC<{
  width: number;
  collapsed: boolean;
  onToggle: () => void;
  navigation: NavigationProp<RootStackParamList>;
  currentRoute: keyof RootStackParamList;
}> = ({ width, collapsed, onToggle, navigation, currentRoute }) => (
  <View style={{ width, backgroundColor: '#1e293b', height: '100%', borderRightWidth: 1, borderRightColor: '#334155' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#334155' }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#f1f5f9', display: collapsed ? 'none' : 'flex' }} numberOfLines={1}>Ops Portal</Text>
      <Pressable onPress={onToggle} style={{ padding: 4, borderRadius: 6, backgroundColor: '#334155' }}>
        <Text style={{ fontSize: 14, color: '#f1f5f9' }}>{collapsed ? '▶' : '◀'}</Text>
      </Pressable>
    </View>
    <View style={{ paddingHorizontal: 8, paddingVertical: 12 }}>
      {navItems.map((item) => {
        const isActive = currentRoute === item.key;
        return (
          <Pressable key={item.key} onPress={() => navigation.navigate(item.key as any)} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 12, marginBottom: 4, backgroundColor: isActive ? '#334155' : 'transparent' }}>
            <View style={{ height: 32, width: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: isActive ? '#0ea5e9' : '#334155' }}>
              <Text style={{ fontSize: 14, color: '#f1f5f9', fontWeight: '600' }}>{item.label.charAt(0)}</Text>
            </View>
            {!collapsed && <Text style={{ fontSize: 14, color: isActive ? '#f8fafc' : '#cbd5e1' }}>{item.label}</Text>}
          </Pressable>
        );
      })}
    </View>
  </View>
);

const Header: React.FC<{ isMobile: boolean; title: string; subtitle?: string; onToggle: () => void }> = ({ isMobile, title, subtitle, onToggle }) => (
  <View style={{ backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
    <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {isMobile && (
          <Pressable onPress={onToggle} style={{ marginRight: 8, borderRadius: 6, borderWidth: 1, borderColor: '#e2e8f0', paddingHorizontal: 8, paddingVertical: 4 }}>
            <Text style={{ fontSize: 14, color: '#1e293b' }}>☰</Text>
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#0f172a' }} numberOfLines={1}>{title}</Text>
          {subtitle && <Text style={{ fontSize: 12, color: '#64748b' }} numberOfLines={1}>{subtitle}</Text>}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!isMobile && <TextInput placeholder="Search..." style={{ width: 192, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, marginRight: 16 }} />}
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>TC</Text>
        </View>
      </View>
    </View>
  </View>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ navigation, currentRoute, title, subtitle, children }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [collapsed, setCollapsed] = React.useState(false);
  const sidebarWidth = collapsed ? 64 : 224;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {!isMobile && <Sidebar width={sidebarWidth} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} navigation={navigation} currentRoute={currentRoute} />}
        <View style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
          <Header isMobile={isMobile} title={title} subtitle={subtitle} onToggle={() => setCollapsed(c => !c)} />
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>{children}</ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminLayout;