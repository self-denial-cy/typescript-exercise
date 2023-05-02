/**
 * 条件类型中使用 extends 判断类型的兼容性，而非判断类型的全等性
 * 这是因为在类型层面中，对于能够进行赋值操作的两个变量，并不需要它们的类型完全相等，只需要具有兼容性即可
 * 而两个全等的类型，其 extends 自然也是成立的
 */

// 条件类型绝大部分场景会和泛型一起使用
export type LiteralType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends null
  ? 'null'
  : T extends undefined
  ? 'undefined'
  : never;
export type Res1 = LiteralType<'this is a string'>;
export type Res2 = LiteralType<666>;
export type Res3 = LiteralType<true>;

// 在函数中，条件类型与泛型的搭配同样很常见
export function universalAdd<T extends number | bigint | string>(x: T, y: T): LiteralToPrimitive<T> {
  return (x as any) + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends string
  ? string
  : never;

universalAdd(599, 1);
universalAdd('599', '1');
universalAdd(10n, 10n);
