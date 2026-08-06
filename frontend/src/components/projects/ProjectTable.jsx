"use client";

import { Pencil, Trash2 } from "lucide-react";

import Button from "@/components/common/Button";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";

const statusClasses = {
  ACTIVE: "bg-[var(--color-primary)] text-[var(--color-white)]",

  COMPLETED: "bg-[var(--color-success)] text-[var(--color-white)]",

  ARCHIVED: "bg-[var(--color-accent)] text-[var(--color-white)]",
};

const ProjectTable = ({
  projects = [],
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (!projects.length) {
    return (
      <EmptyState
        title="No Projects Found"
        description="Create your first project to get started."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-white)] shadow-[var(--shadow-md)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-dark)]">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-dark)]">
                Description
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project.project_id}
                className="border-t border-[var(--color-border)] transition hover:bg-[var(--color-background)]"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-[var(--color-dark)]">
                    {project.name}
                  </p>
                </td>

                <td className="max-w-sm px-6 py-4">
                  <p className="line-clamp-2 text-sm text-[var(--color-muted)]">
                    {project.description || "-"}
                  </p>
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusClasses[project.status]
                    }`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-sm text-[var(--color-muted)]">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(project)}
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(project)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[var(--color-border)] p-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProjectTable;
