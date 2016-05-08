module.exports = function(Activity) {
    Activity.afterRemote('create', function(context, activity, next) {
        var userId = context.req.accessToken.userId;
        activity.users.add(userId);
        next();
    });
};