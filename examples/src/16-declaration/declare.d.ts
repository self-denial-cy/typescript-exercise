declare const fn: () => void;

declare interface Foo {
  prop: string;
}

declare function foo(input: Foo): Foo;

declare class FooClass {}

declare let str: Foo['prop'];

declare module 'pkg' {
  export const handler: () => boolean;

  export default handler;
}

declare module '*.md' {
  const raw: string;

  export default raw;
}

declare interface Window {
  userTracker: (...args: any[]) => Promise<void>;
}
