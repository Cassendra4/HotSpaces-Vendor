let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    console.log("event", event.queryStringParameters);
    ddb.query({
        TableName: 'HS_Promotions',
        ExpressionAttributeValues: {
            ':promo': event.queryStringParameters.promo,
            ':vendor': event.queryStringParameters.vendor
        },
        KeyConditionExpression: 'promoId = :promo',
        FilterExpression: 'vendorId = :vendor'
    }).promise().then(function (data) {
        console.log('data', data.Items);
        let qr = {
            "promo": event.queryStringParameters.promo,
            "vendor": event.queryStringParameters.vendor,
            "type": data.Item.category,
            "user": event.queryStringParameters.user,
            "grabTime": event.queryStringParameters.grab
        };

        let dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        var uuid = qr.type + uuid;
        console.log('loggg', uuid);
        ddb.put({
            TableName: 'HS_QR',
            Item: { 'vendorId': qr.vendor, 'promoId': qr.promo, 'QRId': uuid, 'category': qr.type, 'user': qr.user, 'grabTime': qr.grabTime }
        }).promise().then(function (data) {
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