/**
 * 模板字符串类型与模式匹配
 * 模式匹配工具类型的核心理念就是对符合约束的某个类型结构，提取其某一个位置的类型，比如函数结构中的参数与返回值类型
 * 而如果将一个字符串字面量类型也视为一个结构，就能够在其中也应用模式匹配相关的能力，而此前所缺少的就是模板字符串类型的能力
 */

export type ReverseName<Str extends string> = Str extends `${infer First} ${infer Last}`
  ? `${Capitalize<Last>} ${First}`
  : Str;

type Res1 = ReverseName<'Tom hardy'>; // Hardy Tom
type Res2 = ReverseName<'Budu Lin'>; // Lin Budu
// 如果传入的字符串字面量类型中有多个空格，这种情况下，模式匹配将只会匹配首个空格，即 A B C 会被匹配为 A 和 B C 这样的两个结构
type Res3 = ReverseName<'Budu Lin 666'>; // Lin 666 Budu

// 除了显式使用 infer 进行模式匹配操作以外，由于模板字符串类型的灵活性，甚至可以直接声明一个泛型来进行模式匹配操作
declare function handler<Str extends string>(arg: `Guess who is ${Str}`): Str;
