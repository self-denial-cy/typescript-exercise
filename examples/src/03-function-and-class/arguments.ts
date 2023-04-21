/**
 * 需要注意，可选参数必须位于必选参数之后，因为在 JavaScript 中函数的入参是按照位置【形参】，而不是按照参数名【名参】进行传递
 */

export function foo1(name: string, age?: number): number {
  const inputAge = age || 18;
  return name.length + inputAge;
}

export function foo2(name: string, age: number = 18): number {
  return name.length + age;
}

/**
 * 对于 rest 参数的类型标注使用数组类型进行标注
 * 使用元组也可以，但是就固定参数个数了
 */

export function foo3(arg1: string, ...rest: any[]) {}

export function foo4(arg1: string, ...rest: [number, boolean]) {}

foo4('this is a string', 66, true);
