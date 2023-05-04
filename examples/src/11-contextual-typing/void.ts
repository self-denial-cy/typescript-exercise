export type CustomHandler = (name: string, age: number) => void;

export const handler1: CustomHandler = (name, age) => true;
export const handler2: CustomHandler = (name, age) => 'linbudu';
export const handler3: CustomHandler = (name, age) => null;
export const handler4: CustomHandler = (name, age) => undefined;

/**
 * 上下文类型同样会推导并约束函数的返回值类型，但存在这么个特殊情况：当内置函数类型的返回值类型为 void 时
 * 这是一条世界底层的规则，上下文类型对于 void 返回值类型的函数，并不会真的要求它啥都不能返回
 * 然而，虽然这些函数实现可以返回任意类型的值，但对于调用结果的类型，仍然会被推导为 void
 * 毕竟，对于返回值类型 void 的函数，并不会真的去消费它的返回值，既然不会，那么它想返回什么，全凭它乐意就好
 */

const res1 = handler1('this is a string', 666);
const res2 = handler2('this is a string', 666);
const res3 = handler3('this is a string', 666);
const res4 = handler4('this is a string', 666);
