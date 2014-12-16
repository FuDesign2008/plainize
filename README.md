plainize
========

Convert html to  plain text with beauty format in browser, inspired by https://github.com/werk85/node-html-to-text


##example

http://fudesign2008.github.io/plainize/test.html


##api

```javascript


/**
 * @param {Node|String} html
 * @param {Object} [options]
 * @param {Integer} [options.maxLength = 0]
 * @param {Object} [options.skipElements = {script: true, noscript: true, style: true}]
 * @return {String}
 *
 */
window.plainize.plainize(html, options);


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
window.plainize.parseHTML(markup, context, returnWrapper);


```



