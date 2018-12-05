let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');
const ddb = new AWS.DynamoDB.DocumentClient();
let moment = require('moment');
let axios = require('axios');

exports.handler = function (event, context, callback) {
    console.log(event);
    let date = moment.unix(Number(event.queryStringParameters.date)).format('YYYY-MM-DD');
    console.log(date);

    dynamoDBService.retrievePromos(date).then(function (data) {
        // axios.get()
        // console.log(data);

        for (let i = 0; i < data.Items.length; i++) {
            let promos = {};
            let promoId = data.Items[i].promoId
            // console.log("Third", promos);
            let vendorId = data.Items[i].vendorId;
            dynamoDBService.getVendor("33cc6431-a133-447d-82f8-40b1529ee2bd").then(function (vendorData) {
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