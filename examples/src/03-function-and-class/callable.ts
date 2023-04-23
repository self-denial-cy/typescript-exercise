/**
 * 使用 Newable Interface 来描述一个类的结构【类似于描述函数结构的 Callable Interface】
 */

export class Foo {
  prop: string;

  print() {}
}

export interface FooStruct {
  new (): Foo;
}

export const NewableFoo: FooStruct = class {
  prop: string;

  print() {}
};
