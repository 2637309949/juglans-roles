// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

const is = require('is')

module.exports = KoaRoles

function KoaRoles (options) {
  options = options || {}
  if (!(this instanceof KoaRoles)) {
    return new KoaRoles(options)
  }
  this.failureHandler = options.failureHandler || defaultFailureHandler
  this.roleHandler = options.roleHandler
  this.roleHandler1 = options.roleHandler1
  this.roleHandler2 = options.roleHandler2
  this.roleHandler3 = options.roleHandler3
  this.roleHandler4 = options.roleHandler4
  this.roleHandler5 = options.roleHandler5
  this.roleHandler6 = options.roleHandler6
  this.userProperty = options.userProperty || 'user'
}

/**
 * @method KoaRoles#use
 * @param {String} action - Name of role
 * @param {Function} fn
 */
KoaRoles.prototype.use = function (fn) {
  use(this, 'roleHandler', fn)
  return this
}

KoaRoles.prototype.use1 = function (fn) {
  use(this, 'roleHandler1', fn)
  return this
}

KoaRoles.prototype.use2 = function (fn) {
  use(this, 'roleHandler2', fn)
  return this
}

KoaRoles.prototype.use3 = function (fn) {
  use(this, 'roleHandler3', fn)
  return this
}

KoaRoles.prototype.use4 = function (fn) {
  use(this, 'roleHandler4', fn)
  return this
}

KoaRoles.prototype.use5 = function (fn) {
  use(this, 'roleHandler5', fn)
  return this
}

KoaRoles.prototype.use6 = function (fn) {
  use(this, 'roleHandler6', fn)
  return this
}

KoaRoles.prototype.plugin = function () {
  return {
    roles: this
  }
}

/**
 * @method KoaRoles#middleware
 */
KoaRoles.prototype.middleware = function (options) {
  options = options || {}
  const userProperty = options.userProperty || this.userProperty
  const roles = this
  return async (ctx, next) => {
    if (ctx.state[userProperty]) {
      ctx.state[userProperty].can = action => roles['roleHandler'](ctx, action)
      ctx.state[userProperty].can1 = action => roles['roleHandler1'](ctx, action)
      ctx.state[userProperty].can2 = action => roles['roleHandler2'](ctx, action)
      ctx.state[userProperty].can3 = action => roles['roleHandler3'](ctx, action)
      ctx.state[userProperty].can4 = action => roles['roleHandler4'](ctx, action)
      ctx.state[userProperty].can5 = action => roles['roleHandler5'](ctx, action)
      ctx.state[userProperty].can6 = action => roles['roleHandler6'](ctx, action)
    }
    return next()
  }
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can = function (action) {
  return can(this, 'roleHandler', action)
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can1 = function (action) {
  return can(this, 'roleHandler1', action)
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can2 = function (action) {
  return can(this, 'roleHandler2', action)
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can3 = function (action) {
  return can(this, 'roleHandler3', action)
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can4 = function (action) {
  return can(this, 'roleHandler4', action)
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can5 = function (action) {
  return can(this, 'roleHandler5', action)
}

/**
 * @method KoaRoles#can
 * @param {String} action
 */
KoaRoles.prototype.can6 = function (action) {
  return can(this, 'roleHandler6', action)
}

function use (role, key, value) {
  if (!is.function(value)) {
    throw new TypeError('Expected fn to be of type function or generator function')
  }
  role[key] = value
}

function can (role, key, action) {
  return async (ctx, next) => {
    if (await role[key](ctx, action)) {
      return next()
    }
    await role.failureHandler(ctx, action)
  }
}

function defaultFailureHandler (ctx, action) {
  ctx.status = 403
  ctx.body = {
    message: 'Access Denied, you don\'t have permission.'
  }
}
