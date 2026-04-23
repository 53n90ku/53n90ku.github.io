---
tags : dp
---
<style>
  body { font-size: 0.8em; } 
</style>

# DP

Dynamic programming is nothing but solving a bigger problem by dividing it into sub tasks and avoiding repitions in those subproblems, storing those  and building the answer from the smaller problems we solved beforehand
 
 Its simple to think of
 - Split the problem into overlapping subproblems(one related to the other)
 - Solve each problem recursively(means break it into further sub problems, this is it most of the times it may not be recursive at all times)
 - Combine the solutions to the subproblems into one for the given problem 
 - Important rule is that you dont compute the same problem twice because we already have it
 - Do remember that we memorize the answers we had gotten i.e, storing them


> **From what i can understand DP can be mainly classified into 5-6 types(it can be more or less, its just my preferred number)**

 > **1-D DP**

Which is like number of ways to write a number using another set of numbers or find the longest increasing or decreasing subsequence something like that i believe, because all these can be done using a single array  of n elements and with optimal time complexities

- how to solve them? lets go in 

    For the first one we can do this in O(n) time complexity, the given numbers will be very like like represent x in terms of 1, 3 and 4  we can construct this from base case as number of ways to write 1 is 1 way, like wise nubmer of ways to write 2 using 1 is 1 then we sorted the base case then from this point we can just add no.ofways[x-1]+no.ofways[x-3]+no.ofways[n-4] like this i believe simpe enough to do
    
    For the second problem we can do like have an array as a base case where we just have 1 as the longest subsequence as that is the minimum we can have then we will run a double loop to update the values each time we enconter a smaller value we see then output the maxumum value in the array simple.
