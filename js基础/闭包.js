// 全局里定义的函数因为GO和作用域链的原因，不会被销毁，所有在所有的地方都可以调用

// 作用域有块级作用域，函数作用域，全局作用域
// function test() {
//     console.log(1);
// }

// function test2() {
//     console.log(2);
// }

// test();

// 自动执行，执行完成以后立即释放
// 立即执行函数 - 初始化函数
// IIFE - immediately-invoked function

// (function() {

// })();

// (function() {

// }()); //w3c建议

// 立即执行函数有返回值的

// 一定是表达式才能使用()执行

// 把函数声明变成表达式  可以后面加上 + - ！ || &&

// 比如 !function test(){}()

var bb = (1 + 1, 2 + 3, 55); // 返回最后一个的值


function test() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function() {
            document.write(i + '');
        }

        // (function(j) {
        //     arr[j] = function() {
        //         document.write(j + '');
        //     }
        // })(i);
    }
    return arr;
}

var myArr = test();

for (var i = 0; i < myArr.length; i++) {
    myArr[i](); // 因为作用域链上还可以读取到test的域（AO），i此时值就读取的for最后的值，并没有释放内存
}

// (function b(){})