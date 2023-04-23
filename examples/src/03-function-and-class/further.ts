/**
 * 通常不会对类的构造函数进行访问性修饰
 * 但是一旦修饰后，类的构造函数就会被标记为私有，且只允许在类内部访问，这样就声明了一个不能实例化的类
 */

export class Foo {
  private constructor() {}
}

/**
 * 有些场景下，私有构造函数确实有奇妙的用法，比如说不希望实例化的工具类
 * 或者在一个类希望把实例化逻辑通过方法来实现，而不是通过 new 的形式时，也可以使用私有构造函数来达成目的
 */

export class Utils {
  private constructor() {}

  static identifier = 'this is a identifier';

  static makeUHappy() {}
}
