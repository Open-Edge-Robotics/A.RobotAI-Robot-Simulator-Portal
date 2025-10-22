import type { EditorFile, FileInfo } from "../common";

export interface Template {
  templateId: number;
  templateName: string;
  templateType: string;
  templateDescription: string;
  topics: string;
  createdAt: string; // ISO date string
  metadataFile: FileInfo;
  dbFile: FileInfo;
}

export type TemplateLite = Pick<Template, "templateId" | "templateName">;

export interface TemplateFormData {
  name: string;
  description: string;
  type: string;
  topics: string[];
  files: {
    metadata: EditorFile;
    database: EditorFile;
  };
}
