let dynamoDBService = require('./dynamoDbService');

exports.handler = function(event, context, callback) {
    
    dynamoDBService.addPromo(promoData)
        .then(function (data) {
        console.log("Success", data);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                },
                "body": JSON.stringify(promoData)
            });
        }).catch(function (err) {
            console.log("Error", err);
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