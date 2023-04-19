export interface IDescription {
  name: string;
  age: number;
  male: boolean;
}

export const obj1: IDescription = {
  name: 'this is a string',
  age: 66,
  male: true,
};

export interface IDescription2 {
  name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

export const obj2: IDescription2 = {
  name: 'this is name',
  age: 599,
  male: true,
  // 无需实现 func 也是合法的
};

obj2.male = false;
obj2.func = () => {}; // 即使对可选属性进行了赋值，TypeScript 仍然会使用接口的描述为准进行类型检查

export interface IDescription3 {
  readonly name: string;
  age: number;
}

export const obj3: IDescription3 = {
  name: 'this is name',
  age: 599,
};

// 防止对象的属性被篡改
// obj3.name = 'this is name';

/**
 * 数组和元组也有只读修饰，但是不能像对象那样标记某个属性只读，只能将整个数组|元组标记为只读
 * 一旦数组|元组被标记为只读后，该数组|元组将不再具有 push|pop 等方法【即会修改原数组|元组的方法，其它方法倒是还存在】
 * 因此报错信息也将是【类型 xxx 上不存在属性 push 等等】
 * 实现本质是只读数组|元组类型实际上变成了 ReadonlyArray，而不再是 Array
 */
export const arr: readonly string[] = [];
// arr.push('this is a string');
