document.getElementById("confirmButton").addEventListener('click', getUser);

function getUser() {
    var username = document.getElementById("input").value;
    $.ajax({
        type: 'GET',
        url: API + USER + username,
        dataType: 'jsonp',
        success: function getProfile(data) {
            if (data.data.message) {
                console.log(data);
                if (data.data.message === NOT_FOUND)
                    alert("Please enter a valid username.");
                else
                    alert("You have  made too many calls to the Github API. Please try again in an hour");
                return;
            }
            currentUser = data.data;

            getEvents(currentUser);
        },
        async: false
    });
}

function getEvents(user) {
    console.log(user.url + "/" + EVENT)
    $.ajax({
        type: 'GET',
        url: user.url + "/" + EVENT + "?per_page=100",
        dataType: 'jsonp',
        success: function(data) {
            events_list = data.data.slice();
            calculateEventsPercentage(events_list);
        },
        async: false
    });
}

function calculateEventsPercentage(events) {
    console.log(events_list);

    events_list.forEach(element => {
        var date = new Date(element.created_at);
        if (element.type == PUSH_EVENT) {
            ++pushEventNumber;
        }
        timeData[date.getHours()][1]++;
    });

    pushEventPercentage = pushEventNumber / events_list.length;
    clearUser();
    displayStats();
    drawCharts();
}

function displayStats() {
    var name = currentUser.login;
    var date = new Date(currentUser.created_at);
    if (currentUser.name != null)
        name = currentUser.name
    var userDetails = "<div class=\"container bg-dark border\" style=\"text-align: left;\"> <h2>Name: " + name +
        "<br>Followers: " + currentUser.followers + "<br>Following: " + currentUser.following +
        "<br>Number of Public Repos: " + currentUser.public_repos +
        "<br>Created At: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</h2>" +
        "<a class=\"btn bg-primary text-white\" href=\"" + currentUser.html_url + "\">View on Github" + "</a></div>";
    console.log(userDetails);
    document.getElementById("userDetails").insertAdjacentHTML('beforeend', userDetails);
}

function drawCharts() {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {
        drawCommitTimeBarChart();
        drawPushEventPieChart();
    }

    function drawCommitTimeBarChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Frequency');
        data.addRows(timeData);

        // Set chart options
        var options = {
            title: 'Frequency of Events by Hour',
            'width': $('barDiv').width,
            'height': $('barDiv').height,
            chart: {
                title: 'Frequency of Events by Hour'
            },
            axes: {
                y: {
                    distance: { label: 'Frequency' }
                },
                x: {
                    distance: { label: 'Hour' }
                }
            }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('barDiv'));
        chart.draw(data, options);
    }

    function drawPushEventPieChart() {
        // Create the data table.
        var data = google.visualization.arrayToDataTable([
            ['Event', 'Percentage'],
            ['Commits', pushEventPercentage],
            ['Other Events', 100 - pushEventPercentage]
        ]);

        // Set chart options
        var options = {
            title: 'Perentage of Commits',
            'width': $('barDiv').width,
            'height': $('barDiv').height
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('pieDiv'));
        chart.draw(data, options);
    }
}

function clearUser() {
    $("#userDetails").empty();
}