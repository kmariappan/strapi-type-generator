/**
 *  This file was generated from the Strapi official blog template.
 *
 *  https://github.com/strapi/starters-and-templates/tree/main/packages/templates/blog
 */

import { AxiosInstance } from 'axios';
import { StrapiEntityServiceApi } from './base/strapi-entity-service-api';
import { AdminPermission } from './strapi-generated-types';
import { AdminUser } from './strapi-generated-types';
import { AdminRole } from './strapi-generated-types';
import { AdminApiToken } from './strapi-generated-types';
import { UploadFile } from './strapi-generated-types';
import { I18NLocale } from './strapi-generated-types';
import { UsersPermissionsPermission } from './strapi-generated-types';
import { UsersPermissionsRole } from './strapi-generated-types';
import { UsersPermissionsUser } from './strapi-generated-types';
import { About } from './strapi-generated-types';
import { Article } from './strapi-generated-types';
import { Author } from './strapi-generated-types';
import { Category } from './strapi-generated-types';
import { Global } from './strapi-generated-types';
import { ComponentSharedMedia } from './strapi-generated-types';
import { ComponentSharedNetwork } from './strapi-generated-types';
import { ComponentSharedQuote } from './strapi-generated-types';
import { ComponentSharedRichText } from './strapi-generated-types';
import { ComponentSharedSeo } from './strapi-generated-types';
import { ComponentSharedSlider } from './strapi-generated-types';

export class StrapiEntity {
  adminPermission: StrapiEntityServiceApi<AdminPermission>;
  adminUser: StrapiEntityServiceApi<AdminUser>;
  adminRole: StrapiEntityServiceApi<AdminRole>;
  adminApiToken: StrapiEntityServiceApi<AdminApiToken>;
  uploadFile: StrapiEntityServiceApi<UploadFile>;
  i18NLocale: StrapiEntityServiceApi<I18NLocale>;
  usersPermissionsPermission: StrapiEntityServiceApi<UsersPermissionsPermission>;
  usersPermissionsRole: StrapiEntityServiceApi<UsersPermissionsRole>;
  usersPermissionsUser: StrapiEntityServiceApi<UsersPermissionsUser>;
  about: StrapiEntityServiceApi<About>;
  article: StrapiEntityServiceApi<Article>;
  author: StrapiEntityServiceApi<Author>;
  category: StrapiEntityServiceApi<Category>;
  global: StrapiEntityServiceApi<Global>;
  componentSharedMedia: StrapiEntityServiceApi<ComponentSharedMedia>;
  componentSharedNetwork: StrapiEntityServiceApi<ComponentSharedNetwork>;
  componentSharedQuote: StrapiEntityServiceApi<ComponentSharedQuote>;
  componentSharedRichText: StrapiEntityServiceApi<ComponentSharedRichText>;
  componentSharedSeo: StrapiEntityServiceApi<ComponentSharedSeo>;
  componentSharedSlider: StrapiEntityServiceApi<ComponentSharedSlider>;
  constructor(private httpClient?: AxiosInstance) {
    this.adminPermission = new StrapiEntityServiceApi('admin::permission', this.httpClient);
    this.adminUser = new StrapiEntityServiceApi('admin::user', this.httpClient);
    this.adminRole = new StrapiEntityServiceApi('admin::role', this.httpClient);
    this.adminApiToken = new StrapiEntityServiceApi('admin::api-token', this.httpClient);
    this.uploadFile = new StrapiEntityServiceApi('plugin::upload.file', this.httpClient);
    this.i18NLocale = new StrapiEntityServiceApi('plugin::i18n.locale', this.httpClient);
    this.usersPermissionsPermission = new StrapiEntityServiceApi(
      'plugin::users-permissions.permission',
      this.httpClient
    );
    this.usersPermissionsRole = new StrapiEntityServiceApi('plugin::users-permissions.role', this.httpClient);
    this.usersPermissionsUser = new StrapiEntityServiceApi('plugin::users-permissions.user', this.httpClient);
    this.about = new StrapiEntityServiceApi('api::about.about', this.httpClient);
    this.article = new StrapiEntityServiceApi('api::article.article', this.httpClient);
    this.author = new StrapiEntityServiceApi('api::author.author', this.httpClient);
    this.category = new StrapiEntityServiceApi('api::category.category', this.httpClient);
    this.global = new StrapiEntityServiceApi('api::global.global', this.httpClient);
    this.componentSharedMedia = new StrapiEntityServiceApi('shared.media', this.httpClient);
    this.componentSharedNetwork = new StrapiEntityServiceApi('shared.network', this.httpClient);
    this.componentSharedQuote = new StrapiEntityServiceApi('shared.quote', this.httpClient);
    this.componentSharedRichText = new StrapiEntityServiceApi('shared.rich-text', this.httpClient);
    this.componentSharedSeo = new StrapiEntityServiceApi('shared.seo', this.httpClient);
    this.componentSharedSlider = new StrapiEntityServiceApi('shared.slider', this.httpClient);
  }
}
