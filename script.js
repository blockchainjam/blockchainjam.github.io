function scrollToSelector(selector) {
    $("html,body").animate({scrollTop:$(selector).offset().top});
}

$(function() {
    var $win = $(window),
        $nav = $('.navigation-bar'),
        fixedClass = 'floating';
  
    $win.on('load scroll', function() {
      if(value > $('.abstract').offset().top) {
          $nav.addClass(fixedClass);
      } else {
          $nav.removeClass(fixedClass);
      }
    });
  });