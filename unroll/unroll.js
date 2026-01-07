function unroll(squareArray) {
    if (!squareArray || squareArray.length === 0) return [];
    
    const result = [];
    let top = 0;
    let bottom = squareArray.length - 1;
    let left = 0;
    let right = squareArray[0].length - 1;
    
    while (top <= bottom && left <= right) {
        
        for (let i = left; i <= right; i++) {
            result.push(squareArray[top][i]);
        }
        top++;
        
        for (let i = top; i <= bottom; i++) {
            result.push(squareArray[i][right]);
        }
        right--;
        
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(squareArray[bottom][i]);
            }
            bottom--;
        }
        
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(squareArray[i][left]);
            }
            left++;
        }
    }
    
    return result;
}
unroll(square);

module.exports = unroll;
