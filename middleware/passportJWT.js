let passport = require("passport");
let passportJWT = require("passport-jwt");
let User = require("../models/user");
let config = require("../config");
const { deleteOne } = require("../models/user");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = ()=> {
    const strategy = new Strategy(params, async(payload, done) => {
        const user = await User.findById(payload.id);
        if(!user) {
            return done(new Error("User not found"), null);
        }
        return done(null, user);
    });

    passport.use(strategy);
    
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session:false})
        }
    };
};