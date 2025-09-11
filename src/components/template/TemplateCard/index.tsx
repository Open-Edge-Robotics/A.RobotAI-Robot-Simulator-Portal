import Divider from "@/components/common/Divider";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton.tsx";

import type { Template } from "@/types/template/domain";

import BasicInformation from "./BasicInformation";
import Topics from "./Topics";

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <div key={template.templateId} className="relative rounded-lg border border-gray-200 bg-white p-4">
      <CardHeader name={template.name} />
      <BasicInformation id={template.templateId} type={template.type} description={template.description} />
      <Divider className="my-4" color="bg-gray-50" />
      <RosbagFile filePath={template.bagFilePath} />
      <Divider className="my-4" color="bg-gray-50" />
      <Topics topics={template.topics.split(",")} />
    </div>
  );
}

function CardHeader({ name }: { name: string }) {
  return (
    <div className="mb-2.5 flex justify-between">
      <h3 className="font-semibold">{name}</h3>
      <IconButton
        iconName="delete"
        className={`flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 active:text-red-700 disabled:bg-white`}
      />
    </div>
  );
}

function RosbagFile({ filePath }: { filePath: string }) {
  return (
    <a
      href={filePath}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1.5 text-gray-600"
    >
      <Icon name="file_present" size="22px" />
      <span className="text-sm group-hover:underline">{filePath}</span>
    </a>
  );
}
