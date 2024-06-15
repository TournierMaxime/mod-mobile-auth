import {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer,
  verifyAppleTokenReducer,
} from "./reducers/auth"

const authCommonReducer = {
  auth: authReducer,
  register: registerUserReducer,
  password: passwordReducer,
  confirmEmail: confirmEmailReducer,
  verifyAppleToken: verifyAppleTokenReducer,
}

export { authCommonReducer }
