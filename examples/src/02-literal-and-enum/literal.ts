/**
 * 字面量类型【Literal Types】，比原始类型更精确的类型，同时也是原始类型的子类型
 */

export interface Res {
  code: 10000 | 10001 | 50000;
  status: 'success' | 'failure';
  data: Record<string, unknown>;
}

/**
 * 字面量类型主要包括字符串字面量类型、数值字面量类型、布尔值字面量类型和对象字面量类型
 * 它们可以直接作为类型使用
 */

export const str: 'str' = 'str';
export const num: 66 = 66;
export const bool: true = true;

/**
 * 原始类型的变量可以赋任何同类型值，而字面量类型变量要求的是值级别的字面量一致
 * 因此，可以说字面量类型比原始类型更精确
 */

// export const str1: 'this is a string' = 'str';

/**
 * 单独使用字面量类型比较少见，它通常与联合类型一起使用，表示一组字面量类型
 */

export interface Tmp {
  bool?: true | false;
  num?: 1 | 2 | 3;
  str?: 'this' | 'is' | 'a' | 'string';
}

/**
 * 联合类型，表示一组类型的可用集合，只要符合属于联合类型的任一类型，就认为符合该联合类型
 * 联合类型对其成员无任何限制，但是需要注意几点
 * 联合类型中的函数类型，需要使用括号包裹起来
 * 函数类型并不存在字面量类型，因此这里的 (() => {}) 就是一个合法的函数类型
 * 联合类型中可以嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中
 */

export interface Tmp {
  mixed?: true | string | 599 | {} | (() => {}) | (1 | 2);
}

/**
 * 联合类型常用场景之一是通过多个对象类型的联合，来实现手动的互斥属性
 */

export interface Tmp {
  user?:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

export const tmp: Tmp = {
  user: {
    vip: true,
    expires: 'this is expires',
  },
};

/**
 * 通过类型别名复用一组字面量联合类型
 */

export type Code = 10000 | 10001 | 50000;
export type Status = 'success' | 'failure';

/**
 * 对象字面量类型就是一个对象类型的值，这也意味着这个对象的值全都为字面量值
 * 对象字面量类型在实际开发中使用较少，只需了解即可
 */

export interface Tmp {
  obj?: {
    name: 'name';
    age: 18;
  };
}

export const _tmp: Tmp = {
  obj: {
    name: 'name',
    age: 18,
  },
};

/**
 * 总结
 * 在需要更精确的类型时，可以使用字面量类型和联合类型的方式，将原始类型直接收窄到 'resolved' | 'pending' | 'rejected' 这种精确的
 * 字面量类型集合
 * 需要注意，无论是原始类型还是对象类型的字面量类型，它们本质都是类型而不是值，在编译时同样会被擦除，同时也是被存储在内存中的类型空
 * 间而非值空间
 */
