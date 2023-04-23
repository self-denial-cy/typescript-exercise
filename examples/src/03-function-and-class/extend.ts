/**
 * TypeScript 中也使用 extends 关键字来实现 Class 的继承
 * 下面的两个类，比较严谨的称呼为基类与派生类
 * 派生类中可以访问到使用 public 或 protected 修饰符的基类成员
 * override 关键字确保派生类尝试覆盖的方法一定在基类中存在定义
 */

export class Base {
  print() {}
}

export class Derived extends Base {
  override print() {
    super.print();
  }
}
