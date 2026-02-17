/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    const answer = [];
    const len = equations.length;
    const map = new Map();
    const set = new Set();
    for(let i = 0 ; i < len ; i++) {
        const [left, right] = equations[i];
        const value = values[i];
        map.set(left, {value: right, multi: value});
        set.add(left);
        set.add(right);
    }

    for(const [left, right] of queries) {
        const leftSet = new Set();
        const rightSet = new Set();
        
        let tmp = 1;
        let tmpL = left;
        leftSet.add(left);
        while(map.has(tmpL)) {
            const {value, multi} = map.get(tmpL);
            leftSet.add(value);
            tmp *= multi;
            tmpL = value;
        }

        let tmpR = right;
        rightSet.add(right);
        while(map.has(tmpR)) {
            const {value, multi} = map.get(tmpR);
            rightSet.add(value);
            tmp /= multi;
            tmpR = value;
        }

        if(!set.has(left) || !set.has(right) || !leftSet.intersection(rightSet).size) {
            answer.push(-1.0);
            continue;
        } 
        answer.push(tmp);
    }

    return answer;
};