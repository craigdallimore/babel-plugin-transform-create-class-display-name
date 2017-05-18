export default function (babel) {

  const { types: t } = babel;

  const createClassConfigVisitor = {
    CallExpression(path, state) {
      if (path.node.callee.name === 'reactCreateClass') {
        path.node.arguments[0].properties.push(
          t.objectProperty(
            t.identifier('displayName'),
            t.stringLiteral(this.displayName)
          )
        );
      }
    }
 };

  return {
    visitor: {
      VariableDeclarator(path, state) {

        if (
          path.node.init.type        === 'CallExpression' &&
          path.node.init.callee.name === 'reactCreateClass'
        ) {

          path.traverse(createClassConfigVisitor, {
            displayName : path.node.id.name
          });

        }
      },

    }
  };

}
