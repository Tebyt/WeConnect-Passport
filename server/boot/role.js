module.exports = function(app) {
  var Role = app.models.Role;
  Role.registerResolver('participant', function(role, context, cb) {
    function reject(err) {
      if(err) {
        return cb(err);
      }
      cb(null, false);
    }
    if (context.modelName !== 'activity') {
      // the target model is not project
      return reject();
    }
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject(); // do not allow anonymous users
    }
    // check if userId is in team table for the given project id
    context.model.findById(context.modelId, function(err, activity) {
      if(err || !activity) {
        reject(err);
      } else {
        activity.participants.findById(userId, function (err, user) {
          cb(null, !!user);
        })
      }

    });
  });
};