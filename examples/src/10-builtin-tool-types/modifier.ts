/**
 * 属性修饰工具类型
 * 这一类工具类型主要使用属性修饰、映射类型与索引类型【包括索引类型签名、索引类型访问、索引类型查询】相关
 */

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * 以上，Partial 和 Required 可以认为是一对工具类型，它们的功能相反
 * 在实现上，它们唯一的差异是在索引类型签名处的可选修饰符，Partial 是 ?，即标记属性可选
 * 而 Required 是 -?，相当于在原本属性上如果有 ? 这个标记，则移除它
 * 如果觉得不好记，Partial 的 ? 可以换成 +? 显式地表示添加可选标记【类似地，Readonly 中也可以使用 +readonly】
 * 需要注意，可选标记不等于修改此属性类型为【原类型 | undefined】
 * 对于结构声明来说，一个属性是否必须提供取决于其是否携带可选标记，即使使用 never  也无法标记这个属性为可选
 */

interface Foo {
  required: string;
  optional1: string | undefined;
  optional2?: string;
  optional3: never;
}

let neverVal: never;

const foo: Foo = {
  required: 'this is a string',
  optional1: undefined, // 仍然会要求提供该属性
  optional3: neverVal,
};

/**
 * 发散思考
 * 目前已经了解了 Partial、Required、Readonly 这一类属性修饰的工具类型，试想下以下这些场景能否适用：
 * 1.现在的属性修饰是浅层的，如果是嵌套在里面的对象类型也需要进行修饰，如何适用？
 * 2.现在的属性修饰是全量的，如果只想修饰部分属性？部分属性，可能是基于传入已知的键名来确定，也可能是基于属性类型来确定【比如说只修饰函数类型的属性】
 */
