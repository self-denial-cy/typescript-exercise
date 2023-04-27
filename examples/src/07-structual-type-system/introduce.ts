/**
 * 在 TypeScript 中，可能会遇见以下这种【看起来不太对，但竟然能正常运行】的代码
 */

export class Cat {
  eat() {}
}

export class Dog {
  eat() {}
}

export function feedCat(cat: Cat) {}

feedCat(new Dog());

/**
 * 以上，这里的 feedCat 函数明明需要的是一只猫，可为什么给它一只狗也可以呢？
 * 实际上，这就是 TypeScript 的类型系统特性：结构化类型系统
 * 了解结构化类型系统的比较方式，对比另一种类型系统【标称类型系统】的工作方式，以及在 TypeScript 中去模拟标称类型系统，有助于
 * 明确类型比较的核心原理，从根本上理解条件类型等类型工具，也能够帮助在日常开发中解决许多常见的类型报错
 */

export class _Cat {
  meow() {}
  eat() {}
}

export class _Dog {
  eat() {}
}

export function _feedCat(cat: _Cat) {}

// _feedCat(new Dog()); // error

/**
 * 以上，为 _Cat 新增一个独特的方法，这个时候的表现才是符合预期的，即只能用 _Cat 来调用 _feedCat
 * TypeScript 比较两个类型并非通过类型的名称【即 _feedCat 函数只能通过 _Cat 类型调用】，而是比较这两个类型上实际拥有的属性与方法
 * 也就是说，这里实际上是比较 _Cat 类型上的属性是否都存在于 _Dog 类型上
 * 在最初的例子中，Cat 与 Dog 类型上的方法是一致的，所以它们虽然是两个名字不同的类型，但仍然被视为结构一致，这就是结构化类型系统的特性
 */

/**
 * 结构化类型系统为何被称为鸭子类型【Duck Typing】？
 * 这个名字来源于鸭子测试【Duck Test】，其核心理念是，如果看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子
 * 也就是说，鸭子类型中两个类型的关系是通过对象中的属性方法来判断的【或者说结构】
 * 比如最开始的 Cat 和 Dog 就被视为同一个类型，而为 _Cat 添加独特的方法后就不再被认为与 _Dog 一个类型了，但如果为 Dog_ 类型添加一个独特方法呢？
 */

export class Cat_ {
  eat() {}
}

export class Dog_ {
  bark() {}
  eat() {}
}

export function feedCat_(cat: Cat_) {}

feedCat_(new Dog_());

/**
 * 以上，Dog_ 新增一独特方法，但却没有类型报错，为什么呢？
 * 这是因为，结构化类型系统认为 Dog_ 完全实现了 Cat_ 类型，至于额外的 bark 方法，可以认为是 Dog_ 类型继承 Cat_类型后新增的方法，
 * 即此时 Dog_ 类可以被认为是 Cat_ 类的子类
 * 更进一步，在比较对象类型的属性时，同样会采用结构化类型系统进行判断，比如对结构中的函数类型【即方法】进行比较时，同样存在类型的兼容性比较
 */

export class __Cat {
  eat(): boolean {
    return true;
  }
}

export class __Dog {
  eat(): number {
    return 666;
  }
}

export function __feedCat(cat: __Cat) {}

// __feedCat(new Dog()); // error

/**
 * 这就是结构化类型系统的核心理念，即基于类型结构进行判断类型兼容性
 * 结构化类型系统在 C#、Python、Objective-C 等语言中都被广泛使用或支持
 *
 * 严格地说，鸭子类型系统和结构化类型系统并不完全一致，结构化类型系统意味着基于完全的类型结构来判断类型兼容性
 * 而鸭子类型系统只基于运行时访问的部分来决定，也就是说，如果在运行时调用了走、游泳、叫这三个方法，那么传入的类型只需要存在这几个方法即可【而不需要类型结构完全一致】
 * 但由于 TypeScript 本身并不是在运行时进行类型检查【也做不到】，同时官方文档中认为这两个概念一致，那么在这里，可以直接认为鸭子类型系统与结构化类型系统是同一概念
 */

/**
 * 除了基于类型结构进行兼容性判断的结构化类型系统以外，还有一种基于类型名进行兼容性判断的类型系统，标称类型系统
 * 标称类型系统【Nominal Typing System】要求，两个可兼容的类型，其名称必须是完全一致的
 */

export type USD = number;
export type CNY = number;

const USDCount: USD = 200;
const CNYCount: CNY = 200;

function addCNY(source: CNY, input: CNY) {
  return source + input;
}

addCNY(CNYCount, USDCount);

/**
 * 以上，在结构化类型系统中，USD 和 CNY【分别代表美元单位和人民币单位】被认为是两个完全一致的类型 number
 * 因此，在 addCNY 函数中可以传入 USD 类型的变量，但很离谱，人民币单位和美元单位实际的意义并不一致，怎么能视为一致类型呢？
 * 在标称类型系统中，CNY 和 USD 会被认为是两个完全不同的类型，因此能够避免这一情况发生
 * 类型的重要意义之一是限制数据的可用操作与实际意义，这一点在标称类型系统中体现地更加明显
 * 比如，之前的 Cat_ 和 Dog_ 可以通过类型的结构，来让结构化类型系统认为两个类型具有父子关系，而对于标称类型系统，父子关系必须通过
 * 显式的继承来实现，称之为标称子类型【Nominal Subtyping】，类似下面的继承
 */

class ShorthairCat extends Cat {}

/**
 * C++、Java、Rust 等语言中都主要使用标称类型系统，但是也可以在 TypeScript 中模拟出标称类型系统
 * 要在 TypeScript 中实现，需要为类型额外附加元数据，但同时又需要保留原本的信息
 */
