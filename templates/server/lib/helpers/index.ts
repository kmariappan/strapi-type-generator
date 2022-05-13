import { stringify, parse } from 'qs';

export function generateQueryString(obj: object): string {
  return stringify(obj, { encodeValuesOnly: true });
}

export function generateQueryFromRawString(rawQuery: string): string {
  return stringify(parse(rawQuery), { encodeValuesOnly: true });
}

export const isBrowser = () => typeof window !== 'undefined';

export const stringToArray = (value: string): string[] => {
  return value.split('.');
};

export const capitalize = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const deCapitalize = (name: string): string => {
  return name.charAt(0).toLowerCase() + name.slice(1);
};

export const toCamelCase = (name: string): string => {
  let manipulatedName = '';
  const splitedString = name.split(/[.\-_]/);
  splitedString.forEach((enna, index) => {
    if (index === 0) {
      manipulatedName = `${enna}`;
    } else {
      manipulatedName = `${manipulatedName}${capitalize(enna)}`;
    }
  });
  return manipulatedName;
};
