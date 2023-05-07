import { Split } from './split';

// 基于 Split 工具类型可以获取字符串字面量的长度
export type Length<Str extends string> = Split<Str, ''>['length'];

type Res1 = Length<'this is a string'>;
