'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
  user () {
    return this.hasOne('App/Model/User', 'role_id')
  }

  static get store() {
    return [
      'name'
    ]
  }

  static get update() {
    return this.store
  }
}

module.exports = Role
