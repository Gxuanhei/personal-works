var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let cnext = curr.next;
        curr.next = prev === null ? null : prev
        prev = curr;
        curr = cnext;
    }
    return prev
};
reverseList([1,3,4,5,7])


function unique(arr) {
    return arr.filter((item,index,arr)=>{
        return arr.indexOf(item,0) === index
    })
}
