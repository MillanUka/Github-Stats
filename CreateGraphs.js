document.getElementById("confirmButton").addEventListener('click', getUser);

function getUser() {
    var username = document.getElementById("input").value;
    console.log(API + USER + username);
    $.ajax({
        type: 'GET',
        url: API + USER + username,
        dataType: 'jsonp',
        success: function getProfile(data) {
            currentUser = currentUser;
        },
        async: false
    });
}