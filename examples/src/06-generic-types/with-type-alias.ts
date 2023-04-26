/**
 * 类型别名中的泛型
 */

export type Factory<T> = T | number | string;

export type Stringify<T> = {
  [K in keyof T]: string;
};

export type Clone<T> = {
  [K in keyof T]: T[K];
};

// 这是一个 TypeScript 内置工具类型，用于拷贝一个类型，但是这个类型中的属性都是可选的
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * 类型别名与泛型的结合中，还有一个非常重要的工具：条件类型
 */

export type IsEqual<T> = T extends true ? 1 : 2;

export type A = IsEqual<true>; // 1

export type B = IsEqual<false>; // 2

export type C = IsEqual<boolean>; // 1 | 2

/**
 * 在条件类型参与的情况下，通常泛型会被作为条件类型中的判断条件【T extends Condition 或者 Type extends T】
 * 以及返回值【即 : 两端的值】
 */
