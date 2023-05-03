/**
 * 结构工具类型
 * 这一部分的工具类型主要使用条件类型以及映射类型、索引类型
 * 结构工具类型可以分为两类：结构声明和结构处理
 */

/**
 * 结构声明工具类型即快速声明一个结构，比如说内置类型中的 Record
 */

export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Record1 = Record<string, unknown>;
type Record2 = Record<string | number, unknown>;
type Record3 = Record<'name' | 'age', unknown>;

/**
 * 结构处理工具类型，在 TypeScript 中主要是 Pick、Omit 这两个内置工具类型
 */

// Pick 是保留这些传入的键
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Exclude<T, U> = T extends U ? never : T;

// Omit 是移除这些传入的键
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Omit 基于 Pick 实现，这也是 TypeScript 中成对工具类型的另一种实现方式
 * Partial 和 Required 在关键位置使用一个相反操作来实现反向
 * Omit 和 Pick 反向工具类型基于正向工具类型实现
 * Omit 之所以不约束第二个参数的联合类型来自于对象属性，是考虑到 Omit<T1, keyof T2> 这种情况
 */

/**
 * 发散思考
 * 1.Pick 和 Omit 是基于键名的，如果需要基于键值类型呢？比如仅处理函数类型的属性？
 * 2.除了将一个对象结构拆分为多个子结构外，对这些子结构的互斥处理也是结构工具类型需要解决的问题之一
 * 互斥处理指的是，假设对象存在三个属性  A、B、C，其中 A 与 C 互斥，即 A 与 C 同时只能存在一个，而 A 与 B 绑定，必须同时存在，此时如何实现？
 */
