let str: string = 'hello ts'

let a: any = 'this is any'

let b: unknown = 'this is unknown'

// unknown 未知类型，相当于类型安全的 any，只允许本身随意赋值，但是不能随意赋值给其它有类型约束的变量
// any 类型不光本身可以随意赋值，也可以随意赋值给其它类型变量【不推荐】
str = a
// str = b error

// 类型断言的两种写法
str = b as string
str = <string>b

/**
 * void 用来表示空，一般表示没有返回值的函数，但是在 Js 中，一般函数正常执行完之后都会默认返回 undefined，即隐式 return undefined
 * never 表示永远不会返回结果，一般函数执行完都会隐式 return undefined；除了以下这种：函数内部直接 throw 抛出异常
 */
function fn(): void {
  return undefined
}
function err(): never {
  throw new Error('this is error')
}

// 定义一个函数类型的变量
let meow: (num: number) => void
meow = (num) => {
  console.log('喵'.repeat(num))
  return 'this is return' // 约束不到位
}

const eat = (food: string): void => {
  console.log(`eating ${food}`)
  // return 'this is return' // 约束到位
}

let cat: {
  name: string,
  age: number,
  eat: (food: string) => void,
  [key: string]: unknown // 或者为 any，该对象属性数量未知，可以随便拓展属性
} = {
  name: '泡芙',
  age: 6,
  eat
}
cat.type = '蓝猫'

// 元组，就是固定长度的数组
const tuple: [string, number] = ['this is tuple', 666]

/**
 * 枚举类型
 * 枚举类型比较特殊，在编译结果中确实生成了 Gender 变量；
 * 而不是像其它类型声明一样，在编译结果中被去除了
 */
enum Gender {
  male,
  female
}
