import Dot from "../Dot";

interface BadgeProps {
  text?: string;
  bgColor?: string;
  highlightColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  textClass?: string;
  children?: React.ReactNode;
}

export default function Badge({
  text,
  bgColor = "bg-neutral-50",
  highlightColor,
  fontSize = "text-base",
  fontWeight = "font-normal",
  padding = "px-3 py-1",
  textColor = "text-white",
  textClass,
  children,
}: BadgeProps) {
  return (
    <div className={`flex items-center justify-center gap-1.5 rounded-full ${bgColor} ${padding}`}>
      {highlightColor && <Dot color={highlightColor} size="sm" />}
      {text && <span className={`${fontSize} ${fontWeight} ${textColor} ${textClass}`}>{text}</span>}
      {children}
    </div>
  );
}
