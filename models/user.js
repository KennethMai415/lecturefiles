let mongoose = require("mongoose")
let bcrypt = require("bcryptjs");

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {type:String, required: true},
    password: {type:String, required: true, select:false},
    name: {type:String, required: true}
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

userSchema.methods.validPassword = async (candidatePassword, userHash)=>{
    console.log(this.password);
    const result = await bcrypt.compare(String(candidatePassword), userHash);
    return result;
}

module.exports = mongoose.model("user", userSchema);