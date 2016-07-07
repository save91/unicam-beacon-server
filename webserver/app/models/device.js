var mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
       type: { type: String, trim: true },
       io: { type: String, trim: true },
       name: { type: String, trim: true },
       description: { type: String, trim: true },
       automatic: { type: Boolean, default: false},
       _GPIO: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'GPIO' },
       _Beacon: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Device'},
       properties: { type: mongoose.Schema.Types.Mixed }
    },
    {collection: 'Device'}
);

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
