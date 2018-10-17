function checkAddressVisibility() {
    if ($('#en__field_supporter_address1').val() || $('#en__field_supporter_address2').val() || $('#en__field_supporter_city').val() || $('#en__field_supporter_region').val() || $('#en__field_supporter_country').val()) {
        $('.en__field--address1').show();
        $('.en__field--address2').show();
        $('.en__field--city').show();
        $('.en__field--region').show();
        $('.en__field--country').show();
        clearInterval(checkAddressVisibilityInterval);
    }
}

$(document).ready(function() {
    if ($('#en__field_supporter_address1').length) {
        checkAddressVisibilityInterval = setInterval(checkAddressVisibility, 500);
    }
});