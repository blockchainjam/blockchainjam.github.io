function scrollToSelector(selector) {
    $("html,body").animate({scrollTop:$(selector).offset().top});
}

$(function() {
    var $win = $(window),
        $nav = $('.navigation-bar'),
        position = $('.outline').offset().top,
        fixedClass = 'floating';
  
    $win.on('load scroll', function() {
      var value = $(this).scrollTop();
      if ( value > position ) {
        $nav.addClass(fixedClass);
      } else {
        $nav.removeClass(fixedClass);
      }
    });
  });