/**
 * strictNullChecks 设置为 false 时，两者会被视作其他类型的子类型
 */
const undef: undefined = undefined
const nul: null = null
const str: string = undef
const num: number = nul

let vod: void
vod = undef
vod = nul // 需要关闭 strictNullChecks

const tuple: [string, number?, boolean?] = ['this is string']
type len = typeof tuple.length // 1 | 2 | 3

const enum Items {
  Foo,
  Bar,
  Baz
}

export { }
