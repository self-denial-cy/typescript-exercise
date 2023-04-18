export const name: string = 'this is a string';
export const age: number = 666;
export const male: boolean = false;
export const undef: undefined = undefined;
export const nul: null = null;
export const obj: object = { name, age, male };
export const bigintVar1: bigint = 9007199254740991n;
export const bigintVar2: bigint = BigInt(9007199254740991);
export const symbolVar: symbol = Symbol('unique');

/**
 * 以上都是 JavaScript 内置的原始类型，在 TypeScript 中基本上都有对应的类型对应
 */

export const tmp1: null = null;
export const tmp2: undefined = undefined;

// 仅在关闭 strictNullChecks 时成立，null 和 undefined 类型会被视作其它类型的子类型
export const tmp3: string = tmp1;
export const tmp4: string = tmp2;
