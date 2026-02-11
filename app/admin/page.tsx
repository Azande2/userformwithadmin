import React from 'react';
import { AdminDashboard } from "@/components/admin-dashboard";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Admin Dashboard | Ringomode HSE",
  description: "Review and manage HSE inspection submissions.",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader role="admin" />
      <AdminDashboard />
    </div>
  );
}