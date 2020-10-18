const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');

function findUser(username, callback) {
  db.query(
    `SELECT 
        username, email, passwordDigest, name, 
        FALSE AS isAdmin,
        CASE WHEN Pet_Owner.petOwnerUsername IS NULL THEN FALSE ELSE TRUE END AS isPetOwner,
        CASE WHEN Full_Time_Employee.caretakerUsername IS NULL THEN FALSE ELSE TRUE END AS isFullTimeCaretaker,
        CASE WHEN Part_Time_Employee.caretakerUsername IS NULL THEN FALSE ELSE TRUE END AS isPartTimeCaretaker
      FROM App_User
        LEFT OUTER JOIN Pet_Owner ON App_User.username = Pet_Owner.petOwnerUsername
        LEFT OUTER JOIN Full_Time_Employee ON App_User.username = Full_Time_Employee.caretakerUsername
        LEFT OUTER JOIN Part_Time_Employee ON App_User.username = Part_Time_Employee.caretakerUsername
      WHERE App_User.deletedAt IS NULL AND App_User.username = $1
      UNION
      SELECT
        username, email, passwordDigest, name, 
        TRUE AS isAdmin,
        FALSE AS isPetOwner,
        FALSE AS isFullTimeCaretaker,
        FALSE AS isPartTimeCaretaker
      FROM PCS_Administrator 
      WHERE username = $1`,
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
        return callback(new Error(`Multiple users found. Check database for username ${username}`)); // programmer's error
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
