import clsx from "clsx";

const Textarea = ({ label, error, rows = 4, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[var(--color-dark)]">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={clsx(
          "rounded-xl border border-gray-300 bg-white p-4",
          "text-sm text-[var(--color-dark)]",
          "placeholder:text-gray-400",
          "transition-all duration-200",
          "focus:border-[var(--color-primary)]",
          "focus:outline-none",
          "focus:ring-2 focus:ring-[var(--color-primary)]/20",
          "resize-none",
          error && "border-red-500",
          className,
        )}
        {...props}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
