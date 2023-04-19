/**
 * 在 JavaScript中，原型链的顶端是 Object 以及 Function，这也就意味着所有的原始类型与对象类型最终都指向 Object
 * 在 TypeScript 中就表现为 Object 包含了所有的类型
 * 对于 undefined、null、void 0 需要关闭 strictNullChecks
 */

export const tmp1: Object = undefined;
export const tmp2: Object = null;
export const tmp3: Object = void 0;
export const tmp4: Object = 'linbudu';
export const tmp5: Object = 599;
export const tmp6: Object = { name: 'linbudu' };
export const tmp7: Object = () => {};
export const tmp8: Object = [];

/**
 * 和 Object 类似的还有 Boolean、Number、String、Symbol，这几个装箱类型【Boxed Types】同样包含了一些超出预期的类型
 * 以 String 为例，它同样包含 undefined、null、void，以及代表的拆箱类型【UnBoxed Types】string
 */

export const tmp9: String = undefined;
export const tmp10: String = null;
export const tmp11: String = void 0;
export const tmp12: String = 'this is a string';

/**
 * 注意，在任何情况下，都不应该使用这些装箱类型
 */

/**
 * object 的引入就是为了解决对 Object 类型的错误使用，它代表所有非原始类型的类型，即数组、对象与函数类型这些
 */

export const tmp13: object = undefined;
export const tmp14: object = null;
export const tmp15: object = void 0;
export const tmp16: object = {};
export const tmp17: object = () => {};
export const tmp18: object = [];

/**
 * {}，一个奇奇怪怪的空对象，类似于 Object
 * 虽然能够将其作为类型使用，但实际上无法对该类型的变量进行打点赋值操作
 * 因为它被认为一个合法的，但内部无属性定义的空对象
 */
export const tmp19: {} = undefined;
export const tmp20: {} = null;
export const tmp21: {} = void 0; // void 0 等价于 undefined
export const tmp22: {} = 'this is a string';
export const tmp23: {} = 23;
export const tmp24: {} = () => {};
export const tmp25: {} = {};
export const tmp26: {} = [];
// tmp25.name = 'this is a string'; // 类型“{}”上不存在属性“name”。

/**
 * 总结
 * 在任何时候不要，不要，不要使用 Object 以及类似的装箱类型【String、Number、Boolean 等】
 * 当不确定变量的具体类型，但能确定它不是原始类型时可以使用 object，但更推荐进一步区别：
 * 使用 Record<string, unknown> | Record<string, any> 表示对象
 * unknown[] | any[] 表示数组
 * (...args: any[]) => any 表示函数
 * 避免使用 {}，使用它和使用 any 一样恶劣
 */
