/**
 *
 *
 * @author fuyg
 * @date  2014-12-12
 */


define(function () {
    /**
     * @param {Object} o
     * @param {String} tag
     *
     */
    return function (o, tag) {
        tag = String(tag).toLowerCase();
        return (!o || !o.nodeName || !tag) ?
                false : String(o.nodeName).toLowerCase() === tag;
    };
});
