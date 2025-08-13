interface LabelProps {
  label: string;
  required?: boolean;
  fontSize?: string;
  marginBottom?: string;
}

export default function Label({ label, fontSize = "text-sm", marginBottom = "mb-2", required = false }: LabelProps) {
  return (
    <label className={`${marginBottom} block ${fontSize} font-semibold text-gray-700`}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
