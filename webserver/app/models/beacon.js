var mongoose = require('mongoose');

var beaconSchema = new mongoose.Schema({
       uuid: { type: String, trim: true },
       major: { type: String, trim: true },
       minor: { type: String, trim: true },
       state: { type: String, trim: true },
       createdDate: { type: Date, default: Date.now },
       modifiedDate: { type: Date, default: Date.now }
    },
    { collection: 'beacon' }
);
