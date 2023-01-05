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

export function format(html: string, maxLength = 100) {
  let formatted = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    // Decrease indent if line is a closing tag
    if (element.match(/^\/\w/)) indent = indent.substring(2);

    // By default, we just add the element with the current indent before it
    let toConcatenate = indent + "<" + element + ">\r";

    // If the element is too long, wrap its content

    const contentMatch = element.match(/(.*?>)(.*?)(<.*)/s);
    if (contentMatch && toConcatenate.length > maxLength) {
      const [_, left, content, right] = contentMatch;
      toConcatenate =
        indent +
        "<" +
        left +
        "\n" +
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
