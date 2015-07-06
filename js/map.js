"use strict";
// Function to draw your map
var global = {};

var drawMap = function () {
    global.map = L.map('container').setView([39.8282, -98.5795], 3);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'bryguy9312.ml24922k',
        accessToken: 'pk.eyJ1IjoiYnJ5Z3V5OTMxMiIsImEiOiJhNGI1ZTI1ZTUwNGI0ZjFiZTlkOWM1OTBiMzUwYjAzMSJ9.Wka7nqdGk03XA4pOpTuWgA'
    }).addTo(global.map);

    getData();

};

var data;
var getData = function () {
    $.ajax({
        url: 'data/response.json',
        type: 'get',
        success:function(dat) {
            data = dat;
            customBuild();
        },
        error: function(err) {
            console.log(err);
        },
        dataType: "json"
    });
};

// Do something creative with the data here!  
var customBuild = function() {
    data.map(function(incident) {
        var color;
        var aIcon;
        if (incident["Hit or Killed?"] == 'Hit') {
            color = 'blue';
        } else {
            color = 'red';
        }

        if (incident["Victim's Gender"] == "Male") {
            aIcon = 'mars';
        } else {
            aIcon = 'venus';
        }

        var awesomeMarker = L.AwesomeMarkers.icon({
            icon: aIcon,
            markerColor: color
        });
        var marker = L.marker([incident.lat, incident.lng], {icon: awesomeMarker});
        var summ = "Victim Name: "
                    + incident['Victim Name']
                    + "<br>"
                    +"Race: "
                    +incident["Race"]
                    +"<br>"
                    + " Summary: "
                    + incident.Summary
                    +"<br>"
                    +"<a href="+incident["Source Link"]+">Source</a>";
        if (incident.lng < -20 && incident['Victim Name'] != "Alejandro Pinedo" && incident['Victim Name'] != "David Jerome Maestas") {
            marker.bindPopup(summ);
            marker.addTo(global.map);
        }
    });
};





