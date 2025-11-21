import React from "react";
import { useRouter } from "expo-router";
import { DashboardOverview } from "../src/components/DashboardOverview";
import { pathForView, ViewId } from "../src/navigation";

export default function DashboardScreen() {
  const router = useRouter();

  const handleNavigate = (view: ViewId) => {
    router.push(pathForView(view));
  };

  return <DashboardOverview onNavigate={handleNavigate} />;
}
