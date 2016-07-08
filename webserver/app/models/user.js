var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
       block: { type: Boolean, default: false },
       username: { type: String, trim: true, required: true },
       firstname: { type: String, trim: true, required: true },
       lastname: { type: String, trim: true, required: true },
       permission: { type: Number, default: 10},
       created: { type: Date, default: Date.now },
       photo: { type: String, default: "img/account.jpg"},
       password: String,
       theme: { type:String, default: "altTheme"}
    },
    {collection: 'User'}
);

userSchema.index({username : 1}, {unique:true});

var User = mongoose.model('User', userSchema);

module.exports = User;
