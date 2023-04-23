/**
 * 在 TypeScript 中，可以使用 static 关键字表示一个成员为静态成员
 * 不同于实例成员，在类的内部静态成员无法通过 this 来访问，需要通过 Foo.staticHandler 这种形式访问
 * 静态成员不会被实例继承，它始终只属于当前定义的这个类【以及其子类】
 */

export class Foo {
  static staticHandler() {}

  public instanceHandler() {
    Foo.staticHandler();
  }
}

/**
 * 对于静态成员和实例成员的使用时机，并不需要非常刻意地划分
 * 可以用类 + 静态成员来收敛变量与 utils 方法
 */

export class Utils {
  public static identifier = 'this is a identifier';

  public static makeUHappy() {
    Utils.studyWithU();
  }

  public static studyWithU() {}
}

Utils.makeUHappy();
