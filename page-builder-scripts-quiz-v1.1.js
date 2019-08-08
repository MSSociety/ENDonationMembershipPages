function initialiseQuiz() {
  $('.quiz-question').each(function(questionIndex) {
    var questionNumber = questionIndex + 1;
    var nextQuestionNumber = (questionNumber < window.quiz.questionsTotal) ? questionNumber + 1 : 'signup';
    var inputName = 'question' + questionNumber;

    $(this).prop('id', 'quiz-question' + questionNumber);

    $(this).prepend('<h1 class="quiz-question-number">' + questionNumber + ' of ' + window.quiz.questionsTotal + '</h1>');

    $(this).append('<div class="quiz-question-next-holder"><div class="quiz-question-next" onClick="nextQuizQuestion(' + questionNumber + ', ' + nextQuestionNumber + ')">Next <img src="https://MSSociety.github.io/ENDonationMembershipPages/images/arrow-down.svg" alt=""></div></div>');

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

    if (questionNumber === 1) {
      $(this).css('display', 'flex');
    }
  });
}

function nextQuizQuestion(questionNumber, nextQuestionNumber) {
  var question = $('#quiz-question' + questionNumber);
  var nextQuestion = $('#quiz-question' + nextQuestionNumber);

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
  window.quiz = {};
  window.quiz.questionsTotal = $('.quiz-question').length;
  
  initialiseQuiz();
  
  console.log(window.quiz);
});
