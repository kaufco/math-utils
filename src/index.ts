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
 * Converts a value from range _0 .. 1_ (inclusive) to range _startValue .. endValue_ (inclusive).
 *
 * @param value value to convert
 * @param startValue start value of the range
 * @param endValue end value of the range
 */
export function unitToRange(value: number, startValue: number, endValue: number): number {
    return startValue + value * (endValue - startValue);
}

/**
 * Converts a value from range _startValue .. endValue_ (inclusive) to range _0 .. 1_ (inclusive).
 *
 * @param value value to convert
 * @param startValue start value of the range
 * @param endValue end value of the range
 */
export function rangeToUnit(value: number, startValue: number, endValue: number): number {
    return (value - startValue) / (endValue - startValue);
}

/**
 * Converts a value from range _0 .. 1_ (inclusive) to an integer value in the range _0 .. 255_ (inclusive).
 *
 * @param value value to convert
 */
export function unitToUByte(value: number): number {
    return Math.round(unitToRange(value, 0, 255));
}

/**
 * Converts a value from range _0 .. 1_ (inclusive) to an integer value in the range _0 .. 255_ (inclusive).
 *
 * @param value value to convert
 */
export function uByteToUnit(value: number): number {
    return rangeToUnit(value, 0, 255);
}

/**
 * Modulo operation with an always positive remainder.
 * In contrast, in _a % b_ the remainder has the sign of the dividend.
 *
 * @example
 *
 * _-13 % 5 = -3_, but _mod(-13, 5) = 2_
 *
 * @param a dividend
 * @param b divisor
 */
export function mod(a: number, b: number): number {
    const r = a % b;
    return r < 0 ? r + b : r === -0 ? 0 : r;
}
