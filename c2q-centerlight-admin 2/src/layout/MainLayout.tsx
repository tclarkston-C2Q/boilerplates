import React, { useState, useMemo, useCallback } from "react";
import { View } from "react-native";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import type { AppRoute } from "../../App";
import DashboardScreen from "../screens/DashboardScreen";
import PatientsScreen from "../screens/PatientsScreen";
import DoctorsScreen from "../screens/DoctorsScreen";
import PatientVitalsScreen from "../screens/PatientVitalsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const MainLayout: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((c) => !c);
  }, []);

  const title = useMemo(() => {
    switch (route) {
      case "dashboard":
        return "Operations Dashboard";
      case "patients":
        return "Patients";
      case "doctors":
        return "Doctors";
      case "vitals":
        return "Patient Vitals";
      case "profile":
        return "Profile Settings";
      default:
        return "c2q Centerlight Health";
    }
  }, [route]);

  const renderContent = () => {
    switch (route) {
      case "dashboard":
        return <DashboardScreen />;
      case "patients":
        return <PatientsScreen />;
      case "doctors":
        return <DoctorsScreen />;
      case "vitals":
        return <PatientVitalsScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View className="flex-1 flex-row bg-c2q-background">
      <Sidebar
        activeRoute={route}
        onRouteChange={setRoute}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebar}
      />
      <View className="flex-1 flex-col">
        <Header title={title} onProfilePress={() => setRoute("profile")} />
        <View className="flex-1 px-4 py-2">{renderContent()}</View>
        <Footer />
      </View>
    </View>
  );
};

export default MainLayout;
