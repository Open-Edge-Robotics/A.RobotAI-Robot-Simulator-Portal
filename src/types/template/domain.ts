export interface Template {
  templateId: number;
  name: string;
  type: string;
  description: string;
  bagFilePath: string;
  topics: string; // comma-separated topics
  createdAt: string; // ISO date string
}

export type TemplateLite = Pick<Template, "templateId" | "name">;

export interface TemplateFormData {
  name: string;
  description: string;
  type: string;
  topics: string[];
  files: {
    metadata: File | null;
    database: File | null;
  };
}
