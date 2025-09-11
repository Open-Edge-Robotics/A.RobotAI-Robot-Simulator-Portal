import Container from "@/components/common/Container.tsx";
import Fieldset from "@/components/common/Fieldset";
import FileUploadZone from "@/components/common/FileUploadZone";
import Label from "@/components/common/Label";
import Title from "@/components/common/Title";

import type { TemplateFormData } from "@/types/template/domain";

interface FileSectionProps {
  formData: TemplateFormData;
  onFormDataChange: <K extends keyof TemplateFormData>(field: K, value: TemplateFormData[K]) => void;
}

type TemplateFileType = keyof TemplateFormData["files"];

export default function FileSection({ formData, onFormDataChange }: FileSectionProps) {
  const handleFileUpload = (field: TemplateFileType, file: File) => {
    onFormDataChange("files", {
      ...formData.files,
      [field]: file,
    });
  };

  const handleFileRemove = (field: TemplateFileType) => {
    onFormDataChange("files", {
      ...formData.files,
      [field]: null,
    });
  };

  return (
    <Container className="p-6">
      <Title title="파일 업로드" fontSize="text-xl" fontWeight="font-medium" margin="mb-4" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FileField
          label="Metadata 파일 (.yaml)"
          iconName="settings"
          message="YAML 파일을 드래그하거나"
          allowedExtensions={[".yaml", ".yml"]}
          file={formData.files.metadata}
          onFileUpload={(file) => handleFileUpload("metadata", file)}
          onFileRemove={() => handleFileRemove("metadata")}
        />
        <FileField
          label="Database 파일 (.db3)"
          iconName="database"
          message="DB3 파일을 드래그하거나"
          allowedExtensions={[".db3"]}
          file={formData.files.database}
          onFileUpload={(file) => handleFileUpload("database", file)}
          onFileRemove={() => handleFileRemove("database")}
        />
      </div>
    </Container>
  );
}

interface FileFieldProps {
  label: string;
  iconName: string;
  message: string;
  allowedExtensions: string[];
  file: File | null;
  onFileUpload: (file: File) => void;
  onFileRemove: () => void;
}

function FileField({ label, iconName, message, allowedExtensions, file, onFileUpload, onFileRemove }: FileFieldProps) {
  return (
    <div>
      <Fieldset>
        <Label label={label} required />
      </Fieldset>
      <FileUploadZone
        iconName={iconName}
        message={message}
        allowedExtensions={allowedExtensions}
        file={file}
        onFileUpload={onFileUpload}
        onFileRemove={onFileRemove}
      />
    </div>
  );
}
