interface DotProps {
  color: string;
  size?: "sm" | "md";
}

export default function Dot({ color, size = "md" }: DotProps) {
  const dotSize = size === "sm" ? "h-2 w-2" : "h-3 w-3";

  return <div className={`rounded-full ${color} ${dotSize}`} />;
}
