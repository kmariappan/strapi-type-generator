/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { auth } from '@strapi/helper-plugin';

export const authToken = auth.getToken();
