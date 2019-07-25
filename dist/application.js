"use strict";

// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
const Roles = require('./role');

const repo = module.exports = Roles;
/**
 * Transform string action to object action
 * that contains roles and permits
 */

repo.transformAction = action => {
  let tfAction;
  if (!action) return null;

  if (typeof action === 'string') {
    tfAction = action.split(';').filter(rp => rp).map(rp => rp.trim()).map(rp => {
      const splites = rp.split('@');

      if (splites.length === 1) {
        return {
          roles: splites[0].split(',').map(x => x.trim()).filter(x => x),
          permits: []
        };
      }

      return {
        roles: splites[0].split(',').map(x => x.trim()).filter(x => x),
        permits: splites[1].split(',').map(x => x.trim()).filter(x => x)
      };
    });
  }

  if (Array.isArray(action)) {
    tfAction = action.map(rp => {
      if (typeof rp === 'string') {
        const splites = rp.split('@');

        if (splites.length === 1) {
          return {
            roles: splites[0].split(',').map(x => x.trim()).filter(x => x),
            permits: []
          };
        }

        return {
          roles: splites[0].split(',').map(x => x.trim()).filter(x => x),
          permits: splites[1].split(',').map(x => x.trim()).filter(x => x)
        };
      }

      return rp;
    });
  }

  return tfAction;
};