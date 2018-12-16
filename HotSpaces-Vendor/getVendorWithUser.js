let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');


exports.handler = function (event, context, callback) {
    console.log("aaaaa",event);
    let userId = event.queryStringParameters.userId;
    dynamoDBService.getUser(userId)

        .then(function (data) {
            //your logic goes here
            console.log(data);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                },
                "body": JSON.stringify(data)
            })
        })
        .catch(function (err) {
            //handle error
            console.log(err);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 502,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                },
                "body": err.message
            })
        });
        
}