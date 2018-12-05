const geoCoder = require('node-geocoder');

exports.handler = function(event, context, callback) {
    
    let NY = {
        lat: 40.7809261,
        lng: -73.9637594
    };
    geoCoder.reverse({lat:45.767, lon:4.833})
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });

        callback(null, {"message": "Successfully executed"});
    }