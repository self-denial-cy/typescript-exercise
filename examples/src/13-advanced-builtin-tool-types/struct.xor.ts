/**
 * 基于结构的互斥工具类型
 * 想象这样一个场景：假设有一个用于描述用户信息的对象结构，除了共有的一些基础结构外，Vip 用户和普通用户、游客这三者各自拥有一些独有的
 * 字段，如 vipExpires 表示 Vip 过期时间，仅属于 Vip 用户，promotionUsed 表示已领取过体验券，属于普通用户，而 referType 表示跳转来源，
 * 属于游客
 */
import { expectType } from 'tsd';

export interface Vip {
  vipExpires: number;
}

export interface Common {
  promotionUsed: boolean;
}

// 尝试使用联合类型实现结构互斥【但很遗憾，这种方式并不会约束【不能同时拥有】这个条件】
type _User = Vip | Common;
const _user: _User = {
  vipExpires: 666,
  promotionUsed: false,
};

// 为了表示不能同时拥有，实际上应该使用 never 来标记一个属性【必须要加上可选标记】
export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};

export type Xor<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

export type Flatten<T> = {
  [K in keyof T]: T[K];
};

type Xor_ = Flatten<Without<Vip, Common> & Common>;
type _Xor = Flatten<Without<Common, Vip> & Vip>;

type User = Xor<Vip, Common>;
const user: User = {
  vipExpires: 666,
};
