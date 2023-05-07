/**
 * trim 三兄弟：去除起始部分空格的 trimStart、去除结尾部分空格的 trimEnd、开头结尾空格一起去的 trim
 */

export type TrimStart<V extends string> = V extends ` ${infer R}` ? TrimStart<R> : V;

export type TrimEnd<V extends string> = V extends `${infer R} ` ? TrimEnd<R> : V;

export type Trim<V extends string> = TrimStart<TrimEnd<V>>;
