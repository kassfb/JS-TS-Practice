// https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

// Example 1:
//       1
//      / \
//     7   0
//    /  \
//   7    -8
//
// Input: root = [1,7,0,7,-8,null,null]
// Output: 2
// Explanation: 
// Level 1 sum = 1.
// Level 2 sum = 7 + 0 = 7.
// Level 3 sum = 7 + -8 = -1.
// So we return the level with the maximum sum which is level 2.

// Example 2:
//       989
//         \
//        10250
//        /    \
//      98693 -89388
//                \
//              -32127
//
// Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
// Output: 2

// Constraints:
// The number of nodes in the tree is in the range [1, 104].
// -10^5 <= Node.val <= 10^5



// SOLUTION 1 (обхода дерева по уровням / level-order traversal / BFS по уровням.):
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function maxLevelSum(root: TreeNode | null): number {
    if (root === null) return 0;

    const queue: Array<TreeNode> = [root];
    const lvlSum: Array<number> = [];
    while (queue.length > 0) {
        const size = queue.length;

        let sum = 0;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            sum += node.val;

            if(node.left !== null) {
                queue.push(node.left);
            }
            if(node.right !== null) {
                queue.push(node.right);
            }
        }
        lvlSum.push(sum);
    }
    const maxSum = Math.max(...lvlSum);

    return lvlSum.indexOf(maxSum) + 1;
};

// Complexity
// Time complexity: O(n)
// Space complexity: O(n)



// SOLUTION 2 (DFS using Map):
function maxLevelSum(root: TreeNode | null): number {
	const levelSums = new Map<number, number>();

	const dfs = (level: number, node: TreeNode): undefined => {
		if (!node) return;

		levelSums.set(
			level,
			levelSums.has(level) ? levelSums.get(level) + node.val : node.val
		);

		dfs(level + 1, node.left);
		dfs(level + 1, node.right);
	};

	dfs(1, root);

	let maxSumLevel = 1;

	levelSums.forEach((val, key) => {
		levelSums.get(maxSumLevel) < val && (maxSumLevel = key);
	});

	return maxSumLevel;
}

// Complexity
// Time complexity: O(n)
// Space complexity: O(n)
