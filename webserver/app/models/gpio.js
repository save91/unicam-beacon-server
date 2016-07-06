var mongoose = require('mongoose');

var gpioSchema = new mongoose.Schema({
       type: { type: String, trim: true },
       GPIO: { type: Number, trim: true },
       _device: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'Device' },
       value: { type: Boolean, default: true}
    },
    {collection: 'GPIO'}
);

var GPIO = mongoose.model('GPIO', gpioSchema);

module.exports = GPIO;
