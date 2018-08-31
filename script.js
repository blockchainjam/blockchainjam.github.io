function scrollToSelector(selector) {
    $("html,body").animate({ scrollTop: $(selector).offset().top });
}

$(function () {
    var $win = $(window),
        $nav = $('.navigation-bar:not(.absolute)');

    $win.on('load scroll', function () {
        var value = $(this).scrollTop();
        if (value > $('.display-nav').offset().top) {
            $nav.removeClass('hidden');
        } else {
            $nav.addClass('hidden');
        }
    });
});

function onCheckChanged(arg) {
    if (arg) {
        $('.navigation-bar.fixed').addClass('toggled')
    } else {
        $('.navigation-bar.fixed').removeClass('toggled');
    }
}