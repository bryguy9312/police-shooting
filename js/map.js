"use strict";
// Function to draw your map
var global = {};

var drawMap = function () {
    global.map = L.map('container').setView([47.6550, -122.3080], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'bryguy9312.mkcia67o',
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
        var marker = new L.circleMarker([incident.lat, incident.lng], {
            radius: '7',
            color: 'red'
        });
        marker.addTo(global.map);
    });
};


