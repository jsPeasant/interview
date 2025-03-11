/*
 * @lc app=leetcode.cn id=841 lang=javascript
 * @lcpr version=30204
 *
 * [841] 钥匙和房间
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    const visitedRooms = new Array(rooms.length).fill(0)

    let flag = false
    let count = 1

   function dfs(i) {
       if(count === rooms.length) {
        flag = true
        return
       }
       const room = rooms[i]
       for(let j = 0; j<room.length; j++) {
            if(visitedRooms[room[j]] === 0) {
                visitedRooms[room[j]] = 1
                count++
                dfs(room[j], count)
            }
        }
   }

   visitedRooms[0] = 1
   dfs(0)

   console.log(visitedRooms)
    
   return flag
};
// @lc code=end



/*
// @lcpr case=start
// [[1],[2],[3],[]]\n
// @lcpr case=end

// @lcpr case=start
// [[1,3],[3,0,1],[2],[0]]\n
// @lcpr case=end

 */


// @lcpr-after-debug-begin
module.exports = canVisitAllRooms;
// @lcpr-after-debug-end