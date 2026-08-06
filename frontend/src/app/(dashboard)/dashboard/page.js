"use client";

import { useEffect, useState } from "react";

import { CheckCircle2, Clock3, FolderKanban, ListTodo } from "lucide-react";

import api from "@/lib/axios";

import PageHeader from "@/components/common/PageHeader";
import Spinner from "@/components/common/Spinner";
import StatsCard from "@/components/dashboard/StatsCard";

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await api.get("/dashboard");

      setDashboard(response.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your workspace."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={dashboard.totalProjects}
          icon={FolderKanban}
          iconBgClass="bg-[var(--color-primary)]"
        />

        <StatsCard
          title="Total Tasks"
          value={dashboard.totalTasks}
          icon={ListTodo}
          iconBgClass="bg-[var(--color-accent)]"
        />

        <StatsCard
          title="Completed Tasks"
          value={dashboard.completedTasks}
          icon={CheckCircle2}
          iconBgClass="bg-[var(--color-success)]"
        />

        <StatsCard
          title="Pending Tasks"
          value={dashboard.pendingTasks}
          icon={Clock3}
          iconBgClass="bg-[var(--color-warning)]"
        />
      </div>
    </>
  );
};

export default DashboardPage;
