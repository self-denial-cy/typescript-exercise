/**
 * unknown 类型和 any 类型有些类似，一个 unknown 类型的变量可以再次赋值为任意类型的值，但只能被赋值给 any 和 unknown 类型的变量
 */

export let unknownVar: unknown = 'this is a string';

unknownVar = false;
unknownVar = 'this is a string';
unknownVar = {
  site: 'google',
};
unknownVar = () => {};

export const anyVal: any = unknownVar;

export const unknownVal: unknown = unknownVar;

/**
 * unknown 和 any 的一个主要差异体现在赋值给别的变量时，any 就像是【我身化万千无处不在无所不能】，所有类型都会把它当自己人
 * 而 unknown 就像是【我虽身化万千，但我坚信在未来的某一刻会得到一个确定的类型】，只有 any 和 unknown 把它当自己人
 * 简单地说，any 跳过了所有的类型检查，而 unknown 并没有，因此要对 unknown 类型进行属性访问时，需要进行类型断言，即【虽然这是
 * 一个未知的类型，但它在这里必定就是这个类型！】
 */

(unknownVal as { foo: () => {} }).foo();

/**
 * 在类型未知的情况下，更推荐使用 unknown 标注，这保证了类型检查的存在
 * 当然在使用 unknown 类型时，可能会需要多写一些类型断言
 */
