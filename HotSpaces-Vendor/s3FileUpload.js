let AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
    console.log("opbject created", event.Records[0].s3);
    s3.listObjects({
        'Bucket': 'aws-amplify-hotspaces',
        'MaxKeys': 10,
        'Prefix': ''
    }).promise()
        .then(data => {
            console.log(data);           // successful response
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });
    console.log(event);
    callback(null, { "message": "Successfully executed" });
}