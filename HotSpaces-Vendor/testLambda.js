const Geocoder = require('react-native-geocoder');

exports.handler = function(event, context, callback) {
    
    let NY = {
        lat: 40.7809261,
        lng: -73.9637594
    };
    geoCoder.geocodePosition(NY).then(res => {
        console.log(res);
    // res is an Array of geocoding object (see below)
    })
    .catch(err => console.log(err))
        callback(null, {"message": "Successfully executed"});
    }