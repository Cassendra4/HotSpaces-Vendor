exports.handler = function(event, context, callback) {
    
     let timestamp = Math.round((new Date()).getTime() / 1000);
    // console.log(timestamp);
    let body = JSON.parse(event.body);
    console.log(body)
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
    
}