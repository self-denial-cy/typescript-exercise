import { expectType } from 'tsd';

// 下划线转小驼峰
export type SnakeCase2CamelCase<S extends string> = S extends `${infer Head}_${infer Rest}`
  ? `${Head}${SnakeCase2CamelCase<Capitalize<Rest>>}`
  : S;

expectType<SnakeCase2CamelCase<'foo_bar_baz'>>('fooBarBaz');

// 中划线转小驼峰
export type KebabCase2CamelCase<S extends string> = S extends `${infer Head}-${infer Rest}`
  ? `${Head}${KebabCase2CamelCase<Capitalize<Rest>>}`
  : S;

expectType<KebabCase2CamelCase<'foo-bar-baz'>>('fooBarBaz');

// 针对下划线转小驼峰和中划线转小驼峰封装
export type DelimiterCase2CamelCase<
  S extends string,
  Delimiter extends string
> = S extends `${infer Head}${Delimiter}${infer Rest}`
  ? `${Head}${DelimiterCase2CamelCase<Capitalize<Rest>, Delimiter>}`
  : S;

expectType<DelimiterCase2CamelCase<'foo_bar_baz', '_'>>('fooBarBaz');
expectType<DelimiterCase2CamelCase<'foo-bar-baz', '-'>>('fooBarBaz');

// 实现一个 CamelCase 智能版
export type CamelCase<K extends string> = CamelCaseArray2String<Split<K, Delimiter>>;

type CamelCaseArray2String<Words extends string[]> = Words extends [`${infer First}`, ...infer Rest]
  ? `${First}${CapitalizeArray2String<Rest>}`
  : never;

type CapitalizeArray2String<Words extends any[]> = Words extends [`${infer First}`, ...infer Rest]
  ? `${Capitalize<First>}${CapitalizeArray2String<Rest>}`
  : '';

type Delimiter = '-' | '_' | ' ';

type Split<Str extends string, Delimiter extends string> = Str extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : Str extends Delimiter
  ? []
  : [Str];

expectType<CamelCase<'foo-bar-baz'>>('fooBarBaz');
expectType<CamelCase<'foo_bar_baz'>>('fooBarBaz');
expectType<CamelCase<'foo bar baz'>>('fooBarBaz');
