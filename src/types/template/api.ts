import type { Template } from "./domain";

export type GetTemplatesResult = Template[];

export interface GetTemplateResult {
  template: Template;
}

export type CreateTemplateRequest = FormData;

export type CreateTemplateResult = Template;

export type UpdateTemplateRequest = FormData;

export type UpdateTemplateResult = Template;
