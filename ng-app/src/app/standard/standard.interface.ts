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
  isShow?: any;
  reuqired?: boolean;
  enumList?: any[];
  filterOption?: any;
}

export enum IStandardFormFieldType {
  string,
  number,
  table,
  ref,
  textarea,
  date,
  time,
  boolean,
  enum,
  object,
  array,
  image,
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

export interface HttpResponse {
  data: any;
  message: string;
  status: number;
}

type IStandardColumnTemplateFunc = (item: any) => string;
