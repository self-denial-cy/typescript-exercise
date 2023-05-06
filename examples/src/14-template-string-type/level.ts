/**
 * 由于模板字符串类型的最终产物还是字符串字面量类型，因此只要插槽位置的类型匹配，字符串字面量类型就可以被认为是模板字符串类型的子类型
 */

export type Version = `${number}.${number}.${number}`;

type Res1 = '1.1.1' extends Version ? 1 : 2; // 1

// 同样地，模板字符串类型和模板字符串也拥有着很紧密的关联
export function greet(to: string): `Hello ${string}` {
  return `Hello ${to}`;
}
