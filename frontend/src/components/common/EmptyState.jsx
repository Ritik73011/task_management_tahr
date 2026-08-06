const EmptyState = ({
  title = "Nothing Found",
  description = "There is no data available.",
}) => {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface)]">
        <span className="text-2xl">📄</span>
      </div>

      <h2 className="text-lg font-semibold text-[var(--color-dark)]">
        {title}
      </h2>

      <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
