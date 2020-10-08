const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');

function findUser(username, callback) {
  db.query(
    `SELECT username, email, passwordDigest, name, 'user' AS type FROM AppUser WHERE username = $1
     UNION
     SELECT username, email, passwordDigest, name, 'admin' AS type FROM PCS_Administrator WHERE username = $1`,
    [username],
    (err, data) => {
      if (err) {
        return callback(err);
      }
      if (data.rows.length === 0) {
        // TODO: logging
        return callback(null, false);
      }
      if (data.rows.length !== 1) {
        return callback(new Error('Multiple users with the same username')); // programmer's error
      }

      const user = data.rows[0];
      return callback(null, user);
    },
  );
}

// ------------------ SESSIONS ------------------
// Get user info from the database and make it available in `req.user`
// (since each request only contains the session ID)

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  findUser(username, done);
});

// ------------------ AUTH STRATEGY ------------------
// Used for logging in

const localStrategy = new LocalStrategy((username, password, done) => {
  findUser(username, async (error, user) => {
    if (error) {
      return done(error);
    }

    if (!user) {
      return done(null, false);
    }

    try {
      const passwordIsValid = await bcrypt.compare(password, user.passworddigest);
      if (!passwordIsValid) {
        return done(null, false);
      }
      return done(null, user);
    } catch (bcryptError) {
      return done(bcryptError);
    }
  });
});

function init() {
  passport.use(localStrategy);
}

exports.init = init;
