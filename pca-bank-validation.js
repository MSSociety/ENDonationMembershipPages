$(document).ready(function() {
	$('.en__submit button').data('bankValid', false);
  $('#bank-val-msg').css("display","none");
});

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function replaceForChars(string, number) {
    for (i = 0; i < number; i++) {
        string = setCharAt(string, i, 'X');
    }

    return string;
}

function BankAccountValidation_Interactive_Validate_v2_00(Key, AccountNumber, SortCode) {
	$.getJSON("https://services.postcodeanywhere.co.uk/BankAccountValidation/Interactive/Validate/v2.00/json3.ws?callback=?",
	{
		Key: Key,
		AccountNumber: AccountNumber,
		SortCode: SortCode
	},
	function (data) {
		// DISABLING THIS IF-ELSE LOOP FOR NOW... Test for an error
		if (data.Items.length == 1 && typeof(data.Items[0].Error) != "undefined") {
			// Show the error message
			alert(data.Items[0].Description);
		}
		else {
			// Check if there were any items found
			if (data.Items.length === 0)
				alert("Sorry, there were no results");
			else {
				// If JSON data has come back, let's check the results and do something with them. Postcode Anywhere site has more info on syntax, keys, etc.
				if (data.Items[0].IsCorrect && data.Items[0].IsDirectDebitCapable) {
					// Account details match and account is DD capable. Let's enable the Submit button and hide the error message if needed
					$('.en__submit button').data("bankValid", true);
					$('#bank-val-msg').css("display","none");
          console.log('Account looks valid and correct ');

					sortCodeObscured = replaceForChars(SortCode, 4);
          accountNumberObscured = replaceForChars(AccountNumber, 4);

					$('input[name="supporter.NOT_TAGGED_50"]').val(accountNumberObscured); // Sort code TY
          $('input[name="supporter.NOT_TAGGED_51"]').val(sortCodeObscured); // Account number TY
				} else if ( data.Items[0].IsCorrect === false ) {
					// Something's not right. Show the error message about re-checking account details and make sure the submit button is disabled
					$("#bank-val-msg").css("display","block");
					$('.en__submit button').data("bankValid",false);
					//bankDetailsValidate = false;
				}
		// END OF DISABLED IF-ELSE LOOP
      }
		}
	});
}

var runAccountCheck = function() {
	var ac_num_fieldval = $('#en__field_supporter_NOT_TAGGED_8').val();
	console.log('account ' + ac_num_fieldval );
	var srt_code_fieldval = $('#en__field_supporter_NOT_TAGGED_9').val();
	// We check to make sure each value is the right length and uses numbers only
	var ac_num_format_valid = /^[0-9]{8}$/i.test(ac_num_fieldval);
	var srt_code_format_valid = /^[0-9]{6}$/i.test(srt_code_fieldval);
	// If yes, hide the format error message (if needed) and  call the validation function with the correct parameters
	if ( ac_num_format_valid && srt_code_format_valid ) {
		$("#bank-details-format-msg").css("display","none");
		BankAccountValidation_Interactive_Validate_v2_00("RG29-KU93-ZT97-UP21", ac_num_fieldval, srt_code_fieldval)
	} else {
		// If we don't have valid formats, we check to make sure neither field still has its default text
		var ac_num_change = /^(?!Numbers\sonly).*/i.test(ac_num_fieldval);
		var srt_code_change = /^(?!Numbers\sonly).*/i.test(srt_code_fieldval);
		// If neither field still has the default text, and one or both formats is not valid, we show the error message about valid formats, hide the re-check details one (just in case) and make sure submit button is disabled
		if ( ac_num_change && srt_code_change ) {
			$("#bank-val-msg").css("display","none");
			$("#bank-details-format-msg").css("display","block");
			$('.en__submit button').data("bankValid",false);
		}
	}
}

// Now to call the function each time it's needed (and never before)
$(document).ready(function() {

	// Run at the beginning of loading as well
	runAccountCheck();

	// When either the account number of sort code field values change
	$("#en__field_supporter_NOT_TAGGED_8, #en__field_supporter_NOT_TAGGED_9").change(function() {
		// We get the new field values
		runAccountCheck();
	});

	$('.en__submit button').on('click', function(event) {

		if($(this).data('bankValid') === true) {
			return true;
		} else {
			alert('Sorry, your bank details are invalid');
			return false;
		}
	});
});
