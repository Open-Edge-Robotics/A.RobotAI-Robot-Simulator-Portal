interface LabelValuePairProps {
  label: string;
  labelWidth?: string;
  labelFontWeight?: "font-bold" | "font-semibold" | "font-medium" | "font-normal";
  value?: string;
  justifyContent?: "justify-normal" | "justify-between" | "justify-center";
  children?: React.ReactNode;
}

export default function LabeledValue({
  label,
  labelWidth = "w-auto",
  labelFontWeight = "font-normal",
  value,
  justifyContent = "justify-normal",
  children,
}: LabelValuePairProps) {
  return (
    <div className={`flex ${justifyContent}`}>
      <span className={`${labelWidth} ${labelFontWeight}`}>{label}</span>
      <span>{value}</span>
      {children}
    </div>
  );
}
