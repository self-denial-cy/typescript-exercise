/**
 * 基于已知属性进行部分修饰，可以分为三部曲：
 * 1.拆分对象结构，将需要修饰的属性和不需修饰的属性拆开为两个对象结构【使用 Pick 和 Omit】
 * 2.修饰属性【使用基础的属性修饰或者进阶的递归属性修饰】
 * 3.组合两个对象结构【使用交叉类型】
 * 通用的类型编程思路：将复杂的工具类型，拆解为由基础工具类型、类型工具的组合
 */

export type MarkPropsAsOptional<T extends object, K extends keyof T = keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
