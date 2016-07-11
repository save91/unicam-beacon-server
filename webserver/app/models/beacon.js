var mongoose = require('mongoose');

var beaconSchema = new mongoose.Schema({
       uuid: { type: String, trim: true, required: true},
       major: { type: String, trim: true, required: true },
       minor: { type: String, trim: true, required: true },
       state: { type: Number, default: 1},
       createdDate: { type: Date, default: Date.now },
       modifiedDate: { type: Date, default: Date.now }
    },
    {collection: 'Beacon'}
);

var Beacon = mongoose.model('Beacon', beaconSchema);

module.exports = Beacon;
