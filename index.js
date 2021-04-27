let path = require("path");
let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let postRoutes = require("./routes/post");
let authRoutes = require("./routes/auth");
let errorHandler = require("./middleware/errorHandler");
let mongoose = require("mongoose");
let passportJWT = require("./middleware/passportJWT")();
const {isEmail, hasPassword, hasName} = require("./validation/validator");

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node", {
    useNewUrlParser:true
})

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/post", passportJWT.authenticate(), postRoutes);

app.use(errorHandler);

app.listen(8000, ()=>console.log("Listening"));