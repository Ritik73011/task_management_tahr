"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PROJECT_STATUS } from "@/config/constants";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";

const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters.")
    .max(100, "Project name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  status: z.enum(Object.values(PROJECT_STATUS)),
});

const statusOptions = Object.values(PROJECT_STATUS).map((status) => ({
  value: status,
  label: status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()),
}));

const defaultValues = {
  name: "",
  description: "",
  status: PROJECT_STATUS.ACTIVE,
};

const ProjectForm = ({
  initialValues,
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
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name ?? "",
        description: initialValues.description ?? "",
        status: initialValues.status ?? PROJECT_STATUS.ACTIVE,
      });
    } else {
      reset(defaultValues);
    }
  }, [initialValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <Input
        label="Project Name"
        placeholder="Enter project name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Textarea
        label="Description"
        rows={5}
        placeholder="Enter project description"
        error={errors.description?.message}
        {...register("description")}
      />

      <Select
        label="Status"
        options={statusOptions}
        value={watch("status")}
        error={errors.status?.message}
        onChange={(e) => setValue("status", e.target.value)}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" loading={loading}>
          {initialValues ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
