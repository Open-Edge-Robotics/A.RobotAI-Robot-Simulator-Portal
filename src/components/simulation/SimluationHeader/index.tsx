import Icon from "@/components/common/Icon";
import LinkButton from "@/components/common/LinkButton";
import Title from "@/components/common/Title";

interface HeaderProps {
  title: string;
}

export default function SimulationHeader({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Title title={title} />
      <LinkButton to="/simulation">
        <div className="flex items-center gap-1">
          <Icon name="list" className="ml-[-6px]" />
          시뮬레이션 목록
        </div>
      </LinkButton>
    </div>
  );
}
