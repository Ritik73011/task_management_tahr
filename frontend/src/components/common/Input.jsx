import clsx from "clsx";

const Input = ({ label, error, className = "", rightElement, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[var(--color-dark)]">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className={clsx(
            "h-11 w-full rounded-[var(--radius-md)]",
            "border border-[var(--color-border)]",
            "bg-[var(--color-white)]",
            "px-4",
            rightElement && "pr-12",
            "text-sm text-[var(--color-dark)]",
            "placeholder:text-[var(--color-placeholder)]",
            "transition-[var(--transition)]",
            "focus:border-[var(--color-primary)]",
            "focus:outline-none",
            "focus:ring-2 focus:ring-[var(--color-primary)]/20",
            error && "border-[var(--color-danger)]",
            className,
          )}
          {...props}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
    </div>
  );
};

export default Input;
