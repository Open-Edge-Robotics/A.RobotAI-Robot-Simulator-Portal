import type { Template } from "./domain";

export interface GetTemplatesResult {
  templates: Template[];
}

export interface GetTemplateResult {
  template: Template;
}

export type CreateTemplateRequest = FormData;

export interface CreateTemplateResult {
  templateId: number;
  type: string;
  description: string;
  bagFilePath: string;
  topics: string;
  createdAt: string;
}

export type UpdateTemplateRequest = FormData;

export interface UpdateTemplateResult {
  templateId: number;
  type: string;
  description: string;
  bagFilePath: string;
  topics: string;
  createdAt: string;
}
