import Prism from "prismjs";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";

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

export function customFormat(html: string, maxLength = 100) {
  let formatted = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    // Decrease indent if line is a closing tag
    if (element.match(/^\/\w/)) indent = indent.substring(2);

    // Match opening tag, e.g. <div id="foo">button text</div> should match <div id="foo"> and
    // <input type="text" /> should match <input type="text" />
    const openingTagMatch = element.match(/^(\w+)(.*?)(\/?>)/s);
    const openingTag = openingTagMatch ? openingTagMatch : null;

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

export function format(html: string, maxLength = 100) {
  try {
    return prettier.format(html, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: maxLength,
    });
  } catch {
    console.log("Failed to format HTML, using custom formatter");
    return customFormat(html, maxLength);
  }
}

export function highlight(code: string, language: string, maxLength?: number) {
  return Prism.highlight(
    format(code, maxLength),
    Prism.languages[language],
    language
  );
}
