/**
 * class 中，属性的类型标注类似于变量，而构造函数、方法、存取器的类型标注类似于函数
 * 需要注意，setter 方法不允许进行返回值的类型标注
 * 类的方法同样可以进行函数那样的重载，且语法基本一致
 */

export class Foo {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  func(foo: number, bar: true): string;
  func(foo: number, bar?: false): number;
  func(foo: number, bar?: boolean): string | number {
    if (bar) {
      return String(foo);
    } else {
      return foo * 400;
    }
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(val: string) {
    this.prop = `${val}+A`;
  }
}

/**
 * 类似函数可以通过函数声明和函数表达式创建一样，类也可以通过类声明和类表达式的方式创建
 */

export const _Foo = class {
  prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  func(foo: number, bar: true): string;
  func(foo: number, bar?: false): number;
  func(foo: number, bar?: boolean): string | number {
    if (bar) {
      return String(foo);
    } else {
      return foo * 400;
    }
  }

  get propA(): string {
    return `${this.prop}+A`;
  }

  set propA(val: string) {
    this.prop = `${val}+A`;
  }
};

/**
 * public 此类成员在类、类的实例、子类中都能被访问
 * private 此类成员仅能在类的内部被访问
 * protected 此类成员仅能在类与子类中被访问
 * 当不显式地使用访问性修饰符时，成员的访问性默认为 public
 */

export class MofifiedFoo {
  private prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(val: string) {
    this.propA = `${val}+A`;
  }
}

/**
 * 在构造函数中对参数应用访问性修饰符会将参数直接作为类的成员【实例属性】，免去后续的手动赋值
 */

export class Foo2 {
  constructor(public arg1: string, private arg2: boolean) {}
}

new Foo2('this is a string', true);
