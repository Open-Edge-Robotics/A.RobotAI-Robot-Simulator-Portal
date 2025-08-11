interface ContainerProps {
  alignItems?: string;
  bgColor?: string;
  borderColor?: string;
  flexDirection?: "flex-col" | "flex-row";
  gap?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  shadow?: string;
  children: React.ReactNode;
}

export default function Container({
  alignItems,
  bgColor = "bg-white",
  borderColor = "border-neutral-200",
  flexDirection = "flex-col",
  gap,
  justifyContent,
  margin,
  padding,
  shadow,
  children,
}: ContainerProps) {
  return (
    <div
      className={`${margin} flex ${flexDirection} ${alignItems} ${justifyContent} ${gap} rounded-lg border ${borderColor} ${bgColor} ${padding} ${shadow}`}
    >
      {children}
    </div>
  );
}
