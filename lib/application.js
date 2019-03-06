/**
 * @author [Double]
 * @email [2637309949@qq.com]
 * @create date 2019-01-11 17:38:37
 * @modify date 2019-01-11 17:38:37
 * @desc [Roles and Perm detect]
 */
const Roles = require('koa-roles')
const assert = require('assert').strict
const is = require('is')

const repo = module.exports = ({
  failureHandler = async function (ctx, action) {
    ctx.status = 500
    ctx.body = {
      message: 'Access Denied, you don\'t have permission.'
    }
  },
  roleHandler
}) => ({ httpProxy }) => {
  assert.ok(is.function(failureHandler), 'failureHandler can not be empty!')
  assert.ok(is.function(roleHandler), 'roleHandler can not be empty!')
  const roles = new Roles({ failureHandler })
  httpProxy.use(roles.middleware())
  roles.use(roleHandler)
  return { roles }
}

/**
 * Transform string action to object action
 * that contains roles and permits
 */
repo.transformAction = action => {
  let tfAction
  if (!action) return null
  if (typeof action === 'string') {
    tfAction = action
      .split(';')
      .filter(rp => rp)
      .map(rp => {
        const splites = rp.split('@')
        if (splites.length === 1) {
          return {
            roles: splites[0]
              .split(',')
              .map(x => x.trim())
              .filter(x => x),
            permits: []
          }
        }
        return {
          roles: splites[0]
            .split(',')
            .map(x => x.trim())
            .filter(x => x),
          permits: splites[1]
            .split(',')
            .map(x => x.trim())
            .filter(x => x)
        }
      })
  }
  if (Array.isArray(action)) {
    tfAction = action.map(rp => {
      if (typeof rp === 'string') {
        const splites = rp.split('@')
        if (splites.length === 1) {
          return {
            roles: splites[0]
              .split(',')
              .map(x => x.trim())
              .filter(x => x),
            permits: []
          }
        }
        return {
          roles: splites[0]
            .split(',')
            .map(x => x.trim())
            .filter(x => x),
          permits: splites[1]
            .split(',')
            .map(x => x.trim())
            .filter(x => x)
        }
      }
      return rp
    })
  }
  return tfAction
}
