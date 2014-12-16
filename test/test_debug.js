
define(function (require) {

    var $ = window.jQuery || window.$,
        PLAINIZE = require('../src/plainize/plainize'),
        testUrl = './huxiu.txt';

    $.ajax({
        url: testUrl,
        dataType: 'text',
        success: function (data) {
            var plainized = PLAINIZE.plainize(data, {}),
                $textarea = $('textarea', document.body),
                $wrapper = $('#wrapper'),
                parsed = PLAINIZE.parseHTML(data, document, true);

            $(parsed).find('script').remove();

            $(parsed).appendTo($wrapper);

            $textarea.text(plainized).css({
                height: $wrapper.height()
            });

        }
    });

});
