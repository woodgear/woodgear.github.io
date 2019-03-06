/*为什么这个世界要有环境兼容这种事情啊 不想用babel啊 */

class util {
    static timeAgo(left, right) {
        const leftDate = new Date(left);
        const rightDate = new Date(right);
        if (leftDate.getFullYear() != rightDate.getFullYear()) {
            return left;
        }

        const data = {
            '月': [leftDate.getMonth() + 1, rightDate.getMonth() + 1],
            '天': [leftDate.getDate(), rightDate.getDate()],
            '小时': [leftDate.getHours(), rightDate.getHours()],
            '分钟': [leftDate.getMinutes(), rightDate.getMinutes()],
        };
        for (let key of Object.keys(data)) {
            const Case = data[key];
            if (Case[0] != Case[1]) {
                return `${Case[1]-Case[0]}${key}前`;
            }
        }
        return '1分钟内';
    }
}

(function(module) {
    module.exports = util;
})(typeof module === 'undefined' ? this['util'] = {} : module);