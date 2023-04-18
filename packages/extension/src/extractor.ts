const fs = require("fs");
import postcss from "postcss";

const path = require("path");
const cssFilePath = path.resolve(
  __dirname,
  "../node_modules/@appwrite.io/pink/dist/pink.css"
);

export async function extractClassNames(): Promise<string[]> {
  const cssContent = fs.readFileSync(cssFilePath, "utf8");
  const root = await postcss.parse(cssContent);
  const classNames: string[] = [];

  root.walkRules((rule) => {
    if (rule.selector.startsWith(".")) {
      const className = rule.selector.slice(1).trim();
      classNames.push(className);
    }
  });

  return classNames;
}
