var mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
       type: { type: String, trim: true },
       io: { type: String, trim: true },
       name: { type: String, trim: true },
       description: { type: String, trim: true },
       automatic: { type: Boolean, default: false},
       id_GPIO: { type: mongoose.Schema.Types.ObjectId, default: null },
       id_beacon: { type: mongoose.Schema.Types.ObjectId, default: null },
       properties: { type: mongoose.Schema.Types.Mixed }
    },
    {collection: 'device'}
);

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
