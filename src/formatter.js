/**
 * formatter
 *
 * @author fuyg
 * @date  2014-12-12
 */
define(function (require) {
    var console = require('./core/console'),
        _ = require('./core/underscore'),
        TIMES = require('./core/str/times'),
        TRIM = require('./core/str/trim'),
        STARTS_WITH = require('./core/str/startsWith'),
        TITLEIZE = require('./core/str/titleize'),
        formatOrderListItem = function (prefix, el, fn, options) {
            var text = TRIM(fn(el, options) || ''),
                prefixSpaces = TIMES(' ', prefix.length);
            text = text.replace(/\n/g, '\n' + prefixSpaces);
            return prefix + text + '\n';
        },
        formatUnorderListItem = function (index, el, fn, options) {
            var indexStr = (index + 1) + '',
                text = TRIM(fn(el, options) || ''),
                prefix = ' - ',
                prefixSpaces = TIMES(' ', prefix.length);

            if (STARTS_WITH(text, indexStr)) {
                text = text.substr(indexStr.length);
            }

            if (!text) {
                return '';
            }

            text = text.replace(/\n/g, '\n' + prefixSpaces);
            return prefix + text + '\n';
        };


    return {
        /**
         * @param {HTMLElement} el
         * @param {Function} fn
         * @param {Object} options
         * @return {String}
         */
        heading: function (el, fn, options) {
            var text = fn(el, options) || '';
            if (!text) {
                return '';
            }
            return '\n' + TITLEIZE(text) + '\n\n';

        },
        paragraph: function (el, fn, options) {
            var text = fn(el, options) || '';
            return text + '\n\n';

        },
        lineBreak: function () {
            return '\n';
        },
        horizontalLine: function (el, fn, options) {
            var text = TIMES('-', options.wordwrap) + '\n\n';
            return '\n' + text;
        },
        image: function () {
            return '';
        },
        anchor: function (el, fn, options) {
            var text = fn(el, options) || '';
            return text;
        },
        orderList: function (el, fn, options) {
            var text = '';

            _.each(el.children, function (child, index) {
                var prefix = ' ' + (index + 1) + '. ';
                text += formatOrderListItem(prefix, child, fn, options);
            });

            if (text) {
                text = '\n' + text;
            }

            console.log(text);

            return text;
        },
        unorderList: function (el, fn, options) {
            var text = '';

            _.each(el.children, function (child, index) {
                text += formatUnorderListItem(index, child, fn, options);
            });

            return text;
        },

        table: function () {
            // TODO
            return '';
        },

        text: function (textNode) {
            var text = TRIM(textNode.nodeValue || '');
            if (text) {
                text += ' ';
            }
            return text;
        }

    };
});
