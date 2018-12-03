let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');
const uuidv4 = require('uuid/v4');


exports.handler = function(event, context, callback) {
    
    console.log('data er4r', event.queryStringParameters);
    ddb.scan({
        TableName: 'HS_Redeem',
        ExpressionAttributeValues: {
            ':promo': event.queryStringParameters.promo,
            ':userId': event.queryStringParameters.user
        },
        FilterExpression: 'promoId = :promo and userId = :userId'
    }).promise().then(function (data) {
        console.log('data', data.Items.length == 0);
        if (data.Items.length == 0) {
             var uuid = uuidv4();
            ddb.put({
                TableName: 'HS_Redeem',
                Item: {
                    'promoId': event.queryStringParameters.promo,
                    'redeemId': uuid,
                    'userId': event.queryStringParameters.user,
                    'noOfRedeems': 1
                }
            }).promise().then(function (data) {
                 console.log('data werwqr', data);
                let response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": "Successfull",
                    "isBase64Encoded": false
                };
                callback(null, response);
            }).catch(function (err) {
                  let response = {
                    "statusCode": 502,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": err,
                    "isBase64Encoded": false
                };
                 callback(null, response);
            });
        } else {
            console.log('data 343142', data.Items);
            let redeems = parseInt(data.Items[0].noOfRedeems) + 1;
            ddb.update({
                TableName: 'HS_Redeem',
                Key: {
                    'redeemId': data.Items[0].redeemId
                },
                ExpressionAttributeValues: {
                    ':redeems': parseInt(redeems)
                },
                UpdateExpression: 'set noOfRedeems = :redeems'
            }).promise().then(function (data) {
                 let response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": "Successfull",
                    "isBase64Encoded": false
                };
                 callback(null, response);
            }).catch(function (err) {
               let response = {
                    "statusCode": 502,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": err,
                    "isBase64Encoded": false
                };
                 callback(null, response);
            });
        }
    }).catch(function (err) {
        let response = {
                    "statusCode": 502,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": err,
                    "isBase64Encoded": false
                };
                 callback(null, response);
    });
}