interface ContainerProps {
  alignItems?: string;
  bgColor?: string;
  borderColor?: string;
  flexDirection?: "flex-col" | "flex-row";
  gap?: string;
  hoverBgColor?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  shadow?: string;
  children: React.ReactNode;
}

export default function Container({
  alignItems,
  bgColor = "bg-white",
  borderColor = "border-gray-100",
  flexDirection = "flex-col",
  gap,
  hoverBgColor,
  justifyContent,
  margin,
  padding,
  shadow,
  children,
}: ContainerProps) {
  return (
    <div
      className={`${margin} flex ${flexDirection} ${alignItems} ${justifyContent} ${gap} rounded-lg border ${borderColor} ${bgColor} ${padding} ${shadow} ${hoverBgColor}`}
    >
      {children}
    </div>
  );
}
