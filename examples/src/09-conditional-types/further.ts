/**
 * 实现 IsAny 和 IsUnknown
 */

// IsAny 并不能通过 Type extends any 的形式来判断【any 是 Top Type，基本上任何 Type 都满足 extends any】
// 利用 any 的另一个特性：身化万千
export type IsAny<T> = 0 extends 1 & T ? true : false;

// unknown 就享受不到这个待遇了，因为它并不是身化万千的，因此需要通过过滤掉其它类型来只剩下 unknown
export type IsUnknown<T> = unknown extends T ? (IsAny<T> extends false ? true : false) : false;

/**
 * 以上，通过 unknown extends T 时仅有 T 为 any 或 unknown 时成立这一点，可以将 T 直接收窄到 any 和 unknown
 * 再通过 IsAny 过滤掉 any，就只剩下 unknown
 */
