function moveFloatingContent() {
  if ($(window).width() < 768) {
    $('.floating-content').appendTo($('.en__component--row').last().find('.en__component--column'));
    $('.floating-content').show();
  }
}

$(document).ready(function() {
  moveFloatingContent();
  
  $('.hamburger').click(function () {
    var hamburger = $('.hamburger');
    
    if (hamburger.hasClass('is-active')) {
      hamburger.removeClass('is-active');
      $('#top-menu-links').addClass('hide-mobile');
      $('#top-menu-links').css('display', '');
    } else {
      hamburger.addClass('is-active');
      $('#top-menu-links').removeClass('hide-mobile');
      $('#top-menu-links').css('display', 'flex');
    }
  });
  
  $(document).click(function(event) { 
    var target = $(event.target);
    if(!target.closest('.hamburger').length
       && $('.hamburger').hasClass('is-active')) {
      $('.hamburger').removeClass('is-active');
      $('#top-menu-links').addClass('hide-mobile');
      $('#top-menu-links').css('display', '');
    }        
  });
});
