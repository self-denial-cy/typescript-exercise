export type Replace<
  Str extends string,
  Search extends string,
  Replacement extends string,
  ShouldReplaceAll extends boolean = false
> = Str extends `${infer Head}${Search}${infer Tail}`
  ? ShouldReplaceAll extends true
    ? Replace<`${Head}${Replacement}${Tail}`, Search, Replacement, ShouldReplaceAll>
    : `${Head}${Replacement}${Tail}`
  : Str;

type Res1 = Replace<'this is a string', 'string', 'str'>;
type Res2 = Replace<'this is a string', 'is', '', true>;
