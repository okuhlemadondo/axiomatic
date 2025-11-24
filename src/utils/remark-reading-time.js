import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
    return function (tree, file) {
        const textOnPage = toString(tree);
        const readingTime = Math.ceil(textOnPage.split(/\s+/).length / 200);

        // Create an export node
        // export const readTime = "X MIN";
        const exportNode = {
            type: 'mdxjsEsm',
            value: `export const readTime = "${readingTime} MIN";`,
            data: {
                estree: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExportNamedDeclaration',
                            declaration: {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'readTime'
                                        },
                                        init: {
                                            type: 'Literal',
                                            value: `${readingTime} MIN`,
                                            raw: `"${readingTime} MIN"`
                                        }
                                    }
                                ],
                                kind: 'const'
                            },
                            specifiers: [],
                            source: null
                        }
                    ],
                    sourceType: 'module'
                }
            }
        };

        // Append to the tree
        tree.children.push(exportNode);
    };
}
