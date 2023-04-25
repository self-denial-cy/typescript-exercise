/**
 * 索引类型指的不是某一个特定的类型工具，它其实包含三个部分：索引签名类型、索引类型查询与索引类型访问
 * 这三者都是独立的类型工具，共同点是它们都通过索引的形式来进行类型操作，但索引签名类型是声明，后两者则是读取
 */

/**
 * 索引签名类型，在接口或类型别名中，通过以下语法快速声明一个键值类型一致的类型结构
 */

export interface AllNumberInterface {
  [key: string]: number;
}

export type AllBooleanType = {
  [key: string]: boolean;
};

/**
 * 由于在 JavaScript 中，对于 obj[prop] 形式的访问会将数字索引访问转换为字符串索引访问，也就是说，obj[599] 和 obj['599'] 的效果一致
 * 因此，在字符串索引签名类型中，仍然可以声明数字类型的键，类似的，symbol 类型也是如此
 */

export const foo: AllNumberInterface = {
  'this is a string': 666,
  200: 666,
  [Symbol('desc')]: 666,
};

/**
 * 索引签名类型也可以和具体的键值对类型声明并存，但这些具体的键值对类型也要符合索引签名类型
 */

export interface StringOrBooleanInterface {
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}

/**
 * 索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 any 的索引签名类型，以此来暂时支持对类型未明确属性的访问，并在后续一点点补全类型
 */

export interface AnyInterface {
  [key: string]: any;
}

/**
 * 索引类型查询，也就是 keyof 操作符，它可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型
 * 需要注意，这里并不会将数字类型的键名转换为字符串类型字面量，而是仍然保持为数字类型字面量
 */

export interface Foo {
  name: string;
  200: boolean;
}

// export type FooKeys = keyof Foo; // 'name' | 200
// 在 VSCode 中悬浮鼠标只能看到 keyof Foo，看不到其中的实际值，可以这么做
export type FooKeys = keyof Foo & {};

/**
 * 除了应用在已知的对象类型结构上外，还可以直接 keyof any 来生产一个联合类型，它会由所有可用作对象键的类型组成【string | number | symbol】
 * 也就是说，它是由无数字面量类型组成的，由此可以确定，keyof 产物必定是一个联合类型
 */

export type AllKeys = keyof any;

/**
 * 索引类型访问
 * 在 JavaScript 中可以通过 obj[expression] 的方式来动态访问一个对象属性，expression 表达式会先执行，然后使用返回值来访问属性
 * 而 TypeScript 中也可以通过类似的方式，只不过这里的 expression 要换成类型
 */

export interface NumberRecord {
  [key: string]: number;
}

// 使用 string 这个类型访问 NumberRecord
// 注意，其访问方式与返回值均是类型
export type PropType = NumberRecord[string]; // number

/**
 * 需要注意，在未声明索引签名类型的情况下，不能使用 NumberRecord[string] 这种原始类型的访问方式，只能通过键名的字面量类型进行访问
 */

// 更直观地，通过字面量类型来进行索引类型访问
export type FooNameType = Foo['name']; // string
export type Foo200Type = Foo[200]; // boolean

/**
 * 以上，看起来像是普通的值访问，但实际上，这里的 'name' 和 200 都是字面量类型，而不是一个 JavaScript 值
 * 索引类型查询的本质其实就是，通过键名的字面量类型访问这个键对应的值的类型
 */

/**
 * 使用字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型
 */

export type FooPropTypeUnion = Foo[keyof Foo]; // string | boolean
