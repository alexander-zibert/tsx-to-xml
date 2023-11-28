# TSX-to-XML

## Install

```
npm i -S tsx-to-xml
```

Add the following lines to your `tsconfig.json` so that JSX/TSX is compiled to the correct imports for this package:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "tsx-to-xml"
  }
}
```


## Basic Usage

```tsx
import { render } from 'tsx-to-xml';

console.log(render(<div prop="3">Hello, XML!</div>));
```
