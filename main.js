$(document).ready();

function getMoonData(year = (new Date()).getFullYear()) {

    var ajaxConfig = {
        url: 'http://api.usno.navy.mil/moon/phase',
        method: "GET",
        dataType: 'JSON',
        data: {
            year
        },

        success: function (result) {
            console.log('2) AJAX Success function called, with the following result:', result);

        }
    };
    $.ajax(ajaxConfig)
}