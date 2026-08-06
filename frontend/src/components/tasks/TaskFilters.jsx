"use client";

import { SORT_ORDER, TASK_PRIORITY, TASK_STATUS } from "@/config/constants";

import Button from "@/components/common/Button";
import Select from "@/components/common/Select";

const TaskFilters = ({ filters, onFilterChange, onReset }) => {
  const statusOptions = Object.values(TASK_STATUS).map((status) => ({
    value: status,
    label: status
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));

  const priorityOptions = Object.values(TASK_PRIORITY).map((priority) => ({
    value: priority,
    label: priority
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));

  const sortOptions = [
    {
      value: SORT_ORDER.ASC,
      label: "Due Date (Oldest First)",
    },
    {
      value: SORT_ORDER.DESC,
      label: "Due Date (Newest First)",
    },
  ];

  return (
    <div className="mb-6 rounded-[var(--radius-lg)] bg-[var(--color-white)] p-5 shadow-[var(--shadow-md)]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Select
          label="Status"
          placeholder="All Status"
          value={filters.status}
          options={statusOptions}
          onChange={(e) => onFilterChange("status", e.target.value)}
        />

        <Select
          label="Priority"
          placeholder="All Priority"
          value={filters.priority}
          options={priorityOptions}
          onChange={(e) => onFilterChange("priority", e.target.value)}
        />

        <Select
          label="Sort By"
          value={filters.sort}
          options={sortOptions}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        />

        <div className="flex items-end">
          <Button variant="secondary" className="w-full" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
