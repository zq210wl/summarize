
/* 递归原理：
    1、从最上面寻找规律，假如达到想要的结果有几种情况，算出最后一次递归解法
    2、找边界，找出递归循环终止的条件
    3、返回每次递归计算得到的值
*/

/* 爬楼梯，一次1级爬2次，或一次2级，有几种爬法：
   [参考：]
      * https://blog.csdn.net/Jet_Green/article/details/81631028
   [这是一个动态规划问题，包括以下三个步骤；]
      * 最优字结构  f(n-1)  f(n-2)
      * 边界  f(1) = 1  f(2) = 2
      * 状态转移方程 f(n) = f(n-1) + f(n-2)
   [符合菲波那契数列，公示如下：]
      * f(0) = 1
      * f(1) = 1
      * f(n) = f(n-1) + f(n-2)
*/


/* 爬楼梯，一次最多爬m级，有几种爬法：
   [动态规划:]
      * 最优字结构
         * n >= m 
            * f(n-1, m)  f(n-2, m)  ...  f(n-(m-1), m)
         * n < m
            * 让 m = n，就又变成上面的情况了
      * 边界：
         * m = 1
            * f(n, m) = 1, 只要n>0，永远都只有一种走法
         * m > 1
            * f(1) = 1
            * f(2) = 2
      * 状态转移方程
         * f(n, m) = f(n-1, m) + f(n-2, m) + ... + f(n-(m-1), m)
*/
function climbStair(n, m) {
   if (n < 1 || m < 1) {
       return 0
   }
   if (m === 1) {
       return 1;
   }
   if (n === 1) {
       return 1;
   }
   if (n === 2) {
       return 2
   }
   var arr = [];
   // 因为已经知道arr[2]=2，为了符合方程：f(2,m)=f(1,m)+f(0,m)，所以设定arr[0]=1
   arr[0] = 1; 
   arr[1] = 1;
   for (let i = 2; i <= n; i++) {
       // 因为一次最多走的台阶数(m)如果大于总台阶数(n)，其实一次最多也就只能走(n)个台阶,
       // 所以当 m > n 的时候，就设置 m = n
       let mMax = i < m ? i : m;
       for (let j = 1; j <= mMax; j++) {
           if (arr[i] === undefined) {
               arr[i] = 0;
           }
           arr[i] += arr[i - j];
       }
   }
   return arr[n]; 
}

/* 快速排序：
   1、找基准值，这里取取左边第一个就行
   2、初始化坑，即把左边第一个值挖出来做为第一个坑
   3、从右边往左边找，直到找到一个比基准值小的值，然后把它挖出来替换左边的坑，其自己就变成了一个新的坑（右坑）
   4、从左边往右边找，直到找到一个比基准值大的值，然后把它挖出来替换右边的坑，其自己就变成了一个新的坑（左坑）
   5、重复3和4，直到左右位置相等时，即最新的坑所在的位置，用基准值来填入最后一个坑
   6、递归继续重复：1、2、3、4、5
   https://www.runoob.com/w3cnote/quick-sort.html
*/

/* 归并排序
*/

/* 直接插入排序
*/

/* 二叉树的最大宽度（所有层的宽度的最大值）
*/

/* 有序数组的二分查找 arr
   1、定义左右两个下标，leftIndex, rightIndex
   2、取中间值midVal，下标为mIndex, 比较要查找的值targe跟中间值midVal的大小
   3、如果 target === midVal 则 找到目标对象了，返回下标mIndex
   4、如果 target > midVal 则 leftIndex = mIndex+1
   5、如果 target < midVal 则 rightIndex = mIndex-1
   5、继续 2、3、4、5
*/

/* 合并两个有序数组 arrA, arrB
*/
var arrA = [2,4,6,6,9,12];
var arrB = [3,3,5,7,7,9,10,11];
function concatsortedArray(arrA, aLen, arrB, bLen) {
    var moveAIdx = aLen - 1;
    var moveBIdx = bLen - 1;
    var endIdx = aLen + bLen - 1;
    while(moveAIdx >= 0 && moveBIdx >= 0) {
        if (arrA[moveAIdx] >= arrB[moveBIdx]) {
            arrA[endIdx--] = arrA[moveAIdx--];
        } else {
            arrA[endIdx--] = arrB[moveBIdx--];
        }
    }
    while(moveBIdx >= 0) {
        arrA[endIdx--] = arrB[moveBIdx--];
    }
}
concatsortedArray(arrA, arrA.length, arrB, arrB.length);


/* 随机算法，洗牌算法
   原理：
     1、从总的数组中随机选中一个元素，然后把它push到新数组中（或者不用新数组，在当前数组上用元素交换的方式来达到相同的效果），
     2、把随机选中的元素从数组中删除掉
     3、然后再从剩余的元素中继续随机选中一个元素（即重复1、2）
     4、最后知道数组中的元素都被选出去，就得到一个随机的打乱的数组
   主要用到：
     1、随机函数：Math.random()
     2、数组交换：[arr[1],arr[2]] = [arr[2],arr[1]]
*/


/* 栈
   1、只能在一端(称为栈顶)对数据项进行插入和删除
   2、遵循：后进先出
   3、用递归和while循环都可以实现
   主要案例：
    1、实现数组展平flattern函数
    2、深度优先搜索
    3、树结构的层序遍历
    4、判断括号是否匹配
*/

/* flattern函数
*/

/* 写一个数组展平的生成器
   需要用到：Generate 
*/

/* 深度优先搜索，用盏来实现
   实现：dom树中找到a标签
*/

/* 判断一个数是否为素数
*/

/* 求数组中所有元素的所有组合
   例如：[1,2,3]  =>  [1,2] [1,2,3] [1,3] [2,3]
*/

/* 写一个生成斐波那契数列的函数，可以指定数列的长度
   参考：https://www.cnblogs.com/lfxiao/p/9360476.html
*/


/* 写一个生成器构造函数，可以生成无穷斐波那契数列
   参考：https://www.cnblogs.com/lfxiao/p/9360476.html
   需要用到：Generate 
*/


/* 求编辑距离的算法  ？？？
   1、字符串编辑距离 ，复杂度 
   2、数的编辑距离 ，复杂度
*/
