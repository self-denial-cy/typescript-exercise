export type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}` ? `${Head}${Replacement}${Tail}` : Str;

type Res1 = Replace<'this is a string', 'string', 'str'>; // this is a str

export type ReplaceAll<
  Str extends string,
  Search extends string,
  Replacement extends string
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ReplaceAll<`${Head}${Replacement}${Tail}`, Search, Replacement>
  : Str;

type Res2 = ReplaceAll<'this is a string', 'is', ''>;
