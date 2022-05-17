/* eslint-disable no-console */
import { StrapiToolkit } from './lib/strapi-toolkit';

export * from './lib/strapi-generated-types';

const getToolkit = (strapi: any): StrapiToolkit => {
  return new StrapiToolkit({ strapiInstance: strapi });
};

export { StrapiToolkit, getToolkit };
