export type Join<List extends Array<string | number>, Delimiter extends string> = List extends []
  ? ''
  : List extends [string | number]
  ? `${List[0]}`
  : List extends [string | number, ...infer Rest]
  ? // @ts-expect-error 这里的 Rest 无法被正确地推导，因此使用 @ts-expect-error 忽略错误
    `${List[0]}${Delimiter}${Join<Rest, Delimiter>}`
  : string;

type Res1 = Join<['this', 'is', 'a', 'string'], ' '>;
