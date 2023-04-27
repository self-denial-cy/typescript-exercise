/**
 * Class 中的泛型和函数中的泛型非常类似，只不过函数中泛型参数的消费方是入参类型和返回值类型
 * Class 中的泛型参数消费方则是属性、方法、乃至装饰器等，同时 Class 内的方法还可以再声明自己独有的泛型参数
 */

export class Queue<TElementType> {
  private _list: TElementType[];

  constructor(initial: TElementType[]) {
    this._list = initial;
  }

  enqueue<TType extends TElementType>(ele: TType): TElementType[] {
    this._list.push(ele);
    return this._list;
  }

  enqueueWithUnknownType<TType>(ele: TType): Array<TElementType | TType> {
    return [...this._list, ele];
  }

  dequeue(): TElementType[] {
    this._list.shift();
    return this._list;
  }
}
