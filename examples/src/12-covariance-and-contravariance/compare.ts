/**
 * tsconfig.json 中的 strictFunctionTypes 配置：在比较两个函数类型是否兼容时，将对函数参数类型进行更严格的检查
 * 实际上，这里的更严格指的即是【对函数参数类型启用逆变检查】
 * 那么问题来了，没有开启这个选项前，原本对函数参数类型如何检查？
 */
import { Animal, Dog, Corgi } from './base';

export function fn(dog: Dog) {
  dog.bark();
}

export type CorgiFunc = (arg: Corgi) => void;
export type AnimalFunc = (arg: Animal) => void;

const fn1: CorgiFunc = fn;
const fn2: AnimalFunc = fn;

/**
 * 按照【函数类型的参数类型使用子类型逆变的方式确定是否成立】的原则，fn2 的赋值应当是不成立的
 * 但是在禁用了 strictFunctionTypes 的情况下，TypeScript 并不会抛出错误，这是因为，在默认情况下，对函数参数类型的检查采用【双变】，
 * 即逆变或协变都被认为可接受
 */

/**
 * 在 TypeScript ESLint 中，有这么一条规则：method-signature-style，它的意图是约束在接口中声明方法时，
 * 需要使用 property 而非 method 形式
 * 进行如此约束的原因，即对于 property 声明，才能在开启严格函数参数类型检查的情况下享受到基于逆变的参数类型检查
 * 对于 method 声明（以及构造函数声明），其无法享受到这一更严格的检查的原因则是对于如 Array 这样的内置定义，本就希望它的函数方法按照协变方式进行检查【Array 内置方法就是使用 method 声明的】
 * 因此大部分情况下，确实希望方法参数类型检查是双变的，那就使用 method 声明，否则使用 property 声明【开启 strictFunctionTypes】
 */
