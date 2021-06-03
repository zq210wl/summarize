
// 参考：https://segmentfault.com/a/1190000017814119

var arr = [7,3,1,4,2,9,5,8,6,0,3,8];
function quickSort(arrObj) {
    if (arrObj.length <= 1) {
        return arrObj;
    }
    var mIdx = Math.floor(arrObj.length / 2);
    var mVal = arrObj.splice(mIdx, 1)[0];
    var left = [];
    var right = [];
    arrObj.forEach(function(val, idx){
        if (val < mVal) {
            left.push(val);
        } else {
            right.push(val);
        }
    });
    return quickSort(left).concat([mVal], quickSort(right));
}

let result = quickSort(arr);
console.log(result);
console.log([1].concat([3]));