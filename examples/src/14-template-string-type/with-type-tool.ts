// 基于 keyof 和 模板字符串类型，可以基于已有的对象类型来实现精确到字面量的类型推导
export interface Foo {
  name: string;
  age: number;
  male: boolean;
}

type ChangeListener = {
  on: (change: `${keyof Foo}Changed`) => void;
};

/**
 * TypeScript 在引入模板字符串时支持了一个叫做重映射的新语法，基于模板字符串类型与重映射，可以实现一个新功能：在映射键名时基于原键名做修改
 * 需要注意，由于对象的合法键名包括了 symbol，而模板字符串类型插槽中并不支持 symbol 类型，因此通过 & (string | number) 将 symbol 过滤掉
 */
type Copy<T extends object> = {
  [K in keyof T]: T[K];
};

type CopyWithRename<T extends object> = {
  [K in keyof T as `modified_${K & (string | number)}`]: T[K];
};

type CopiedFoo = CopyWithRename<Foo>;
