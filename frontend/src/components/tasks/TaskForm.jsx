"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { TASK_PRIORITY, TASK_STATUS } from "@/config/constants";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  status: z.enum(Object.values(TASK_STATUS)),

  priority: z.enum(Object.values(TASK_PRIORITY)),

  due_date: z.string().min(1, "Due date is required."),

  project_id: z.coerce.number().positive("Please select a project."),
});

const statusOptions = Object.values(TASK_STATUS).map((status) => ({
  value: status,
  label: status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()),
}));

const priorityOptions = Object.values(TASK_PRIORITY).map((priority) => ({
  value: priority,
  label: priority
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()),
}));

const defaultValues = {
  title: "",
  description: "",
  status: TASK_STATUS.TODO,
  priority: TASK_PRIORITY.MEDIUM,
  due_date: "",
  project_id: "",
};

const TaskForm = ({
  initialValues,
  projects = [],
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        status: initialValues.status ?? TASK_STATUS.TODO,
        priority: initialValues.priority ?? TASK_PRIORITY.MEDIUM,
        due_date: initialValues.due_date
          ? initialValues.due_date.slice(0, 10)
          : "",
        project_id:
          initialValues.project_id ?? initialValues.project?.project_id ?? "",
      });
    } else {
      reset(defaultValues);
    }
  }, [initialValues, reset]);

  const projectOptions = projects.map((project) => ({
    value: project.project_id,
    label: project.name,
  }));

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      project_id: Number(data.project_id),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <Input
        label="Task Title"
        placeholder="Enter task title"
        error={errors.title?.message}
        {...register("title")}
      />

      <Textarea
        label="Description"
        rows={4}
        placeholder="Enter task description"
        error={errors.description?.message}
        {...register("description")}
      />

      <Select
        label="Project"
        options={projectOptions}
        value={watch("project_id")}
        error={errors.project_id?.message}
        onChange={(e) =>
          setValue("project_id", Number(e.target.value), {
            shouldValidate: true,
          })
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Select
          label="Status"
          options={statusOptions}
          value={watch("status")}
          error={errors.status?.message}
          onChange={(e) =>
            setValue("status", e.target.value, {
              shouldValidate: true,
            })
          }
        />

        <Select
          label="Priority"
          options={priorityOptions}
          value={watch("priority")}
          error={errors.priority?.message}
          onChange={(e) =>
            setValue("priority", e.target.value, {
              shouldValidate: true,
            })
          }
        />
      </div>

      <Input
        label="Due Date"
        type="date"
        error={errors.due_date?.message}
        {...register("due_date")}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {initialValues ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
