/**
 * 接口和类型别名都能直接使用交叉类型，除此以外，接口还能够使用继承进行合并
 * 在继承时子接口可以声明同名属性，但并不能覆盖父接口中的此属性
 * 子接口中的属性类型需要能够兼容【extends】父接口中的属性类型
 */

export interface Struct1 {
  primitiveProp: string;
  objectProp: {
    name: string;
  };
  unionProp: string | number;
}

// 直接声明同名接口，接口会进行合并，但同名属性的类型仍然需要兼容
export interface Struct1 {
  primitiveProp: string;
  extraProp: boolean;
}

export interface Struct2 extends Struct1 {
  primitiveProp: 'this is a string';
}

const obj: Struct2 = {
  primitiveProp: 'this is a string',
  objectProp: {
    name: 'name',
  },
  unionProp: 666,
  extraProp: true,
};

export type Base = {
  name: string;
  age: number;
};

// 接口继承类型别名与接口继承接口规则一致
export interface IDerived extends Base {
  name: 'this is a string';
}

const _obj: IDerived = {
  name: 'this is a string',
  age: 666,
};

export interface IBase {
  name: string;
}

// 类型别名中使用交叉类型合并接口，虽然不会报错，但是 string 和 number 合并后只能得到一个 never
export type Derived = IBase & {
  name: number;
};

let neverVal: never;

const obj_: Derived = {
  name: neverVal,
};
