/**
 * TypeScript 中支持通过 infer 关键字来在条件类型中提取类型的某一部分信息
 */

export type Func = (...args: any[]) => any;

// 当传入的类型参数满足 T extends (...args: any[]) => infer R 这样一个结构【不用管 infer R，当它是 any 就行】，返回 infer R 位置的值，即 R，否则返回 never
export type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R ? R : never;

/**
 * infer 是 inference 的缩写，意为推断，如 infer R 中 R 就表示待推断的类型
 * infer 只能在条件类型中使用，因为实际上仍然需要类型结构是一致的
 * 比如以上，类型信息需要是一个函数类型结构，才能提取出它的返回值类型，如果连函数类型都不是，只能返回一个 never
 */

// 类型结构并不局限于函数类型结构，还可以是数组
export type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapRes1 = Swap<[1, 2]>; // [2, 1]
type SwapRes2 = Swap<[1, 2, 3]>; // [1, 2, 3]

export type ExtractStartAndEnd<T extends any[]> = T extends [infer Start, ...any[], infer End] ? [Start, End] : T;

export type SwapStartAndEnd<T extends any[]> = T extends [infer Start, ...infer Args, infer End]
  ? [End, ...Args, Start]
  : T;

export type SwapFirstTwo<T extends any[]> = T extends [infer Start1, infer Start2, ...infer Args]
  ? [Start2, Start1, ...Args]
  : T;

export type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeRes1 = ArrayItemType<[]>; // never
type ArrayItemTypeRes2 = ArrayItemType<string[]>; // string
type ArrayItemTypeRes3 = ArrayItemType<[string, number]>; // string | number

export type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R } ? R : never;

type PropTypeRes1 = PropType<{ name: string }, 'name'>; // string
type PropTypeRes2 = PropType<{ name: string; age: number }, 'name' | 'age'>; // string | number

export type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<infer K, infer V>
  ? Record<V & string, K>
  : never;

type ReverseKeyValueRes1 = ReverseKeyValue<{ key: 'value' }>;

export type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type PromiseValueRes1 = PromiseValue<Promise<number>>; // number

/**
 * 就像条件类型可以嵌套一样，infer 关键字也经常被使用在嵌套的场景中，包括对类型结构深层信息的提取，以及
 * 对提取到的类型信息的筛选
 */

export type PromiseValue2<T> = T extends Promise<infer V> ? (V extends Promise<infer N> ? N : V) : T;

type PromiseValue2Res1 = PromiseValue2<Promise<Promise<number>>>; // number

// 当然，这种情况更适合使用递归来处理任意嵌套深度
export type PromiseValueRecursion<T> = T extends Promise<infer V> ? PromiseValueRecursion<V> : T;

type PromiseValueRecursionRes1 = PromiseValueRecursion<Promise<Promise<number>>>; // number
