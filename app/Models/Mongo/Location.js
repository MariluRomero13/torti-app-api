const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fields = [
    'customer_id',
    'latitude',
    'longitude'
]

const updateFields = [
  'latitude',
  'longitude',
  'status'
]

const locationFields = {
    customer_id: {
        required: true,
        type: Number
    },
    latitude: {
        required: true,
        type: Number
    },
    longitude: {
        required: true,
        type: Number
    },
    status: {
      required: true,
      type: Boolean,
      default: true
    }
}

var LocationSchema = new Schema(locationFields, { timestamps: true });

module.exports = {
   Location: mongoose.model('Location', LocationSchema),
   fields: fields,
   updateFields: updateFields
}
