let source = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1,
    name: 'title'
}, {
    id: 3,
    pid: 1,
    name: 'div'
}, {
    id: 4,
    pid: 3,
    name: 'span'
}, {
    id: 5,
    pid: 3,
    name: 'icon'
}, {
    id: 6,
    pid: 4,
    name: 'subspan'
}]

function toTree(data) {
    let result = []
    if(!Array.isArray(data)) {
        return result
    }
    data.forEach(item => {
        delete item.children;
    });
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    data.forEach(item => {
        let parent = map[item.pid];
        if(parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}
console.log(toTree(source))
0
