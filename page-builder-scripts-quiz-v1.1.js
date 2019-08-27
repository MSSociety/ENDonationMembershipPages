$(document).ready(function() {
  initialiseQuiz();
});

function initialiseQuiz() {
  var questionsTotal = $('.quiz-question').length;
  var signupPosition = ($('.quiz-form').isAfter($('.quiz-question'))) ? 'after' : 'before';

  $('.quiz-question').each(function(questionIndex) {
    var questionNumber = questionIndex + 1;
    var nextQuestionNumber = (questionNumber < questionsTotal) ? questionNumber + 1 : (signupPosition === 'after' ? 'signup' : 'finish');
    var inputName = 'question' + questionNumber;

    $(this).prop('id', 'quiz-question' + questionNumber);

    $(this).prepend('<h1 class="quiz-question-number">' + questionNumber + ' of ' + questionsTotal + '</h1>');

    if (questionNumber === questionsTotal && signupPosition === 'before') {
      $(this).append('<div class="quiz-question-next-holder"><div class="quiz-question-finish" onClick="$(\'form\').submit()">Sign the open letter</div></div>');
    } else {
      $(this).append('<div class="quiz-question-next-holder"><div class="quiz-question-next" onClick="nextQuizQuestion(' + questionNumber + ', ' + nextQuestionNumber + ')">Next <img src="https://MSSociety.github.io/ENDonationMembershipPages/images/arrow-down.svg" alt=""></div></div>');
    }

    $(this).find('.quiz-answer').each(function(answerIndex) {
      var input = $(this).children('.quiz-answer-input');
      var id = inputName + answerIndex;
      input.prop('name', inputName);
      input.prop('id', id);
      input.click(function() {
        revealQuizAnswer(questionNumber, answerIndex);
      });

      var label = $(this).children('label');
      label.prop('for', id);
      label.click(function() {
        revealQuizAnswer(questionNumber, answerIndex);
      });
    });

    if (questionNumber === 1 && signupPosition === 'after') {
      $(this).css('display', 'flex');
    }
  });

  $('.quiz-question-start').click(function() {
    window.validateAllFields();
    if ($('.en__field__error').length) {
      $('html, body').animate({
        scrollTop: $('.en__field__error').first().offset().top
      }, 500);
    } else {
      nextQuizQuestion('signup', 1);
      $(this).css('visibility', 'hidden');
    }
  });
}

function nextQuizQuestion(questionNumber, nextQuestionNumber) {
  var question = $('#quiz-question' + questionNumber);
  var nextQuestion;
  if (nextQuestionNumber === 'signup') {
    nextQuestion = $('.quiz-form');
  } else {
    nextQuestion = $('#quiz-question' + nextQuestionNumber);
  }

  nextQuestion.css('display', 'flex');
  $([document.documentElement, document.body]).animate({
      scrollTop: nextQuestion.offset().top - 25
  }, 500, function() {
    question.find('.quiz-question-next').css('visibility', 'hidden');
  });

  var newUrlHash = '#quiz-question' + nextQuestionNumber;
  if (history.pushState) {
    history.pushState(null, null, newUrlHash);
  }
  else {
    location.hash = newUrlHash;
  }
}

function revealQuizAnswer(questionNumber, answerIndex) {
  var explanations = $('#quiz-question' + questionNumber).find('.quiz-explanation');
  var explanation = explanations.eq(answerIndex);
  var nextButtonHolder = $('#quiz-question' + questionNumber).find('.quiz-question-next-holder');

  explanations.hide();
  nextButtonHolder.hide();

  explanation.fadeIn(500, function() {
    nextButtonHolder.fadeIn(500, function() {
      if (!nextButtonHolder.visible()) {
        nextButtonHolder[0].scrollIntoView(false);
      }
    });
  });
}

(function ($) {
  $.fn.isAfter = function ($elm){
    var $this = $(this);
    var $myParents = $this.parents();
    var $elmParents = $elm.parents();

    var $myTreeLast = $this;

    var level = 0;
    for(var i in $myParents)
    {
      var $elmTreeLast = $elm;
      if (!$myParents.hasOwnProperty(i))
      {
        continue;
      }
      var $parent = $($myParents[i]);

      for (var j in $elmParents)
      {
        if (!$elmParents.hasOwnProperty(j))
        {
          continue;
        }

        var $elmParent = $($elmParents[j]);

        if ($parent[0] === $elmParent[0])
        {
          var myTreePos = $myTreeLast.index();
          var elmTreePos = $elmTreeLast.index();
          return (myTreePos > elmTreePos);
        }

        $elmTreeLast = $elmParent;
      }
      $myTreeLast = $parent;
    }

    return false;
  }
})(jQuery);

(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       can accounts for vertical position, horizontal, or both
     */
    var $w=$(window);
    $.fn.visible = function(partial,hidden,direction,container){

        if (this.length < 1)
            return;
	
	// Set direction default to 'both'.
	direction = direction || 'both';
	    
        var $t          = this.length > 1 ? this.eq(0) : this,
						isContained = typeof container !== 'undefined' && container !== null,
						$c				  = isContained ? $(container) : $w,
						wPosition        = isContained ? $c.position() : 0,
            t           = $t.get(0),
            vpWidth     = $c.outerWidth(),
            vpHeight    = $c.outerHeight(),
            clientSize  = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = isContained ?
												rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
												rec.top >= 0 && rec.top < vpHeight,
                bViz = isContained ?
												rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
												rec.bottom > 0 && rec.bottom <= vpHeight,
                lViz = isContained ?
												rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
												rec.left >= 0 && rec.left <  vpWidth,
                rViz = isContained ?
												rec.right - wPosition.left > 0  && rec.right < vpWidth + wPosition.left  :
												rec.right > 0 && rec.right <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz,
		vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
                hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop 				= isContained ? 0 : wPosition,
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $c.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                position          = $t.position(),
                _top            = position.top,
                _bottom         = _top + $t.height(),
                _left           = position.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };
})(jQuery);
