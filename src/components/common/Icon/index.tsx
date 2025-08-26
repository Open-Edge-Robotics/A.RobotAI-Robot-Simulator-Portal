interface IconProps {
  name: string;
  fill?: boolean;
  size?: string;
  className?: string;
}

export default function Icon({ name, fill = false, size, className }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${fill ? "1" : "0"}`, fontSize: size }}
    >
      {name}
    </span>
  );
}
