let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');
const ddb = new AWS.DynamoDB.DocumentClient();
let moment = require('moment');
let axios = require('axios');

exports.handler = function(event, context, callback) {
   console.log(event);
    let date = moment(new Date(Number(event.queryStringParameters.date))).format('YYYY-MM-DD');
    console.log(date);
    let promos = {};
    dynamoDBService.retrievePromos(date).then(function (data) {
        // axios.get()
        // console.log(data);
        
        for (let i = 0; i < data.Items.length; i++) {
            let promoId = data.Items[i].PromoId
            promos[promoId] = {
                    title: data.Items[i].Title,
                    description: data.Items[i].Description,
                    startDate: data.Items[i].StartDate,
                    endDate: data.Items[i].EndDate,
                    startTime: data.Items[i].StartTime,
                    endTime: data.Items[i].EndTime,
                    vendorId: data.Items[i].VendorId,
                    businessType: data.Items[i].BusinessType,
                    discount: data.Items[i].Discount,
                    imgs: data.Items[i].ImgUrls,
                    offerType: data.Items[i].OfferType,
                    terms: data.Items[i].Terms,
                    selectedDays: data.Items[i].selectedDays,
                    unitPrice: data.Items[i].UnitPrice 
            }
            console.log("Third", promos.promoId);
            let vendorId = data.Items[i].VendorId;
            // dynamoDBService.getVendor("432aebe0-dba8-4aba-8881-30d54e70b84d").then(function (vendorData) {
            //     //your logic goes here
            //     console.log("First", vendorData.Item.name);
            //     console.log("Second", promoId);
            //     // console.log("Third", promos.promoId);
            //     // promos.data.Items[i].PromoId["vendorName"] = vendorData.Item.name;
            // }).catch(function (err) {
            //     //handle error
            //     console.log(err);
            // });
            
        }
        // console.log(promos);
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