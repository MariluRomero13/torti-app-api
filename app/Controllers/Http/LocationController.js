'use strict'
const LocationModel = use('App/Models/Mongo/Location')
const Location = LocationModel.Location

class LocationController {
  async store ({ locationData }) {
    await Location.create(locationData)
    return locationData
  }

  async show({ params, response }) {
    const customerLocation = await Location.find({ customer_id: { $eq: params.id } },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    return response.ok(customerLocation)
  }

  async getLocation({ params }) {
    const customerLocation = await Location.find({ customer_id: { $eq: params.id } },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    return customerLocation
  }

  async update({ params, locationData }) {
    const newLocation = await Location.update({ customer_id: params.id }, locationData)
    return newLocation
  }
}

module.exports = LocationController
