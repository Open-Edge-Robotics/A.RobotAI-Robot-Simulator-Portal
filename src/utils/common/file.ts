import type { EditorFile, FileInfo } from "@/types/common";

export const validateFileExtension = (file: File, allowedExtensions: string[]): boolean => {
  const fileName = file.name.toLowerCase();

  return allowedExtensions.some((extension) => {
    const normalizedExtension = extension.toLowerCase();
    // .으로 시작하지 않으면 추가
    const ext = normalizedExtension.startsWith(".") ? normalizedExtension : `.${normalizedExtension}`;
    return fileName.endsWith(ext);
  });
};

// 업로드된 파일인지 확인
export const isUploadedFile = (editorFile: EditorFile): editorFile is { type: "UPLOADED_FILE"; file: FileInfo } => {
  return editorFile?.type === "UPLOADED_FILE";
};

// 로컬 파일인지 확인
export const isLocalFile = (editorFile: EditorFile): editorFile is { type: "LOCAL_FILE"; file: File } => {
  return editorFile?.type === "LOCAL_FILE";
};

// EditorFile에서 실제 파일명 추출
export const getFileName = (editorFile: EditorFile): string | null => {
  if (!editorFile) return null;

  return isLocalFile(editorFile) ? editorFile.file.name : editorFile.file.fileName;
};

// EditorFile에서 파일 크기 추출 (로컬 파일만)
export const getFileSize = (editorFile: EditorFile): number | null => {
  if (!editorFile || !isLocalFile(editorFile)) return null;

  return editorFile.file.size;
};
