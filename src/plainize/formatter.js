/**
 * formatter
 *
 * @author fuyg
 * @date  2014-12-12
 */
define(function (require) {
    var console = require('../core/console'),
        _ = require('../core/underscore'),
        TIMES = require('../core/str/times'),
        TRIM = require('../core/str/trim'),
        STARTS_WITH = require('../core/str/startsWith'),
        //TITLEIZE = require('../core/str/titleize'),
        IS_TAG = require('../web/dom/isTag'),
        PAD = require('../core/str/pad'),

        formatOrderListItem = function (index, el, fn, options) {
            console.log('orderList level: ' + options._level);
            var indexStr = ' ' + (index + 1) + '. ',
                text = TRIM(fn(el, options) || ''),
                prefix = TIMES(' ', options._level * 4) + indexStr,
                prefixSpaces = TIMES(' ', prefix.length);

            text = text.replace(/\n/g, '\n' + prefixSpaces);

            return prefix + text + '\n';
        },
        formatUnorderListItem = function (index, el, fn, options) {
            console.log('unorderList level: ' + options._level);
            var indexStr = (index + 1) + '',
                text = TRIM(fn(el, options) || ''),
                prefix = TIMES(' ', options._level * 4) + ' - ',
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
            return '\n\n' + text.toUpperCase() + '\n\n';

        },
        paragraph: function (el, fn, options) {
            var text = fn(el, options) || '';
            return text + '\n';

        },
        lineBreak: function () {
            return '\n';
        },
        horizontalLine: function (el, fn, options) {
            var text = TIMES('-', options.wordwrap);
            return '\n\n' + text + '\n\n';
        },
        image: function (el) {
            var src = TRIM(el.getAttribute('src')),
                text = TRIM(el.getAttribute('alt') ||
                            el.getAttribute('title') || '');

            if (!/^[#\/\.]/.test(src) && text !== src) {
                text += '[' + src + ']';

            }

            return text;
        },
        anchor: function (el, fn, options) {
            var text = fn(el, options) || '',
                href = TRIM(el.getAttribute('href'));
            if (!/^[#\/\.]/.test(href) && href !== TRIM(text)) {
                text += '[' + href + ']';
            }
            return text;
        },
        orderList: function (el, fn, options) {
            var that = this,
                text = '',
                level = options._level;

            _.each(el.children, function (child, index) {
                if (IS_TAG(child, 'li')) {
                    text += formatOrderListItem(index, child, fn, options);
                } else if (IS_TAG(child, 'ul')) {
                    options._level++;
                    text += that.unorderList(child, fn, options);
                    options._level--;
                } else if (IS_TAG(child, 'ol')) {
                    options._level++;
                    text += that.orderList(child, fn, options);
                    options._level--;
                }
            });

            if (level === 0 && text) {
                text = '\n' + text;
            }

            console.log(text);

            return text;
        },
        unorderList: function (el, fn, options) {
            var that = this,
                text = '',
                level = options._level;

            _.each(el.children, function (child, index) {
                if (IS_TAG(child, 'li')) {
                    text += formatUnorderListItem(index, child, fn, options);
                } else if (IS_TAG(child, 'ul')) {
                    options._level++;
                    text += that.unorderList(child, fn, options);
                    options._level--;
                } else if (IS_TAG(child, 'ol')) {
                    options._level++;
                    text += that.orderList(child, fn, options);
                    options._level--;
                }
            });

            if (level === 0 && text) {
                text = '\n' + text;
            }

            return text;
        },

        table: function (el, fn, options) {
            var tableText = '\n',
                data = {
                    caption: '',
                    headRows: [],
                    bodyRows: [],
                    footRows: []
                },
                cols = 0,
                strLen = function (str) {
                    var len = str.length,
                        index,
                        code,
                        counter = 0;
                    for (index = 0; index < len; index++) {
                        code = str.charCodeAt(index);
                        if (code < 256) {
                            counter++;
                        } else {
                            counter += 1;
                        }
                    }
                    return counter;
                },
                /**
                 * @param {Array<String>} arr
                 * @return {Integer}
                 */
                maxLenInArr = function (arr) {
                    var len = 0;
                    _.each(arr, function (text) {
                        if (text.length > len) {
                            len = strLen(text);
                        }
                    });
                    return len;
                },
                colContentMaxSize = [],
                /**
                 * @return {Array}
                 */
                parseRow = function (tr, fn, options) {
                    var row = [],
                        maxLines = 1;

                    if (!IS_TAG(tr, 'tr')) {
                        return;
                    }

                    console.log(tr);
                    _.each(tr.childNodes, function (td) {
                        if (IS_TAG(td, 'td') || IS_TAG(td, 'th')) {
                            var tdText = fn(td, options),
                                index,
                                maxLen,
                                max,
                                trimmed = TRIM(tdText);
                            if (!trimmed) {
                                row.push(['']);
                            } else {
                                console.log('tdText: --->', tdText);
                                tdText = tdText.replace(/(\r?\n){2}/g, '\n');
                                tdText = tdText.replace(/(\r?\n){3,}/g, '\n\n');
                                tdText = tdText.split(/\r?\n/);
                                console.log(tdText);
                                index = row.length;
                                maxLen = colContentMaxSize[index] || 0;
                                max = maxLenInArr(tdText);
                                colContentMaxSize[index] =
                                    max > maxLen ? max : maxLen;

                                if (tdText.length > maxLines) {
                                    maxLines = tdText.length;
                                }

                                row.push(tdText);
                            }
                        }
                    });

                    if (cols < row.length) {
                        cols = row.length;
                    }

                    row._maxLines = maxLines;

                    console.log('the row data');
                    console.log(row);

                    return row;
                },
                /**
                 * @param {Array} row
                 * @param {Boolean} isHead
                 * @return {String}
                 */
                concatRow = function (row, isHead) {
                    var lines = row._maxLines || 1,
                        linesData = [],
                        index,
                        oneLine;

                    console.log(row);

                    for (index = 0; index < lines; index++) {
                        oneLine = '';
                        /**
                         * @param {Array<String>} td
                         */
                        _.each(row, function (td, tdIndex) {
                            oneLine += PAD(td[index] || '',
                                colContentMaxSize[tdIndex] + 2,
                                ' ', 'right', strLen);
                        });

                        console.log('oneLine: ' + oneLine);

                        linesData.push(oneLine);
                    }


                    return linesData.join('\n') + '\n';
                };

            _.each(el.childNodes, function (child) {
                if (IS_TAG(child, 'tbody')) {
                    console.log('the tbody');
                    console.log(child);
                    _.each(child.childNodes, function (tr) {
                        var parsed = parseRow(tr, fn, options);
                        if (!parsed) {
                            return;
                        }
                        data.bodyRows.push(parsed);
                    });
                } else if (IS_TAG(child, 'thead')) {
                    _.each(child.childNodes, function (tr) {
                        var parsed = parseRow(tr, fn, options);
                        if (!parsed) {
                            return;
                        }
                        data.headRows.push(parsed);
                    });
                } else if (IS_TAG(child, 'tfoot')) {
                    _.each(child.childNodes, function (tr) {
                        var parsed = parseRow(tr, fn, options);
                        if (!parsed) {
                            return;
                        }
                        data.footRows.push(parsed);
                    });
                } else if (IS_TAG(child, 'caption')) {
                    data.caption = fn(child, options) + '\n';
                } else if (IS_TAG(child, 'tr')) {
                    data.bodyRows.push(parseRow(child, fn, options));
                }
            });

            tableText += data.caption;

            console.log(data);

            _.each(['head', 'body', 'foot'], function (name) {
                var propName = name + 'Rows',
                    rows = data[propName];
                if (rows && rows.length) {
                    console.log('rows...', rows);
                    _.each(rows, function (row) {
                        tableText += concatRow(row);
                    });
                }
            });

            tableText = '\n\n' + tableText + '\n\n';

            return tableText;
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
