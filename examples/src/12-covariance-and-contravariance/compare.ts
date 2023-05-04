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
