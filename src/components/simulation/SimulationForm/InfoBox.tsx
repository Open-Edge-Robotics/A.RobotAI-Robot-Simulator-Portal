import Container from "@/components/common/Container.tsx";

interface InfoBoxProps {
  title: string;
  description: string;
}

export default function InfoBox({ title, description }: InfoBoxProps) {
  return (
    <Container
      bgColor="bg-blue-10"
      borderColor="border-blue-500"
      flexDirection="flex-row"
      className="items-center gap-2 p-4"
    >
      <InfoIcon />
      <div className="text-sm text-blue-600">
        <span className="font-semibold">{title}</span> — {description}
      </div>
    </Container>
  );
}

function InfoIcon() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
      i
    </div>
  );
}
