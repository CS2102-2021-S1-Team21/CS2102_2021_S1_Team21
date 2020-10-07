const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');

function findUser(username, callback) {
  db.query('SELECT * FROM AppUser WHERE username = $1', [username], (err, data) => {
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
    return callback(null, {
      username: user.username,
      email: user.email,
      passwordDigest: user.passworddigest, // case sensitive
      name: user.name,
    });
  });
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

const localStrategy = new LocalStrategy((username, password, done) => {
  findUser(username, async (error, user) => {
    if (error) {
      return done(error);
    }

    if (!user) {
      return done(null, false);
    }

    try {
      const passwordIsValid = await bcrypt.compare(password, user.passwordDigest);
      if (!passwordIsValid) {
        return done(null, false);
      }
      return done(null, user);
    } catch (bcryptError) {
      return done(bcryptError);
    }
  });
});

// const authMiddleware =
// const antiMiddleware =

function init() {
  passport.use(localStrategy);
  // passport.authMiddleware =
}

exports.init = init;
