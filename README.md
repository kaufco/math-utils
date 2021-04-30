# @kobayami/math-utils

## Installation

```sh
npm install --save @kobayami/math.utils
```

## Version and License

- Latest version: 1.1.2
- License: [MIT](https://kobayami.github.io/math-utils/LICENSE.md)
- [Changes](https://github.com/kobayami/math-utils/CHANGES.md)

## Summary

Some little math helper functions that cover the following areas:

- Division and modulo
- Lerp functions (linear interpolation)
- Clamp functions
- Root and logarithm
- Sign and integer
- Rounding

## Usage Example

```ts
import { mod, divFloor, divTrunc } from "@kobayami/math-utils/lib";

const two = mod(-13, 5);
const minusThree = divFloor(-13, 5);
const minusTwo = divTrunc(-15, 5);
```

## See Also

- [API Documentation](https://kobayami.github.io/math-utils/docs/modules.html)
- [Project Homepage](https://kobayami.github.io/math-utils)
- [Project on GitHub](https://github.com/kobayami/math-utils)
- [Issues](https://github.com/kobayami/math-utils/issues)
