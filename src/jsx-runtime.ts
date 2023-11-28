export function createElement(type: any, attrs: any, children: any): any {
  return { type, attrs, children };
}

function normalizeChildren(children: any): any[] {
  if (children === undefined) {
    return [];
  }
  if (!Array.isArray(children)) {
    return [children];
  }
  return children.flat();
}

export function jsx(type: any, props: any, key: any): any {
  let { children, ...attrs } = props;
  if (key !== undefined) {
    attrs.key = key;
  }
  children = normalizeChildren(children);

  if (typeof type === "function") {
    return type({ children, ...attrs });
  }
  return createElement(type, attrs, children);
}

export const jsxs = jsx;

export const Fragment = Symbol.for("tsx-to-xml.fragment");
