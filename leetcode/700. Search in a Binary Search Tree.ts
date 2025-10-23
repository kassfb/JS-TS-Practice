// https://leetcode.com/problems/search-in-a-binary-search-tree

// You are given the root o a binary search tree (BST) and an integer val.
// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

// Example 1:
//       4
//      / \
//     2   7
//    /  \
//   1    3
// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]

// Example 2:
//       4
//      / \
//     2   7
//    /  \
//   1    3
// Input: root = [4,2,7,1,3], val = 5
// Output: []
 
// Constraints:
// The number of nodes in the tree is in the range [1, 5000].
// 1 <= Node.val <= 10^7
// root is a binary search tree.
// 1 <= val <= 10^7

// Approach
// Typical Binary Search Tree has rules as follow:
// - All values of left side of current root are less than the root value.
// - All values of right side of current root are greater than the root value.

// Let's solve this qustion with the example below.
//        7
//      /   \
//     5    10
//    / \   / \
//   2   6 8  15
//             / \
//            12 20

// val = 15

// We are now at 7.We have two choices. Go left or right with the rule above.
// In this case, we should go right because 15 > 7
// Now we are at 10. Again we have two choices. 15 > 10
// Now we find the same value, so return current node.

// Complexity
// Time complexity:
// In the worst case, the height (h) could be as large as (n)(the number of nodes) if the tree is unbalanced, leading to O(n)complexity.
// In the best case, if the tree is balanced, the height (h) would be (logn), leading to O(logn) complexity.
// Space complexity:
// In the worst case, the space complexity is O(n) if the tree is completely unbalanced.
// In the best case, the space complexity is O(logn) if the tree is balanced.


// 1. Base Case:
// If the root node is None, the search is complete, and the target value is not found. Return None.

// 2. Search for Value:
// Compare the target value (val) with the current node's value (root.val).
// If val == root.val, the search is successful. Return root as the node containing the target value.

// 3. Recursive Search (Left or Right Subtree):
// If val < root.val:
// The target value is smaller than the current node, so it must be in the left subtree (remember BST property).
// Recursively call the same logic (steps 2-4) on the root.left subtree, passing the same val to search for.
// If val > root.val:
// The target value is larger than the current node, so it must be in the right subtree (remember BST property).
// Recursively call the same logic (steps 2-4) on the root.right subtree, passing the same val to search for.

// 4. Recursive Result Handling:
// The result of the recursive call (either None if not found or the node containing the value) is returned by the current step.

// Overall Process:
// The algorithm starts at the root node and repeatedly compares the target value with the current node's value.
// Based on the comparison, it either returns the node if the value is found, or it recursively searches the appropriate subtree until the target is found or an empty subtree (resulting in None) is reached.
// This recursive approach efficiently utilizes the BST property of ordered values in each subtree.

// SOLUTION 1:
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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    // Base Case:
    if (!root) {
        return null;
    }
    // Search for Value:
    if (root.val === val) {
        return root;
    }
    // Recursive binary search:
    if (root.val > val) {
        return searchBST(root.left, val);
    } else {
        return searchBST(root.right, val);
    }
};
