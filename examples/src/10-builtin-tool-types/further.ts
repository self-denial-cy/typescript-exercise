export type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P extends string // 提取出来的类型如果不满足 extends string，则舍弃
    ? P
    : never
  : never;

// TypeScript 4.7 起支持了 infer 约束功能来实现对特定类型的提取
export type FirstArrayItemType_<T extends any[]> = T extends [infer P extends string, ...any[]] ? P : never;

/**
 * 实际上，infer + 约束的场景是非常常见的，尤其是在某些连续嵌套的情况下，一层层的 infer 提取再筛选会严重地影响代码的可读性，而
 * infer 约束这一功能无疑带来了更简洁直观的类型编程代码
 */
