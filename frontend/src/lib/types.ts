export interface IModel {
  fields: {
    type: "text" | "image";
    id: string;
    displayName?: string;
    required?: boolean;
    default?: string;
  }[];
}

export interface IModule {
  name: string;
  mainField?: string;
  displayName?: string;
  // TODO: use arrays
  model: IModel;
}
