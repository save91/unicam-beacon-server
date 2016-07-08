var mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
       type: { type: String, trim: true, required: true },
       io: { type: String, trim: true },
       permission: { type:Number, default: 10},
       name: { type: String, trim: true, required: true },
       description: { type: String, trim: true, required: true },
       automatic: { type: Boolean, default: false},
       _GPIO: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'GPIO' },
       _Beacon: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Device'},
       properties: { type: mongoose.Schema.Types.Mixed }
    },
    {collection: 'Device'}
);

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
