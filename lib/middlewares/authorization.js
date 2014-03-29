/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
* Set a cookie for angular so it knows we have an http session
*/
exports.setUserCookie = function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Task authorizations routing middleware
 */
exports.task = {
    hasAuthorization: function(req, res, next) {
        if (req.task.user.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Comments authorizations routing middleware
 */
exports.comment = {
    hasAuthorization: function(req, res, next) {
        if (req.comment.user.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};
