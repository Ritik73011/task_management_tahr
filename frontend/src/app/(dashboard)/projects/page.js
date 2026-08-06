"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";
import { successToast } from "@/lib/toast";

import Modal from "@/components/common/Modal";
import PageHeader from "@/components/common/PageHeader";

import ProjectForm from "@/components/projects/ProjectForm";
import ProjectTable from "@/components/projects/ProjectTable";

const LIMIT = 10;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formLoading, setFormLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async (currentPage = page) => {
    try {
      setLoading(true);

      const response = await api.get("/projects", {
        params: {
          page: currentPage,
          limit: LIMIT,
        },
      });

      const { projects, pagination } = response.data.data;

      setProjects(projects);
      setPage(pagination.page);
      setTotalPages(pagination.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  const openCreateModal = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);

      if (selectedProject) {
        await api.put(`/projects/${selectedProject.project_id}`, data);

        successToast("Project updated successfully.");
      } else {
        await api.post("/projects", data);

        successToast("Project created successfully.");
      }

      closeModal();

      await fetchProjects(page);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`,
    );

    if (!confirmed) return;

    await api.delete(`/projects/${project.project_id}`);

    successToast("Project deleted successfully.");

    if (projects.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    } else {
      await fetchProjects(page);
    }
  };

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Manage all your projects from one place."
        buttonText="Create Project"
        onButtonClick={openCreateModal}
      />

      <ProjectTable
        projects={projects}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalOpen}
        title={selectedProject ? "Update Project" : "Create Project"}
        onClose={closeModal}
      >
        <ProjectForm
          initialValues={selectedProject}
          loading={formLoading}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default ProjectsPage;
