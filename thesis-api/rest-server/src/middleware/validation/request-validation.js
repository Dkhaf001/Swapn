import Joi from 'joi'
export default {
  login: {
    body: {
      username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }
  },
  sighup: {
    body: {
      email: Joi.string().email(),
      username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }
  }
}