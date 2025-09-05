interface LabeledValueProps {
  orientation?: "horizontal" | "vertical";
  label: string;
  value?: string;
  labelClass?: string;
  valueClass?: string;
  containerClass?: string;
  children?: React.ReactNode;
}

export default function LabeledValue({
  orientation = "horizontal",
  label,
  value,
  labelClass,
  valueClass,
  containerClass,
  children,
}: LabeledValueProps) {
  return (
    <div className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} ${containerClass}`}>
      <div className={labelClass}>{label}</div>
      <div className={valueClass}>{value}</div>
      {children}
    </div>
  );
}

export function CustomVerticalLabeledValue({ label, value }: LabeledValueProps) {
  return (
    <LabeledValue
      orientation="vertical"
      label={label}
      value={value}
      labelClass="mb-1 text-sm text-gray-500"
      valueClass="font-semibold"
    />
  );
}
