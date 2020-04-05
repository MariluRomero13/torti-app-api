'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  role () {
    return this.belongsTo('App/Models/Role', 'role_id')
  }

  employee () {
    return this.hasOne('App/Models/Employee', 'user_id')
  }

  static get store() {
    return [
      'role_id',
      'username',
      'password'
    ]
  }

  static get hidden() {
    return ['password']
  }
}

module.exports = User
