let AWS = require('aws-sdk');
let dynamoDBService = require('./dynamoDBService');

exports.handler = function (event, context, callback) {

    console.log('data 23e23', event);
   dynamoDBService.getQR(event.queryStringParameters.qr).then(function (data) {
       let promo = {

       };
        dynamoDBService.getPromoWithPromoId(promo).then(function (data) {

            console.log("data23221454", promoData);
            console.log('promoData', promoData);
            if(promoData !== null){
            if(data.Item.type === promoData.Item.OfferType){
               
              let promo = {
                    data: promoData.Item,
                    user: data.Item.user,
                    name: 'cassie preston'
                };
          let response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(promo),
            "isBase64Encoded": false
        };
        callback(null, response);
            } else{
                 let response = {
            "statusCode": 403,
            "headers": {
                "my_header": "my_value"
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
                "my_header": "my_value"
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
                "my_header": "my_value"
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
                "my_header": "my_value"
            },
            "body": err,
            "isBase64Encoded": false
        };
        callback(null, response);
    });

}