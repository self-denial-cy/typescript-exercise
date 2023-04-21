/**
 * 变量的类型描述了这个变量的值类型
 * 函数的类型描述了函数入参类型与函数返回值类型
 */

export function foo(name: string): number {
  return name.length;
}

/**
 * 在 JavaScript 中，function name () {} 这一声明函数的方式为函数声明【Function Declaration】
 * 除了函数声明以外，还可以通过函数表达式【Function Expression】，即 const foo = function () {} 的形式声明一个函数
 */

export const _foo = function (name: string): number {
  return name.length;
};

/**
 * 也可以像对变量进行类型标注那样，对 _foo 这个变量进行类型声明
 */

export const foo_: (name: string) => number = function (name) {
  return name.length;
};

/**
 * 这里的 (name: string) => number 看起来很像箭头函数，但在这里，它是 TypeScript 中的函数类型签名
 */

// 方式一
export const __foo = (name: string): number => {
  return name.length;
};

// 方式二
export const foo__: (name: string) => number = (name) => {
  return name.length;
};

/**
 * 在方式二中，函数类型声明混合箭头函数声明时，代码可读性极差，因此，一般不推荐这么使用
 * 要么直接在函数中进行参数和返回值的类型声明，要么使用类型别名将函数类型声明抽离出来
 */

export type FuncFoo = (name: string) => number;

export const foo___: FuncFoo = (name) => {
  return name.length;
};

/**
 * 如果只是为了描述函数的类型结构，甚至可以使用 interface 来进行函数的类型声明
 * 这里的 interface 被称为 Callable Interface
 */

export interface FuncFooStruct {
  (name: string): number;
}

export const foo____: FuncFooStruct = (name: string): number => {
  return name.length;
};
