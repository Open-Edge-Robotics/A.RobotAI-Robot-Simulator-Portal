export type Timestamp = string; // ISO 8601 형식

export interface OverviewConfig {
  label: string;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
}

export interface FileInfo {
  fileName: string;
  downloadUrl: string;
}

export type EditorFile = LocalFile | UploadedFile | null;

export interface LocalFile {
  type: "LOCAL_FILE";
  file: File;
}

export interface UploadedFile {
  type: "UPLOADED_FILE";
  file: FileInfo;
}
