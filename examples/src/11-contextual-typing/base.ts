export type CustomHandler = (name: string, age: number) => boolean;

export const handler: CustomHandler = (arg1, arg2) => true;

/**
 * 在这里，参数的类型基于其上下文类型中的参数类型位置来进行匹配，arg1 对应到 name，arg2 对应到 age，所以分别匹配到 string 和 number 类型
 * 这就是上下文类型的核心理念：基于位置的类型推导，上下文类型更像是反方向的类型推导，也就是基于已定义的类型来规范开发者的使用
 */
