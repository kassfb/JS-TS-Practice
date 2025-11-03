// https://leetcode.com/problems/number-of-recent-calls/description/

// You have a RecentCounter class which counts the number of recent requests within a certain time frame.
// Implement the RecentCounter class:
// RecentCounter() Initializes the counter with zero recent requests.
// int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].
// It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

 

// Example 1:

// Input
// ["RecentCounter", "ping", "ping", "ping", "ping"]
// [[], [1], [100], [3001], [3002]]
// Output
// [null, 1, 2, 3, 3]

// Explanation
// RecentCounter recentCounter = new RecentCounter();
// recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
// recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
// recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
// recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
 

// Constraints:

// 1 <= t <= 10^9
// Each test case will call ping with strictly increasing values of t.
// At most 10^4 calls will be made to ping.

// SOLUTION 1:
class RecentCounter {
    q: number[]
    constructor() {
        this.q = [];        
    }

    ping(t: number): number {
        const leftRange = t - 3000;
        const rightRange = t;

        while (this.q.length) {
            if (this.q[0] >= leftRange && this.q[0] < rightRange) {
                this.q.push(t);
                break;
            } else {
                this.q.shift();
            }
        }

        if (!this.q.length) {
            this.q.push(t);
        }

        return this.q.length;
    }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */


// SOLUTION 2 (FIFO Queue Approach):

// Intuition
// Think of this like a bouncer at a club who needs to keep track of how many people entered in the last 3 seconds. Every time someone new comes in, the bouncer:

// Records the new person's entry time
// Forgets about anyone who came more than 3 seconds ago
// Counts how many people are currently "recent" (within the last 3 seconds)
// The key insight is that we only care about requests within a sliding window of 3000 milliseconds. Since requests come in chronological order, we can use a queue (first-in-first-out) to efficiently maintain this window.

// Approach
// We'll use a queue to store timestamps of requests. Why is a queue perfect for this problem?

// Requests come in chronological order (newer timestamps are always larger)
// We need to remove old requests from the front
// We need to add new requests to the back
// Queue gives us O(1) operations for both!
// Visual Flow of Operations
// Step-by-step process when ping(t) is called:

// 1. Add new request to queue
//    Queue: [..., t] 

// 2. Remove outdated requests (older than t-3000)
//    Queue: [valid_requests_only]

// 3. Return queue size
//    Result: count of recent requests
// ASCII Flowchart
//          START: ping(t) called
//               |
//               v
//     ┌─────────────────────────┐
//     │  Add timestamp t to     │
//     │  the back of queue      │
//     └─────────────────────────┘
//               |
//               v
//     ┌─────────────────────────┐
//     │  Is queue empty?        │
//     └─────────────────────────┘
//               |
//         NO    |    YES
//               v      |____________
//     ┌─────────────────────────┐  |
//     │  Is front element       │  |
//     │  < (t - 3000)?          │  |
//     └─────────────────────────┘  |
//               |                  |
//         YES   |    NO            |
//               v                  |
//     ┌─────────────────────────┐  |
//     │  Remove front element   │  |
//     │  from queue             │  |
//     └─────────────────────────┘  |
//               |                  |
//               v                  |
//          (loop back up)          |
//                                  |
//                                  v
//                     ┌─────────────────────────┐
//                     │  Return queue.size()    │
//                     │  (count of recent reqs) │
//                     └─────────────────────────┘
//                                  |
//                                  v
//                               END

// Visual Example Walkthrough
// Let's trace through the example step by step:

// Initial state: queue = []

// ping(1):
//   Add 1 → queue = [1]
//   Range check: [1-3000, 1] = [-2999, 1]
//   No elements < -2999 to remove
//   Return size = 1
  
//   Queue visualization: [1]

// ping(100):
//   Add 100 → queue = [1, 100]
//   Range check: [100-3000, 100] = [-2900, 100]
//   No elements < -2900 to remove
//   Return size = 2
  
//   Queue visualization: [1, 100]

// ping(3001):
//   Add 3001 → queue = [1, 100, 3001]
//   Range check: [3001-3000, 3001] = [1, 3001]
//   No elements < 1 to remove (1 is exactly at boundary)
//   Return size = 3
  
//   Queue visualization: [1, 100, 3001]

// ping(3002):
//   Add 3002 → queue = [1, 100, 3001, 3002]
//   Range check: [3002-3000, 3002] = [2, 3002]
//   Remove 1 (since 1 < 2)
//   Final queue = [100, 3001, 3002]
//   Return size = 3
  
//   Queue visualization: [100, 3001, 3002]
// Time Window Visualization
// Time: 0    1000   2000   3000   3001   3002   4000   5000
//       |     |      |      |      |      |      |      |
//                           ↑      ↑      ↑
//                           |      |      |
//                     Window starts  |    Current time
//                          here      |
//                                   Window: [2, 3002]
                                  
// At time 3002, we only count requests in range [2, 3002]
// Request at time 1 is outside this window, so it's removed


// Complexity Analysis

// Time Complexity: O(1) amortized
// Adding to queue: O(1)
// Each element is added once and removed at most once
// Over n operations, we do at most n additions and n removals
// Total: O(n) for n operations → O(1) per operation on average

// Space Complexity: O(W) where W is the window size
// In worst case, all requests fall within the 3000ms window
// Maximum queue size = number of requests in 3000ms window
// For this problem: O(3000) in the worst case if one request per millisecond

// Test Cases
// Test Case 1: Given Example
// RecentCounter rc;
// assert(rc.ping(1) == 1);     // [1]
// assert(rc.ping(100) == 2);   // [1, 100]  
// assert(rc.ping(3001) == 3);  // [1, 100, 3001]
// assert(rc.ping(3002) == 3);  // [100, 3001, 3002] (1 removed)
// Test Case 2: Rapid Fire Requests
// RecentCounter rc;
// assert(rc.ping(1) == 1);
// assert(rc.ping(2) == 2);
// assert(rc.ping(3) == 3);
// assert(rc.ping(4) == 4);
// // All within window so far

// assert(rc.ping(3005) == 4);  // Range [5, 3005], all previous still valid
// assert(rc.ping(6010) == 1);  // Range [3010, 6010], only 6010 is valid
// Test Case 3: Large Time Gaps
// RecentCounter rc;
// assert(rc.ping(1) == 1);
// assert(rc.ping(10000) == 1);  // Range [7000, 10000], 1 is way outside
// assert(rc.ping(20000) == 1);  // Range [17000, 20000], only 20000 valid

// Key Details
// Why Queue is Perfect:
// FIFO Nature: Older requests naturally move to the front
// Efficient Removal: We only ever need to remove from the front
// Chronological Order: Since requests come in order, queue maintains this naturally
// Alternative Approaches (and why they're worse):
// Vector/Array: Removing from front is O(n)
// Set/Map: Overkill, we don't need sorting within the window
// Circular Buffer: More complex to implement, same complexity.

// Code:
class RecentCounter {
  q: number[]
  constructor() {
    this.q = []
  }
  
  ping(t) {
    this.q.push(t)
    while (this.q[0] < t - 3000) this.q.shift()
    return this.q.length
  }
}
