/**
 * 不同于索引类型包含好几个部分，映射类型指的就是一个确切的类型工具
 * 映射类型的主要作用即是基于键名映射到键值类型
 */

/**
 * 假设下面这个工具类型接受一个对象类型，使用 keyof 获得这个对象类型的键名组成字面量联合类型
 * 然后通过映射类型【即 in 关键字】将这个联合类型的每一个成员映射出来，并将其键值类型设置为 string
 */

export type Stringify<T> = {
  [K in keyof T]: string;
};

export interface Foo {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

export interface Bar {
  [key: string]: boolean;
}

export type StringifiedBarType = Stringify<Bar>;

export type StringifiedFooType = Stringify<Foo>;

// 等价于
export interface StringifiedFooInterface {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}

/**
 * 看起来好像很奇怪，把一个接口的所有属性类型都映射到 string，这有什么意义吗？
 * 别忘了，既然拿到了键，那对应的键值类型也能拿到
 * T[K] 索引类型访问，使用键的字面量类型访问到了值的类型
 * K in 属于映射类型的语法
 * keyof T 索引类型查询
 * [K in keyof T] 的 [] 属于索引签名类型的语法
 * 这里的工具类型可以实现克隆接口的功能
 */

export type Clone<T> = {
  [K in keyof T]: T[K];
};
