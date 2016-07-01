var mongoose = require('mongoose');

var beaconSchema = new mongoose.Schema({
       uuid: { type: String, trim: true },
       major: { type: String, trim: true },
       minor: { type: String, trim: true },
       state: { type: Number, default: 0},
       createdDate: { type: Date, default: Date.now },
       modifiedDate: { type: Date, default: Date.now }
    }
);

var Beacon = mongoose.model('Beacon', beaconSchema);

module.exports = Beacon;
