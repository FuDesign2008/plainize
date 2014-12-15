

define(function (require) {
    var TIMES = require('./times');
    /**
     * @param {String} str
     * @param {Integer} len
     * @param {String} padStr [optional] default is ' '
     * @param {String} type [optional] default is 'left'
     *
     */
    return function (str, length, padStr, type) {
        str = str == null ? '' : String(str);
        var padlen  = 0;

        if (!padStr) {
            padStr = ' ';
        } else if (padStr.length > 1) {
            padStr = padStr.charAt(0);
        }

        switch (type) {
        case 'right':
            padlen = length - str.length;
            return str + TIMES(padStr, padlen);
        case 'both':
            padlen = length - str.length;
            return TIMES(padStr, Math.ceil(padlen / 2)) + str +
                TIMES(padStr, Math.floor(padlen / 2));
        default: // 'left'
            padlen = length - str.length;
            return TIMES(padStr, padlen) + str;
        }

    };
});
