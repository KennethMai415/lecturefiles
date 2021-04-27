let express = require("express");
let router = express.Router();
let postController = require("../controllers/postController");
let {hasDescription} = require("../validation/validator");
let uploadImage = require("../middleware/multer");

//Create
router.post(
    '/', 
    uploadImage("posts").single("image"), 
    hasDescription, 
    postController.store
);

//Read
router.get('/', postController.index);
//Read one record with id given 
router.get('/:id', postController.show);

//Update
router.patch("/:id", hasDescription, postController.update);

//Delete
router.delete("/:id", postController.delete);

module.exports = router;