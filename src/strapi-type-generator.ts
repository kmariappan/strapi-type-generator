import { Attribute, Content, ContentType, Field } from './types/content';
import fs from 'fs';
import { promisify } from 'util';
import { deCapitalize } from './helpers';
import { EntityCalssData, GenerateOptions, StrapiKey } from './types/generator';

export class StrapiTypeGenerator {
  private entityClassData: EntityCalssData[] = [];

  constructor(private keys: StrapiKey[], private contents: ContentType, private options: GenerateOptions) {}

  public generate = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      let printString = '';

      /// Generating the Key Types Begins here
      this.keys.forEach((key) => {
        printString = `${printString}${this.generateStringType(key.name, key.data)} \n\n`;
      });

      /// Generating the Content Types Begins here
      this.keys.forEach((key) => {
        if (key.name === 'ComponentKeys' || key.name === 'ContentKeys') {
          key.data.forEach((k) => {
            const content = this.contents[k];
            const { globalId, uid } = content;
            this.entityClassData.push({ globalId, uid });
            try {
              printString = `${printString}${this.generateType(content)} \n\n`;
            } catch (error) {
              if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
              }
            }
          });
        }
      });
      try {
        this.createFile(
          this.options.path ? `${this.options.path}/strapi-generated-types.ts` : `./strapi-generated-types.ts`,
          printString
        );
        if (this?.options?.generateEntityClass) {
          this.createFile(
            this.options.path ? `${this.options.path}/strapi-generated-entity.ts` : `./strapi-generated-entity.ts`,
            this.createEntityClass()
          );
        }
      } catch (error) {
        reject(error);
      }

      resolve(true);
    });
  };

  private createFile = async (filename: string, data: string) => {
    const writeFile = promisify(fs.writeFile);
    await writeFile(filename, data);
    // eslint-disable-next-line no-console
    console.log(`${filename} Created ✨`);
  };

  private generateType = (content: Content) => {
    return `export type ${content?.globalId} = {
      id: string | number
      ${this.getLines(content.attributes)}
      } `;
  };

  private getLines = (data: Attribute) => {
    const keys = Object.keys(data);

    let types = ``;

    keys.forEach((key) => {
      types = `${types}${this.generateLine(key, data[key])}\n`;
    });
    return types;
  };

  private generateLine = (key: string, field: Field) => {
    const line = `${key}${field.required ? ':' : '?:'} ${this.manipulateFieldType(field)}`;

    return line;
  };

  private generateStringType = (name: string, data: string[]): string => {
    let manipulatedString = '';
    data.forEach((element, index) => {
      manipulatedString =
        data.length - 1 === index ? `${manipulatedString}'${element}'` : `${manipulatedString}'${element}' | `;
    });
    return manipulatedString ? `export type ${name} = ${manipulatedString} ` : `export type ${name} = '' `;
  };

  private getImports(items: EntityCalssData[]): string {
    let manipulatedImportStatement = ``;

    items.forEach((item, index) => {
      manipulatedImportStatement = `${manipulatedImportStatement}${index === 0 ? '' : '\n'}import { ${
        item.globalId
      } } from './strapi-generated-types'; `;
    });

    return manipulatedImportStatement;
  }

  private getDeclerations(items: EntityCalssData[]): string {
    let manipulatedImportStatement = ``;

    items.forEach((item, index) => {
      manipulatedImportStatement = `${manipulatedImportStatement}${index === 0 ? '' : '\n'}${deCapitalize(
        item.globalId
      )}: StrapiEntityServiceApi<${item.globalId}>;`;
    });

    return manipulatedImportStatement;
  }

  private getInstantiations(items: EntityCalssData[]): string {
    let manipulatedImportStatement = ``;

    items.forEach((item, index) => {
      manipulatedImportStatement = `${manipulatedImportStatement}${index === 0 ? '' : '\n'}this.${deCapitalize(
        item.globalId
      )} = new StrapiEntityServiceApi('${item.uid}', this.httpClient, this.strapiInstance);`;
    });

    return manipulatedImportStatement;
  }

  private createEntityClass(): string {
    return `import { AxiosInstance } from 'axios';
    import { StrapiEntityServiceApi } from './base/strapi-entity-service-api';
    ${this.getImports(this.entityClassData)}
    
    export class StrapiEntity {
      ${this.getDeclerations(this.entityClassData)}
      constructor(private httpClient?: AxiosInstance, private strapiInstance?: any) {
        ${this.getInstantiations(this.entityClassData)}
      }
    }
    `;
  }

  private manipulateFieldType = (field: Field): string => {
    switch (field.type) {
      case 'time':
        return 'Date';
      case 'date':
        return 'Date';
      case 'enumeration':
        return 'string[]';
      case 'json':
        return 'JSON';
      case 'datetime':
        return 'Date';
      case 'email':
        return 'string';
      case 'password':
        return 'string';
      case 'integer':
        return 'number';
      case 'decimal':
        return 'number';
      case 'float':
        return 'number';
      case 'text':
        return 'string';
      case 'richtext':
        return 'string';
      case 'media':
        return 'string';
      case 'uid':
        return 'string';
      case 'dynamiczone': {
        let manipulatedString = 'undefined';
        const { components } = field;
        if (components) {
          manipulatedString = '(';
          components.forEach((component, index) => {
            const componentGlobalId = this.contents[component]?.globalId;
            if (index === components.length - 1) {
              manipulatedString = `${manipulatedString} ${componentGlobalId} )[]`;
            } else {
              manipulatedString = `${manipulatedString} ${componentGlobalId} |`;
            }
          });
        }
        return manipulatedString;
      }
      case 'component': {
        let componentGlobalId = '';
        if (field.component) {
          componentGlobalId = this.contents[field.component]?.globalId;
        }
        return field.repeatable ? `${componentGlobalId}[]` : componentGlobalId;
      }
      case 'relation': {
        let prefix = '';
        let suffix = '';

        if (field.relation === 'oneToMany') {
          suffix = `[]`;
        }

        if (field.target) {
          const k = field.target;
          prefix = this.contents[k]?.globalId;
        }

        if (field.relation === 'morphToMany') {
          suffix = `any /// [Morph To Many Relation] - Needs To find an optimal solution`;
        }

        return `${prefix}${suffix}`;
      }

      default:
        return field.type;
    }
  };
}
