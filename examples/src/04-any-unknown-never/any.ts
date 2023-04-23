/**
 * 为了能够表示【任意类型】，TypeScript 中提供了一个内置类型 any
 * any 类型几乎无所不能，它可以在声明后再次接受任意类型的值，同时也可以被赋值给任意类型的变量
 */

export function log(message?: any, ...optionalParams: any[]) {}

export let foo;

export function func(foo, bar) {}

export let anyVar: any = 'this is a string';

anyVar = false;
anyVar = 'this is a string';
anyVar = {
  site: 'google',
};
anyVar = () => {};

export const str: string = anyVar;

export const num: number = anyVar;

export const arrow: () => void = anyVar;

export const empty: {} = anyVar;

anyVar = null;
anyVar.foo.bar.baz();
console.log(anyVar[0][1][2].prop);

/**
 * any 类型的主要意义，就是为了表示一个无拘无束的【任意类型】，它能兼容所有类型，也能被所有类型兼容
 * 这一作用相当于类型世界给你开了一个外挂，无论何时，你都可以使用 any 跳过类型检查，当然，运行时出了问题就需要自己负责了
 * any 本质是类型系统中的顶级类型，即 Top Type
 */
