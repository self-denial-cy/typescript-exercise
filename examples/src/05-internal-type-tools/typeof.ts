/**
 * TypeScript 中存在两种功能不同的 typeof 操作符
 * 常见的一种 typeof 操作符就是 JavaScript 中用于检查变量类型的 typeof，它会返回 'string'|'number'|'object'|'undefined' 等值
 * 除此以外，TypeScript 中新增了用于类型查询的 typeof，即 Type Query Operator，它返回一个 TypeScript 类型
 */

export const str = 'this is a string';

export const obj = { name: 'this is a string' };

export const nullVal: null = null;

export const undefinedVal: undefined = undefined;

export const func = (input: string) => {
  return input.length > 10;
};

export type Str = typeof str; // 'this is a string'

export type Obj = typeof obj; // { name: string; }

export type Null = typeof nullVal; // null

export type Undefined = typeof undefinedVal; // undefined

export type Func = typeof func; // (input: string) => boolean

// 可以直接在类型标注中使用 typeof
export const _func: typeof func = (name: string) => {
  return name === 'this is a string';
};

// 可以在类型别名中使用 typeof【ReturnType 会返回一个函数类型中返回值的类型】
export type FuncReturnType = ReturnType<typeof func>; // boolean

/**
 * 绝大部分情况下，typeof 返回的类型就是当把鼠标悬浮在变量名上时出现的推导后的类型，并且是最窄的推导程度【即到字面量类型的级别】
 * 同时，也不必担心混用了这两种 typeof，在逻辑代码中使用的 typeof 一定会是 JavaScript 中的 typeof
 * 而类型代码【如类型标注、类型别名中等】中的一定是类型查询的 typeof
 * 同时，为了更好地避免这种情况，也就是隔离类型层和逻辑层，类型查询操作符后是不允许使用表达式的
 */
