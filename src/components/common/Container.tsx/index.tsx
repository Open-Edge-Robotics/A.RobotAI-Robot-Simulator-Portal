interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
  borderColor?: string;
  flexDirection?: "flex-col" | "flex-row";
  shadow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Container({
  bgColor = "bg-white",
  borderColor = "border-gray-100",
  flexDirection = "flex-col",
  shadow,
  className,
  children,
  ...restProps
}: ContainerProps) {
  return (
    <div
      className={`flex ${flexDirection} rounded-lg border ${borderColor} ${bgColor} ${shadow && "shadow-xs"} ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
}
