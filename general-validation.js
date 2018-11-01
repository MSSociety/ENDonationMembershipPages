$(document).ready(function() {
	$('body :not(script)').contents().filter(function() {
    return this.nodeType === 3;
  }).replaceWith(function() {
      return this.nodeValue.replace('This transaction has failed as there has been an error in processing your payment.', 'This transaction has failed. Please contact our Supporter Care Team on 0300 500 8084.');
  });
});