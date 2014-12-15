
define(function (require) {

    var $ = window.jQuery || window.$,
        PLAINIZE = require('../src/plainize/plainize'),
        console = require('../src/core/console'),
        testUrl = './vim.txt';

    $.ajax({
        url: testUrl,
        dataType: 'text',
        success: function (data) {
            var plainized = PLAINIZE(data, {}),
                $textarea = $('textarea', document.body),
                $wrapper = $('#wrapper');

            $wrapper.html(data);
            $textarea.text(plainized).css({
                height: $wrapper.height()
            });

        }
    });

});
