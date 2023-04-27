/**
 * 使用泛型时，可以同时传入多个泛型参数，还可以让这几个泛型参数之间存在关联
 */

export type Conditional<Type, Condition, TruthyResult, FalsyResult> = Type extends Condition
  ? TruthyResult
  : FalsyResult;

export type Res1 = Conditional<'this is a string', string, 'passed', 'rejected'>;
export type Res2 = Conditional<'this is a string', boolean, 'passed', 'rejected'>;

/**
 * 以上，多泛型参数其实就像接受更多参数的函数，其内部的运行逻辑【类型操作】会更加抽象，表现在参数【泛型参数】需要进行的逻辑运算【类型操作】会更加复杂
 */

export type ProcessInput<Input, SecondInput extends Input = Input, ThirdInput extends Input = SecondInput> = number;

/**
 * 以上，多个泛型参数之间的依赖，其实即是后续泛型参数使用前面的泛型参数作为约束或默认值
 * 这里的内部类型操作并不是重点，主要看泛型参数之间的关系：
 * 这个工具类型接受 1~3 个泛型参数
 * 第二、三个泛型参数需要是第一个泛型参数的子类型
 * 当只传入一个泛型参数时，第二个泛型参数会默认赋值为第一个泛型参数的值，第三个泛型参数会默认赋值为第二个泛型参数的值【即第一个泛型参数的值】
 * 当传入两个泛型参数时，第三个泛型参数会默认赋值为第二个泛型参数的值
 */
