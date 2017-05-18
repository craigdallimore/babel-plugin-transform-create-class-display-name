"use strict";

module.exports = function (babel) {

  var t = babel.types;

  var createClassConfigVisitor = {
    CallExpression : function(path, state) {
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
      VariableDeclarator : function(path, state) {

        if (
          path.node.init &&
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

};
