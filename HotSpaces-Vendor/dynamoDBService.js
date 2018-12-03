let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const uuidv4 = require('uuid/v4');

module.exports = {

    getUser: function (userId) {
        return ddb.query({
            TableName: 'HS_User',
            ExpressionAttributeValues: {
                ':user_id': userId
            },
            KeyConditionExpression: 'user_id = :user_id'
        }).promise()

    },

    /*
     userData={
         name : string,
         role : string,
         vender_id : string
     }
     */
    addUser: function (userData) {
        let userId = userData.uid;
        let name = userData.name;
        let role = userData.role;
        let vendor_id = userData.vendor_id;
        return ddb.put({
            TableName: 'HS_User',
            Item: {
                'user_id': userId,
                'name': name,
                'role': role,
                'vendor_id': vendor_id
            }
        }).promise();
    },

    /*
     userData={
         name : string
     }
     */
    addVendor: function (vendorData) {
        let vendorId = uuidv4();
        let name = vendorData.name;
        return ddb.put({
            TableName: 'HS_Vendor',
            Item: {
                'vendor_id': vendorId,
                'name': name
            }
        }).promise();
    },

    getVendors: function () {
        return ddb.scan({
            TableName: 'HS_Vendor'
        }).promise();
    },

    getVendor: function (vendorId) {
        return ddb.query({
            TableName: 'HS_Vendor',
            ExpressionAttributeValues: {
                ':vendor_id': vendorId
            },
            KeyConditionExpression: 'vendor_id = :vendor_id'
        }).promise()
    },

    addPromo: function (promoData) {
        console.log('promoData', promoData);
        return ddb.put({
            TableName: 'HS_Promotions',
            Item: {
                'promoId': promoData.promoId,
                'vendorId': promoData.vendorId,
                'termsNConditions': promoData.terms,
                'offerType': promoData.offerType,
                'startDate': promoData.startDate,
                'endDate': promoData.endDate,
                'startTime': promoData.startTime,
                'endTime': promoData.endTime,
                'selectedDays': promoData.selectedDays,
                'description': promoData.description,
                'unitPrice': promoData.unitPrice,
                'title': promoData.title,
                'imgUrls': promoData.imgUrl,
                'discount': promoData.discount,
                'category': promoData.businessType,
                'timestamp': promoData.timestamp,
                'locationBox': promoData.locationBox,
                'latNLong': promoData.latNLong
            }
        }).promise()

    },

    deletePromo: function (promoData) {
        return ddb.delete({
            TableName: 'HS_Promotions',
            Key: {
                'promoId': promoData.promoID,
                'timestamp': promoData.timestamp
            }
        }).promise()
    },

    retrievePromos: function (date) {
        return ddb.scan({
            TableName: 'HS_Promotions',
            ExpressionAttributeValues: {
                ':date': date
            },
            FilterExpression: 'startDate <= :date and endDate >= :date'
        }).promise()
    },

    getPromo: function (vendor) {
        return ddb.scan({
            TableName: 'HS_Promotions',
            ExpressionAttributeValues: {
                ':vendor': vendor
            },
            FilterExpression: 'vendorId = :vendor'
        }).promise();
    },

    updatePromo: function (updatedData) {
        return ddb.update({
            TableName: 'HS_Promotions',
            Key: {
                'promoId': updatedData.promoId,
                'timestamp': updatedData.timestamp
            },
            ExpressionAttributeNames: {
                '#promoId': 'promoId',
                '#category': 'category',
                '#description': 'description',
                '#discount': 'discount',
                '#endDate': 'endDate',
                '#endTime': 'endTime',
                '#imgUrls': 'imgUrls',
                '#latNLong': 'latNLong',
                '#locationBox': 'locationBox',
                '#offerType': 'offerType',
                '#selectedDays': 'selectedDays',
                '#startDate': 'startDate',
                '#startTime': 'startTime'
            },
            ExpressionAttributeValues: {
                ':promoId': updatedData.promoId,
                ':category': updatedData.businessType,
                ':description': updatedData.description,
                ':discount': updatedData.discount,
                ':endDate': updatedData.endDate,
                ':endTime': updatedData.endTime,
                ':imgUrls': updatedData.imgUrl,
                ':latNLong': updatedData.latNLong,
                ':locationBox': updatedData.locationBox,
                ':offerType': updatedData.offerType,
                ':selectedDays': updatedData.selectedDays,
                ':startDate': updatedData.startDate,
                ':startTime': updatedData.startTime
            },
            UpdateExpression: 'set #category = :category , #description = :category , #discount = :discount , #endDate = :endDate , #endTime = :promoId , #imgUrls = :imgUrls , #latNLong = :latNLong , #locationBox = :locationBox , #offerType = :offerType , #selectedDays = :selectedDays , #startDate = :startDate , #startTime = :startTime',
            ConditionExpression: '#promoId = :promoId'
        }).promise()
    },

    getPromoWithPromoId: function (data) {
        console.log('data', data);
        return ddb.query({
            TableName: 'HS_Promotions',
            ExpressionAttributeValues: {
                ':promo': data.promo,
                ':vendor': data.vendor
            },
            KeyConditionExpression: 'promoId = :promo',
            FilterExpression: 'vendorId = :vendor'
        }).promise()
    },

    addToQR: function (qr, uuid) {
        return ddb.put({
            TableName: 'HS_QR',
            Item: {
                'vendorId': qr.vendor,
                'promoId': qr.promo,
                'QRId': uuid,
                'category': qr.type,
                'offerType': qr.offerType,
                'user': qr.user,
                'grabTime': qr.grabTime
            }
        }).promise()
    },

    getQR: function (qr) {
        return ddb.get({
            TableName: 'HS_QR',
            Key: {
                'QRId': qr
            }
        }).promise()
    },

    scanRedeem: function (data) {
       

    }

}