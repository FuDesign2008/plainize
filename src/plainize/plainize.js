/**
 *
 *
 * @author fuyg
 * @date  2014-12-11
 */

define(function (require) {
    var console = require('../core/console'),
        _ = require('../core/underscore'),
        //IS_TAG = require('./web/dom/isTag'),
        NODE_TYPE = require('../web/dom/nodeType'),
        PARSE_HTML = require('../web/dom/parseHTML'),
        //INNER_TEXT = require('./web/dom/innerText'),
        TRIM = require('../core/str/trim'),
        FORMATTER = require('./formatter'),
        blockElements = [
            'address',
            'article',
            'aside',
            'audio',
            'blockquote',
            'canvas',
            'dd',
            'div',
            'dl',
            'fieldset',
            'figcaption',
            'figure',
            'footer',
            'form',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'header',
            'hgroup',
            'hr',
            'noscript',
            'ol',
            'output',
            'p',
            'pre',
            'section',
            'table',
            'tfoot',
            'ul',
            'video'
        ],
        plainize,
        /**
         * @param {Node} node
         * @param {Object} options
         * @return {String}
         */
        /*jshint maxcomplexity: 20 */
        walk = function (node, options) {
            var text = '',
                tag,
                elementWalk = function (el, opt) {
                    var childNodes = el.childNodes,
                        len = childNodes.length,
                        ret = '';

                    if (len > 0) {
                        _.each(childNodes, function (childNode) {
                            ret += walk(childNode, opt) || '';
                        });
                    }
                    return ret;
                };

            if (NODE_TYPE.isElement(node)) {

                tag = node.tagName.toLowerCase();
                if (options.skipElements[tag]) {
                    return '';
                }

                switch (tag) {
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6':
                        text += FORMATTER.heading(node, elementWalk, options);
                        break;
                    case 'p':
                        text += FORMATTER.paragraph(node, elementWalk, options);
                        break;
                    case 'hr':
                        text += FORMATTER.horizontalLine(node,
                                    elementWalk, options);
                        break;
                    case 'br':
                        text += FORMATTER.lineBreak(node, elementWalk, options);
                        break;
                    case 'img':
                        text += FORMATTER.image(node, elementWalk, options);
                        break;
                    case 'a':
                        text += FORMATTER.anchor(node, elementWalk, options);
                        break;
                    case 'ol':
                        text += FORMATTER.orderList(node, elementWalk, options);
                        break;
                    case 'ul':
                        text += FORMATTER.unorderList(node,
                                elementWalk, options);
                        break;
                    case 'table':
                        text += FORMATTER.table(node, elementWalk, options);
                        break;
                    default:
                        text += elementWalk(node, options);
                        if (TRIM(text)) {
                            console.log(tag);
                            if (_.include(blockElements, tag)) {
                                text = '\n' + text + '\n';
                            } else {
                                text = text;
                            }
                        }
                        break;

                }
            } else if (NODE_TYPE.isText(node)) {
                text = FORMATTER.text(node);
            }

            return text;
        };

    /**
     * @param {Node|String} html
     * @param {Object} [options]
     * @param {Integer} [options.maxLength = 0]
     * @param {Object} [options.skipElements = {script: true, style: true}]
     * @return {String}
     *
     */
    plainize = function (html, options) {
        var wrapper,
            text;

        if (NODE_TYPE.isNode(html)) {
            wrapper = html;
        } else {
            wrapper = PARSE_HTML(html, document, true);
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.innerHTML = html;
            }
        }

        if (!wrapper) {
            console.warn('No wrapper!');
            return;
        }

        console.log(wrapper);

        options = _.defaults({
            maxLength: 0,
            wordwrap: 80,
            skipElements: {
                script: true,
                noscript: true,
                style: true
            }
        }, options);

        options._level = 0;

        text = walk(wrapper, options);

        text = text.replace(/(\r?\n){2}/g, '\n');
        text = text.replace(/(\r?\n){3,}/g, '\n\n');
        //text = text.replace(/\s{2,}/g, ' ');

        return TRIM(text);
    };


    return plainize;
});
