export const arr1: string[] = []; // 大部分情况下都以这种方式声明数组类型
export const arr2: Array<string> = [];

// 数组中只存放固定长度的成员，但是越界访问
export const arr3: string[] = ['this', 'is', 'a', 'string'];
console.log(arr3[599]);

// 声明元组类型防止越界访问
export const arr4: [string, string, string, string] = ['this', 'is', 'a', 'string'];
// console.log(arr4[599]);

// 元组内部声明多个与位置强绑定的不同类型的成员
export const arr5: [string, number, boolean] = ['this is a string', 66, true];

// 元组支持可选成员【number 设置为可选后，boolean 也必须为可选】
export const arr6: [string, number?, boolean?] = ['this is a string'];
// export const arr6: [string, number?, boolean?] = ['this is a string', , ,];
export type TupleLength = typeof arr6.length; // 1 | 2 | 3

// 具名元组在 TypeScript 4.0 中开始支持
export const arr7: [str: string, num: number, bool?: boolean] = ['this is a string', 66, true];
