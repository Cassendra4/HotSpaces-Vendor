let AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
    console.log("opbject created", event.Records[0].s3.object.key);
    let object = event.Records[0].s3.object.key;

    var params = {
        AccessControlPolicy: {
        },
        Bucket: "aws-amplify-hotspaces",
        ACL: "public-read",
        Key: object
    };

    s3.putObjectAcl(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
        /*
        data = {
        }
        */
    });

    callback(null, { "message": "Successfully executed" });
}