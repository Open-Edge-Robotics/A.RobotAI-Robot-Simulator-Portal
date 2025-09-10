import Icon from "@/components/common/Icon";

interface FileItemProps {
  href: string;
  iconName: string;
  label: string;
}

export default function TemplateFiles({ meta, db }: { meta: string; db: string }) {
  return (
    <div className="flex items-center gap-3">
      <FileItem href={meta} iconName="settings" label="Meta" />
      <FileItem href={db} iconName="database" label="DB" />
    </div>
  );
}

function FileItem({ href, iconName, label }: FileItemProps) {
  return (
    <a href={href} className="flex items-center gap-1.5">
      <Icon name={iconName} size="22px" className="text-gray-500" />
      <span className="text-sm text-gray-600">{label}</span>
    </a>
  );
}
