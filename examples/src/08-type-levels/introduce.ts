/**
 * 类型层级实际上指的是，TypeScript 中所有类型的兼容关系，从最上面一层的 any 类型到最底层的 never 类型
 */

// 使用条件类型来判断两个类型的兼容性
export type Res = 'this is a string' extends string ? 1 : 2;

// 通过赋值来进行类型兼容性检查
export declare let stringVal: string;
export declare let anyVal: any;
export declare let neverVal: never;
stringVal = anyVal;
anyVal = stringVal;
stringVal = neverVal;
// neverVal = stringVal; // error
anyVal = neverVal;
// neverVal = anyVal; // error

/**
 * 以上，对于变量 a = 变量 b，如果成立，意味着【变量 b 的类型】extends【变量 a 的类型】，即 b 类型是 a 类型的子类型
 */

export type Result1 = 'this is a string' extends string ? 1 : 2; // 1
export type Result2 = 1 extends number ? 1 : 2; // 1
export type Result3 = true extends boolean ? 1 : 2; // 1
export type Result4 = { name: string } extends object ? 1 : 2; // 1
export type Result5 = { name: 'this is a string' } extends object ? 1 : 2; // 1
export type Result6 = [] extends object ? 1 : 2; // 1
// 以上，可以简记为【字面量类型 < 对应的原始类型】

export type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2; // 1
export type Result8 = 'this' extends 'this' | 'is' | 'a' | 'string' ? 1 : 2; // 1
export type Result9 = true extends true | false ? 1 : 2; // 1
export type Result10 = string extends string | false | number ? 1 : 2; // 1
// 以上，可以简记为【字面量类型 < 包含此字面量类型的联合类型】、【原始类型 < 包含此原始类型的联合类型】

export type Result11 = 'this' | 'is' | 'a' | 'string' extends string ? 1 : 2; // 1
export type Result12 = {} | (() => void) | [] extends object ? 1 : 2; // 1
// 以上，可以简记为【同一基础类型的字面量联合类型 < 此基础类型】

export type Result13 = 'this is a string' extends 'this is a string' | 666
  ? 'this' | 'is' | 'a' | 'string' extends string
    ? 2
    : 1
  : 0; // 2
// 以上，可以简记为【字面量类型 < 包含此字面量类型的联合类型【同一基础类型】 < 对应的原始类型】

export type Result14 = string extends String ? 1 : 2; // 1
export type Result15 = String extends {} ? 1 : 2; // 1
export type Result16 = {} extends object ? 1 : 2; // 1
export type Result17 = object extends Object ? 1 : 2; // 1

export type Result18 = object extends {} ? 1 : 2; // 1
export type Result19 = Object extends {} ? 1 : 2; // 1
export type Result20 = Object extends object ? 1 : 2; // 1
export type Result21 = {} extends Object ? 1 : 2; // 1
// 以上，可以简记为【原始类型 < 原始类型对应的装箱类型 < Object 类型】

export type Result22 = Object extends any ? 1 : 2; // 1
export type Result23 = Object extends unknown ? 1 : 2; // 1
export type Result24 = any extends Object ? 1 : 2; // 1 | 2
export type Result25 = unknown extends Object ? 1 : 2; // 1
export type Result26 = any extends 'this is a string' ? 1 : 2; // 1 | 2
export type Result27 = any extends string ? 1 : 2; // 1 | 2
export type Result28 = any extends {} ? 1 : 2; // 1 | 2
export type Result29 = any extends never ? 1 : 2; // 1 | 2
export type Result30 = 'this is a string' | {} extends string ? 1 : 2; // 2
// 以上，在 TypeScript 内部代码的条件类型处理中，如果接受判断的是 any，会直接返回条件类型结果组成的联合类型

export type Result31 = any extends unknown ? 1 : 2; // 1
export type Result32 = unknown extends any ? 1 : 2; // 1
// 以上，刨除一些系统设定的部分，可以简记为【Object < any/unknown】

export type Result33 = never extends 'this is a string' ? 1 : 2; // 1
export type Result34 = undefined extends 'this is a string' ? 1 : 2; // 1
export type Result35 = null extends 'this is a string' ? 1 : 2; // 1
export type Result36 = void extends 'this is a string' ? 1 : 2; // 2
export type Result37 = never extends void ? 1 : 2; // 1
export type Result38 = never extends null ? 1 : 2; // 1
export type Result39 = never extends undefined ? 1 : 2; // 1
export type Result40 = void extends never ? 1 : 2; // 2
export type Result41 = null extends never ? 1 : 2; // 2
export type Result42 = undefined extends never ? 1 : 2; // 2
// 以上，主要是关闭了 strictNullChecks 的锅，null、undefined 被视为 string 等类型的子类型，实际上，在 TypeScript 中，null、undefined、void 都是切实存在、有实际意义的类型，与 string、number、object 并没什么本质区别
// 刨除 strictNullChecks 的影响，【never < 字面量类型】，这就是类型世界的最底层

export type TypeChain = never extends 'this'
  ? 'this' extends 'this' | 'is' | 'a' | 'string'
    ? 'this' | 'is' | 'a' | 'string' extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0; // 8

export type VerboseTypeChain = never extends 'this'
  ? 'this' extends 'this' | 'is' | 'a' | 'string'
    ? 'this' | 'is' | 'a' | 'string' extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8; // 8

export type Result43 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
export type Result44 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2; // 1
export type Result45 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
export type Result46 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2; // 2
// 以上，对于联合类型的类型层级比较，只需要关注一个联合类型是否能被视为另一个联合类型的子集，即这个联合类型的所有类型成员在另一个联合类型中都能找到

export type Result47 = [number, number] extends number[] ? 1 : 2; // 1
export type Result48 = [number, string] extends number[] ? 1 : 2; // 2
export type Result49 = [number, string] extends (number | string)[] ? 1 : 2; // 1
export type Result50 = [] extends number[] ? 1 : 2; // 1
export type Result51 = [] extends unknown[] ? 1 : 2; // 1
export type Result52 = number[] extends (number | string)[] ? 1 : 2; // 1
export type Result53 = any[] extends number[] ? 1 : 2; // 1
export type Result54 = unknown[] extends number[] ? 1 : 2; // 2
export type Result55 = never[] extends number[] ? 1 : 2; // 1
