import { getAxiosInstance } from './lib/service/http';
import { strapiLoggedInAdminToken } from './lib/service/strapi-auth-token';
import { StrapiToolkit } from './lib/strapi-toolkit';

const STRAPI_ADMIN_BACKEND_URL = process.env.STRAPI_ADMIN_BACKEND_URL as string;

const { entity } = new StrapiToolkit(getAxiosInstance(STRAPI_ADMIN_BACKEND_URL, strapiLoggedInAdminToken));

export { entity as entityApi };
