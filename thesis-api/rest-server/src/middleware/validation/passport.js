import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';


import {
  userQuery
} from '../../components/auth/authQueries';
import {
  comparePasswords
} from '../auth/bcrypt';
const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const localOptions = {
  usernameField: 'username',
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.TOKEN_SECRET
};


passport.use(new LocalStrategy(localOptions, async (username, password, done) => {
  try {
    const { rows } = await userQuery({ username });
    console.log('inside of localstrategy this is the rows', rows)
    if (!rows.length) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const passwordsMatch = await comparePasswords(password, rows[0].password);
    if (!passwordsMatch) {
      return done(null, false, { message: 'Incorrect password '});
    }
    return done(null, rows);
  } catch(e) {
    return done(e);
  }
}));

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await loginHelper(jwt_payload.sub);
    if (user.length) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch(e) {
    return done(e);
  }
}));

export default passport;