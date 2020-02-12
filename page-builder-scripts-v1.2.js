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
    name: {
      'supporter.NOT_TAGGED_10': 'Please note we can only accept donations of a minimum of £2',
    },
    special: {
      'credit-card-expiry': 'Please enter a valid expiry date',
      'credit-card-number': 'Please enter a valid card number',
      'pca-bank-account-uk': 'Please enter valid matching bank details',
      'pca-bank-sort-code-uk': 'Please enter valid matching bank details',
    }
  };

  $.each(window.EngagingNetworks.validators, function(index, validator) {
    var validatorType = validator.type.toLowerCase();
    var validatorTypeSpecial = getSpecialValidator(validator.format);

    if (validationMessageReplacements.name.hasOwnProperty(validator.fieldName)) {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements.name[validator.fieldName];
    } else if (validatorTypeSpecial && validationMessageReplacements.special.hasOwnProperty(validatorTypeSpecial)) {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements.special[validatorTypeSpecial];
    } else if (validationMessageReplacements.hasOwnProperty(validatorType)) {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements[validatorType];
    } else {
      window.EngagingNetworks.validators[index].errorMessage = validationMessageReplacements.generic;
    }
  });
}

function setMinimumOtherAmounts() {
  $('.en__field--NOT_TAGGED_10 .en__field__item:last').prev().on('click', function() {
    setTimeout(function() {
      $('.en__field--NOT_TAGGED_10 .en__field__input--other').focus();
    }, 300);
  });

  $('.en__field--NOT_TAGGED_10 .en__field__input--other').on('blur', function() {
    var givingFrequency = $('input[name="supporter.NOT_TAGGED_5"]:checked').val();
    var minOtherAmount = 2;
    var otherInputVal = $('.en__field--NOT_TAGGED_10 .en__field__input--other').val();

    if (otherInputVal < minOtherAmount) {
      $('.en__field--NOT_TAGGED_10 .en__field__input--other').val(minOtherAmount);
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

  var leftOffset = $('.footer-content').css('flex-wrap') === 'wrap' ? 0 : ($('.slick-list').width() / 2);
  $('.slick-dots').css('left',
    leftOffset
    + parseInt($('.footer-content').css('padding-left'))
    + ($('.footer-content-50').width() / 2)
    - ($('.slick-dots').width() / 2)
  );
}

function onENValidateSetupComplete() {
  updateFieldValidationMessages();
  setMinimumOtherAmounts();
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
