import type { PageLoad } from './$types';
import ts from 'typescript';
import raw from '@appwrite.io/pink/Badge.svelte.d.ts?raw';

export const load: PageLoad = async () => {
    const sourceFile = ts.createSourceFile('temp.d.ts', raw, ts.ScriptTarget.Latest);
    const program = ts.createProgram(['temp.d.ts'], { noResolve: true });
    const checker = program.getTypeChecker();
    const props: Record<string, unknown>[] = [];

    ts.forEachChild(sourceFile, node => {
         if (ts.isTypeAliasDeclaration(node) && node.name.text === 'BadgeProps') {
             const type = checker.getTypeAtLocation(node);
             const properties = type.getProperties();
             for (const property of properties) {
                 const name = property.getName();
                 const type = checker.typeToString(checker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!));
                 props.push({ name, type });
             }
         }
     });
    console.log(props);

    // ast.forEachChild(child => {
    //     console.log(child);
    // });
    // const source = ts.createSourceFile('')
    return {};
};
