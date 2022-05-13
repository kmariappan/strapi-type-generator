import { AxiosInstance } from 'axios';
import { generateQueryString } from '../helpers';
import { StrapiFilterBuilder } from './strapi-filter-builder';
import { EntityResponse } from '../types/content';

/* eslint-disable no-console */
export class StrapiEntityServiceApi<T> {
  private url: string;
  constructor(private uid: string, private httpClient?: AxiosInstance) {
    this.url = `entity/${uid}`;
  }

  /**
   *
   * @param fields Array of string to select the fields.
   * @returns collection of requested contents.
   */

  public select(fields?: Array<keyof T>): StrapiFilterBuilder<T[]> {
    if (fields) {
      const query = {
        fields,
      };
      const queryString = generateQueryString(query);
      this.url = `${this.url}?${queryString}`;
    }
    return new StrapiFilterBuilder<T[]>(this.url, this.httpClient);
  }

  public findOne(id: string | number): Promise<EntityResponse<T>> {
    return new Promise<EntityResponse<T>>((resolve) => {
      if (this.httpClient) {
        this.httpClient
          .get<EntityResponse<T>>(`${this.url}/${id}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err: EntityResponse<T>) => {
            resolve(err);
          });
      }
    });
  }

  public async create(data: Omit<T, 'id'>): Promise<EntityResponse<T>> {
    return new Promise<EntityResponse<T>>((resolve) => {
      if (this.httpClient) {
        this.httpClient
          .post<EntityResponse<T>>(`${this.url}`, { ...data })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err: EntityResponse<T>) => {
            resolve(err);
          });
      }
    });
  }

  public async update(id: string | number, data: Partial<T>): Promise<EntityResponse<T>> {
    return new Promise<EntityResponse<T>>((resolve) => {
      if (this.httpClient) {
        this.httpClient
          .put<EntityResponse<T>>(`${this.url}/${id}`, { ...data })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err: EntityResponse<T>) => {
            resolve(err);
          });
      }
    });
  }

  public async delete(id: string | number): Promise<EntityResponse<T>> {
    return new Promise<EntityResponse<T>>((resolve) => {
      if (this.httpClient) {
        this.httpClient
          .delete<EntityResponse<T>>(`${this.url}/${id}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err: EntityResponse<T>) => {
            resolve(err);
          });
      }
    });
  }

  public getUid(): string {
    return this.uid;
  }
}
