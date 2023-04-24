/**
 * 如果说，any 与 unknown 是比原始类型、对象类型等更广泛的类型，也就是说它们更上层一些
 * 就像 string 字符串类型比字符串字面量类型更上层一些，即 any/unknown => 原始类型、对象类型 => 字面量类型
 * 那么，是否存在比字面量类型更底层一些的类型呢？
 * 这里的上层与底层，其实就意味着包含类型信息的多少，any 类型包含了任意的类型，字符串类型包含任意的字符串字面量类型，
 * 而字面量类型只表示一个精确的值类型，如果还要更底层，也就是再少一些类型信息，那就只能什么都没有了
 * 而内置类型 never 就是这么一个【什么都没有】的类型，此前已经有另一个【什么都没有】的类型 void
 * 但相比 void，never 还要更加空白一些
 */

export type UnionWithNever = 'this is a string' | 599 | true | void | never;

/**
 * 在上面的这个联合类型中，never 类型直接被无视掉了，而 void 仍然存在
 * 这是因为 void 虽然表示空类型，但是它仍然携带类型信息，而 never 甚至都不携带任何类型信息，因此会被直接无视
 */

export let v1: never;
export let v2: void;
v2 = v1;

/**
 * 在类型系统中，never 类型被称为 Bottom Type，是整个类型系统层级中最底层的类型，和 null、undefined 一样，是所有类型的子类型
 * 只有 never 类型的变量能够赋值给另一个 never 类型变量，因为它地位最低嘛，只能自己玩
 */

/**
 * 通常不会显式地声明一个 never 类型，它主要被类型检查所使用
 * 但在某些情况下使用 never 确实是符合逻辑的，比如一个只负责抛出错误的函数
 */

export function justThrow(): never {
  throw new Error('error');
}
