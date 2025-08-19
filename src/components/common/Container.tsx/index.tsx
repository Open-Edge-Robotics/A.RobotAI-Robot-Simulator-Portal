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
  shadow?: boolean;
  width?: string;
  height?: string;
  overflowHidden?: boolean;
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
  width = "w-auto",
  height = "h-auto",
  overflowHidden = false,
  children,
}: ContainerProps) {
  return (
    <div
      className={`${margin} ${width} ${height} flex ${flexDirection} ${alignItems} ${justifyContent} ${gap} rounded-lg border ${borderColor} ${bgColor} ${padding} ${shadow && "shadow-xs"} ${hoverBgColor} ${overflowHidden && "overflow-hidden"}`}
    >
      {children}
    </div>
  );
}
