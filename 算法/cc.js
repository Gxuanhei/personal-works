let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var input = [],favor = {}
rl.on('line', (line) => {
    input.push(line.split(" "))
    if(input[2]&&input.length==Number(input[2][0])+3){
        for(let i = 0;i<input[1].length;i++){
            if(favor[input[1][i]]==undefined){
                favor[input[1][i]]=[]
            }
            favor[input[1][i]].push(i+1)
        }
        let nowArr = input.slice(3)
        for(let i = 0;i<nowArr.length;i++){
            let [l,r,k] = nowArr[i]
            let item = favor[k]
            if(item==undefined){
                console.log(0)
            }else{
                let res = 0
                for(let j=0;j<item.length;j++){
                    if(item[j]>=l&&item[j]<=r){
                        res++
                    }
                }
                console.log(res)
            }
        }
        rl.close()
    }
});
