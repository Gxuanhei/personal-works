// type annotation 类型注解 我们告诉ts变量时什么类型
// type inference 类型推断 ts会自动尝试分析变量类型
// 如果ts能够分析变量类型，不需要加
// 如果ts无法分析变量类型，需要加类型注解


let count4: number;

count4 = 123

const firstNumber = 1;
const SecondNumber = 1;
// const total = firstNumber + SecondNumber;

function getTotal(firstNumber:number, secondNumber:number) {
    return firstNumber + secondNumber
}

const total3 = getTotal(1, 2)
