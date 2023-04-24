/**
 * 类型断言能够显式地告知类型检查系统当前这个变量的类型
 * 它其实就是将一个变量的已有类型更改为新指定类型的操作
 */

export let unknownVar: unknown;

(unknownVar as { foo: () => {} }).foo();
