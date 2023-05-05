export type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition ? Resolved : Rejected;

export type ValueTypeFilter<T extends object, ValueType, Positive extends boolean> = {
  [Key in keyof T]-?: T[Key] extends ValueType
    ? Conditional<Positive, true, Key, never>
    : Conditional<Positive, true, never, Key>;
}[keyof T];

export type PickByValueType<T extends object, ValueType> = Pick<T, ValueTypeFilter<T, ValueType, true>>;

export type OmitByValueType<T extends object, ValueType> = Pick<T, ValueTypeFilter<T, ValueType, false>>;

// 比较两个类型是否严格相等
export type StrictConditional<A, B, Resolved, Rejected, Fallback = never> = [A] extends [B]
  ? [B] extends [A]
    ? Resolved
    : Rejected
  : Fallback;

export type StrictValueTypeFilter<T extends object, ValueType, Positive extends boolean = true> = {
  [Key in keyof T]-?: StrictConditional<
    T[Key],
    ValueType,
    Positive extends true ? Key : never,
    Positive extends true ? never : Key,
    Positive extends true ? never : Key
  >;
}[keyof T];

export type StrictPickByValueType<T extends object, ValueType> = Pick<T, StrictValueTypeFilter<T, ValueType>>;

export type StrictOmitByValueType<T extends object, ValueType> = Pick<T, StrictValueTypeFilter<T, ValueType, false>>;
