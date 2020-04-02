'use strict'
const LocationModel = use('App/Models/Mongo/Location')
const LocationFields = LocationModel.fields
const LocationUpdateFields = LocationModel.updateFields
const Location = LocationModel.Location

class LocationController {
  async store ({ request, response }) {
    const locationData = request.only(LocationFields)
    const location = await Location.create(locationData)

    return response.json({
        status: true,
        message: "Successfully saved locations",
        data: location
    })
  }

  async show({ params, response }) {
    const customerLocation = await Location.find({ customer_id: { $eq: params.id } },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    return response.ok(customerLocation)
  }

  async update({ params, response, request }) {
    const locationData = request.only(LocationUpdateFields)
    const location = await Location.update({ customer_id: params.id }, locationData)
    return response.json({
      status: true,
      message: "Successfully saved locations",
      data: location
    })
  }
}

module.exports = LocationController
