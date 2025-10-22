import { useState } from "react";

import { Button } from "innogrid-ui";

import type { EditorFile, LocalFile } from "@/types/common.ts";

import { getFileName, getFileSize, validateFileExtension } from "@/utils/common/file.ts";
import { errorToast } from "@/utils/common/toast.ts";

import Container from "../Container.tsx";
import Icon from "../Icon";
import Label from "../Label";

interface FileUploadZoneProps {
  iconName: string;
  message: string;
  allowedExtensions?: string[];
  file: EditorFile;
  onFileUpload: (file: LocalFile) => void;
  onFileRemove: () => void;
}

export default function FileUploadZone({
  iconName,
  message,
  allowedExtensions,
  file,
  onFileUpload,
  onFileRemove,
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      handleValidatedUpload(droppedFile);
    }
  };

  const handleValidatedUpload = (file: File) => {
    // 파일 확장자 검증
    if (validateFileExtension(file, allowedExtensions || [])) {
      onFileUpload({ type: "LOCAL_FILE", file });
    } else {
      errorToast(`허용되지 않는 파일 형식입니다. (${allowedExtensions?.join(", ")})`);
    }
  };

  const styleClass = file
    ? {
        bgColor: "bg-green-10",
        borderColor: "border-green-500",
      }
    : isDragOver
      ? {
          bgColor: "bg-blue-10",
          borderColor: "border-blue-500",
        }
      : {}; // Container의 기본 스타일 사용

  return (
    <Container
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="h-40 items-center justify-center gap-2 border-2 border-dashed p-4 text-sm text-gray-500"
      bgColor={styleClass.bgColor}
      borderColor={styleClass.borderColor}
    >
      {file ? (
        <FilePreview file={file} onRemove={onFileRemove} />
      ) : (
        <FileDropArea
          iconName={iconName}
          message={message}
          accept={allowedExtensions?.join(",")}
          onUpload={handleValidatedUpload}
        />
      )}
    </Container>
  );
}

interface FilePreviewProps {
  file: EditorFile;
  onRemove: () => void;
}

function FilePreview({ file, onRemove }: FilePreviewProps) {
  if (!file) return null;

  const name = getFileName(file);
  const size = getFileSize(file);

  return (
    <>
      <Icon name="check_circle" className="text-green-500" />
      <p className="text-sm font-medium text-green-600">{name ?? "파일 이름"}</p>
      {size !== null && <p className="text-sm text-green-500">{(size / 1024).toFixed(1)} KB</p>}
      <Button
        onClick={() => onRemove()}
        className="flex cursor-pointer items-center gap-1 text-sm text-red-500 hover:text-red-600"
        type="button"
      >
        제거
      </Button>
    </>
  );
}

interface FileDropAreaProps {
  iconName: string;
  message: string;
  accept?: string;
  onUpload: (file: File) => void;
}

function FileDropArea({ iconName, message, accept, onUpload }: FileDropAreaProps) {
  return (
    <>
      <Icon name={iconName} className="text-gray-400" />
      <p className="text-sm text-gray-600">{message}</p>
      <Label marginBottom="mb-0">
        <span className="cursor-pointer font-medium text-blue-500 hover:text-blue-600">파일 선택</span>
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              onUpload(e.target.files[0]);
            }
          }}
          className="hidden"
        />
      </Label>
    </>
  );
}
