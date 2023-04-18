function func1(): void {}

function func2(): void {
  return;
}

function func3(): void {
  return undefined;
}

const voidVar1: void = undefined;
const voidVar2: void = null; // 需要关闭 strictNullChecks 才能成立

export { func1, func2, func3, voidVar1, voidVar2 };
