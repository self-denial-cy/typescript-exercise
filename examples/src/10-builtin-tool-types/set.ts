/**
 * 集合工具类型
 * 这一类工具类型主要使用条件类型、条件类型分布式特性
 * 并集：两个集合的合并，合并时重复的元素只会保留一份【这也是联合类型的表现行为】
 * 交集：两个集合的相交部分，即同时存在于这两个集合内的元素组成的集合
 * 差集：对于 A、B 两个集合来说，A 相对于 B 的差集即为 A 中独有而 B 中不存在的元素组成的集合，或者说 A 中剔除了 B 中也存在的元素以后，还剩下的部分
 * 补集：补集是差集的特殊情况，此时集合 B 为集合 A 的子集，在这种情况下 A 相对于 B 的差集 + B = 完整的集合 A
 */

// 交集
export type Extract<T, U> = T extends U ? T : never;

// 差集【注意，差集存在相对的概念，以下是 T 相对于 U 的差集，即 T 中存在 U 中不存在的部分】
export type Exclude<T, U> = T extends U ? never : T;

/**
 * 以下，自行实现并集、交集、差集、补集，同时为了方便记忆，语义化命名
 */

export type Concurrence<A, B> = A | B;

export type Intersection<A, B> = A extends B ? A : never;

export type Difference<A, B> = A extends B ? never : A;

// 补集基于差集实现，只需要约束 B 为 A 的子集即可
export type Complement<A, B extends A> = Difference<A, B>;

// 内置工具类型中还有一个场景比较明确的集合工具类型
export type NonNullable<T> = T extends null | undefined ? never : T;
// 本质上就是集合 T 相对于 null | undefined 的差集，因此可以用 Difference 替代实现
type _NonNullable<T> = Difference<T, null | undefined>;

/**
 * 在基于条件类型分布式特性的工具类型中，其实也存在正反工具类型，但并不都是简单地替换条件类型结果的两端
 * 比如交集和差集就只是简单调换了结果，但二者作用却完全不同
 * 联合类型中会自动合并相同的元素，因此可以默认这里的类型集合全部都是类似 Set 那样的结构，不存在重复元素
 */

/**
 * 发散思考
 * 1.目前为止，处理的集合类型都停留在一维层面，即联合类型之间的集合运算，如果要处理对象类型结构的集合运算呢？
 * 2.在处理对象类型结构集合运算时，可能存在不同的需求，比如合并时，可能希望保留原属性或替换原属性，可能希望替换原属性的同时并不追加新的属性，即
 * 仅用新的对象类型中的属性值覆盖原本对象类型中的同名属性值，此时要如何灵活地处理这些情况呢？
 */
