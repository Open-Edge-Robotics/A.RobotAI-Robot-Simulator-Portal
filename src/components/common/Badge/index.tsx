interface BadgeProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  children?: React.ReactNode;
}

export default function Badge({
  text,
  bgColor = "bg-neutral-50",
  fontSize = "text-base",
  textColor = "text-white",
  children,
}: BadgeProps) {
  return (
    <div className={`flex items-center justify-center gap-1.5 rounded-full ${bgColor} px-3 py-1`}>
      {text && <span className={`${fontSize} ${textColor} font-normal`}>{text}</span>}
      {children}
    </div>
  );
}
