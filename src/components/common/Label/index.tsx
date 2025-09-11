interface LabelProps {
  label?: string;
  required?: boolean;
  fontSize?: string;
  marginBottom?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}

export default function Label({
  label,
  fontSize = "text-sm",
  marginBottom = "mb-2",
  required = false,
  htmlFor,
  children,
}: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`${marginBottom} block ${fontSize} font-semibold text-gray-700`}>
      {label} {required && <span className="text-red-500">*</span>}
      {children}
    </label>
  );
}
