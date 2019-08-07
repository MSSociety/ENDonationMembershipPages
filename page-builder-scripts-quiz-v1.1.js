function initialiseQuiz() {
  $('.quiz-question').each(function(questionIndex) {
    var questionNumber = questionIndex + 1;
    var inputName = 'question' + questionNumber;
    
    $(this).find('.quiz-answer').each(function(answerIndex) {
      var input = $(this).children('.quiz-answer-input');
      var id = inputName + answerIndex;
      input.prop('name', inputName);
      input.prop('id', id);
      $(this).children('label').prop('for', id);
    });
  });
}

$(document).ready(function() {
  window.quiz = {};
  window.quiz.questions = $('.quiz-question').length;
  
  initialiseQuiz();
  
  console.log(window.quiz);
});
