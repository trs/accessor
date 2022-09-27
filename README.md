# `@trs/accessor`

[![npm](https://img.shields.io/npm/v/@trs/accessor)](https://www.npmjs.com/package/@trs/accessor)
[![github](https://img.shields.io/badge/github-trs/accessor-blue)](https://github.com/trs/accessor)

Deeply access the path of a Javascript object using a JSONPath-like syntax with support for sub-selects.

## Getting Started

```ts
import {access} from '@trs/accessor';

const value = {
  a: {
    b: [1, 2],
  },
};

const path = 'a.b[1]';

const result = access(path, value);

assert(result === 2);
```

## Usage

Paths can be resolved using sub-paths surrounded by curly braces (`{}`). These are resolved outward.

```ts
const value = {
  a: {
    a1: [3, 4]
  },
  b: {
    b2: 'c'
  }
  c: 1,
}

const path = 'a.a1[{{b.b2}}]';

const result = access(path, value);

assert(result === 4);
```

Here we resolve `b.b2` first, giving us `'c'`. As this is also wrapped in curly braces, we resolve `c` giving us `1`. We then resolve `a.a1[1]` giving us `4`.
