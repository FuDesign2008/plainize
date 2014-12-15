/**
 *
 *
 * @author fuyg
 * @date  2014-12-15
 */
define(function () {

    // text
    //
    // {
    //   content: 'xxx',
    //   type: 1,
    //   size: 3,
    //  trimmed: true
    // }
    //
    //
    // linebreak
    //
    // {
    //    type: 2,
    //    size: 3,
    //    mergeable: true
    // }
    //
    // space
    //
    // {
    //  type: 3,
    //  size: 3,
    //  mergeable: true
    // }
    //

    return {

        TEXT: 1,
        LINE_BREAK: 2,
        SPACE: 3,

        isText: function (obj) {
            return obj && obj.type === this.TEXT;
        },
        isLineBreak: function (obj) {
            return obj && obj.type === this.LINE_BREAK;
        },
        isSpace: function (obj) {
            return obj && obj.type === this.SPACE;
        }
    };
});
