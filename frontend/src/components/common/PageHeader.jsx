import Button from "./Button";

const PageHeader = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-dark)]">{title}</h1>

        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
      </div>

      {buttonText && <Button onClick={onButtonClick}>{buttonText}</Button>}
    </div>
  );
};

export default PageHeader;
