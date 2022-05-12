/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

import { StrapiTypeGenerator } from './strapi-type-generator';
import { GenerateOptions } from './types/generator';

const strapi = require('@strapi/strapi');

const keys: Array<any> = [];
const contents: Array<any> = [];

const main = async () => {
  return new Promise<void>(async (resolve) => {
    const app = await strapi().register();
    const ContentKeys = await app.container.get('content-types').keys();
    const ComponentKeys = Object.keys(app.components);
    const Middlewarekeys = await app.container.get('middlewares').keys();
    const PolicyKeys = await app.container.get('policies').keys();
    const HookKeys = await app.container.get('hooks').keys();
    const ServiceKeys = await app.container.get('services').keys();
    const ControllerKeys = await app.container.get('controllers').keys();
    const contentTypes = await app.container.get('content-types').getAll();
    const components = app.components;

    keys.push(
      { name: 'ContentKeys', data: ContentKeys },
      { name: 'ComponentKeys', data: ComponentKeys },
      { name: 'Middlewarekeys', data: Middlewarekeys },
      { name: 'PolicyKeys', data: PolicyKeys },
      { name: 'HookKeys', data: HookKeys },
      { name: 'ServiceKeys', data: ServiceKeys },
      { name: 'ControllerKeys', data: ControllerKeys }
    );

    contents.push({ ...contentTypes, ...components });

    if (keys.length !== -1 && contents.length !== -1) {
      resolve();
    }
  });
};

export const generateTypes = (options?: GenerateOptions): Promise<void> => {
  const defaultOptions: GenerateOptions = {
    generateEntityClass: false,
    ...options,
  };

  return new Promise<void>((resolve, reject) => {
    main().then(() => {
      try {
        const builder = new StrapiTypeGenerator(keys, contents[0], defaultOptions);
        builder.generate();
        resolve();
      } catch (error) {
        if (error) reject(error);
      }
    });
  });
};
