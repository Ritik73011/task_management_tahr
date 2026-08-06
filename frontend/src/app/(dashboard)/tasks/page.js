"use client";

import { useEffect, useState } from "react";

import { DEFAULT_LIMIT, SORT_ORDER } from "@/config/constants";

import api from "@/lib/axios";
import { successToast } from "@/lib/toast";

import Modal from "@/components/common/Modal";
import PageHeader from "@/components/common/PageHeader";

import TaskFilters from "@/components/tasks/TaskFilters";
import TaskForm from "@/components/tasks/TaskForm";
import TaskTable from "@/components/tasks/TaskTable";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sort: SORT_ORDER.ASC,
  });

  const fetchProjects = async () => {
    const response = await api.get("/projects", {
      params: {
        page: 1,
        limit: 100,
      },
    });

    setProjects(response.data.data.projects);
  };

  const fetchTasks = async (currentPage = page, currentFilters = filters) => {
    try {
      setLoading(true);

      const response = await api.get("/tasks", {
        params: {
          page: currentPage,
          limit: DEFAULT_LIMIT,
          status: currentFilters.status || undefined,
          priority: currentFilters.priority || undefined,
          sort: currentFilters.sort || undefined,
        },
      });

      const { tasks, pagination } = response.data.data;

      setTasks(tasks);
      setPage(pagination.page);
      setTotalPages(pagination.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks(page, filters);
  }, [page, filters]);
  const openCreateModal = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);

      if (selectedTask) {
        await api.put(`/tasks/${selectedTask.task_id}`, data);

        successToast("Task updated successfully.");
      } else {
        await api.post("/tasks", data);

        successToast("Task created successfully.");
      }

      closeModal();

      await fetchTasks(page, filters);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`,
    );

    if (!confirmed) return;

    await api.delete(`/tasks/${task.task_id}`);

    successToast("Task deleted successfully.");

    if (tasks.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    } else {
      await fetchTasks(page, filters);
    }
  };

  const handleFilterChange = (key, value) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setPage(1);

    setFilters({
      status: "",
      priority: "",
      sort: SORT_ORDER.ASC,
    });
  };

  return (
    <>
      <PageHeader
        title="Tasks"
        subtitle="Manage all your tasks from one place."
        buttonText="Create Task"
        onButtonClick={openCreateModal}
      />

      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <TaskTable
        tasks={tasks}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        title={selectedTask ? "Update Task" : "Create Task"}
        onClose={closeModal}
      >
        <TaskForm
          initialValues={selectedTask}
          projects={projects}
          loading={formLoading}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default TasksPage;
