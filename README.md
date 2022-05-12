# strapi-type-generator

Generate Strapi Content types 

## Installation

```bash

npm i @kmariappan/strapi-type-generator

or

yarn add @kmariappan/strapi-type-generator

```

## Usage

Create a file (ex:.build.js) in the strapi project root folder.

```js

const { generateTypes } = require("@kmariappan/strapi-type-generator");

generateTypes()
  .then(() => {
    console.log("Hurra!!! finally got Types 🔥");
  })
  .catch((err) => {
    console.log(err);
  });

```