var mongoose = require('mongoose');

var gpioSchema = new mongoose.Schema({
       type: { type: String, trim: true },
       GPIO: { type: Number, trim: true },
       id_device: { type: mongoose.Schema.Types.ObjectId, default: null },
       value: { type: Boolean, default: true}
    },
    {collection: 'gpio'}
);

var GPIO = mongoose.model('GPIO', gpioSchema);

module.exports = GPIO;
