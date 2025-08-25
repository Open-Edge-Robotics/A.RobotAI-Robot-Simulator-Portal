import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";

interface HeaderProps {
  title: string;
}

export default function SimulationHeader({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Title title={title} />
      <LinkButton to="/simulation">시뮬레이션 목록</LinkButton>
    </div>
  );
}
