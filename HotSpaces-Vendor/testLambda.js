var NodeGeocoder = require('node-geocoder');


exports.handler = function (event, context, callback) {
    console.log("API", process.env.mapsApiKey);
    var options = {
        provider: 'google',

        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: process.env.mapsApiKey, // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    let geocoder = NodeGeocoder(options);
    let address;
    geocoder.reverse({ lat: 6.886728000000001, lon: 79.8588762 }).then(res => {
        console.log(res[0].formattedAddress);
    }).catch(err => {
        console.log(err);
    })

    callback(null, { "message": "Successfully executed" });
}