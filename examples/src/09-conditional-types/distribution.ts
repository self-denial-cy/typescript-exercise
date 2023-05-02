/**
 * 分布式条件类型【Distributive Conditional Type】，也称为条件类型的分布式特性，只不过是条件类型在满足
 * 一定情况下会执行的逻辑而已
 */

export type Condition<T> = T extends 1 | 2 | 3 ? T : never;

type Res1 = Condition<1 | 2 | 3 | 4 | 5>; // 1 | 2 | 3
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never; // never

export type Naked<T> = T extends boolean ? 'Y' : 'N';
export type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N';

// (number extends boolean ? 'Y' : 'N') | (boolean extends boolean ? 'Y' : 'N')
type Res3 = Naked<number | boolean>; // "N" | "Y"
type Res4 = Wrapped<number | boolean>; // "N"

/**
 * 以上，大致可以整理出条件类型分布式起作用的条件
 * 首先，类型参数需要是一个联合类型，其次，类型参数需要通过泛型参数的方式传入，而不是直接进行条件类型判断
 * 最后，条件类型中的泛型参数不能被包裹
 * 条件类型分布式特性，即将这个联合类型拆开来，每个分支分别进行一次条件类型判断，再将最后的结果合并起来
 * 官方解释：对于属于裸类型参数的检查类型，条件类型会在实例化期间自动分发到联合类型上
 */

export type NoDistribution<T> = T & {};
export type Wrapped_<T> = NoDistribution<T> extends boolean ? 'Y' : 'N';

type Res5_ = NoDistribution<number | boolean>;
type Res5 = Wrapped_<number | boolean>; // "N"

type Res6_ = NoDistribution<true | false>; // boolean
type Res6 = Wrapped_<true | false>; // "Y"

type Res7_ = NoDistribution<true | false | 666>; // boolean | 666
type Res7 = Wrapped_<true | false | 666>; // "N"

/**
 * 以上，在实际使用场景中，并不总是需要通过裸露泛型参数，来确保条件类型分布式特性
 * 在某些情况下，也需要包裹泛型参数来禁用分布式特性
 * 最常见的场景也许还是联合类型的判断，即不希望进行联合类型成员的分布判断，而是希望直接判断这两个联合类型的兼容性
 */

export type CompareUnion<T, U> = [T] extends [U] ? true : false;

type CompareUnionRes1 = CompareUnion<1 | 2, 1 | 2 | 3>; // true
type CompareUnionRes2 = CompareUnion<1 | 2, 1>; // false

export type IsNever<T> = [T] extends [never] ? true : false;
export type _IsNever<T> = T extends never ? true : false;
export type IsAny<T> = [T] extends [any] ? true : false;

type IsNeverRes1 = IsNever<never>; // true
// 当条件类型的判断参数为 any，会直接返回条件类型两个结果的联合类型；而如果参数为 never，则直接返回 never
type _IsNeverRes1 = _IsNever<never>; // never
type IsAnyRes1 = IsAny<any>; // true

/**
 * 需要注意，any 在直接用作判断参数或用作泛型参数时都会直接返回条件类型两个结果的联合类型
 */

type Res8 = any extends string ? 1 : 2; // 1 | 2
type _Res9<T> = T extends string ? 1 : 2;
type Res9 = _Res9<any>; // 1 | 2
// 如果判断条件为 any，仍然会进行判断【不过判断结果很明显为真啊，毕竟 any 为 Top Type】
type Res10 = any extends any ? 1 : 2; // 1
type _Res11<T> = T extends any ? 1 : 2;
type Res11 = _Res11<any>; // 1

/**
 * 需要注意，never 仅在用作泛型参数时才会直接返回 never
 */

type Res12 = never extends string ? 1 : 2; // 1
type _Res13<T> = T extends string ? 1 : 2;
type Res13 = _Res13<never>; // never
type Res14 = never extends never ? 1 : 2; // 1
type _Res15<T> = T extends never ? 1 : 2;
type Res15 = _Res15<never>; // never

/**
 * 以上，any、never 的特殊情况都不会实际地执行条件类型，而是跳过条件类型判断直接按照特定规则返回结果
 */

// 通过条件类型的分布式特性可以进行集合的交集运算
type Intersection<A, B> = A extends B ? A : never;
type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4>; // 2 | 3
