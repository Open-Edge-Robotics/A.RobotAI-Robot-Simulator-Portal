import {
  TemplateDescriptionField,
  TemplateIdField,
  TemplateTypeField,
} from "@/type/_field";

export interface TemplateBase
  extends TemplateIdField,
    TemplateTypeField,
    TemplateDescriptionField {
  [key: string]: string | number;
}

export type TemplateListResponse = TemplateBase[];

export interface TemplateDeleteResponse extends TemplateIdField {}
