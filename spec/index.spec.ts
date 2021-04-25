// @ts-ignore
import { clamp, clampUnit, mod, rangeToUnit, uByteToUnit, unitToRange, unitToUByte } from '../src';

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
            [20 / 255, 20],
            [21 / 255, 21],
            [21 / 255, 21],
        ]) {
            expect(uByteToUnit(value!)).toEqual(expected!);
        }
    });
    it('mod', () => {
        for (const [a, b, expected] of [
            [-13, 5, 2],
            [-8, 5, 2],
            [-3, 5, 2],
            [2, 5, 2],
            [7, 5, 2],
            [-16, 3, 2],
            [-17, 3, 1],
            [-18, 3, 0],
            [-19, 3, 2],
            [16, 3, 1],
            [17, 3, 2],
            [18, 3, 0],
            [19, 3, 1],
        ]) {
            expect(mod(a!, b!)).toEqual(expected!);
        }
    });
});
