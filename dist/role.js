"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const is = require('is');

module.exports = KoaRoles;

function KoaRoles(options) {
  options = options || {};

  if (!(this instanceof KoaRoles)) {
    return new KoaRoles(options);
  }

  this.failureHandler = options.failureHandler || defaultFailureHandler;
  this.roleHandler = options.roleHandler;
  this.roleHandler1 = options.roleHandler1;
  this.roleHandler2 = options.roleHandler2;
  this.roleHandler3 = options.roleHandler3;
  this.roleHandler4 = options.roleHandler4;
  this.roleHandler5 = options.roleHandler5;
  this.roleHandler6 = options.roleHandler6;
  this.userProperty = options.userProperty || 'user';
}
/**
 * @method KoaRoles#use
 * @param {String} action - Name of role
 * @param {Function} fn
 */


KoaRoles.prototype.use = function (fn) {
  use(this, 'roleHandler', fn);
  return this;
};

KoaRoles.prototype.use1 = function (fn) {
  use(this, 'roleHandler1', fn);
  return this;
};

KoaRoles.prototype.use2 = function (fn) {
  use(this, 'roleHandler2', fn);
  return this;
};

KoaRoles.prototype.use3 = function (fn) {
  use(this, 'roleHandler3', fn);
  return this;
};

KoaRoles.prototype.use4 = function (fn) {
  use(this, 'roleHandler4', fn);
  return this;
};

KoaRoles.prototype.use5 = function (fn) {
  use(this, 'roleHandler5', fn);
  return this;
};

KoaRoles.prototype.use6 = function (fn) {
  use(this, 'roleHandler6', fn);
  return this;
};

KoaRoles.prototype.plugin = function () {
  return {
    roles: this
  };
};
/**
 * @method KoaRoles#middleware
 */


KoaRoles.prototype.middleware = function (options) {
  options = options || {};
  const userProperty = options.userProperty || this.userProperty;
  const roles = this;
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (ctx, next) {
        if (ctx.state[userProperty]) {
          ctx.state[userProperty].can = action => roles['roleHandler'](ctx, action);

          ctx.state[userProperty].can1 = action => roles['roleHandler1'](ctx, action);

          ctx.state[userProperty].can2 = action => roles['roleHandler2'](ctx, action);

          ctx.state[userProperty].can3 = action => roles['roleHandler3'](ctx, action);

          ctx.state[userProperty].can4 = action => roles['roleHandler4'](ctx, action);

          ctx.state[userProperty].can5 = action => roles['roleHandler5'](ctx, action);

          ctx.state[userProperty].can6 = action => roles['roleHandler6'](ctx, action);
        }

        return next();
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can = function (action) {
  return can(this, 'roleHandler', action);
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can1 = function (action) {
  return can(this, 'roleHandler1', action);
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can2 = function (action) {
  return can(this, 'roleHandler2', action);
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can3 = function (action) {
  return can(this, 'roleHandler3', action);
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can4 = function (action) {
  return can(this, 'roleHandler4', action);
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can5 = function (action) {
  return can(this, 'roleHandler5', action);
};
/**
 * @method KoaRoles#can
 * @param {String} action
 */


KoaRoles.prototype.can6 = function (action) {
  return can(this, 'roleHandler6', action);
};

function use(role, key, value) {
  if (!is.function(value)) {
    throw new TypeError('Expected fn to be of type function or generator function');
  }

  role[key] = value;
}

function can(role, key, action) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (ctx, next) {
        if (yield role[key](ctx, action)) {
          return next();
        }

        yield role.failureHandler(ctx, action);
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}

function defaultFailureHandler(ctx, action) {
  ctx.status = 403;
  ctx.body = {
    message: 'Access Denied, you don\'t have permission.'
  };
}