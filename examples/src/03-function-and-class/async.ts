/**
 * 对于异步函数，Generator 函数，异步 Generator 函数的类型签名，其入参签名与普通函数基本一致，而返回值类型则稍微有些区别
 */

export async function asyncFunc(): Promise<void> {}

export function* genFunc(): Iterable<void> {}

export async function* asyncGenFunc(): AsyncIterable<void> {}

/**
 * 其中，Generator 函数与异步 Generator 函数已经基本不再使用了，仅做了解即可
 * 而对于异步函数，其返回值必定为一个 Promise 类型
 */
