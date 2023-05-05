/**
 * 集合工具类型进阶
 * 从一维原始类型集合，扩展二维的对象类型，在对象类型之间进行交并补差集的运算，以及对同名属性的各种处理情况
 * 在这里，对象类型的交并补差集基本上可以降维到对象属性名集合的交并补差集问题，比如交集就是两个对象属性名的交集，
 * 使用属性名的交集访问其中一个对象结构，就可以获得对象之间的交集结构【不考虑同名属性冲突的情况】
 */

export type Concurrence<A, B> = A | B;
export type Intersection<A, B> = A extends B ? A : never;
export type Difference<A, B> = A extends B ? never : A;
export type Complement<A, B extends A> = Difference<A, B>;

// 使用更精确的对象类型描述结构
export type PlainObjectType = Record<string, any>;

export type ObjectKeysConcurrence<T extends PlainObjectType, U extends PlainObjectType> = Concurrence<keyof T, keyof U>;
export type ObjectKeysIntersection<T extends PlainObjectType, U extends PlainObjectType> = Intersection<
  keyof T,
  keyof U
>;
export type ObjectKeysDifference<T extends PlainObjectType, U extends PlainObjectType> = Difference<keyof T, keyof U>;
export type ObjectKeysComplement<T extends U, U extends PlainObjectType> = Complement<keyof T, keyof U>;
