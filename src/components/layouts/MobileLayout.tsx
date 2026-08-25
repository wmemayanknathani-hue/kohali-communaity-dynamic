import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { BottomNav } from "../BottomNav";
import { Sidebar } from "../Sidebar";

export function MobileLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col pb-16">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}