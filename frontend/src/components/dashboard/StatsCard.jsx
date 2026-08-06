"use client";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconBgClass = "bg-[var(--color-primary)]",
}) => {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-white)] p-6 shadow-[var(--shadow-md)] transition-[var(--transition)] hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-neutral)]">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[var(--color-dark)]">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBgClass}`}
        >
          {Icon && <Icon size={28} className="text-[var(--color-white)]" />}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
