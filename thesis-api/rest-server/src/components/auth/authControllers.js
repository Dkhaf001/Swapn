import {
  userQuery,
  signupQuery
} from './authQueries';
import {
  generateToken
} from '../../middleware/auth/jwt'

export const signUpController = async (req, res) => {
  try {
    const { rows } = await userQuery(req.body);
    if(rows) {
      res.status(200).send({success: false, message:'username has been taken'})
    }else{
      const { rows } = await signupQuery(req.body)
      const { id, email } = rows[0];
      success('signUpController - successfully retrieved data ', JSON.stringify(rows[0]));
      const token = await generateToken(id, email);
      rows[0].token = token;
      res.status(200).append('authorization', JSON.stringify(token)).send(rows[0]);
    }
  } catch (err) {
    error('signUpController - error= ', err);
    res.status(404).send(err)
  }
};

export const loginController = async (req, res) => {
  try {
    const { rows } = await userQuery(req.body);
    delete rows[0].password;
    const { id, email } = rows[0];
    success('loginController - successfully retrieved data ', rows[0]);
    const token = await generateToken(id, email);
    rows[0].token = token;
    return res.status(200).append('authorization', JSON.stringify(token)).send(rows[0]);
  } catch (err) {
    error('loginController - error= ', err);
    res.status(404).send(err)
  }
};