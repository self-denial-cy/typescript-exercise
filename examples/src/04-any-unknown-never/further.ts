/**
 * 类型层级初探
 * any 与 unknown 属于 Top Type，表现在它们包含了所有可能的类型
 * 而 never 属于 Bottom Type，表现在它是一个虚无的、不携带类型信息的类型
 * 再加上原始类型与字面量类型等，按照类型的包含关系来进行层级划分：
 * 1.最顶级的类型，any 与 unknown
 * 2.特殊的 Object，它也包含了所有的类型，但是和 Top Type 比还是差了一层
 * 3.String、Boolean、Number 这些装箱类型
 * 4.原始类型与对象类型
 * 5.字面量类型，即更精确的原始类型与对象类型，需要注意 null 和 undefined 并不是字面量类型的子类型【更倾向于同属一层级的关系】
 * 6.最底层的 never
 * 实际上这个层级链并不完整，后续还有联合类型、交叉类型、函数类型等
 */

/**
 * 实际上类型断言的工作原理也和类型层级有关，在判断断言是否成立，即差异是否能接受时，实际上判断的即是这两个类型是否能够找到一个公共
 * 的父类型，比如 { } 和 { name: string } 其实可以认为拥有公共的父类型 {}【可以理解为一个基类，{ } 和 { name: string } 其实是
 * 它的派生类】
 * 如果找不到公共的父类型，这个时候就需要请出 Top Type，先将其断言到 Top Type，那么就拥有了公共父类型 Top Type，再断言到具体类型
 * 也是同理【双重断言的原理】
 */