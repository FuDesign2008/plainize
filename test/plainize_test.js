
define(function (require) {

    var $ = window.jQuery || window.$,
        PLAINIZE = require('../src/plainize'),
        console = require('../src/core/console');

    $.ajax({
        url: './html.txt',
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
