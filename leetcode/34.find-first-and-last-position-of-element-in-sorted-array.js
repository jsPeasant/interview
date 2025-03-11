/*
 * @lc app=leetcode.cn id=34 lang=javascript
 * @lcpr version=30204
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function binarySearch(nums, target, lower) {
    let i =0, j=nums.length-1, ans = nums.length;
    while(i<=j) {
        const mid = Math.floor((i+j)/2)
        if(nums[mid] > target || (lower && nums[mid] >= target)) {
            j = mid -1
            ans = mid
        }
        else {
            i = mid + 1
        }
    }

    return ans
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
   let ans = [-1, -1]
   const left = binarySearch(nums, target, true)
   const right = binarySearch(nums, target, false) - 1

   if(left <=right && nums[left]===target && nums[right]===target) {
     ans = [left, right]
   }

   return ans

};
// @lc code=end



/*
// @lcpr case=start
// [5,7,7,8,8,10]\n8\n
// @lcpr case=end

// @lcpr case=start
// [5,7,7,8,8,10]\n6\n
// @lcpr case=end

// @lcpr case=start
// []\n0\n
// @lcpr case=end

 */

