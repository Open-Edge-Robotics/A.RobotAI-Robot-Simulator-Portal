interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({ orientation = "horizontal", className }: DividerProps) {
  const orientationClass = orientation === "horizontal" ? "h-px w-full" : "w-px h-full";
  const styleClass = `bg-gray-100 ${orientationClass} ${className}`;
  return <div className={styleClass} />;
}
