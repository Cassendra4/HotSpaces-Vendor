let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');
let authService = require('./authService');

exports.handler = function (event, context, callback) {

 let userUUID = event.queryStringParameters.uuid;
    let userName = event.queryStringParameters.user;
    
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
           readQR(event.queryStringParameters, callback);
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
   
   function readQR(event, callback) { 
       dynamoDBService.getQR(event.qr).then(function (data) {
       console.log('promoData 2e3', data);
       let promo = {
        promo: data.Item.promoId,
        vendor: data.Item.vendorId
       };
       
        dynamoDBService.getPromoWithPromoId(promo).then(function (promoData) {

            console.log("data23221454", promoData);
            console.log('promoData', promoData);
            if(promoData !== null){
            if(data.Item.type === promoData.Items[0].OfferType){
               
              let promo = {
                    data: promoData.Items[0],
                    user: data.Item.user,
                    name: 'cassie preston'
                };
          let response = {
            "statusCode": 200,
            "headers": {
                 "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": JSON.stringify(promo),
            "isBase64Encoded": false
        };
        callback(null, response);
            } else{
                 let response = {
            "statusCode": 403,
            "headers": {
                 "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": "Validation Failed",
            "isBase64Encoded": false
        };
                 callback(null, response);
            }
        
            } else{
                 let response = {
            "statusCode": 403,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": "Validation Failed",
            "isBase64Encoded": false
        };
                 callback(null, response);
            }
   


        }).catch(function (err) {
             let response = {
            "statusCode": 502,
            "headers": {
                 "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            "body": err,
            "isBase64Encoded": false
        };
        callback(null, response);
        })
    }).catch(function (err) {
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