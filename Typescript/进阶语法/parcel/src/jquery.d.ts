/*
这里是对jquery做解释说明的文件
parcel可以启动一个服务器  对ts文件做解释说明 并对文件做打包处理
 */


// 定义全局变量
// declare var $: (param: () => void) => void;

// 定义全局函数
// declare function $(param: () => void): void;
//
// interface JqueryInstance {
//     html: (html: string) => {}
// }

// 定义param
// declare function $(param: string): {
//     html: (html: string) => {}
// };

// 函数重载
// declare function $(readyFunc: () => void): void;
// declare function $(selector: string): {
//     html: (html: string) => JqueryInstance
// };

// 如何对对象进行类型定义 如何对类进行类型定义
// declare namespace $ {
//     namespace fn {
//         // function init():void
//         class init {
//
//         }
//     }
// }
// ES6 模块化
declare module 'jquery' {
    interface JqueryInstance {
        html: (html: string) => {}
    }
    // 混合类型
    function $(readyFunc: () => void): void;
    function $(selector: string): {
        html: (html: string) => JqueryInstance
    };

    namespace $ {
        namespace fn {
            // function init():void
            class init {

            }
        }
    }
    export  = $
}


// 如果$即是函数又是对象时
// 使用 interface 的语法 实现函数重载
// interface JQuery {
//     (readyFunc: () => void): void;
//
//     (selector: string): { html: (html: string) => JqueryInstance }
// }
//
// declare var $: JQuery
