const Spinner = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-gray-300 border-t-[var(--color-primary)]`}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-6">{spinner}</div>;
};

export default Spinner;
