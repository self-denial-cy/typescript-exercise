/**
 * 类型别名，主要是对一组类型或一个特定类型结构进行封装，以便于在其它地方进行复用
 */

export type A = string;

// 抽离一组联合类型
export type StatusCode = 200 | 301 | 400 | 500 | 502;
export type PossibleDataTypes = string | number | (() => unknown);

export const status: StatusCode = 200;

// 抽离一个函数类型
export type Handler = (e: Event) => void;

export const clickHandler: Handler = (e) => {
  const evt: Event = e;
};

// 声明一个对象类型，就像接口那样
export type ObjType = {
  name: string;
  age: number;
  bar: () => void;
  baz(): Promise<void>;
};

/**
 * 类型别名还能支持生成工具类型，工具类型基于【类型别名+泛型】
 * 在类型别名中，类型别名可以接受泛型【泛型坑位】，一旦接受了泛型，就生成了一个工具类型
 * 工具类型的基本功能仍然是创建类型，只不过工具类型能够接受泛型参数，实现更灵活的类型创建功能
 * 从这个角度看，工具类型就像一个函数一样，泛型是入参，内部逻辑基于入参进行某些操作，最后返回一个新的类型
 */

export type Factory<T> = T | number | string;

export const foo: Factory<boolean> = true;

/**
 * 当然，一般不会直接使用工具类型来做类型标注，而是再度声明一个新的类型别名
 */

export type FactoryWithBool = Factory<boolean>;

export const bar: FactoryWithBool = false;

/**
 * 泛型参数的名称也不是固定的，通常使用大写的 T/K/U/V/M/O... 这种形式，如果为了可读性考虑，可以写成大驼峰的名称
 */

export type FactoryWithNewType<NewType> = NewType | number | string;

// 声明一些简单、有实际意义的工具类型
export type MaybeNull<T> = T | null;

export function process(input: MaybeNull<{ handler: () => void }>) {
  input?.handler();
}

export type MaybeArray<T> = T | T[];

export function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

/**
 * 另外，类型别名可以接受任意个泛型，以及为泛型指定约束、默认值等
 * 总之，对于工具类型来说，它的主要意义是基于传入的泛型进行各种类型操作，最后返回一个新的类型
 */
