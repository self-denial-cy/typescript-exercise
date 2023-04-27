/**
 * 由于泛型提供了对类型结构的复用能力，因此在对象类型结构中也经常使用泛型
 * 最常见的使用场景即响应数据类型结构的泛型处理
 */

export interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

export interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

export function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return;
}

export type StatusSucceed = boolean;

export function handleOperation(): Promise<IRes<StatusSucceed>> {
  return;
}

// 泛型嵌套的场景也非常常见，比如对分页结构数据的泛型处理
export interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

export function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {
  return;
}
