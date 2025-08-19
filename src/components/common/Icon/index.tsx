interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
  size?: string;
}

export default function Icon({ name, className, fill = false, size }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${fill ? "1" : "0"}`, fontSize: size }}
    >
      {name}
    </span>
  );
}
