export enum PageUrl {
  Home_Page_Url = 'url1',
  Setting_Page_Url = 'url2',
  Share_Page_Url = 'url3',
}

export enum Items {
  Foo,
  Bar,
  Baz,
}

export enum _Items {
  Foo,
  Bar = 599,
  Baz,
}

/**
 * 在数值型枚举中，可以使用延迟求值的枚举值，比如函数
 * 但要注意，没有使用延迟求值的枚举成员必须放在使用常量枚举值声明的成员之后，或者直接放在第一位
 */

export const returnNum = () => 100 + 599;

export enum Items_ {
  Foo = returnNum(),
  Bar = 599,
  Baz,
}

export enum Items__ {
  Baz,
  Foo = returnNum(),
  Bar = 599,
}

export enum Mixed {
  Num = 599,
  Str = 'str',
}

/**
 * 常量枚举，关闭 preserveConstEnums 选项后，会在编译结果中擦除额外的辅助对象，直接内联替换枚举值，有助于减少编译后的代码量
 */

export const enum __Items {
  Foo,
  Bar,
  Baz,
}

export const foo = __Items.Foo;
