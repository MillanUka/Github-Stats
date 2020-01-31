document.getElementById("confirmButton").addEventListener('click', getUser);

function getUser() {
    var username = document.getElementById("input").value;
    $.ajax({
        type: 'GET',
        url: API + USER + username,
        dataType: 'jsonp',
        success: function getProfile(data) {
            currentUser = data;
            console.log(data);
            getEvents(currentUser);
        },
        async: false
    });
}

function getEvents(user) {
    console.log(user.data.url + "/" + EVENT)
    $.ajax({
        type: 'GET',
        url: user.data.url + "/" + EVENT + "?per_page=100",
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
        console.log(element);
        var date = new Date(element.created_at);
        console.log(date)
        console.log(date.getHours())
        timeData[date.getHours()][1]++;
    });

    drawCharts();
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

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Hour');
        data.addColumn('number', 'Frequency');
        data.addRows(timeData);

        // Set chart options
        var options = {
            'title': 'Frequency of Events',
            'width': 400,
            'height': 300
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('chartDiv'));
        chart.draw(data, options);
    }
}