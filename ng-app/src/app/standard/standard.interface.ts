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
  refIncludes?: string[];
  queryModel?: any;
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
  link?: string | Func;
  dateFormat?: string;
  template?: Func;
  width?: string;
}

export interface IStandardDisplayField {
  name: string;
  displayName?: string;
}

export interface StandardHttpResponse {
  data: any;
  message: string;
  status: number;
}

type Func = (item: any) => string;
