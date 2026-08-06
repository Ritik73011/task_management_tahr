"use client";

import { Pencil, Trash2 } from "lucide-react";

import Button from "@/components/common/Button";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import Spinner from "@/components/common/Spinner";

const statusClasses = {
  TODO: "bg-[var(--color-surface)] text-[var(--color-dark)]",

  IN_PROGRESS: "bg-[var(--color-warning)] text-[var(--color-white)]",

  COMPLETED: "bg-[var(--color-success)] text-[var(--color-white)]",
};

const priorityClasses = {
  LOW: "bg-[var(--color-surface)] text-[var(--color-dark)]",

  MEDIUM: "bg-[var(--color-accent)] text-[var(--color-white)]",

  HIGH: "bg-[var(--color-danger)] text-[var(--color-white)]",
};

const TaskTable = ({
  tasks = [],
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

  if (!tasks.length) {
    return (
      <EmptyState
        title="No Tasks Found"
        description="Create your first task to get started."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-white)] shadow-[var(--shadow-md)]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-dark)]">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-dark)]">
                Project
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Priority
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Due Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--color-dark)]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.task_id}
                className="border-t border-[var(--color-surface)] transition hover:bg-[var(--color-background)]"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-[var(--color-dark)]">
                      {task.title}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm text-[var(--color-neutral)]">
                      {task.description || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-[var(--color-dark)]">
                  {task.project?.name}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      statusClasses[task.status]
                    }`}
                  >
                    {task.status.replaceAll("_", " ")}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      priorityClasses[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="px-6 py-4 text-center text-sm text-[var(--color-dark)]">
                  {new Date(task.due_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(task)}
                    >
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(task)}
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

      <div className="border-t border-[var(--color-surface)] p-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TaskTable;
