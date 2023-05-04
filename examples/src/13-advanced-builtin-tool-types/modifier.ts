/**
 * 属性修饰进阶
 * 1.深层的属性修饰
 * 2.基于已知属性的部分修饰，以及基于属性类型的部分修饰
 */

import { expectType } from 'tsd';

// 简单起见，直接使用了 object 作为泛型约束与条件，这意味着也可能传入函数、数组等类型，但这里假设就只会传入对象结构
export type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepPartialStruct = DeepPartial<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedBarFoo: string;
    };
  };
}>;

expectType<DeepPartialStruct>({
  foo: 'this is a string',
  nested: {},
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {},
  },
});

expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {
      nestedBarFoo: undefined,
    },
  },
});

// 类似地，可以实现其它进行递归属性修饰的工具类型
export type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// 另外，存在一个从联合类型中剔除 null 和 undefined 的工具类型 NonNullable
export type NonNullable<T> = T extends null | undefined ? never : T;
// 基于 NonNullable 实现递归剔除对象结构中所有属性的 null 和 undefined
export type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNonNullable<T[K]> : NonNullable<T[K]>;
};
// 对应地，也可以有 Nullable 和 DeepNullable
export type Nullable<T> = T | null;
export type DeepNullable<T extends object> = {
  [K in keyof T]: T[K] extends object ? DeepNullable<T[K]> : Nullable<T[K]>;
};

/**
 * 需要注意，DeepNonNullable 和 DeepNullable 需要开启 strictNullChecks 才能正常工作
 */
