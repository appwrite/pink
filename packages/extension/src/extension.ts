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
    let extractedClasses;
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
