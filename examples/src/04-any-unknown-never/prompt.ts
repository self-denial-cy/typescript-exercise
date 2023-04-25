/**
 * 类型断言还有一种用法是作为代码提示的辅助工具，比如说以下这个稍微复杂的接口
 */

export interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => number;
    baz: {
      handler(): Promise<void>;
    };
  };
}

/**
 * 假设想要基于以上这个结构实现一个对象，使用类型标注
 */

// export const obj: IStruct = {};

/**
 * 必须规规矩矩地实现整个接口结构才可以，否则就是一堆类型报错
 * 但是如果使用类型断言，可以在保留类型提示的前提下，只实现一部分结构
 */

export const struct = {
  bar: {
    baz: {},
  },
} as IStruct;

/**
 * 当然，这只是一种代码提示的辅助手段
 */
