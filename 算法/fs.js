/*

薯队长写了一篇笔记草稿，请你帮忙输出最后内容。
1.输入字符包括，"("    ,    ")"    和    "<"和其他字符。
2.其他字符表示笔记内容。
3.()之间表示注释内容，任何字符都无效。    括号保证成对出现。
4."<"表示退格,    删去前面一个笔记内容字符。括号不受"<"影响
 */
function fun(str) {
    var stack = [];
    str = str.split("");
    var res = '';
    for (var i = 0; i < str.length; i++) {
        if(str[i] != "(" && str[i] != ")" && stack.length == 0){
            res += str[i]
        }
        if(str[i] == "(" ){
            stack.push(i)
        }
        if(str[i] == ")"){
            stack.pop()
        }
    }
    res = res.split("");
    for(var i = 0 ; i < res.length ; i++){
        if(res[i] == "<"){
            res.splice(i-1,2);
            i--;
            i--;
        }
    };
    return res.toString().replace(/\,/g,"")
}

fun("asdasd")
/*
const { stdout } = require('process');

const r1 = require('readline').createInterface({
    input: process.stdin,
    output: stdout
});
r1.on('line', function (line) {
    let res = [];
    let content = [...line];
    content.forEach(item => {
        if (res[res.length - 1] !== '(') {
            if (item !== '<' && item !== ')')
                res.push(item);
            else if (item === '<')
                res.pop();
        } else {
            if (item === '(') res.push(item);
            if (item === ')') res.pop();
        }
    })
    console.log(res.join(''));
})
 */
