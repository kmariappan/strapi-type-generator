import { AxiosInstance } from 'axios';
import { StrapiDatabaseQuery } from './base/strapi-db-query';
import { StrapiEntity } from './strapi-generated-entity';

export class StrapiToolkit {
  entity: StrapiEntity;
  db: StrapiDatabaseQuery;

  constructor(private axiosInstance?: AxiosInstance) {
    this.entity = new StrapiEntity(this.axiosInstance);
    this.db = new StrapiDatabaseQuery();
  }
}
