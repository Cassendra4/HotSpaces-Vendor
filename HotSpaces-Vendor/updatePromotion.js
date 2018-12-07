let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');

exports.handler = function(event, context, callback) {
    console.log(event);
     let updatedData = {
        promoId: event.promoId,
        vendorId: event.vendorId,
        offerType: event.offerType,
        discount: event.discount,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        selectedDays: event.selectedDays,
        description: event.description,
        title: event.title,
        unitPrice: event.unitPrice,
        // imgUrl: body.imgUrls,
        terms: body.terms,
        businessType: body.businessType,
        timestamp: timestamp,
        locationBox: body.locationBox,
        latNLong: body.latNLong
    }
    
    dynamoDBService.updatePromo(promoData)
        .then(function (data) {
        console.log("Success", data);
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                },
                "body": JSON.stringify(updatedData)
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