module.exports = function(Message) {
    Message.beforeRemote('create', function(context, activity, next) {
        next();
    })
};
