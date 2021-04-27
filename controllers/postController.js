let validationHandler = require("../validation/validationHandler");
let Post = require("../models/post");
const { reset } = require("nodemon");

exports.index = (req, res) => {
    res.send({"message": "Hi"});
}

exports.index = async (req, res, next) => {
    try {
        const posts = await Post.find().populate("user").sort({createdAt: -1});
        res.send(posts);
    } catch(err) {
        next(err);
    }
}; 

//Create operation 
exports.store = async (req, res, next) => {
    try {
        validationHandler(req);
        let post = new Post();
        post.description = req.body.description;
        post.image = req.file.filename;
        post.user = req.user;
        post = await post.save();
        res.send(post);

        const posts = await Post.find().sort({createdAt: -1});
        res.send(posts);

    } catch(err) {
        next(err);
    }
};

//Read opertaion
exports.show = async (req, res) => {
    try{
        const post = await Post.findOne({
            _id: req.params.id
        }).populate("user");
        res.send(post);
    } catch(err) {
        next(err);
    }
};

//Update operaton
exports.update = async (req, res, next) => {
    try {
        validationHandler(req);
        let post = await Post.findById(req.params.id);
        if(!post || post.user != req.user.id) {
            const errpr = new Error("Wrong Request");
            error.statusCode = 400;
            throw error;
        }
        post.description = req.body.description;
      
        post = await post.save();
        res.send(post);
    } catch(err) {
        next(err);
    }
};

//Delete operaton
exports.delete = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        if(!post || post.user != req.user.id) {
            const error = new Error("Wrong request");
            error.statusCode = 400;
            throw error;
        }
        await post.delete();
        res.send({message:"success"});
    } catch(err) {
        next(err);
    }
};