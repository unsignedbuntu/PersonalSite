// src/app/admin/dashboard/page.tsx
'use client';
import { AuthProvider, withAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';

function ProtectedDashboard() {
  return <AdminDashboard />;
}

const ProtectedDashboardWithAuth = withAuth(ProtectedDashboard);

export default function DashboardPage() {
  return (
    <AuthProvider>
      <ProtectedDashboardWithAuth />
    </AuthProvider>
  );
}
