type _World = 'World';

type _Greeting = `Hello ${_World}`; // Hello World

// 除了使用确定的类型别名以外，模板字符串类型当然也支持通过泛型参数传入
export type Greet<T extends string | number | boolean | null | undefined | bigint> = `Hello ${T}`;

type Greet1 = Greet<'World'>; // Hello World
type Greet2 = Greet<666>; // Hello 666
type Greet3 = Greet<true>; // Hello true
type Greet4 = Greet<null>; // Hello null
type Greet5 = Greet<undefined>; // Hello undefined
type Greet6 = Greet<0x1fffffffffffff>; // Hello 9007199254740991

/**
 * 以上，通过泛型参数传入模板字符串类型只能传入 string | number | boolean | null | undefined | bigint 这些
 * 这些类型在最终的字符串结果中都会被转换为字符串字面量类型，即使是 null 和 undefined
 */

/**
 * 直接为插槽传入一个类型而非类型别名
 * 在这种情况下，Greeting 类型并不会变成 Hello string，而是保持原样，这也意味着它并没有实际意义，此时就是一个无法改变的模板字符串类型
 * 但所有 Hello 开头的字面量类型都会被视为 Hello ${string} 的子类型
 */
export type Greeting = `Hello ${string}`;

/**
 * 很明显，模板字符串类型的主要目的即是增强字符串字面量类型的灵活性，进一步增强类型和逻辑代码的关联
 * 通过模板字符串类型可以声明版本号
 */
export type Version = `${number}.${number}.${number}`;

const v1: Version = '1.1.1';

/**
 * 而在需要声明大量存在关联的字符串字面量类型时，模板字符串类型也能在减少代码的同时获得更好的类型保障
 * 通过这种方式，不仅不需要再手动声明一大堆工具类型，同时也获得了逻辑层面的保障，它会忠实地将所有插槽中的联合类型与剩余的字符串部分进行
 * 依次的排列组合
 */
type _SKU =
  | 'iphone-16G-official'
  | 'xiaomi-16G-official'
  | 'honor-16G-official'
  | 'iphone-16G-second-hand'
  | 'xiaomi-16G-second-hand'
  | 'honor-16G-second-hand'
  | 'iphone-64G-official'
  | 'xiaomi-64G-official'
  | 'honor-64G-official'
  | 'iphone-64G-second-hand'
  | 'xiaomi-64G-second-hand'
  | 'honor-64G-second-hand';

type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

export type SKU = `${Brand}-${Memory}-${ItemType}`;

// 除了直接在插槽中传递联合类型，通过泛型传入联合类型时同样会有分发过程
type SizeRecord<Size extends string> = `${Size}-Record`;
type Size = 'Small' | 'Middle' | 'Large';
type UnionSizeRecord = SizeRecord<Size>;
