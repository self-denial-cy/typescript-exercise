/**
 * 交叉类型，与联合类型的使用位置一样，只不过符号是 &，即按位与运算符
 * 实际上，正如联合类型的符号是 |，它代表了按位或，即只需要符合联合类型中的一个类型，即可以认为实现了这个联合类型
 * 而代表着按位与的 & 则不同，需要符合这里的所有类型，才被认为实现了这个交叉类型
 */

export interface NameStruct {
  name: string;
}

export interface AgeStruct {
  age: number;
}

export type ProfileStruct = NameStruct & AgeStruct;

export const profile: ProfileStruct = {
  name: 'this is a string',
  age: 25,
};

/**
 * 以上是对于对象类型的合并，那么对于原始类型呢？
 */

export type StrAndNum = string & number; // never

export let neverVal: never;

export const val: StrAndNum = neverVal;

/**
 * 并不存在既是 string 又是 number 的类型，因此只能用 never 这一 Bottom Type 来描述根本不存在的类型
 */

/**
 * 对于对象类型的交叉类型，其内部的同名属性类型同样会按照交叉类型进行合并
 */

export type Struct1 = {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
};

export type Struct2 = {
  primitiveProp: number;
  objectProp: {
    age: number;
  };
};

export type Composed = Struct1 & Struct2;
export type PrimitivePropType = Composed['primitiveProp']; // never
export type ObjectPropType = Composed['objectProp'];

export const primitiveVal: PrimitivePropType = neverVal;
export const objectVal: ObjectPropType = {
  name: 'this is a string',
  age: 24,
};

/**
 * 如果是两个联合类型组成的交叉类型，只要取两边联合类型的交集即可
 */

export type UnionIntersection1 = (1 | 2 | 3) & (1 | 2);
export type UnionIntersection2 = (string | number | boolean) & string;

export const unionVal1: UnionIntersection1 = 1; // 1 | 2
export const unionVal2: UnionIntersection2 = 'this is a string'; // string
