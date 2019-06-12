export interface StandardFormField {
  name: string;
  type: string;
  displayName?: string;
  required?: boolean;
  childName?: string;
  ref?: string;
  refName?: string;
  refOptions?: any[];
  default?: any;
  enum?: any;
  fields?: any[];
}
