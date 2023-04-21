/**
 * 在 TypeScript 中，一个没有返回值【即没有调用 return 语句】的函数，其返回类型应当被标记为 void 而不是 undefined，即便它实际返回 undefined
 */

export function foo(): void {}

/**
 * 但是如果有调用 return 语句的话，最好精确的指定返回类型
 */

export function bar(): undefined {
  return;
}

export function bar_(): undefined {
  return undefined;
}

export function baz(): null {
  return null;
}
