import { userQuery, signupQuery, authQuery } from './authQueries';
import { generateToken } from '../../middleware/auth/jwt';
import { hashPassword } from '../../middleware/auth/bcrypt';

export const signUpController = async (req, res) => {
  try {
    const { rows } = await userQuery(req.body);
    if (rows[0]) {
      res.status(200).send({ success: false, message: 'username has been taken' });
    } else {
      req.body.password = await hashPassword(req.body.password);
      const { rows, detail } = await signupQuery(req.body);
      if (detail) {
        res.status(409).send(detail);
      } else {
        const { id, email } = rows[0];
        const token = await generateToken(id, email);
        rows[0].token = token;
        res
          .status(200)
          .append('authorization', JSON.stringify(token))
          .send(rows[0]);
      }
    }
  } catch (err) {
    console.log('signUpController - error= ', err);
    res.status(404).send(err);
  }
};

export const loginController = async (req, res) => {
  try {
    const { rows } = await userQuery(req.body);
    delete rows[0].password;
    const { id, email } = rows[0];
    const token = await generateToken(id, email);
    rows[0].token = token;
    res
      .status(200)
      .append('authorization', JSON.stringify(token))
      .send(rows[0]);
  } catch (err) {
    console.log('loginController - error= ', err);
    res.status(404).send(err);
  }
};

export const authController = async (req, res) => {
  try {
    const payload = req.query;
    const verified = await authQuery(payload);
    if (verified) {
      const { rows } = await userQuery(payload);
      const { id, email } = rows[0];
      const token = await generateToken(id, email);
      rows[0].token = token;
      rows[0].password = null;
      res
        .status(200)
        .append('authorization', JSON.stringify(token))
        .send(rows[0]);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    console.log('err Auth User', err);
  }
};
