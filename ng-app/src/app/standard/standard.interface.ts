export interface IStandardFormField {
  name: string;
  type: string;
  displayName?: string;
  required?: boolean;
  childName?: string;
  ref?: string;
  refName?: string;
  refValue?: string;
  refOptions?: any[];
  default?: any;
  enum?: any;
  fields?: IStandardFormField[];
  add?: any;
}

export enum IStandardFormFieldType {
  string,
  number,
  table,
  ref,
}

export enum IStandardColumnType {
  string,
  date,
  currency,
  link,
  template,
}

export interface IStandardColumn {
  name: string;
  type?: string;
  format?: string;
  displayName?: string;
  link?: string;
  dateFormat?: string;
  template?: IStandardColumnTemplateFunc;
}

type IStandardColumnTemplateFunc = (item: any) => string;