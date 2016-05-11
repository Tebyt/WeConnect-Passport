module.exports = function(Activity) {
    Activity.beforeRemote('create', function(context, activity, next) {
        context.args.data.create_date = Date.now();
        context.args.data.createrId = context.req.user.userId;
        next();
    })
    // Activity.beforeRemote('findByIdMessage', function(context, activity, next) {
    //     context.req.body.create_date = Date.now();
    //     context.req.body.userId = context.req.accessToken.userId;
    //     next();
    // })

    Activity.afterRemote('create', function(context, activity, next) {
        var userId = context.req.user.userId;
        // var userId = '572e835ad3055492087911bf';
        activity.participants.add(userId);

        // console.log(JSON.stringify(activity.prototype));
        // activity.creater.update({name: userId});
        next();
    });

    Activity.beforeRemote('findById', function(context, activity, next) {
        context.args.filter = {"include": [{
            relation: 'participants',
            scope: {
                fields: ['id', 'avatar_url', "nickname"]
            }
        }, {
            relation: "messages",
            scope: {
                fields: ['id', 'create_date', 'content']
            }
        }]};
        next();
    })
    Activity.beforeRemote('prototype.__create__messages', function(context, activity, next) {
        context.args.data.create_date = Date.now();
        context.args.data.userId = context.req.user.userId;
        next();
    })

    Activity.findByCoordinates = function(lat, lng, cb) {
        Activity.find({"include": "creater"},{"where": {"create_coordinates": {"near": [lng, lat], "maxDistance": 50}}}, function (err, res) {
            if (err) {
                cb(null, err);
            } else {
                cb(null, res);
            }
        })
    }
    Activity.remoteMethod(
        'findByCoordinates',
        {
            accepts: [
                {arg: 'lat', type: 'number'},
                {arg: 'lng', type: 'number'}
            ],
            returns: {arg: 'activities', type: 'array'},
            http: {path: '/findByCoordinates', verb: 'get'}
        }
    );

};