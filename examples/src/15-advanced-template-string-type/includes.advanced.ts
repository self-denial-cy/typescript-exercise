type _Includes<Str extends string, Search extends string> = Str extends `${infer R1}${Search}${infer R2}`
  ? true
  : false;

export type Includes<Str extends string, Search extends string> = Str extends ''
  ? Search extends ''
    ? true
    : false
  : _Includes<Str, Search>;

type Res1 = Includes<'', ''>; // true
