/**
 * 重映射这一能力，可以在映射类型中去修改映射后的键名，而【如果映射后的键名变成了 never，那么这个属性将不会出现在最终的结构中】，也就是
 * 说，可以基于重映射来实现结构处理工具类型，比如说 PickByValueType，类似地，还可以实现 OmitByValueType
 */

export type PickByValueType<T extends object, Type> = {
  [K in keyof T as T[K] extends Type ? K : never]: T[K];
};

type Res1 = PickByValueType<{ name: string; age: number }, string>;

/**
 * 这也是 TypeScript 更新中经常会出现的一个有趣现象，新版本的能力可以大大简化类型编程中的操作
 */
