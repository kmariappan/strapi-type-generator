import { getAxiosInstance } from '../lib/service/http';
import { authToken } from '../lib/service/strapi-auth-token';
import { StrapiToolkit } from '../lib/strapi-toolkit';

const STRAPI_ADMIN_BACKEND_URL = process.env.STRAPI_ADMIN_BACKEND_URL as string;
const { entity } = new StrapiToolkit({
  axiosInstance: getAxiosInstance(`${STRAPI_ADMIN_BACKEND_URL}/toolkit`, authToken),
});

export { entity as contents };
