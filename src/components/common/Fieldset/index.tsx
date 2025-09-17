interface FieldsetProps {
  className?: string;
  children: React.ReactNode;
}

export default function Fieldset({ className, children }: FieldsetProps) {
  return <fieldset className={className}>{children}</fieldset>;
}
