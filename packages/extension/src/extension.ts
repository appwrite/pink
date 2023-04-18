import * as vscode from "vscode";
import { extractClassNames } from "./extractor";

export function activate(context: vscode.ExtensionContext) {
  const selector: vscode.DocumentSelector = {
    pattern: "**/*.{js,jsx,vue,svelte}",
    scheme: "file",
  };

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      selector,
      {
        provideCompletionItems: cssIntellisenseCompletionProvider,
      },
      ".",
      " ",
      ":",
      "-"
    )
  );
}

const cssIntellisenseCompletionProvider: vscode.CompletionItemProvider["provideCompletionItems"] =
  async (
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken,
    _context: vscode.CompletionContext
  ): Promise<vscode.CompletionItem[] | vscode.CompletionList> => {
    const range = document.getWordRangeAtPosition(position, /[\w-]+/);
    const currentWord = document.getText(range);

    const lineText = document.lineAt(position.line).text;
    const beforePositionText = lineText.slice(0, position.character);
    const afterPositionText = lineText.slice(position.character);

    // Check if the current position is inside class quotes
    const classTag = "class";
    const openingQuote =
      beforePositionText.lastIndexOf(`${classTag}="`) !== -1
        ? beforePositionText.lastIndexOf(`${classTag}="`) +
          `${classTag}="`.length
        : beforePositionText.lastIndexOf(`${classTag}='`) +
          `${classTag}='`.length;

    const closingQuote =
      afterPositionText.indexOf('"') !== -1
        ? afterPositionText.indexOf('"')
        : afterPositionText.indexOf("'");

    const inClassQuotes =
      openingQuote !== -1 &&
      closingQuote !== -1 &&
      beforePositionText.length - openingQuote >= 0 &&
      closingQuote >= 0;

    if (!inClassQuotes) {
      return [];
    }

    let extractedClasses: string[] = [];
    try {
      extractedClasses = await extractClassNames();
    } catch (error) {
      throw new Error(error);
    }

    const classNames = [
      // List your CSS library class names here.
      // For example:
      "arman",
      "torsten",
      "thomas",
      "elad",
      ...extractedClasses,
    ];

    return classNames
      .filter((className) => className.startsWith(currentWord))
      .map((className) => {
        const completionItem = new vscode.CompletionItem(className);
        completionItem.insertText = className;
        return completionItem;
      });
  };
