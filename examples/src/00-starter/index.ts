import { expectType, expectNotType } from 'tsd';

/**
 * 对于类型兼容的检查，除了两两声明后然后进行赋值以外，还可以通过 tsd 工具来进行声明式的类型检查
 */
expectType<string>('this is a string');
expectNotType<string>(666);

export {};
