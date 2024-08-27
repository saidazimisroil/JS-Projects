// 
let n = 5
let answer = [];
let last = (n%2 === 0) ? 1 : 0;
for(let i=last; answer.length<n; i++){
    answer.push(i);
    if(i!==0)
        answer.push(i*(-1));
}

console.log(answer)


/*
//  leftRightDifference
let nums = [1];

let ans = [];

for(let i=0; i < nums.length; i++)
    ans.push(sumFinder(nums, i));

console.log(ans)

function sumFinder(nums, i){
    let arr = [...nums];
    let rightSum = 
            (i === arr.length-1) ? 0 
                                : arr
                                    .splice(i+1, arr.length-i-1)
                                    .reduce((a, b) => a+b);
    let leftSum = (i === 0) ? 0 
                            : arr
                                .splice(0,i)
                                .reduce((a,b) => a + b);
    return Math.abs(rightSum - leftSum);
}
*/