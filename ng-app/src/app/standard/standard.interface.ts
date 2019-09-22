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
  fields?: any[];
  add?: any;
}
