let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');
const uuidv4 = require('uuid/v4');

exports.handler = function(event, context, callback) {
    let timestamp = Math.round((new Date()).getTime() / 1000);
    // console.log(timestamp);
    console.log(event);
    let body = event.body;
    let promoData = {
        promoId : uuidv4(),
        vendorId : body.vendorId,
        offerType : body.offerType,
        discount : body.discount,
        startDate : body.startDate,
        endDate : body.endDate,
        startTime: body.startTime,
        endTime: body.endTime,
        selectedDays : body.selectedDays,
        description : body.description,
        title : body.title,
        unitPrice : body.unitPrice,
        imgUrl : body.imgUrls,
        terms : body.terms,
        businessType : body.businessType,
        timestamp: timestamp,
        locationBox: body.locationBox,
        latNLong: body.latNLong
    };
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