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
    
    createQR(promo, callback);
    function createQR(promo, callback) {
        dynamoDBService.getPromoWithPromoId(promo).then(function (data) {
        console.log('data 324', data.Items[0]);
    console.log('data 3245', data.Items[0].category);
        let qr = {
            "promo": event.queryStringParameters.promo,
            "vendor": event.queryStringParameters.vendor,
            "type": parseInt(data.Items[0].category),
            "offerType": parseInt(data.Items[0].offerType),
            "user": event.queryStringParameters.user,
            "grabTime": event.queryStringParameters.grab
        };
        
        var uuid = uuidv4();
        var uuid = 3 + uuid;
        console.log('loggg', uuid);
        dynamoDBService.addToQR(qr, uuid).then(function (data) {
            let response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
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
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
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
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": err,
            "isBase64Encoded": false
        };
        callback(null, response);
    });
    }
}