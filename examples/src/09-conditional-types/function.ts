// 条件类型还可以用来对更复杂的类型进行比较，比如函数类型
export type Func = (...args: any[]) => any;

// 泛型约束要求传入符合结构的类型参数，相当于参数校验；条件类型使用类型参数进行条件判断，相当于实际内部逻辑
export type FunctionConditionType<T extends Func> = T extends (...args: any[]) => string
  ? 'A string return func'
  : 'A non-string return func';

type StringResult = FunctionConditionType<() => string>;
type NonStringResult1 = FunctionConditionType<() => boolean>;
type NonStringResult2 = FunctionConditionType<() => number>;
