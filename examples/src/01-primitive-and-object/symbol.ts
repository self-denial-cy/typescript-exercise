/**
 * Symbol 在 JavaScript 中表示一个唯一的值类型，类似于字符串类型，可以作为对象的属性名，用于避免错误修改对象/Class 内部属性
 * 在 TypeScript 中，多个 symbol 类型的值，它们的 symbol 类型指的都是同一个类型
 * 为了实现【独一无二】这个特性，TypeScript 中支持了 unique symbol 这个类型，每一个 unique symbol 都是独一无二的类型
 */

export const uniqueSymbolFoo: unique symbol = Symbol('desc');
// export const uniqueSymbolBar: unique symbol = uniqueSymbolFoo;

/**
 * 在 JavaScript 中，可以用 Symbol.for 方法复用已创建的 Symbol，如 Symbol.for('desc') 会首先查找全局是否已经有使用 desc 作为
 * key 的 Symbol 注册，如果有则返回这个 Symbol，否则才会创建新的 Symbol
 * 在 TypeScript 中，想要复用已创建的 unique symbol 类型，需要通过类型查询操作符 typeof
 */

export type unqiuesymbol = typeof uniqueSymbolFoo;

export const uniqueSymbolBaz: unqiuesymbol = uniqueSymbolFoo;

// unique symbol 日常开发中的使用非常少见，了解下就好
