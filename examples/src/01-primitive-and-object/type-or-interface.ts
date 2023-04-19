/**
 * 使用 type【Type Alias，类型别名】代替接口结构描述对象可行
 * 但更推荐的方式是，interface 用来描述对象、类的结构，而类型别名用来将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型
 */

export interface IObjectStruct {
  name: string;
  age: number;
  male: boolean;
}

export type PossibleSource = 'juejin' | 'zhihu' | 'segmentfault';

export type Handler = (str: string) => Promise<void>;
