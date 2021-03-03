var threeSum = function(nums) {
    let res = [];
    if(nums == null || nums.length < 3) return res;
    nums.sort((a, b) => a - b); // 排序
    for (let i = 0; i < nums.length-2 ; i++) {
        if(nums[i] > 0) break;
        if(i > 0 && nums[i] === nums[i-1]) continue; // 去重
        let L = i+1;
        let R = nums.length-1;
        while(L < R){
            const sum = nums[i] + nums[L] + nums[R];
            if(sum == 0){
                res.push([nums[i],nums[L],nums[R]]);
                while (L<R && nums[L] === nums[L+1]) L++; // 去重
                while (L<R && nums[R] === nums[R-1]) R--; // 去重
                L++;
                R--;
            }
            else if (sum < 0) L++;
            else if (sum > 0) R--;
        }
    }
    return res;
};
