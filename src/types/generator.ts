export type StrapiKey = {
  name: string;
  data: string[];
};

export type EntityCalssData = {
  globalId: string;
  uid: string;
};

export type GenerateOptions = {
  path?: string;
  generateEntityClass?: boolean;
};
