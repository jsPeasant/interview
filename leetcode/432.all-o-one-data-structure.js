/*
 * @lc app=leetcode.cn id=432 lang=javascript
 * @lcpr version=30204
 *
 * [432] 全 O(1) 的数据结构
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start

var AllOne = function() {
    this.map = new Map()
    this.root = {
        num: 0,
        pre: null,
        next: null
    }
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    const node = this.map.get(key)
    if(!node) {
        const node = {
            num: 1,
            key: key,
        }
        const next = this.root.next
        this.root.next = node
        node.next = next
        node.pre = this.root

        if(this.map.size === 0) {
            this.root.pre = node
        }

        this.map.set(key, node)
    }
    else if(node) {
        node.num++
        let next = node.next
        while(next && next !== this.root){
            if(next.num > node.num) {               
                node.pre.next = node.next
                node.next.pre = node.pre
                next.pre.next = node
                node.next = next
                node.pre = next.pre
                next.pre = node
                break
            }
            else {
                next = next.next
            }
        }

    }
    
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
    const node = this.map.get(key)
    if(node) {
        node.num--
        if(node.num === 0) {
            node.pre.next = node.next
            node.next.pre = node.pre
            this.map.delete(key)
        }
        else {
            let pre = node.pre 
            while(true) {
                if(pre.num <= node.num) {
                    node.next = pre.next                 
                    pre.next.pre = node
                    pre.next = node
                    node.pre = pre

                    break
                }
                else {
                    pre = pre.pre
                }
            }
        }
    }
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    if(this.map.size === 0) {
        return ''
    }
    else {
        return this.root.pre.key
    }
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    if(this.map.size === 0) {
        return ''
    }
    else {
        return this.root.next.key
    }
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */
// @lc code=end



