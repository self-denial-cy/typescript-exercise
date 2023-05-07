export type Split<Str extends string, Delimiter extends string> = Str extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : Str extends Delimiter
  ? []
  : [Str];

type Res1 = Split<'1,2,3', ','>;
type Res2 = Split<'123456789', ''>;
type Res3 = Split<'this is a string', ' ' | '-' | '_'>;
