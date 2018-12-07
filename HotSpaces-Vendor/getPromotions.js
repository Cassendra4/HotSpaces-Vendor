let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');
const ddb = new AWS.DynamoDB.DocumentClient();
let moment = require('moment');
let axios = require('axios');
const Math = require('mathjs');
let authService = require('./authService');

exports.handler = function (event, context, callback) {
    console.log(event);
    let date = moment.unix(Number(event.queryStringParameters.date)).format('YYYY-MM-DD');
    console.log(date);
    let userUUID = event.queryStringParameters.uuid;
    let userName = event.queryStringParameters.user;
    let location = event.queryStringParameters.location;
    let radius = event.queryStringParameters.radius;


    
    let location = null;
    let radius = null;

     authService.validateUser(userUUID, userName, function (response) {
        if (response.error) {
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 502,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                },
                "body": JSON.stringify(response.error)
            });
        } else if (response.validated) {
           getPromotions(data, location, radius, callback);
        } else {
            callback(null, {
                "isBase64Encoded": true,
                "statusCode": 403,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                },
                "body": "User validation failed."
            });
        }
    });
   
}

function getPromotions(date,currentLocation, radius, callback){
    let promos = {};

    let boxRef = calculateBox(currentLocation);
    let noOfBox = getNumberOfBoxes(radius);
    for (let i = 0; i < noOfBox; i++) {
        
    }
    dynamoDBService.retrievePromos(date).then(function (data) {
        // axios.get()
        // console.log(data);

        for (let i = 0; i < data.Items.length; i++) {
            let promos = {};
            let promoId = data.Items[i].promoId
            // console.log("Third", promos);
            let vendorId = data.Items[i].vendorId;
            dynamoDBService.getVendor(vendorId).then(function (vendorData) {
                //your logic goes here
                console.log("First", vendorData.Items[0].name);
                promos[promoId] = {
                    title: data.Items[i].title,
                    description: data.Items[i].description,
                    startDate: data.Items[i].startDate,
                    endDate: data.Items[i].endDate,
                    startTime: data.Items[i].startTime,
                    endTime: data.Items[i].endTime,
                    vendorId: data.Items[i].vendorId,
                    businessType: data.Items[i].businessType,
                    discount: data.Items[i].discount,
                    imgs: data.Items[i].imgUrls,
                    offerType: data.Items[i].offerType,
                    terms: data.Items[i].termsNConditions,
                    selectedDays: data.Items[i].selectedDays,
                    unitPrice: data.Items[i].unitPrice,
                    latNLong: data.Items[i].latNLong,
                    address: data.Items[i].address,
                    vendorName: vendorData.Items[0].name
            }

                callback(null, {
                    "isBase64Encoded": true,
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*"
                    },
                    "body": JSON.stringify(promos)
                });
            }).catch(function (err) {
                //handle error
                console.log(err);
            });
        }
        // console.log(promos);

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

function calculateBox(lat, long){
      let latKey = Math.trunc((latitude + 90) * 10);
        let longKey = Math.trunc((longitude + 180) * 10);
        return {lat: latKey, long: longKey};
}

function getNumberOfBoxes(radiusInMeters){
        let numberOfBoxes = Math.ceil(radiusInMeters / 10000);
        return numberOfBoxes;
}

