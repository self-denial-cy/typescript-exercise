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

// 对应地实现对象属性名的并交差补集
export type ObjectKeysConcurrence<T extends PlainObjectType, U extends PlainObjectType> = Concurrence<keyof T, keyof U>;
export type ObjectKeysIntersection<T extends PlainObjectType, U extends PlainObjectType> = Intersection<
  keyof T,
  keyof U
>;
export type ObjectKeysDifference<T extends PlainObjectType, U extends PlainObjectType> = Difference<keyof T, keyof U>;
export type ObjectKeysComplement<T extends U, U extends PlainObjectType> = Complement<keyof T, keyof U>;

// 对于交集、差集、补集，可以直接使用属性名的集合实现对象层面的版本
export type ObjectIntersection<T extends PlainObjectType, U extends PlainObjectType> = Pick<
  T,
  ObjectKeysIntersection<T, U>
>;
export type ObjectDifference<T extends PlainObjectType, U extends PlainObjectType> = Pick<
  T,
  ObjectKeysDifference<T, U>
>;
export type ObjectComplement<T extends U, U extends PlainObjectType> = Pick<T, ObjectKeysComplement<T, U>>;

/**
 * 对于并集，就不能简单使用属性名并集版本了，因为使用联合类型实现，并不能控制同名属性的优先级，比如到底保留原对象属性类型呢？还是保留新对象属性类型？
 * 对于 T、U 两个对象，假设以 U 的同名属性类型优先，思路会是这样的：
 * 1.T 比 U 多的部分，即 T 相对于 U 的差集
 * 2.U 比 T 多的部分，即 U 相对于 T 的差集
 * 3.T 与 U 的交集，由于 U 优先级更高，在交集处理中将 U 作为原集合，T 作为后传入的集合
 */

export type Merge<T extends PlainObjectType, U extends PlainObjectType> = ObjectDifference<T, U> &
  ObjectDifference<U, T> &
  ObjectIntersection<U, T>;
// 如果要保证原集合 T 优先级更高，只需要交集处理时调换下位置
export type Assign<T extends PlainObjectType, U extends PlainObjectType> = ObjectDifference<T, U> &
  ObjectDifference<U, T> &
  ObjectIntersection<T, U>;
// 除了简单粗暴地完全合并以外，还可以实现不完全的合并，即使用新集合 U 的属性类型覆盖原集合 T 中的同名属性类型，但不会将新集合中独有的部分合并进来
export type Override<T extends PlainObjectType, U extends PlainObjectType> = ObjectDifference<T, U> &
  ObjectIntersection<U, T>;
