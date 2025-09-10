import Divider from "@/components/common/Divider";

import type { Template } from "@/types/template/domain";

import BasicInformation from "./BasicInformation";
import CardHeader from "./CardHeader";
import TemplateFiles from "./TemplateFiles";
import Topics from "./Topics";

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <div key={template.templateId} className="relative rounded-lg border border-gray-200 bg-white p-4">
      <CardHeader name={template.name} />
      <BasicInformation id={template.templateId} type={template.type} description={template.description} />
      <Divider className="my-4" color="bg-gray-50" />
      <TemplateFiles meta={"#"} db={"#"} />
      <Divider className="my-4" color="bg-gray-50" />
      <Topics topics={template.topics.split(",")} />
    </div>
  );
}
