/**
 * 非空断言其实是类型断言的简化，它使用 ! 语法，即 obj!.func()!.prop 的形式标记前面的一个声明一定是非空的
 * 实际上就是剔除了 null 和 undefined 类型
 */

export let foo: {
  func?: () => {
    prop?: number | null;
  };
};

export const res1 = foo.func!().prop!.toFixed();

export const res2 = foo!.func()!.prop!.toFixed();

export const res3 = foo.func?.().prop?.toFixed(); // 可选链

/**
 * 非空断言的运行时仍然会保持调用链，因此在运行时可能会报错
 * 而可选链会在某一个部分收到 undefined 或 null 时直接短路掉，不会再发生后面的调用
 */

export const element = document.querySelector('#id')!;

export const target = [1, 2, 3, 4].find((_) => _ === 4)!;

/**
 * 为什么说非空断言是类型断言的简写，因为上面的非空断言实际上等价于以下的类型断言操作
 */

export const res4 = (
  (
    foo.func as () => {
      prop?: number | null;
    }
  )().prop as number
).toFixed();
