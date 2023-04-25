/**
 * 类型断言能够显式地告知类型检查系统当前这个变量的类型
 * 它其实就是将一个变量的已有类型更改为新指定类型的操作
 */

export let unknownVar: unknown;

(unknownVar as { foo: () => {} }).foo();

/**
 * 还可以 as 到 any 来为所欲为，跳过所有的类型检查
 */

export const str: string = 'this is a string';

(str as any).func().foo().prop;

/**
 * 也可以在联合类型中断言一个具体的分支
 */

export function func(union: string | number) {
  if ((union as string).includes('this is a string')) {
  }

  if ((union as number).toFixed() === '555') {
  }
}

/**
 * 但是类型断言的正确使用方式是，在 TypeScript 类型分析不正确或不符合预期时，将其断言为此处的正确类型
 * 这里从 {} 字面量类型断言为 IFoo 类型，即为解构赋值默认值进行了预期的类型断言
 */

export interface IFoo {
  name: string;
}

export let obj: {
  foo?: IFoo;
};

const { foo = {} as IFoo } = obj;

/**
 * 除了使用 as 语法外，还可以使用 <> 语法，效果一致，但是在 TSX 语法中尖括号断言并不能很好地被分析出来，因此更推荐一致使用 as
 */

/**
 * 需要注意，类型断言应当是在迫不得已的情况下才使用，虽然说可以用类型断言纠正不正确的类型分析，但类型分析在大部分场景下都是可靠的
 */
