/**
 * parse html snippet safely
 *
 * @see
 * https://code.google.com/p/google-caja/issues/detail?id=1823
 * https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 *
 * @author fuyg
 * @date  2014-08-14
 */
define(function () {
        /**
         * NOTE:
         *
         * 1. This function will not cause browser to load images automatically
         *
         * @param {String} markup the html string that can be set as the
         * innserHTML of <body/>
         * @param {Document} context
         * @return {Document}
         */
    var parseHTML = function (markup, context) {
            var doc,
                parser,
                win;

            if (context.implementation &&
                    context.implementation.createHTMLDocument) {
                // if there is no param of title, Firefox/Opera may cause error
                doc = context.implementation.createHTMLDocument('title');
                doc.body.innerHTML = markup;
                return doc;
            }

            win = context.defaultView || window;
            if (win.DOMParser) {
                parser = new win.DOMParser();
                try {
                    doc = parser.parseFromString('', 'text/html');
                } catch (ex) {
                    // do nothing
                }
                if (doc) {
                    doc.body.innerHTML = markup;
                    return doc;
                }
            }
        };

    /**
     * NOTE:
     *
     * 1. This function can parse html and avoid to load images
     * 2. If you want to parse html and load images, you can create a `div` to
     *   parse html
     *
     * @param {String} markup
     * @param {Document} [context = document]
     * @param {Boolean} [returnWrapper = true]
     * @return {HTMLElement|Array<Node>}
     */
    return function (markup, context, returnWrapper) {
        if (!markup) {
            return;
        }
        context = context || document;
        var doc = parseHTML(markup, context),
            len,
            index,
            nodes,
            arrNodes;

        if (!doc) {
            return;
        }
        if (returnWrapper !== false) {
            return doc.body;
        }

        nodes = doc.body.childNodes;
        len = nodes.length;
        arrNodes = [];

        for (index = 0; index < len; index++) {
            arrNodes.push(nodes[index]);
        }

        return arrNodes;

    };
});
