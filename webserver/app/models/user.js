var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
       block: Boolean,
       username: { type: String, trim: true },
       firstname: { type: String, trim: true },
       lastname: { type: String, trim: true },
       permission: { type: Number},
       subs: { type: [mongoose.Schema.Types.ObjectId], default: [] },
       created: { type: Date, default: Date.now },
       lastlogin: { type: Date, default: Date.now },
    },
    { collection: 'user' }
);

userSchema.index({username : 1}, {unique:true});
