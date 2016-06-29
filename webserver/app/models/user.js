var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
       block: Boolean,
       username: { type: String, trim: true },
       firstname: { type: String, trim: true },
       lastname: { type: String, trim: true },
       permission: Number,
       created: { type: Date, default: Date.now },
       lastlogin: { type: Date, default: Date.now }
    },
    { collection: 'user' }
);

userSchema.index({username : 1}, {unique:true});
