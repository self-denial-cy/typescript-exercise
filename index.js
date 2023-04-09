var str = 'hello ts';
var a = 'this is any';
var b = 'this is unknown';
// unknown 未知类型，相当于类型安全的 any，只允许本身随意赋值，但是不能随意赋值给其它有类型约束的变量
// any 类型不光本身可以随意赋值，也可以随意赋值给其它类型变量【不推荐】
str = a;
// str = b error
// 类型断言的两种写法
str = b;
str = b;
/**
 * void 用来表示空，一般表示没有返回值的函数，但是在 Js 中，一般函数正常执行完之后都会默认返回 undefined，即隐式 return undefined
 * never 表示永远不会返回结果，一般函数执行完都会隐式 return undefined；除了以下这种：函数内部直接 throw 抛出异常
 */
function fn() {
    return undefined;
}
function err() {
    throw new Error('this is error');
}
// 定义一个函数类型的变量
var meow;
meow = function (num) {
    console.log('喵'.repeat(num));
    return 'this is return'; // 约束不到位
};
var eat = function (food) {
    console.log("eating ".concat(food));
    // return 'this is return' // 约束到位
};
var cat = {
    name: '泡芙',
    age: 6,
    eat: eat
};
cat.type = '蓝猫';
// 元组，就是固定长度的数组
var tuple = ['this is tuple', 666];
// 枚举类型
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
