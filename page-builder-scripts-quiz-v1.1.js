function initialiseQuiz() {
  $('.quiz-question').each(function(questionIndex) {
    var questionNumber = questionIndex + 1;
    var inputName = 'question' + questionNumber;

    $(this).prepend('<h1 class="quiz-question-number">' + questionNumber + ' of ' + window.quiz.questionsTotal + '</h1>');

    $(this).append('<div class="quiz-question-next">Next <img src="https://MSSociety.github.io/ENDonationMembershipPages/images/arrow-down.svg" alt=""></div>');
    var nextQuestionNumber = (questionNumber < window.quiz.questionsTotal) ? questionNumber + 1 : 'signup';
    $(this).find('.quiz-question-next').click(function() {
      nextQuizQuestion(nextQuestionNumber);
    });

    $(this).find('.quiz-answer').each(function(answerIndex) {
      var input = $(this).children('.quiz-answer-input');
      var id = inputName + answerIndex;
      input.prop('name', inputName);
      input.prop('id', id);
      $(this).children('label').prop('for', id);
    });
  });
}

function nextQuizQuestion(questionNumber) {
  console.log(questionNumber);
}

$(document).ready(function() {
  window.quiz = {};
  window.quiz.questionsTotal = $('.quiz-question').length;
  
  initialiseQuiz();
  
  console.log(window.quiz);
});
