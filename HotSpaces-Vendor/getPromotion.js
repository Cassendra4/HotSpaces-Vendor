let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
let dynamoDBService = require('./dynamoDBService');

exports.handler = function (event, context, callback) {
    let vendorID = event.queryStringParameters.vendorId;
    console.log(vendorID);
    dynamoDBService.getPromo(vendorID).then(function (data) {
        let promoArray = [];


        Promise.all(promoData.map(promo => new Promise(((resolve, reject) =>
            
            ddb.scan({
                TableName: 'HS_Redeem',
                ExpressionAttributeValues: {
                    ':promoId': promo
                },
                FilterExpression: 'promoId = :promoId'
            }).promise().then(function (data) {
                console.log(data);
                resolve(promo["redeems"] = data.Items[0].noOfRedeems)
                //your logic goes here
            }).catch(function (err) {
                //handle error
                resolve();
            })
        )))).then(
            console.log("Promoss###",promoData)
        ).catch(err => console.log("Error Happend"))

        console.log(data);
        callback(null, {
            "isBase64Encoded": true,
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": JSON.stringify(data.Items)
        });
    }).catch(function (err) {
        callback(null, {
            "isBase64Encoded": true,
            "statusCode": 502,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": err.message
        });
    });
}