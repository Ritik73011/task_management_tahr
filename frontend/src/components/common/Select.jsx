import clsx from "clsx";

const Select = ({
  label,
  error,
  options = [],
  placeholder = "Select an option",
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[var(--color-dark)]">
          {label}
        </label>
      )}

      <select
        className={clsx(
          "h-11 rounded-xl border border-gray-300 bg-white px-4",
          "text-sm text-[var(--color-dark)]",
          "transition-all duration-200",
          "focus:border-[var(--color-primary)]",
          "focus:outline-none",
          "focus:ring-2 focus:ring-[var(--color-primary)]/20",
          error && "border-red-500",
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
