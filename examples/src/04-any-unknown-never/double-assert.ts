/**
 * 如果在使用类型断言时，原类型与断言类型之间差异过大，以致 TypeScript 会报一个类型错误
 */

export const str: string = 'this is a string';

// (str as { handler: () => {} }).handler();

(str as unknown as { handler: () => {} }).handler();

/**
 * 尖括号断言，不推荐
 */

(<{ handler: () => {} }>(<unknown>str)).handler();

/**
 * 这是因为断言类型和原类型的差异太大，需要先断言到一个通用的类型，即 any/unknown
 * 这一通用类型包含了所有可能的类型，因此断言到它和从它断言到另一个类型差异不大
 */
