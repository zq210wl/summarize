function quickSort(array, startIndex, endIndex) {
    let leftIndex = startIndex;
    let rightIndex = endIndex;
    let base = array[leftIndex];
    if (startIndex < endIndex) {
        while (leftIndex < rightIndex) {
            if (array[rightIndex] < base) {
                array[leftIndex] = array[rightIndex];
                leftIndex++;
                while (leftIndex < rightIndex) {
                    if (array[leftIndex] > base) {
                        array[rightIndex] = array[leftIndex];
                        rightIndex--;
                        break;
                    } else {
                        leftIndex++;
                    }
                }
            } else {
                rightIndex--;
            }
        }
        if (leftIndex === rightIndex) {
            array[leftIndex] = base;
        }
        quickSort(array, 0, leftIndex - 1);
        quickSort(array, leftIndex + 1, endIndex);
    }
}

const toSortArray = [5, 1, 8, 3, 2, 7, 9, 6, 4, 9];
quickSort(toSortArray, 0, toSortArray.length - 1);
console.log(toSortArray);