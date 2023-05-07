// @ts-ignore 禁用下一行代码的类型检查【不推荐使用】
export const name: string = 666;

// @ts-expect-error 更严格版本的 ignore，只有下一行代码真的存在错误时才能被使用，否则会给出一个错误
export const age: number = 'this is a string';
