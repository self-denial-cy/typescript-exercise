/**
 * 基于已知属性进行部分修饰，可以分为三部曲：
 * 1.拆分对象结构，将需要修饰的属性和不需修饰的属性拆开为两个对象结构【使用 Pick 和 Omit】
 * 2.修饰属性【使用基础的属性修饰或者进阶的递归属性修饰】
 * 3.组合两个对象结构【使用交叉类型】
 * 通用的类型编程思路：将复杂的工具类型，拆解为由基础工具类型、类型工具的组合
 */

import { Mutable } from '../10-builtin-tool-types/modifier';
import { DeepNonNullable, DeepNullable } from './modifier';

export type MarkPropsAsOptional<T extends object, K extends keyof T = keyof T> = Flatten<
  Partial<Pick<T, K>> & Omit<T, K>
>;

// 辅助工具类型，帮助将交叉类型的结构展平为单层的对象结构
export type Flatten<T> = {
  [K in keyof T]: T[K];
};

type MarkPropsAsOptionalRes = MarkPropsAsOptional<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  'bar' | 'baz'
>;

// 类似地，可以实现其它类型的部分修饰
export type MarkPropsAsRequired<T extends object, K extends keyof T = keyof T> = Flatten<
  Required<Pick<T, K>> & Omit<T, K>
>;

export type MarkPropsAsReadonly<T extends object, K extends keyof T = keyof T> = Flatten<
  Readonly<Pick<T, K>> & Omit<T, K>
>;

export type MarkPropsAsMutable<T extends object, K extends keyof T = keyof T> = Flatten<
  Mutable<Pick<T, K>> & Omit<T, K>
>;
