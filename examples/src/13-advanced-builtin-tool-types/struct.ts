/**
 * 结构工具类型进阶
 * 1.基于键值类型的 Pick 和 Omit
 * 2.子结构的互斥处理
 */
import { expectType } from 'tsd';

export type FuncStruct = (...args: any[]) => any;

// {}[keyof T] 这种写法就是参考索引类型访问时，使用字面量联合类型访问，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型
export type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends FuncStruct ? K : never;
}[keyof T];

// 为了避免可选属性对条件类型语句造成干扰，这里使用 -? 移除了所有可选标记
export type ExpectedPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? Key : never;
}[keyof T];

type FunctionKeys_<T extends object> = ExpectedPropKeys<T, FuncStruct>;

expectType<
  FunctionKeys_<{
    foo: () => void;
    bar: () => number;
    baz: boolean;
  }>
>('foo');

expectType<
  FunctionKeys_<{
    foo: () => void;
    bar: () => number;
    baz: boolean;
  }>
>('bar');

// 既然拿到了对应类型的属性名，将这些属性名交给 Pick 即可
export type PickByValueType<T extends object, ValueType> = Pick<T, ExpectedPropKeys<T, ValueType>>;

expectType<
  PickByValueType<
    {
      foo: string;
      bar: number;
    },
    string
  >
>({
  foo: 'this is a string',
});

expectType<
  PickByValueType<
    {
      foo: string;
      bar: number;
    },
    string | number
  >
>({
  foo: 'this is a string',
  bar: 666,
});

// OmitByValueType 也是类似地，只需要一个与 ExpectedPropKeys 作用相反的工具类型即可
export type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

export type OmitByValueType<T extends object, ValueType> = Pick<T, FilteredPropKeys<T, ValueType>>;

expectType<
  OmitByValueType<
    {
      foo: string;
      bar: number;
    },
    string
  >
>({
  bar: 666,
});

expectType<
  OmitByValueType<
    {
      foo: string;
      bar: number;
      baz: boolean;
    },
    string | number
  >
>({
  baz: true,
});
