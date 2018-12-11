exports.handler = function(event, context, callback) {
    console.log("opbject created");
    console.log(event);
    callback(null, {"message": "Successfully executed"});
}