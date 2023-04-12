interface Foo {
  name: string;
  age: number;
}

interface Bar {
  name: string;
  job: string;
}

/**
 * 在【只是想要进行类型比较】的前提下，其实没有必要真的去声明两个变量，即涉及了值空间的操作
 * 完全可以只在类型空间中【可以理解为用于存放 TypeScript 类型信息的内存空间】比较这些类型，只需要使用 declare 关键字
 */
declare let foo: Foo
declare let bar: Bar

// foo = bar

export { }
