/**
 * Nanocloud turns any traditional software into a cloud solution, without
 * changing or redeveloping existing source code.
 *
 * Copyright (C) 2016 Nanocloud Software
 *
 * This file is part of Nanocloud.
 *
 * Nanocloud is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Nanocloud is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General
 * Public License
 * along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

/* globals AccessToken */

var sails = require('sails');

process.env.IAAS = 'dummy';
process.env.TESTING = true;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(20000);

  sails.lift({
    models: {
      migrate: 'safe'
    }
  }, function(err) {

    if (err) {
      throw new Error(err);
    }

    // Here is loaded administrator token
    AccessToken.create({
      userId: 'aff17b8b-bf91-40bf-ace6-6dfc985680bb',
      token: 'admintoken'
    }, function(err) {

      if (err) {
        return done(err);
      }

      return done(err, sails);
    });
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
