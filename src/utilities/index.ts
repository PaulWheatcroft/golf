export function isArrayInArrayOfArrays(array: [number, number], arrayOfArrays: [number, number][]) {
    return arrayOfArrays.some(arr => {
        const isEqual = arr[0] === array[0] && arr[1] === array[1];
        return isEqual;
    });
}