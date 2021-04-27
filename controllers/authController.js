const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");

const User = require("../models/user");
const validationHandler = require("../validation/validationHandler");

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

       const user = await User.findOne({email}).select("+password");
       console.log(user.password);
        if(!user) {
            const error = new Error("Wrong Credentials1");
            error.statusCode = 401;
            throw error;
        }
        
        const validPassword = await user.validPassword(password, user.password);
        if(!validPassword) {
            const error = new Error("Wrong Credentials2");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.encode({id:user.id}, config.jwtSecret);
        return res.send({user,token});
    } catch(err) {
        next(err);
    };
};

exports.signup = async(req, res, next) => {
    try{
        validationHandler(req);
        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser) {
            const error = new Error("Email alreayd used");
            error.statusCode = 403;
            throw error;
        }

        let user = new User();
        user.email = req.body.email;
        user.password = await user.encryptPassword(req.body.password);
        user.name = req.body.name;
        user = await user.save();

        const token = jwt.encode({id:user.id}, config.jwtSecret)
        return res.send({user,token});
    } catch(err) {
        next(err);
    }
}

exports.me = async (req, res, next) => {
    try {
        const user = await User.findById(req.user);
        return res.send(user);
    } catch(err) {
        next(err);
    }
}