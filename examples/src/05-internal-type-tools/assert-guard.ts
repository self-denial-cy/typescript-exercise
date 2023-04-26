// import assert from 'assert';

export function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export function assertIsNumber(val: unknown, msg?: string): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error(msg);
  }
}

let val: any = 'this is a string';

assert(typeof val === 'number', 'Not a number');

assertIsNumber(val, 'Not a number');

val.toFixed();

/**
 * TypeScript 中引入 asserts 关键字来进行断言场景下的类型守卫
 */
