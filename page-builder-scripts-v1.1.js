function moveFloatingContent() {
  if ($(window).width() < 768) {
    $('.floating-content').appendTo($('.en__component--row').last().find('.en__component--column'));
    $('.floating-content').show();
  }
}

function updateFieldValidationMessages() {
  validationMessageReplacements = {
    emal: 'Please enter a valid email address',
    generic: 'This is required',
    special: {
      'credit-card-expiry': 'Please enter a valid expiry date',
      'credit-card-number': 'Please enter a valid card number',
    }
  };

  $.each(window.EngagingNetworks.validators, function(index, validator) {
    var validatorType = validator.type.toLowerCase();
    var validatorTypeSpecial = getSpecialValidator(validator.format);

    if (validatorTypeSpecial && validationMessageReplacements.special.hasOwnProperty(validatorTypeSpecial)) {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements.special[validatorTypeSpecial];
    } else if (validationMessageReplacements.hasOwnProperty(validatorType)) {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements[validatorType];
    } else {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements.generic;
    }
  });
}

function initiateSlider() {
  $('.footer-slider').slick({
    arrows: false,
    dots: true,
    infinite: true
  });

  repositionSliderDots();
  $('.slider-prev, .slider-prev-arrow').click(function() {
    $('.footer-slider').slick('slickPrev');
    repositionSliderDots();
  });
  $('.slider-next, .slider-next-arrow').click(function() {
    $('.footer-slider').slick('slickNext');
    repositionSliderDots();
  });
  $(window).resize(function() {
    repositionSliderDots();
  });
}

function repositionSliderDots() {
  $('.slick-dots').css('bottom', $('.slick-slider').height() - $('.slick-current .footer-content').height() - 53);
}

function onENValidateSetupComplete() {
  updateFieldValidationMessages();
  initiateSlider();
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
