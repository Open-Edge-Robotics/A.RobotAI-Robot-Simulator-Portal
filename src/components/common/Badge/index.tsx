interface BadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
}

export default function Badge({
  text,
  bgColor = "bg-neutral-50",
  fontSize = "text-base",
  fontWeight = "font-normal",
  padding = "px-3 py-1",
  textColor = "text-white",
}: BadgeProps) {
  return (
    <div className={`flex items-center justify-center rounded-full ${bgColor} ${padding}`}>
      <span className={`${fontSize} ${fontWeight} ${textColor}`}>{text}</span>
    </div>
  );
}
