export class Animal {
  asPet() {}
}

export class Dog extends Animal {
  bark() {}
}

export class Corgi extends Dog {
  cute() {}
}

// 对于函数类型比较，实际上只能比较其参数类型和返回值类型
export type AnimalAnimalFactoryType = (arg: Animal) => Animal;
export type AnimalDogFactoryType = (arg: Animal) => Dog;
export type AnimalCorgiFactoryType = (arg: Animal) => Corgi;
export type DogAnimalFactoryType = (arg: Dog) => Animal;
export type DogDogFactoryType = (arg: Dog) => Dog;
export type DogCorgiFactoryType = (arg: Dog) => Corgi;
export type CorgiAnimalFactoryType = (arg: Corgi) => Animal;
export type CorgiDogFactoryType = (arg: Corgi) => Dog;
export type CorgiCorgiFactoryType = (arg: Corgi) => Corgi;

declare const AnimalAnimalFactory: AnimalAnimalFactoryType;
declare const AnimalDogFactory: AnimalDogFactoryType;
declare const AnimalCorgiFactory: AnimalCorgiFactoryType;
declare const DogAnimalFactory: DogAnimalFactoryType;
declare const DogDogFactory: DogDogFactoryType;
declare const DogCorgiFactory: DogCorgiFactoryType;
declare const CorgiAnimalFactory: CorgiAnimalFactoryType;
declare const CorgiDogFactory: CorgiDogFactoryType;
declare const CorgiCorgiFactory: CorgiCorgiFactoryType;

// 直接比较函数签名不符合思维直觉，因此引入一个辅助函数
// 对于函数参数，类似于类型系统层级中所说，如果一个值能够被赋值给某个类型的变量，那么可以认为这个值的类型为此变量类型的子类型
export function transformDogAndBark(arg: DogDogFactoryType) {
  const dog = arg(new Dog());
  dog.bark();
}

// transformDogAndBark(AnimalAnimalFactory); // error
transformDogAndBark(AnimalDogFactory);
transformDogAndBark(AnimalCorgiFactory);
// transformDogAndBark(DogAnimalFactory); // error
transformDogAndBark(DogDogFactory);
transformDogAndBark(DogCorgiFactory);
// transformDogAndBark(CorgiAnimalFactory); // error
// transformDogAndBark(CorgiDogFactory); // error 需要开启 strictFunctionTypes
// transformDogAndBark(CorgiCorgiFactory); // error 需要开启 strictFunctionTypes

/**
 * 观察以上排除方式的结论
 * 1.参数类型允许为 Dog 的父类型，不允许为 Dog 的子类型
 * 2.返回值类型允许为 Dog 的子类型，不允许为 Dog 的父类型
 * 这里用来比较的函数类型，其实就是把具有父子关系的类型放置在参数位置和返回值位置上，最终函数类型的关系直接取决于类型的父子关系
 */

/**
 * 考虑 Corgi ≤ Dog ≤ Animal，当有函数类型 DogDogFactoryType，仅有 AnimalCorgiFactoryType ≤ DogDogFactoryType 成立【即能被视作此函数的子类型】
 * 这里是去除参数和返回值类型为 Dog 的边界情况【即 AnimalDogFactoryType、DogDogFactoryType、DogCorgiFactoryType】
 * 这里的参数类型和返回值类型实际上可以各自独立出来看：
 * 1.考虑 Corgi ≤ Dog，假设对其进行返回值类型的函数签名类型包装，则有 T => Corgi ≤ T => Dog，也就是说，在需要返回 Dog 时，返回一个
 * Corgi 也是可用的，即不考虑参数类型的情况下，在包装为函数签名的返回值类型后，其类型层级关系不变
 * 2.考虑 Dog ≤ Animal，假设对其进行参数类型的函数签名类型包装，则有 Animal => T ≤ Dog => T，也就是说，在需要传入 Animal 时，传入一个
 * Dog 也是可用的，即不考虑返回值类型的情况下，在包装为函数签名的参数类型后，其类型层级关系发生了逆转
 * 实际上，这就是 TypeScript 中的协变和逆变在函数签名类型中的表现形式
 * 这两个词最初来自于几何学领域：随着某一个量的变化，随之变化一致的即为协变，而变化相反的即为逆变
 * 用 TypeScript 的思路进行转换，即如果有 A ≤ B，协变意味着 Wrapper<A> ≤ Wrapper<B>，逆变意味着 Wrapper<A> ≥ Wrapper<B>
 * 而在以上示例中，变化【Wrapper】即指从单个类型到函数类型的包装过程
 */

export type AsFuncArgType<T> = (arg: T) => void;
export type AsFuncReturnType<T> = (arg: unknown) => T;

type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog> ? 1 : 2; // 1
type CheckArgType = AsFuncArgType<Dog> extends AsFuncArgType<Animal> ? 1 : 2; // 2

/**
 * 总结
 * 函数类型的参数类型使用子类型逆变的方式确定是否成立，而返回值类型使用子类型协变的方式确定是否成立
 */
