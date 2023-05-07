type _StartsWith<Str extends string, Search extends string> = Str extends `${Search}${infer R}` ? true : false;

export type StartsWith<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _StartsWith<Str, Search>;

type Res1 = StartsWith<'this is a string', 'this'>; // true
type Res2 = StartsWith<'', ''>; // true
