import Icon from "@/components/common/Icon";

import type { FileInfo } from "@/types/common";

interface TemplateFilesProps {
  metadata: FileInfo;
  database: FileInfo;
}

export default function TemplateFiles({ metadata, database }: TemplateFilesProps) {
  return (
    <>
      <section className="space-y-1">
        <FileItem href={metadata.downloadUrl} iconName="settings" label="Meta" fileName={metadata.fileName} />
        <FileItem href={database.downloadUrl} iconName="database" label="DB" fileName={database.fileName} />
      </section>
    </>
  );
}

interface FileItemProps {
  href: string;
  iconName: string;
  label: string;
  fileName: string;
}

function FileItem({ href, iconName, label, fileName }: FileItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <div className="flex items-center gap-1.5">
          <Icon name={iconName} className="flex text-gray-500" />
          <span className="text-gray-600">{label}</span>
        </div>
        <a href={href} className="text-blue-600 underline">
          {fileName}
        </a>
      </div>
    </div>
  );
}
