/**
 * TypeScript 中提供了非常强大的类型推导能力，它会随着代码逻辑不断尝试收窄类型，这一能力称之为类型的控制流分析【可以简单理解为类型推导】
 */

export type strOrNumOrBool = string | number | boolean;

let strOrNumOrBoolVal: strOrNumOrBool;

if (typeof strOrNumOrBoolVal === 'string') {
  console.log('string');
  strOrNumOrBoolVal.charAt(1);
} else if (typeof strOrNumOrBoolVal === 'number') {
  console.log('number');
  strOrNumOrBoolVal.toFixed(2);
} else if (typeof strOrNumOrBoolVal === 'boolean') {
  console.log('boolean');
  strOrNumOrBoolVal === true;
} else {
  // 到这里，strOrNumOrBoolVal 的类型只剩下 never 类型了，即一个无法再细分，本质上并不存在的虚空类型
  const _exhaustiveCheck: never = strOrNumOrBoolVal;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}

/**
 * 以上，实际上通过 if 条件中的表达式进行了类型保护，即告知了流过这里的分析程序每个 if 语句代码块中变量会是何类型
 * 这即是编程语言的类型能力中最重要的一部分：与实际逻辑紧密相关的类型，从逻辑中进行类型推导，再反过来让类型为逻辑保驾护航
 */

export function isString(input: unknown): boolean {
  return typeof input === 'string';
}

export function foo(input: string | number) {
  if (isString(input)) {
    // 在这里，input 未被收窄到 string 类型
  }
}

/**
 * 以上，将 if 条件中的表达式提取到了函数中，类型推导能力就被干扰了，无法有效地收窄类型
 * 这是因为类型的控制流分析做不到跨函数上下文来进行类型的信息收集【但别的类型语言中可能是支持的】
 * 实际上，将判断逻辑封装成函数以复用是非常常见的，为了解决这一类型控制流分析的能力不足，TypeScript 引入了 is 关键字来显式地提供类型信息
 */

export function _isString(input: unknown): input is string {
  return typeof input === 'string';
}

export function _foo(input: string | number) {
  if (_isString(input)) {
    // 在这里，input 被正确地收窄到 string 类型
  }
}

/**
 * 以上，_isString 函数称为类型守卫，在它的返回值中，不再使用 boolean 作为类型标注，而是使用 input is string
 * input 是函数的某个入参
 * is string 即 is 关键字 + 预期类型，即如果这个函数返回 true，那么 is 关键字前这个入参的类型就被确认为 is 关键字后的预期类型
 * 并且这个入参的类型信息就会被这个类型守卫调用方后续的类型控制流分析收集到
 */

/**
 * 需要注意，类型守卫函数中并不会对判断逻辑和预期类型的关联进行检查
 */

export function isString_(input: unknown): input is number {
  return typeof input === 'string';
}

export function foo_(input: string | number) {
  if (isString_(input)) {
    // 在这里，input 被确认为 number 类型
  }
}

/**
 * 某个角度上，其实类型守卫有些类似类型断言，但类型守卫更宽容些，不像类型断言对类型差异有要求
 */

/**
 * 除了使用简单的原始类型以外，还可以在类型守卫中使用对象类型、联合类型等
 */

export type Falsy = false | '' | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => {
  return !val;
};

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean;

export const isPrimitive = (val: unknown): val is Primitive => {
  return ['string', 'number', 'boolean'].includes(typeof val);
};

/**
 * 除了使用 typeof 以外，还可以使用许多类似的方式来进行类型保护，只要它能够在联合类型的类型成员中起到筛选作用即可
 */

/**
 * in 操作符并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 key in object 的方式来判断 key 是否
 * 存在于 object 或其原型链上【返回 true 说明存在】
 */

export interface Foo {
  foo: string;
  fooOnly: boolean;
  shared: number;
}

export interface Bar {
  bar: string;
  barOnly: boolean;
  shared: number;
}

export function handle(input: Foo | Bar) {
  if ('foo' in input) {
    // input 被确认为 Foo 类型
    console.log(input.fooOnly);
  } else {
    // input 被确认为 Bar 类型
    console.log(input.barOnly);
  }
}

export function _handle(input: Foo | Bar) {
  if ('shared' in input) {
    // input 被确认为 Foo | Bar 类型
    console.log(input.shared);
  } else {
    // input 被确认为 never 类型
    const neverVal: never = input;
  }
}

/**
 * 以上，像 foo/bar、fooOnly/barOnly 这样可以辨识类型的属性，称为可辨识属性【Discriminant Property 或 Togged Property】
 * Foo/Bar 又因为存在这样具有区分能力的辨识属性，称为可辨识联合类型【Discriminanted Unions 或 Togged Union】
 * 虽然它们是一堆类型的联合体，但其中每一个类型都具有一个独一无二，能让它鹤立鸡群的属性
 * 这个可辨识属性可以是结构层面的，比如结构 A 的属性 prop 是数组，而结构 B 的属性 prop 是对象，或者结构 A 存在属性 prop 而结构 B 中不存在
 * 它甚至可以是共同属性的字面量类型差异
 */

export function ensureArray(input: number | number[]): number[] {
  if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}

export interface Foo_ {
  kind: 'foo';
  diffType: string;
  fooOnly: boolean;
  shared: number;
}

export interface Bar_ {
  kind: 'bar';
  diffType: number;
  barOnly: boolean;
  shared: number;
}

export function handle_(input: Foo_ | Bar_) {
  if (input.kind === 'foo') {
    console.log(input.fooOnly);
  } else {
    console.log(input.barOnly);
  }
}

// 对于同名但不同类型的属性，只能使用字面量类型进行区分，不能使用简单的 typeof
export function handle__(input: Foo_ | Bar_) {
  if (typeof input.diffType === 'string') {
    // input 仍然被确认为 Foo_ | Bar_ 类型
  }
}

/**
 * 除此之外，JavaScript 中还存在一个功能类似于 typeof 与 in 的操作符 instanceof，它判断的是原型链上的关系
 * 比如 foo instanceof Base 会沿着 foo 的原型链查找 Base.prototype
 * 同样地，instanceof 也可以用作类型保护
 */

export class FooBase {}
export class BarBase {}

export class Foo__ extends FooBase {
  fooOnly() {}
}
export class Bar__ extends BarBase {
  barOnly() {}
}

export function handle___(input: Foo__ | Bar__) {
  if (input instanceof FooBase) {
    // input 被确认为 Foo__ 类型
    input.fooOnly();
  } else {
    // input 被确认为 Bar__ 类型
    input.barOnly();
  }
}
