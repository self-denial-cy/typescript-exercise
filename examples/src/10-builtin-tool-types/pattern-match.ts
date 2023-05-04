/**
 * 模式匹配工具类型
 * 这一类工具类型主要使用条件类型与 infer 关键字
 */

export type FunctionType = (...args: any) => any;

export type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never;

export type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : never;

export type FirstParameter<T extends FunctionType> = T extends (arg: infer P, ...args: any) => any ? P : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;

type FooFirstParameter = FirstParameter<FuncFoo>; // number
type BarFirstParameter = FirstParameter<FuncBar>; // Parameter

// 除了对函数类型进行模式匹配，内置工具类型中还有一组对 Class 进行模式匹配的工具类型
export type ClassType = abstract new (...args: any) => any;

export type ConstructorParameters<T extends ClassType> = T extends abstract new (...args: infer P) => any ? P : never;

export type InstanceType<T extends ClassType> = T extends abstract new (...args: any) => infer R ? R : never;

// Class 的通用类型签名可能看起来比较奇怪，但实际上它就是声明了可实例化【new】与可抽象【abstract】罢了，使用 interface 替代声明
export interface ClassInterface<T = any> {
  new (...args: any): T;
}

/**
 * 发散思考
 * 1.infer 和条件类型的搭配看起来会有奇效，比如在哪些场景？比如随着条件类型的嵌套每个分支会提取不同位置的 infer？
 * 2.infer 在某些特殊位置下应该如何处理？比如说提取函数入参最后一个位置上的参数类型？
 */
