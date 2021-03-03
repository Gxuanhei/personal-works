function BinarySearch(arr, item) {
    let left = 0,
        right = arr.length - 1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === item) {
            return mid
        } else if (arr[mid] > item) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return false

}
    console.log(BinarySearch([1, 2, 3, 4, 5, 6], 4))


function bar(nums,item,start,end) {
    let left = 0;
    let right = nums.length -1
    let mid = Math.floor((start+end)/2)
    if(item === nums[mid]) {
        return mid
    } else if(item> nums[mid]){
        return bar[nums, item, start]
    }
}
