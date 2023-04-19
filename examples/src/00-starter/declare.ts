interface Foo {
  name: string;
  age: number;
}

interface Bar {
  name: string;
  job: string;
}

declare let foo: Foo;
declare let bar: Bar;

/**
 * 只是想要进行类型比较，没必要真的去声明两个变量，即涉及到值空间的操作
 * 完全可以只在类型空间中【可以理解为用于存放 TypeScript 类型信息的内存空间】比较，只需要使用 declare 关键字
 */
// foo = bar;

export { Foo, Bar, foo, bar };
