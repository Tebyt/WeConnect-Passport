module.exports = function(User) {

    User.afterRemote('create', function(context, userInstance, next) {
        console.log('> user.afterRemote triggered');
        context.res.redirect('/register.html')
    });
    User.afterRemote('login', function(context, userInstance, next) {
        context.res.redirect('/');
    })
};

