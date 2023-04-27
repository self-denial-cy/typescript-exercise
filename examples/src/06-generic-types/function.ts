/**
 * 假设有这么一个函数，它可以接受多个类型的参数并进行对应处理，比如
 * 对于字符串，返回部分截取
 * 对于数字，返回它本身的 n 倍
 * 对于对象，修改它的属性并返回
 * 那么对这个函数该如何进行类型声明呢？
 */

// any 大法？【直接 pass，AnyScript 警告】
export function _handle(input: any) {}

// 联合类型来包括所有可能类型？
export function handle_(input: string | number | {}): string | number | {} {
  return;
}

// 虽然约束了入参类型，但返回值类型与入参类型并没有关联起来，所以也 pass
export const shouldBeString = handle_('this is a string');
export const shouldBeNumber = handle_(666);
export const shouldBeObject = handle_({ name: 'this is a string' });

// 或者说函数重载？【似乎可行，但是情况再复杂一些，重载也要继续补充，好像不太优雅】
export function handle__(input: string): string;
export function handle__(input: number): number;
export function handle__(input: {}): {};
export function handle__(input: string | number | {}): string | number | {} {
  return;
}

// 来吧，泛型展示
export function handle<T>(input: T): T {
  return;
}

/**
 * 以上，为函数声明了一个泛型参数 T，入参类型与返回值类型均指向这个泛型参数
 * 这样，在这个函数接收到入参时，T 会自动地被填充为这个入参的类型，这也就意味着不再需要预先确定入参的可能类型了
 * 只要返回值类型与入参类型有一定关联，就可以通过泛型参数来进行运算
 */

/**
 * 在基于入参类型进行泛型填充时，其类型信息会被推导至尽可能精确的程度，如以下会推导至字面量类型而不是基础类型
 * 这是因为在直接传入一个值时，这个值是不会再被修改的，因此可推导至最精确的程度
 * 而如果入参是一个变量时，那么只会使用这个变量标注的类型【在没有标注时，会使用推导出的类型】
 */

export const str = 'this is a string';

export let num = 18;

export const res1 = handle(str);
export const res2 = handle(num);
export const res3 = handle({ name: 'name' });
export const res4 = handle(666);

export function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

export const res5 = swap(['this is a string', 666]);
export const res6 = swap([null, 222]);
export const res7 = swap([{ name: 'name' }, {}]);

/**
 * 函数中的泛型同样存在约束与默认值
 */

export function __handle<T extends string | number>(input: T): T {
  return;
}

export function _swap<T extends number, U extends number>([start, end]: [T, U]): [U, T] {
  return [end, start];
}

export function pick<T extends object, U extends keyof T>(object: T, props: Array<U>): Pick<T, U> {
  return;
}

/**
 * 函数的泛型参数也可以被内部的逻辑消费
 */

export function process<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((resolve, reject) => {
    resolve([payload]);
  });
}

/**
 * 箭头函数的泛型
 */

export const arrowFun = <T>(input: T): T => {
  return input;
};

// 需要注意，在 tsx 中，泛型的尖括号可能会造成报错，编译器无法识别这是一个组件还是一个泛型，此时可以让它长得更像泛型一些
export const arrowFun_ = <T extends unknown>(input: T): T => {
  return input;
};

/**
 * 总结，函数的泛型是日常使用较多的一部分，更明显地体现了泛型在调用时被填充这一特性
 * 而在类型别名中，更多地是手动传入泛型，以实现类型结构的复用
 * 这一差异的缘由其实就是它们的场景不同，通常使用类型别名对已经确定的类型结构进行类型操作，比如将一组确定的类型组合在一起
 * 而在函数这种场景中，并不能确定泛型在实际运行时会被什么样的类型填充
 */

/**
 * 需要注意，不要为了用泛型而用泛型，比如以下
 * 函数中的泛型参数没有被返回值类型消费，也没有被内部的逻辑消费，毫无意义的泛型用它干甚呢？
 */

export function _process<T>(arg: T): void {
  console.log(arg);
}
