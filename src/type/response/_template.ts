import {
  CreatedAtField,
  TemplateDescriptionField,
  TemplateIdField,
  TemplateTypeField,
  TopicsField,
} from "@/type/_field";

export interface TemplateBase
  extends TemplateIdField,
    TemplateTypeField,
    TemplateDescriptionField,
    TopicsField,
    CreatedAtField {
  [key: string]: string | number;
}

export type TemplateListResponse = TemplateBase[];

export interface TemplateDeleteResponse extends TemplateIdField {}
