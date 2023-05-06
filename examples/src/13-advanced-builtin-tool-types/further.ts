import { expectType } from 'tsd';

// 通过一个巧妙的方式判断一个属性是否带可选标记，原理如下
type Res1 = {} extends { prop: number } ? 'Y' : 'N'; // N
type Res2 = {} extends { prop?: number } ? 'Y' : 'N'; // Y

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// 借助这个工具类型判断类型 X 与 Y 的全等性，这一全等性就包括了 readonly 修饰符与可选性等
export type Equal<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

type Res3 = Equal<{ name: string }, { readonly name: string }, 1, 2>; // 2

// 获取无 readonly 修饰的属性
export type MutableKeys<T> = {
  [P in keyof T]-?: Equal<{ [Q in P]: T[Q] }, { -readonly [Q in P]: T[Q] }, P, never>;
}[keyof T];

expectType<MutableKeys<{ a: string; readonly b: string }>>('a');

// 获取 readonly 修饰的属性
export type ImmutableKeys<T> = {
  [P in keyof T]-?: Equal<{ [Q in P]: T[Q] }, { -readonly [Q in P]: T[Q] }, never, P>;
}[keyof T];

expectType<ImmutableKeys<{ a: string; readonly b: string }>>('b');
