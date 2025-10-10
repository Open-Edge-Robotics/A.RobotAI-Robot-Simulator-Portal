import type { Template } from "./domain";

export type GetTemplatesResponse = Template[];

export interface GetTemplateResponse {
  template: Template;
}

export type CreateTemplateRequest = FormData;

export type CreateTemplateResponse = Template;

export type UpdateTemplateRequest = FormData;

export type UpdateTemplateResponse = Template;
