import Prism from "prismjs";

/**
 * Receives a string and returns a wrapped string, with max
 * n characters per line, and a given indentation before each line.
 */
function wrapStr(str: string, n: number, indent: string): string {
  // remove line breaks and tabs
  str = str.replaceAll(/[\r\n\t]/g, "");
  const words = str.split(/\s/);
  const lines = words.reduce((acc, word) => {
    const lastLine = acc[acc.length - 1];

    if (acc.length === 0 || lastLine.length + word.length + 1 > n) {
      return [...acc, indent + word];
    }

    return [...acc.slice(0, -1), lastLine + " " + word];
  }, [] as string[]);

  return lines.join("\r");
}

function wrapTag(tag: string, indent: string) {
  let result = [];
  const parts = tag.split(" ");
  result.push(parts[0]);

  for (const part of parts.slice(1, -1)) {
    result.push("  " + part);
  }

  result.push(parts[parts.length - 1]);

  return result.map((p) => indent + p).join("\r");
}

export function newFormat(html: string, maxLength = 100) {
  const result = "";
  let indent = "";

  const toParse = html.replaceAll(/(\n|\r)/g, "").replaceAll(/\s\s+/g, " ");

  let index = 0;
  while (index < toParse.length) {
    const char = toParse[index];
    if (char === "<") {
      const endTagIndex = toParse.indexOf(">", index);
      const isSelfClosing = toParse[endTagIndex - 1] === "/";
      const fullTag = toParse.substring(index, endTagIndex + 1);

      if (fullTag.length > maxLength) {
        console.log("fullTag", fullTag);
        console.log("wrapTag", wrapTag(fullTag, indent));
      }
      index = endTagIndex + 1;
    }
    index++;
  }

  return result;
}

export function format(html: string, maxLength = 100) {
  let formatted = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    // Decrease indent if line is a closing tag
    if (element.match(/^\/\w/)) indent = indent.substring(2);

    // Match opening tag, e.g. <div id="foo">button text</div> should match <div id="foo"> and
    // <input type="text" /> should match <input type="text" />
    const openingTagMatch = element.match(/^(\w+)(.*?)(\/?>)/s);
    const openingTag = openingTagMatch ? openingTagMatch : null;
    console.log("element", element);
    console.log("openingTag", openingTag);

    // By default, we just add the element with the current indent before it
    let toConcatenate = indent + "<" + element + ">\r";

    const contentMatch = element.match(/(.*?>)(.*?)(<.*)/s);
    if (contentMatch && toConcatenate.length > maxLength) {
      const [_, left, content, right] = contentMatch;
      toConcatenate =
        indent +
        "<" +
        left +
        "\r" +
        wrapStr(content, maxLength, indent + "  ") +
        "\r" +
        indent +
        right +
        ">\r";
    }

    formatted += toConcatenate;

    // Increase indent if element is a non-self-closing tag and not an input tag
    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += "  ";
    }
  });

  return formatted.substring(1, formatted.length - 2);
}

export function highlight(code: string, language: string, maxLength = 100) {
  return Prism.highlight(
    format(code, maxLength),
    Prism.languages[language],
    language
  );
}
