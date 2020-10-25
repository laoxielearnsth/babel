let t;

export default function ourBabelPlugin() {
  return {
    visitor: {
      FunctionDeclaration(path) {
        if (path.get("curry").node) {
          path.node.curry = false;
          path.replaceWith(
            t.variableDeclaration("const", [
              t.variableDeclarator(
                t.identifier(path.get("id.name").node),
                t.callExpression(t.identifier("curring"), [
                  t.toExpression(path.node),
                ]),
              ),
            ]),
          );
        }
      },
    },
  };
}

// eslint-disable-next-line no-unused-vars
function currying(fn) {
  const numParamsRequired = fn.length;

  function curryFactory(params) {
    return function (...args) {
      const newParams = params.concat(args);
      if (newParams.length >= numParamsRequired) {
        return fn(...newParams);
      }
      return curryFactory(newParams);
    };
  }

  return curryFactory([]);
}
