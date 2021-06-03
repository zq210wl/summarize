function deepClone(target) {
    let result;
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            result = [];
            for (let i in target) {
                result.push(deepClone(target[i]));
            }
        } else if (target === null) {
            result = target;
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            result = {};
            for (let i in target) {
                if (target.hasOwnProperty(i)) {
                    result[i] = deepClone(target[i]);
                }
            }
        }
    } else { // 基本类型和Function类型
        result = target;
    }
    return result;
}

let oldObj = {
    a: {
        c: /a/,
        d: undefined,
        b: null
    },
    b: function () {
        console.log(this.a)
    },
    c: [
        {
            a: 'c',
            b: /b/,
            c: undefined
        },
        'a',
        3
    ]
}

const newObj = deepClone(oldObj);

console.log(newObj);