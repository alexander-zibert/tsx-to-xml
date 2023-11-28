import { jsx, jsxs } from "./jsx-runtime";

export function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStaticChildren: any,
  source: any,
  self: any
) {
  if (isStaticChildren) {
    return jsxs(type, props, key);
  } else {
    return jsx(type, props, key);
  }
}
export { Fragment } from "./jsx-runtime";
