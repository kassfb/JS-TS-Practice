// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// https://neetcode.io/problems/depth-of-binary-tree

// 104. Maximum Depth of Binary Tree

// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:
//       3
//      / \
//     9   20
//        /  \
//       15   7

// Input: root = [3,9,20,null,null,15,7]
// Output: 3


// Example 2:
//       1
//        \
//         2

// Input: root = [1,null,2]
// Output: 2
 

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

// SOLUTION 1. Recursive DFS(Depth First Search):
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

function maxDepth(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

// Time & Space Complexity
// Time complexity: O(n)
// Space complexity: O(h)
// Best Case (balanced tree): O(log(n))
// Worst Case (degenerate tree): O(n)
// Where n is the number of nodes in the tree and h is the height of the tree.


// SOLUTION 2. BFS(Breadth First Search):
function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }

    // или так const q: Array<(TreeNode | null)> = [root]; // очередь через массив
    const q: (TreeNode | null)[] = [root]; // очередь через массив
    let level = 0;

    while (q.length > 0) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const node = q.shift();

            if (node.left !== null) {
                q.push(node.left);
            }
            if (node.right !== null) {
                q.push(node.right);
            }
        }
        level++;
    }

    return level;
}
// Time & Space Complexity
// Time complexity: O(n)
// Space complexity: O(n)


// SOLUTION 3. Iterative DFS (Stack)
function maxDepth(root: TreeNode | null): number {
    // Стек через массив кортежей, или :Array<[TreeNode | null, number]>
    const stack: [TreeNode | null, number][] = [[root, 1]]; // [node, depth]
    let maxDepthCounter = 0;

    while (stack.length > 0) {
        const [node, depth] = stack.pop();

        if (node !== null) {
            maxDepthCounter = Math.max(maxDepthCounter, depth);
            stack.push([node.left, depth + 1]);
            stack.push([node.right, depth + 1]);
        }
    }

    return maxDepthCounter;
}
// Time & Space Complexity
// Time complexity: O(n)
// Space complexity: O(n)
