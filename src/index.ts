/**
 * Constrains a value to lie between a minimum and a maximum value.
 *
 * @param value value to constrain
 * @param minValue minimum value (inclusive)
 * @param maxValue maximum value (inclusive)
 */
export function clamp(value: number, minValue: number, maxValue: number): number {
    return Math.max(minValue, Math.min(value, maxValue));
}

/**
 * Constrains a value to lie between _0_ and _1_ (inclusive).
 *
 * @param value value to constrain
 */
export function clampUnit(value: number): number {
    return clamp(value, 0, 1);
}

/**
 * Converts a value from range _0 .. 1_ (inclusive)
 * to range _startValueTo .. endValueTo_ (inclusive)
 * by linear interpolation.
 *
 * This is equivalent to the [Lerp](https://en.wikipedia.org/wiki/Linear_interpolation) function,
 * where _value_ is the interpolation ratio, and the return value is the interpolated value.
 *
 * @param value value to convert, or interpolation ratio
 * @param startValueTo start value of the target range
 * @param endValueTo end value of the target range
 */
export function unitToRange(value: number, startValueTo: number, endValueTo: number): number {
    return startValueTo + value * (endValueTo - startValueTo);
}

/**
 * Converts a value from range _startValueFrom .. endValueFrom_ (inclusive)
 * to range _0 .. 1_ (inclusive)
 * by linear interpolation.
 *
 * This is equivalent to the inverse of the [Lerp](https://en.wikipedia.org/wiki/Linear_interpolation) function,
 * where _value_ is the interpolated value, and the return value is the interpolation ratio.
 *
 * @param value value to convert, or interpolated value
 * @param startValueFrom start value of the source range
 * @param endValueFrom end value of the source range
 */
export function rangeToUnit(value: number, startValueFrom: number, endValueFrom: number): number {
    return (value - startValueFrom) / (endValueFrom - startValueFrom);
}

/**
 * Converts a value from range _startValueFrom .. endValueFrom_ (inclusive)
 * to range _startValueTo .. endValueTo_ (inclusive)
 * by linear interpolation.
 *
 * @param value value to convert, or interpolated value
 * @param startValueFrom start value of the source range
 * @param endValueFrom end value of the source range
 * @param startValueTo start value of the target range
 * @param endValueTo end value of the target range
 */
export function rangeToRange(
    value: number,
    startValueFrom: number,
    endValueFrom: number,
    startValueTo: number,
    endValueTo: number,
): number {
    return unitToRange(rangeToUnit(value, startValueFrom, endValueFrom), startValueTo, endValueTo);
}

/**
 * Converts a value from range _0 .. 1_ (inclusive)
 * to an integer number in the range _0 .. 255_ (inclusive)
 * by linear interpolation.
 *
 * @param value value to convert, or interpolation ratio
 */
export function unitToUByte(value: number): number {
    return Math.round(unitToRange(value, 0, 255));
}

/**
 * Converts an integer number in the range _0 .. 255_ (inclusive)
 * to range _0 .. 1_ (inclusive)
 * by linear interpolation.
 *
 * @param value integer number to convert, or interpolated value
 */
export function uByteToUnit(value: number): number {
    return rangeToUnit(toInt32(value), 0, 255);
}

/**
 * Modulo operation with an always positive remainder.
 * In contrast, in _a % b_ the remainder has the sign of the dividend.
 *
 * @example
 *
 * ```ts
 * -13 % 5 === -3
 * // but:
 * mod(-13, 5) === 2
 * ```
 *
 * @param a dividend
 * @param b divisor
 */
export function mod(a: number, b: number): number {
    const r = maskMinus0(a % b);
    return r < 0 ? r + b : r;
}

/**
 * Divide operation that returns only the integer part of the quotient,
 * such that _a = div(a, b) * b + mod(a, b)_.
 * That is, the division result is rounded down.
 *
 * @example
 *
 * ```ts
 * divFloor(-13, 5) // equals -3
 * divFloor(-10, 5) // equals -2
 * divFloor(7, 5)   // equals 1
 * divFloor(15, 5)  // equals 3
 * ```
 *
 * @param a dividend
 * @param b divisor
 */
export function divFloor(a: number, b: number): number {
    return maskMinus0(Math.floor(a / b));
}

/**
 * Divide operation that returns only the integer part of the quotient,
 * such that _a = div(a, b) * b + a % b_.
 * That is, the division result is rounded towards zero.
 *
 * @example
 *
 * ```ts
 * divTrunc(-13, 5) // equals -2
 * divTrunc(-10, 5) // equals -2
 * divTrunc(7, 5)   // equals 1
 * divTrunc(15, 5)  // equals 3
 * ```
 *
 * @param a dividend
 * @param b divisor
 */
export function divTrunc(a: number, b: number): number {
    return maskMinus0(Math.trunc(a / b));
}

/**
 * Returns the fractional part, i.e., the decimal places of a value.
 *
 * @param value the value
 */
export function frac(value: number): number {
    return value - Math.trunc(value);
}

/**
 * Rounds a value to a number of decimal places.
 * If that number is negative, then the rightmost digits left from the decimal point are also rounded.
 *
 * @example
 *
 * ```ts
 * roundPositions(1234.5678)      // equals 1234
 * roundPositions(1234.5678, 2)   // equals 1234.57
 * roundPositions(1234.5678, -2)  // equals 1200
 * roundPositions(0x7ac3, -2, 16) // equals 0x7b00
 * ```
 *
 * @param value value to round
 * @param radix radix of the number system
 * @param digits accuracy in digits of the given radix
 */
export function round(value: number, digits: number = 0, radix: number = 10): number {
    const exponent = digits * Math.log(radix);
    return Math.round(value * Math.exp(exponent)) * Math.exp(-exponent);
}

/**
 * Returns the smallest integer that is strictly greater than the given value.
 *
 * @param value the value
 */
export function higher(value: number) {
    return isInteger(value) ? value + 1 : Math.ceil(value);
}

/**
 * Returns the greatest integer that is strictly less than the given value.
 *
 * @param value the value
 */
export function lower(value: number) {
    return isInteger(value) ? value - 1 : Math.floor(value);
}

/**
 * Returns the _exponent_, such that _value = radix^exponent_.
 *
 * @param value _radix^exponent_
 * @param radix _radix_
 */
export function log(value: number, radix: number): number {
    return Math.log(value) / Math.log(radix);
}

/**
 * Returns the _radix_, such that _value = radix^exponent_.
 *
 * @param value _radix^exponent_
 * @param exponent _exponent_
 */
export function root(value: number, exponent: number): number {
    return Math.exp(Math.log(value) / exponent);
}

/**
 * Returns the number of digits required to represent the integral part of a value
 * in a number system with the given radix.
 *
 * @param value the value
 * @param radix radix of the number system
 */
export function getDigits(value: number, radix: number): number {
    const adjustedValue = Math.max(Math.abs(value), 1);
    return higher(log(adjustedValue, radix));
}

/**
 * Returns the number of decimals required to represent the integral part of a value.
 *
 * @param value the value
 */
export function getDecimals(value: number): number {
    return getDigits(value, 10);
}

/**
 * Converts a value into a 32 bit signed integer number.
 *
 * This behaves like cutting the off the decimal places of the number (instead of rounding),
 * then taking the lower 32 bits of the result and interpreting them as a two's complement value.
 * This is equivalent to _value ^ 0_, because in JavaScript, bitwise operations use 32 bit operands.
 *
 * @param value the value
 */
export function toInt32(value: number): number {
    return value ^ 0;
}

/**
 * Returns _true_ if a value is a 32 bit integer, i.e., lies in the range _-2^31 .. 2^31-1_
 * and its fractional part is zero.
 *
 * @param value the value
 */

export function isInt32(value: number): boolean {
    return value === (value ^ 0);
}

/**
 * Returns _true_ if a value is an integer, i.e., its fractional part is 0.
 *
 * @param value the value
 */
export function isInteger(value: number): boolean {
    return frac(value) === 0;
}

/**
 * Replaces _-0_ with _0_, and otherwise just returns _value_.
 *
 * @param value value that may be _-0_
 */
export function maskMinus0(value: number): number {
    return value === -0 ? 0 : value;
}

/**
 * Returns the sign of a value, but unlike _Math.sign()_, returns _0_ for both _-0_ and _0_.
 *
 * @param value the value
 */
export function signum(value: number): number {
    return maskMinus0(Math.sign(value));
}

/**
 * Converts a value from radians into degrees.
 *
 * @param radians value in radians.
 */
export function radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
}

/**
 * Converts a value from degrees into radians.
 *
 * @param degrees value in degrees.
 */
export function degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}

/**
 * Maps a value, given in radians, into the modulus range _0_ (inclusive) to _2 * PI_ (exclusive).
 *
 * That is:
 *
 * - _-0.5 * PI_ is mapped to _1.5 * PI_
 * - _2 * PI_ is mapped to _0_
 * - _2.5 * PI_ is mapped to _0.5 * PI_
 *
 * @param radians
 */
export function radiansToDefaultRange(radians: number): number {
    return mod(radians, 2 * Math.PI);
}

/**
 * Maps a value, given in degrees, into the modulus range _0_ (inclusive) to _360_ (exclusive).
 *
 * That is:
 *
 * - _-90_ is mapped to _270_
 * - _360_ is mapped to _0_
 * - _450_ is mapped to _90_
 *
 * @param degrees
 */
export function degreesToDefaultRange(degrees: number): number {
    return mod(degrees, 360);
}
