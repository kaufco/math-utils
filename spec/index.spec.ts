// @ts-ignore
import {
    clamp,
    clampUnit,
    degreesToDefaultRange,
    degreesToRadians,
    divFloor,
    divTrunc,
    getDigits,
    log,
    maskMinus0,
    mod,
    radiansToDefaultRange,
    radiansToDegrees,
    rangeToRange,
    rangeToUnit,
    root,
    signum,
    uByteToUnit,
    unitToRange,
    unitToUByte,
} from '../src';

describe('Test Suite', () => {
    it('clamp', () => {
        for (const [value, minValue, maxValue, expected] of [
            [-1, 3, 7, 3],
            [3, 3, 7, 3],
            [5, 3, 7, 5],
            [7, 3, 7, 7],
            [11, 3, 7, 7],
        ]) {
            expect(clamp(value!, minValue!, maxValue!)).toEqual(expected!);
        }
    });
    it('clampUnit', () => {
        for (const [value, expected] of [
            [-1, 0],
            [0, 0],
            [0.2, 0.2],
            [1, 1],
            [1.1, 1],
        ]) {
            expect(clampUnit(value!)).toEqual(expected!);
        }
    });
    it('rangeToUnit, unitToRange', () => {
        for (const [value, startValue, endValue, expected] of [
            [12, 20, 30, -0.8],
            [20, 20, 30, 0],
            [27, 20, 30, 0.7],
            [30, 20, 30, 1],
            [39, 20, 30, 1.9],
        ]) {
            expect(rangeToUnit(value!, startValue!, endValue!)).toEqual(expected!);
            expect(unitToRange(expected!, startValue!, endValue!)).toEqual(value!);
        }
    });
    it('rangeToRange', () => {
        for (const [value, startValueFrom, endValueFrom, startValueTo, endValueTo, expected] of [
            [12, 20, 30, 100, 200, 20],
            [20, 20, 30, 100, 200, 100],
            [27, 20, 30, 100, 200, 170],
            [30, 20, 30, 100, 200, 200],
            [39, 20, 30, 100, 200, 290],
        ]) {
            expect(rangeToRange(value!, startValueFrom!, endValueFrom!, startValueTo!, endValueTo!)).toEqual(expected!);
        }
    });
    it('unitToUByte', () => {
        for (const [value, expected] of [
            [-1, -255],
            [-0.5, -127],
            [0, 0],
            [0.125, 32],
            [0.25, 64],
            [0.5, 128],
            [0.75, 191],
            [1, 255],
            [1.25, 319],
            [1 / 3, 85],
            [2 / 3, 170],
            [20 / 255, 20],
            [20.4 / 255, 20],
            [20.5 / 255, 21],
            [20.6 / 255, 21],
        ]) {
            expect(unitToUByte(value!)).toEqual(expected!);
        }
    });
    it('uByteToUnit', () => {
        for (const [expected, value] of [
            [-1, -255],
            [-127 / 255, -127],
            [0, 0],
            [32 / 255, 32],
            [64 / 255, 64],
            [128 / 255, 128],
            [191 / 255, 191],
            [1, 255],
            [319 / 255, 319],
            [1 / 3, 85],
            [2 / 3, 170],
            [20 / 255, 20],
            [20 / 255, 20.4],
            [20 / 255, 20.5],
            [20 / 255, 20.6],
            [21 / 255, 21],
            [21 / 255, 21.4],
            [21 / 255, 21.5],
            [21 / 255, 21.6],
        ]) {
            expect(uByteToUnit(value!)).toEqual(expected!);
        }
    });
    it('maskMinus0, signum', () => {
        for (const [value, expectedMaskMinus0, expectedSignum] of [
            [-3.4, -3.4, -1],
            [-3, -3, -1],
            [-1, -1, -1],
            [-0.2, -0.2, -1],
            [-0, 0, 0],
            [0, 0, 0],
            [3, 3, 1],
            [5.2, 5.2, 1],
        ]) {
            expect(maskMinus0(value!)).toEqual(expectedMaskMinus0!);
            expect(signum(value!)).toEqual(expectedSignum!);
        }
    });
    it('mod, divFloor, divTrunc', () => {
        for (const [a, b, expectedMod, expectedDivFloor, expectedDivTrunc] of [
            [-13, 5, 2, -3, -2],
            [-8, 5, 2, -2, -1],
            [-3, 5, 2, -1, 0],
            [2, 5, 2, 0, 0],
            [7, 5, 2, 1, 1],
            [-16, 3, 2, -6, -5],
            [-17, 3, 1, -6, -5],
            [-18, 3, 0, -6, -6],
            [-19, 3, 2, -7, -6],
            [16, 3, 1, 5, 5],
            [17, 3, 2, 5, 5],
            [18, 3, 0, 6, 6],
            [19, 3, 1, 6, 6],
        ]) {
            expect(mod(a!, b!)).toEqual(expectedMod!);
            expect(divFloor(a!, b!)).toEqual(expectedDivFloor!);
            expect(divTrunc(a!, b!)).toEqual(expectedDivTrunc!);
            expect(b! * divFloor(a!, b!) + mod(a!, b!)).toEqual(a!);
            expect(b! * divTrunc(a!, b!) + (a! % b!)).toEqual(a!);
        }
    });
    it('degreesToRadians, radiansToDegrees, degreesToDefaultRange, radiansToDefaultRange', () => {
        for (const [degrees, radians] of [
            [-0, -0 * Math.PI],
            [0, 0],
            [45, 0.25 * Math.PI],
            [90, 0.5 * Math.PI],
            [180, Math.PI],
            [270, 1.5 * Math.PI],
            [315, 1.75 * Math.PI],
        ]) {
            for (let k = -3; k < 4; k++) {
                const kDegrees = degrees! + k * 360;
                const kRadians = radians! + k * 2 * Math.PI;
                expect(degreesToRadians(kDegrees)).toBeCloseTo(kRadians, 12);
                expect(radiansToDegrees(kRadians)).toBeCloseTo(kDegrees, 12);
                expect(degreesToDefaultRange(kDegrees)).toBeCloseTo(degrees!, 12);
                expect(radiansToDefaultRange(kRadians)).toBeCloseTo(radians!, 12);
            }
        }
    });
    it('log, root', () => {
        for (const [radix, exponent, value] of [
            [2, 3, 8],
            [2, 6, 64],
            [2, 16, 0x10000],
            [3, 0, 1],
            [3, 1, 3],
            [3, 2, 9],
            [3, 3, 27],
            [3, 4, 81],
            [3, 5, 243],
            [10, -2, 0.01],
            [10, -1, 0.1],
            [10, 0, 1],
            [10, 1, 10],
            [10, 2, 100],
            [10, 3, 1000],
            [10, 9, 1000000000],
            [Math.SQRT2, 2, 2],
            [Math.SQRT2, 10, 32],
        ]) {
            expect(log(value!, radix!)).toBeCloseTo(exponent!);
            if (exponent !== 0) {
                expect(root(value!, exponent!)).toBeCloseTo(radix!);
            }
        }
    });
    it('log, root', () => {
        for (const [radix, value, expected] of [
            [10, 0, 1],
            [10, 0.002342, 1],
            [10, 0.5, 1],
            [10, 0.9992, 1],
            [10, 1, 1],
            [10, 1.000001, 1],
            [10, 1000001, 7],
            [10, 5, 1],
            [10, 9.999, 1],
            [10, 10.005, 2],
            [10, 32, 2],
            [10, 99, 2],
            [10, 99.999, 2],
            [10, 10, 2],
            [10, 100, 3],
            [10, 1000000000, 9],
            [16, 0xffff, 4],
            [16, 0xfff, 3],
            [16, 0xff, 2],
            [16, 0xf, 1],
            [16, 1, 1],
            [16, 0, 1],
            [16, 0x10000, 5],
            [16, 0x1000, 4],
            [16, 0x100, 3],
            [16, 0x10, 2],
            [16, 0x4abe2, 5],
            [16, 0x9ad3, 4],
            [16, 0xcf7, 3],
            [16, 0x7f, 2],
            [3, 3 * 3 * 3 * 3, 5],
            [3, 3 * 3 * 3 * 3 + 1, 5],
            [3, 3 * 3 * 3 * 3 - 1, 4],
        ]) {
            expect(getDigits(value!, radix!)).toBe(expected!);
        }
    });
});
