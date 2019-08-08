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
      $(this).append('<div class="quiz-question-finish" onClick="$(\'form\').submit()">Finish</div>');
    } else {
      $(this).append('<div class="quiz-question-next-holder"><div class="quiz-question-next" onClick="nextQuizQuestion(' + questionNumber + ', ' + nextQuestionNumber + ')">Next <img src="https://MSSociety.github.io/ENDonationMembershipPages/images/arrow-down.svg" alt=""></div></div>');
    }

    $(this).find('.quiz-answer').each(function(answerIndex) {
      var input = $(this).children('.quiz-answer-input');
      var id = inputName + answerIndex;
      input.prop('name', inputName);
      input.prop('id', id);
      input.click(function() {
        revealAnswer(questionNumber);
      });

      var label = $(this).children('label');
      label.prop('for', id);
      label.click(function() {
        revealAnswer(questionNumber);
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
      scrollTop: nextQuestion.offset().top - 50
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

function revealAnswer(questionNumber) {
  $('#quiz-question' + questionNumber).find('.quiz-explanation').fadeIn(500, function() {
    $('#quiz-question' + questionNumber).find('.quiz-question-next-holder').fadeIn(500);
  });
}

$(document).ready(function() {
  initialiseQuiz();
});
