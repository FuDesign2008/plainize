/**
 * 用于获取与设置元素的innerText，推荐使用
 * 1) 设置时，可配置是否移除子节点的事件[使用core.event.bind()方法绑定的]
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-28
 * @time   上午09:55:23
 */



define(function (require) {
    var _ = require('../../core/underscore');
    /**
     * @param {HTMLElement} el
     * @param {String} [text] if text exists, innerText will be set,
     *          or else innerText will be get.
     */
    return function (el, text) {
        if (!el) {
            return;
        }
        //setter
        if (_.isString(text)) {
            if (el.innerText != null) {
                el.innerText = text;
            } else if (el.textContent != null) {
                el.textContent = text;
            }
        } else {
            //getter
            return el.innerText || el.textContent;
        }
    };
});
