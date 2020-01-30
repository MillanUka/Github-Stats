document.getElementById("confirmButton").addEventListener('click', getUser);

function getUser() {
    var username = document.getElementById("input").value;
    $.ajax({
        type: 'GET',
        url: API + USER + username,
        dataType: 'jsonp',
        success: function getProfile(data) {
            setTimeout(getProfile, 5000);
            currentUser = data;
            console.log(currentUser);
            getEvents(currentUser);
        }
    });
}

function getEvents(user) {
    console.log(user.data.url + "/" + EVENT)
    $.ajax({
        type: 'GET',
        url: user.data.url + "/" + EVENT + "?per_page=100",
        dataType: 'jsonp',
        success: function(data) {
            console.log(data)
            data.meta.Link.forEach(element => {
                console.log(element)
                getNextPage(element[0], data.data[0])
            });
            console.log()
        }
    });
}

function getNextPage(link, eventIDCheck) {
    $.ajax({
        type: 'GET',
        url: link,
        dataType: 'jsonp',
        success: function(data) {
            if (data.data[0] != eventIDCheck) {
                events_list += data.data;
            }
        }
    });
}

function getCommits(repo) {

}