
define(function (require) {

    var $ = window.jQuery || window.$,
        PLAINIZE = require('../src/plainize/plainize'),
        console = require('../src/core/console'),
        PARSE_HTML = require('../src/web/dom/parseHTML'),
        testUrl = './huxiu.txt';

    $.ajax({
        url: testUrl,
        dataType: 'text',
        success: function (data) {
            var plainized = PLAINIZE(data, {}),
                $textarea = $('textarea', document.body),
                $wrapper = $('#wrapper'),
                parsed = PARSE_HTML(data, document, true);

            $(parsed).find('script').remove();

            $(parsed).appendTo($wrapper);

            $textarea.text(plainized).css({
                height: $wrapper.height()
            });

        }
    });

});
