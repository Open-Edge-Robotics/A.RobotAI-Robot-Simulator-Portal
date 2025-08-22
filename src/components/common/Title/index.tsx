interface TitleProps {
  title: string;
  margin?: string;
  fontSize?: "text-2xl" | "text-xl" | "text-lg";
  fontWeight?: "font-bold" | "font-semibold" | "font-medium";
}

export default function Title({ title, margin, fontSize = "text-2xl", fontWeight = "font-semibold" }: TitleProps) {
  return <h1 className={`${fontWeight} ${margin} ${fontSize}`}>{title}</h1>;
}
