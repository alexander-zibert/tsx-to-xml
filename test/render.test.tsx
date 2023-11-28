import { expect, test } from "vitest";
import { TsxXmlNode, render } from "../src";

// disable typescript "Cannot find name React"
const React = "";

// https://www.innoq.com/en/blog/2019/10/type-checking-tsx/
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      foo: any;
    }
  }
}

type PropsWithChildren<P> = P & { children?: unknown[] };

function Custom(props: PropsWithChildren<{}>) {
  return <foo>{props.children}</foo>;
}

function Children({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      {children}
      <div>
        {children}
        {children}
      </div>
    </div>
  );
}

const props = { a: 1, b: 2, c: 3, d: "test" };

test("that rendering works", () => {
  expect(render(<div></div>)).toBe("<div />");
  expect(render(<div />)).toBe("<div />");
  expect(
    render(
      <>
        <div />
      </>
    )
  ).toBe("<div />");
  expect(render(<div a="2" />)).toBe('<div a="2" />');
  expect(render(<div a="2" b={false} c />)).toBe(
    '<div a="2" b="false" c="true" />'
  );
  expect(
    render(
      <div a="2" b={false} c>
        test
      </div>
    )
  ).toBe('<div a="2" b="false" c="true">test</div>');
  expect(render(<div>{"<div />"}</div>)).toBe("<div>&lt;div /&gt;</div>");
  expect(render(<div {...props} d="test2"></div>)).toBe(
    '<div a="1" b="2" c="3" d="test2" />'
  );
  expect(render(<Custom />)).toBe("<foo />");
  expect(
    render(
      <Custom>
        {1}
        {2}
      </Custom>
    )
  ).toBe("<foo>12</foo>");
  expect(
    render(
      <Children>
        <foo></foo>
      </Children>
    )
  ).toBe("<div><foo /><div><foo /><foo /></div></div>");

  const TagName = "div";
  expect(render(<TagName></TagName>)).toBe("<div />");
  expect(
    render(
      <div>
        {1},{2}
        <div>
          {3} {4}
        </div>
      </div>
    )
  ).toBe("<div>1,2<div>3 4</div></div>");
  // this behavior is different from react but makes more sense
  // ref: https://github.com/facebook/react/blob/c17a27ef492d9812351aecdfb017488e8e8404ce/packages/react/src/__tests__/ReactJSXElement-test.js#L109
  expect(render(<div children="2"></div>)).toBe("<div>2</div>");
});
