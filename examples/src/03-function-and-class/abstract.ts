/**
 * 除了基类与派生类以外，还有一个比较重要的概念【抽象类】
 * 抽象类是对类结构与方法的抽象，一个抽象类描述了一个类中应当有哪些成员【属性、方法等】，一个抽象方法描述了这一方法在实际实现中的结构
 * 需要注意，抽象类中的成员也需要使用 abstract 关键字才能被视为抽象类成员
 */

export abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
}

/**
 * 通过 implements 关键字可以实现一个抽象类
 * 需要注意，必须完全实现这个抽象类的每一个抽象成员
 * 在 TypeScript 中无法声明静态的抽象成员
 */

export class Foo implements AbsFoo {
  absProp: string = 'this is a string';

  get absGetter(): string {
    return this.absProp;
  }

  absMethod(name: string): string {
    return name;
  }
}

/**
 * 对于抽象类，它的本质就是描述类的结构
 * 同样地，interface 也可以声明类的结构
 */

export interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(name: string): string;
}

export class _Foo implements FooStruct {
  absProp: string = 'this is a string';

  get absGetter(): string {
    return this.absProp;
  }

  absMethod(name: string): string {
    return name;
  }
}
