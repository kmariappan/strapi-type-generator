import { AxiosInstance } from 'axios';
import { StrapiDatabaseQuery } from './base/strapi-db-query';
import { StrapiEntity } from './strapi-generated-entity';

type StrapiToolkitOptions = {
  axiosInstance?: AxiosInstance;
  strapiInstance?: any;
};

export class StrapiToolkit {
  entity: StrapiEntity;
  db: StrapiDatabaseQuery;

  constructor(toolkitOptions: StrapiToolkitOptions) {
    this.entity = new StrapiEntity(toolkitOptions.axiosInstance, toolkitOptions.strapiInstance);
    this.db = new StrapiDatabaseQuery();
  }
}
