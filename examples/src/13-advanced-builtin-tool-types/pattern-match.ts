/**
 * 模式匹配工具类型进阶
 */

export type FunctionType = (...args: any) => any;

// 提取函数入参最后一个位置上的参数类型【这也是模式匹配常用的一种方法，通过 infer 提取到某一个结构，然后再对这个结构进行 infer 提取】
export type LastParameter<T extends FunctionType> = T extends (arg: infer P) => any
  ? P
  : T extends (...args: infer R) => any
  ? R extends [...any, infer Q]
    ? Q
    : never
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;
type FuncBaz = (arg1: string, arg2: boolean) => void;

type FooLastParameter = LastParameter<FuncFoo>; // number
type BarLastParameter = LastParameter<FuncBar>; // string
type BazLastParameter = LastParameter<FuncBaz>; // boolean
