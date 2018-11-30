let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let dynamoDBService = require('./dynamoDBService');
const uuidv4 = require('uuid/v4');

exports.handler = function (event, context, callback) {

    console.log("event", event.queryStringParameters);
    let promo = {
        promo: event.queryStringParameters.promo,
        vendor: event.queryStringParameters.vendor
    };
    dynamoDBService.createQR(promo).then(function (data) {
        console.log('data', data.Items);
        let qr = {
            "promo": event.queryStringParameters.promo,
            "vendor": event.queryStringParameters.vendor,
            "type": data.Item.category,
            "offerType": data.Item.offerType,
            "user": event.queryStringParameters.user,
            "grabTime": event.queryStringParameters.grab
        };

        let dt = new Date().getTime();
        var uuid = uuidv4();
        var uuid = qr.offerType + uuid;
        console.log('loggg', uuid);
        dynamoDBService.addToQR(qr, uuid).then(function (data) {
            let response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(uuid),
                "isBase64Encoded": false
            };
            callback(null, response);
        }).catch(function (err) {
            console.log('eerrr', err);
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


    }).catch(function (err) {
         console.log('eerrr12', err);
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