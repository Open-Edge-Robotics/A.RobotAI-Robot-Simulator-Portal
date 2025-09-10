import LabeledValue from "@/components/common/LabeledValue";

interface TemplateInfoProps {
  type: string;
  id: number;
  description: string;
}

export default function BasicInformation({ type, id, description }: TemplateInfoProps) {
  return (
    <div className="space-y-1 text-gray-600">
      <LabeledValue label="id:" value={id.toString()} containerClass="gap-1" />
      <LabeledValue label="타입:" value={type} containerClass="gap-1" />
      <LabeledValue label="설명:" labelClass="whitespace-nowrap" value={description} containerClass="gap-1 " />
    </div>
  );
}
