export interface Template {
  templateId: number;
  name: string;
  type: string;
  description: string;
  meta: string;
  db: string;
  topics: string; // comma-separated topics
  createdAt: string; // ISO date string
}

export type TemplateLite = Pick<Template, "templateId" | "name">;
