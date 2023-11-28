import { Fragment } from "./jsx-runtime";

const xmlSpecialChars = /[<>&'"]/g;

export type TsxXmlNode = {
  type: string | typeof Fragment;
  children: TsxXmlNode[];
  attrs: { [key: string]: any };
};

export function render(node: TsxXmlNode): string {
  if (typeof node !== "object") {
    return stringify(node);
  }
  const { type, children, attrs } = node;
  if (type === Fragment) {
    return children.map(render).join("");
  }
  if (children.length === 0) {
    return `<${type}${stringifyAttrs(attrs)} />`;
  }
  return `<${type}${stringifyAttrs(attrs)}>${children
    .map(render)
    .join("")}</${type}>`;
}

function replacements(match: string) {
  switch (match) {
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case "&":
      return "&amp;";
    case "'":
      return "&apos;";
    case '"':
      return "&quot;";
    default:
      return match;
  }
}

function encodeXmlSpecialChars(input: string) {
  return input.replace(xmlSpecialChars, replacements);
}

function stringifyAttrs(attrs: any) {
  const entries = Object.entries(attrs).filter(
    ([key, val]) => val !== undefined
  );
  if (entries.length === 0) {
    return "";
  }
  return (
    " " +
    entries
      .map(([key, value]) => {
        return `${key}="${stringify(value)}"`;
      })
      .join(" ")
  );
}

function stringify(val: any) {
  if (typeof val === "string") {
    return encodeXmlSpecialChars(val);
  }
  return encodeXmlSpecialChars(JSON.stringify(val));
}
