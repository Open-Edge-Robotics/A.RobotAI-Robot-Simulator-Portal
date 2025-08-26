interface DividerProps {
  orientation?: "horizontal" | "vertical";
  color?: string;
  className?: string;
}

export default function Divider({ orientation = "horizontal", className, color = "bg-gray-100" }: DividerProps) {
  const orientationClass = orientation === "horizontal" ? "h-px w-full" : "w-px h-full";
  const styleClass = `${color} ${orientationClass} ${className}`;
  return <div className={styleClass} />;
}
