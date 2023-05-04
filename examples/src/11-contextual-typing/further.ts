/**
 * 将更少参数的函数赋值给具有更多参数的函数类型
 */

export function handler(arg: string): void {
  console.log(arg);
}

export function useHandler(callback: (arg1: string, arg2: number) => void): void {
  callback('this is a string', 666);
}

useHandler(handler);
