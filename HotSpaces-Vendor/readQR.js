let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let dynamoDBService = require('./dynamoDBService');

exports.handler = function (event, context, callback) {

    console.log('data 23e23', event);
   dynamoDBService.getQR(event.queryStringParameters.qr).then(function (data) {
        
    }).catch(function (err) {
         let response = {
            "statusCode": 403,
            "headers": {
                "my_header": "my_value"
            },
            "body": err,
            "isBase64Encoded": false
        };
        callback(null, response);
    });

}