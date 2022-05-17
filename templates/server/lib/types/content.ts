export type ContentKeys = string;
export type ContentType = Record<ContentKeys, Content>;

export type Content = {
  collectionName: string;
  info: ContentInfo;
  options?: any;
  pluginOptions?: {
    'content-manager'?: {
      visible: boolean;
    };
    'content-type-builder'?: {
      visible: boolean;
    };
  };
  attributes: Attribute;
  kind: string;
  __schema__: any;
  modelType: string;
  modelName: string;
  connection: string;
  uid: string;
  plugin?: string;
  globalId: string;
  apiName?: string;
  actions?: object;
  lifecycles?: object;
  category?: string;
  __filename__?: string;
  config?: {
    attributes: {
      resetPasswordToken: {
        hidden: boolean;
      };
      confirmationToken: {
        hidden: boolean;
      };
      provider: {
        hidden: boolean;
      };
    };
  };
};

type ContentInfo = {
  name?: string;
  description?: string;
  singularName?: string;
  pluralName?: string;
  displayName?: string;
  collectionName?: string;
  icon?: string;
};

type FieldType =
  | 'string'
  | 'boolean'
  | 'time'
  | 'datetime'
  | 'date'
  | 'json'
  | 'email'
  | 'password'
  | 'enumeration'
  | 'decimal'
  | 'integer'
  | 'media'
  | 'text'
  | 'component'
  | 'richtext'
  | 'relation';

type RelationType = 'oneToOne' | 'oneToMany' | 'manyToOne' | 'manyToMany' | 'morphToMany';

export type Field = {
  type: FieldType;
  required?: boolean;
  unique?: boolean;
  relation?: RelationType;
  target?: string;
  configurable?: boolean;
  writable?: boolean;
  visible?: boolean;
  useJoinTable?: boolean;
  private?: boolean;
  minLength?: number;
  default?: object | boolean | string | number;
  inversedBy?: string;
  collectionName?: string;
  mappedBy?: string;
  enum?: string[];
  min?: number;
  max?: number;
  allowedTypes?: string[];
  multiple?: boolean;
  repeatable?: boolean;
  component?: string;
  pluginOptions?: {
    [key: string]: {
      enabled: boolean;
    };
  };
};

export type Attribute = {
  [key: string]: Field;
};

export type EntityResponse<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

export type EntityAbstractServiceType<T> = {
  getWelcomeMessage: () => string;
  findMany: (collectionName: string, options?: object) => Promise<EntityResponse<T>>;
  findOne: (collectionName: string, id: string | number, options: object) => Promise<EntityResponse<T>>;
  create: (collectionName: string, values: any) => Promise<EntityResponse<T>>;
  update: (collectionName: string, id: string | number, values: object) => Promise<EntityResponse<T>>;
  delete: (collectionName: string, id: string | number) => Promise<EntityResponse<T>>;
};
