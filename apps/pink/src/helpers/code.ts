import * as Prism from "prismjs";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import parserBabel from "prettier/parser-babel";
/**
 * Receives a string and returns a wrapped string, with max
 * n characters per line, and a given indentation before each line.
 */
function wrapStr(str: string, n: number, indent: string): string {
  // Remove line breaks and tabs
  str = str.replace(/[\r\n\t]/g, "");
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

    // Match opening tag
    const openingTagMatch = element.match(/^(\w+)(.*?)(\/?>)/s);
    const openingTag = openingTagMatch ? openingTagMatch[0] : null;

    // By default, add the element with the current indent
    let toConcatenate = indent + "<" + element + ">\r";

    // Match content inside tags
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

export function formatHtml(html: string, maxLength = 100) {
  try {
    return prettier.format(html, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: maxLength,
      htmlWhitespaceSensitivity: "ignore",
    });
  } catch (error) {
    console.error("Failed to format HTML using Prettier, falling back to custom formatter:", error);
    return customFormat(html, maxLength);
  }
}

export function formatJs(js: string, maxLength = 100) {
  try {
    return prettier.format(js, {
      parser: "babel",
      plugins: [parserBabel],
      printWidth: maxLength,
    });
  } catch (error) {
    console.error("Failed to format JavaScript using Prettier:", error);
    return js; // Return the original JS code if formatting fails
  }
}

const defaultConfig = {
  language: "html",
  maxLength: 100,
  format: true,
};

export function highlight(code: string, config?: Partial<typeof defaultConfig>) {
  const { language, maxLength, format } = { ...defaultConfig, ...config };
  let formattedCode = code;

  try {
    if (format) {
      formattedCode = language === "html" ? formatHtml(code, maxLength) : formatJs(code, maxLength);
    }
  } catch (error) {
    console.error("Formatting failed:", error);
  }

  try {
    return Prism.highlight(formattedCode, Prism.languages[language], language);
  } catch (error) {
    console.error("Highlighting failed:", error);
    return formattedCode; // Return the formatted code even if highlighting fails
  }
}
