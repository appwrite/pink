import MiniSearch from "minisearch";
import glob from "glob";
import fs from "fs";

function readHtmlContent(path) {
  const html = fs.readFileSync(path, "utf-8");

  let content = html.match(/<body>(.*?)<\/body>/s)?.[1] ?? html;

  // remove script tags
  content = content.replace(/<script.*?>.*?<\/script>/gs, "");
  // remove style tags
  content = content.replace(/<style.*?>.*?<\/style>/gs, "");
  // remove html tags
  content = content.replace(/<.*?>/gs, " ");

  // remove newlines
  content = content.replace(/\n/g, " ");
  // remove extra spaces
  content = content.replace(/\s\s+/g, " ");

  return content;
}

const paths = glob.sync("dist/**/*.html");
const documents = paths.map((path, index) => {
  const content = readHtmlContent(path);
  // Get title from last path folders, excluding dist. e.g. dist/components/avatar/index.html
  // should return 'Components - Avatar'
  const title =
    path.replace("-", " ").split("/").slice(1, -1).join(" - ") || "home";
  const url = path.replace("dist", "").replace("/index.html", "");

  return { id: index, title, content, url };
});

let miniSearch = new MiniSearch({
  fields: ["title", "content"], // fields to index for full-text search
  storeFields: ["title", "content", "url"], // fields to return with search results
});

await miniSearch.addAllAsync(documents);

// Write documents to json
fs.writeFileSync("dist/search.json", JSON.stringify(miniSearch.toJSON()));
fs.writeFileSync("public/search.json", JSON.stringify(miniSearch.toJSON()));
