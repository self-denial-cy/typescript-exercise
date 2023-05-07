/**
 * 判断传入的字符串字面量类型中是否含有某个字符串
 * 在 Search 前后声明了两个 infer 插槽，但实际上并不消费 R1 和 R2，而只是判断字符串是否可以被划分为要搜索的部分+其它部分
 */
export type Includes<Str extends string, Search extends string> = Str extends `${infer R1}${Search}${infer R2}`
  ? true
  : false;

type Res1 = Includes<'this is a string', 'str'>; // true
type Res2 = Includes<'this is a string', '_str'>; // false
type Res3 = Includes<'this is a string', ''>; // true
type Res4 = Includes<' ', ''>; // true
type Res5 = Includes<'', ''>; // false，按道理，''.includes('') 也应当成立，因此需特殊处理
