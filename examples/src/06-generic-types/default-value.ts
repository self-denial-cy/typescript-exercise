/**
 * 像函数可以声明一个参数的默认值一样，泛型同样可以设定默认值
 */

export type Factory<T = boolean> = T | string | number;

export type DefaultFactory = Factory; // string | number | boolean

/**
 * 除了声明默认值以外，泛型还能做到一样函数参数做不到的事：泛型约束
 * 也就是说，可以要求传入工具类型的泛型必须符合某些条件，否则拒绝之后的逻辑
 * 使用 extends 关键字来约束传入的泛型参数必须符合要求
 * 关于 extends，A extends B 意味着 A 是 B 的子类型，也就是说 A 比 B 的类型更精确，或者说更复杂，比如说：
 * 更精确，如字面量类型是对应原始类型的子类型，如 'this is a string' extends string
 * 类似地，联合类型子集均为联合类型的子类型，如 1、1 | 2 是 1 | 2 | 3 | 4 的子类型
 * 更复杂，如 { name: string } 是 {} 的子类型，因为在 {} 的基础上增加了额外的属性
 * 类似地，基类与派生类【父类与子类】也是如此
 */
