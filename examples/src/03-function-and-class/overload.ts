/**
 * 在某些逻辑较复杂的情况下，函数可能有多组入参类型和返回值类型
 */

export function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

/**
 * 要想实现与入参类型关联的返回值类型，应当使用 TypeScript 提供的函数重载签名【Overload Signature】
 */

export function _func(foo: number, bar: true): string; // 重载签名一
export function _func(foo: number, bar?: false): number; // 重载签名二
export function _func(foo: number, bar?: boolean): string | number {
  // 函数的实现签名，会包含重载签名的所有可能情况
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = _func(123, true);
const res2 = _func(123, false);
const res3 = _func(123);

/**
 * 基于重载签名，实现了将入参类型和返回值类型的可能情况进行关联，获得了更精确的类型标注能力
 * 需要注意，拥有多个重载声明的函数在被调用时，是按照重载的声明顺序往下匹配的，因此推荐将更精确的重载声明写在上面
 */

/**
 * 实际上，TypeScript 中的重载更像是伪重载，它只有一个具体实现，其重载体现在方法调用的签名上而非具体实现上
 * 而在如 C++ 等语言中，重载体现在多个名称一致但入参不同的函数实现上，这才是更广义上的函数重载
 */
