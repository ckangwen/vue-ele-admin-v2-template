const fs = require("fs");
const { resolve } = require("path");
const pages = require("./pages");
const { camelize, upperCaseFirst } = require("./utils");

const VIEW_PATH = resolve(__dirname, "../src/modules");

const createPageTemplate = (pageName) => `<template>
  <global-page-container>
  </global-page-container>
</template>

<script>
export default {
  name: "${pageName}",
};
</script>

`;

if (!fs.existsSync(VIEW_PATH)) {
  fs.mkdirSync(VIEW_PATH);
}

pages.forEach((pagePath) => {
  const [moduleName, childName] = pagePath.split("/");

  const modulePath = resolve(VIEW_PATH, moduleName);
  const moduleReadmePath = resolve(modulePath, "README.md");
  const moduleViewPath = resolve(VIEW_PATH, `./${moduleName}/views`);
  const moduleServicePath = resolve(VIEW_PATH, `./${moduleName}/services`);
  const moduleChildPath = resolve(modulePath, `./views/${childName}.vue`);
  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
  }
  if (!fs.existsSync(moduleViewPath)) {
    fs.mkdirSync(moduleViewPath);
  }
  if (!fs.existsSync(moduleServicePath)) {
    fs.mkdirSync(moduleServicePath);
  }
  if (!fs.existsSync(moduleReadmePath)) {
    const readmeTemplateContent = fs.readFileSync(
      resolve(__dirname, "./MODULE_README_TEMPLATE.md"),
      { encoding: "utf-8" },
    );
    fs.writeFileSync(moduleReadmePath, readmeTemplateContent);
  }

  if (fs.existsSync(moduleChildPath)) {
    console.log(`${moduleChildPath} already exists`);
  } else {
    fs.writeFileSync(moduleChildPath, createPageTemplate(upperCaseFirst(camelize(`${moduleName}-${childName}-page`))));
  }
});
