/**
 * 专门与模板字符串类型适配的工具类型，包括 Uppercase、Lowercase、Capitalize、Uncapitalize【字符串大写、字符串小写、首字母大写、首字母小写】
 * 实际上，这是 TypeScript 中首次引入能直接改变类型本身含义的工具类型
 */

export type Heavy<T extends string> = `${Uppercase<T>}`;
export type Respect<T extends string> = `${Capitalize<T>}`;

type Res1 = Heavy<'this is a string'>;
type Res2 = Respect<'this is a string'>;

export type CopyWithRename<T extends object> = {
  [K in keyof T as `modified${Capitalize<K & string>}`]: T[K];
};
