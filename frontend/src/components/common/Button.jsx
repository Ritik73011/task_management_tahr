import clsx from "clsx";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90",

    secondary:
      "bg-[var(--color-surface)] text-[var(--color-dark)] hover:bg-gray-300",

    danger: "bg-red-600 text-white hover:bg-red-700",

    outline:
      "border border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
