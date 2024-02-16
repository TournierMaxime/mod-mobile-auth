import {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer
} from './reducers/auth'

const authCommonReducer = {
  auth: authReducer,
  register: registerUserReducer,
  password: passwordReducer,
  confirmEmail: confirmEmailReducer
}

export { authCommonReducer }