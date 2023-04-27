/**
 * TypeScript 中为非常多的内置对象都预留了泛型坑位
 * 比如 Promise
 */

export function p() {
  return new Promise<boolean>((resolve, reject) => {
    resolve(true);
  });
}

// 还有数组 Array<T> 当中，其中泛型参数代表数组的元素类型，几乎贯穿所有的数组方法
export const arr: Array<number> = [];

arr.push(1, 2);
arr.includes(1);
arr.find(() => false); // number | undefined
