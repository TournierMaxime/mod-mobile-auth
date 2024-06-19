import {
  Login,
  Logout,
  ConfirmEmail,
  VerifyAppleToken,
  ForgetPasswordMobile,
  CheckForgetPasswordCodeMobile,
  ResetPasswordMobile,
  Register,
} from "../../../../services/auth"
import { AppThunk } from "../../../../store"

// Define action types
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE"

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST"
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS"
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE"

export const CONFIRM_EMAIL_REQUEST = "CONFIRM_EMAIL_REQUEST"
export const CONFIRM_EMAIL_SUCCESS = "CONFIRM_EMAIL_SUCCESS"
export const CONFIRM_EMAIL_FAILURE = "CONFIRM_EMAIL_FAILURE"

export const VERIFY_APPLE_TOKEN_REQUEST = "VERIFY_APPLE_TOKEN_REQUEST"
export const VERIFY_APPLE_TOKEN_SUCCESS = "VERIFY_APPLE_TOKEN_SUCCESS"
export const VERIFY_APPLE_TOKEN_FAILURE = "VERIFY_APPLE_TOKEN_FAILURE"

export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST"
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS"
export const FORGET_PASSWORD_FAILURE = "FORGET_PASSWORD_FAILURE"

export const CHECK_FORGET_PASSWORD_CODE_REQUEST =
  "CHECK_FORGET_PASSWORD_CODE_REQUEST"
export const CHECK_FORGET_PASSWORD_CODE_SUCCESS =
  "CHECK_FORGET_PASSWORD_CODE_SUCCESS"
export const CHECK_FORGET_PASSWORD_CODE_FAILURE =
  "CHECK_FORGET_PASSWORD_CODE_FAILURE"

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST"
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE"

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST"
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE"

export const SET_USER_LOCALSTORAGE_REQUEST = "SET_USER_LOCALSTORAGE_REQUEST"
export const SET_USER_LOCALSTORAGE_SUCCESS = "SET_USER_LOCALSTORAGE_SUCCESS"
export const SET_USER_LOCALSTORAGE_FAILURE = "SET_USER_LOCALSTORAGE_FAILURE"

// Define action interfaces
interface LoginUserRequestAction {
  type: typeof LOGIN_USER_REQUEST
}

interface LoginUserSuccessAction {
  type: typeof LOGIN_USER_SUCCESS
  payload: any
}

interface LoginUserFailureAction {
  type: typeof LOGIN_USER_FAILURE
  payload: string
}

interface LogoutUserRequestAction {
  type: typeof LOGOUT_USER_REQUEST
}

interface LogoutUserSuccessAction {
  type: typeof LOGOUT_USER_SUCCESS
  payload: any
}

interface LogoutUserFailureAction {
  type: typeof LOGOUT_USER_FAILURE
  payload: string
}

interface ConfirmEmailRequestAction {
  type: typeof CONFIRM_EMAIL_REQUEST
}

interface ConfirmEmailSuccessAction {
  type: typeof CONFIRM_EMAIL_SUCCESS
  payload: any
}

interface ConfirmEmailFailureAction {
  type: typeof CONFIRM_EMAIL_FAILURE
  payload: string
}

interface VerifyAppleTokenRequestAction {
  type: typeof VERIFY_APPLE_TOKEN_REQUEST
}

interface VerifyAppleTokenSuccessAction {
  type: typeof VERIFY_APPLE_TOKEN_SUCCESS
  payload: any
}

interface VerifyAppleTokenFailureAction {
  type: typeof VERIFY_APPLE_TOKEN_FAILURE
  payload: string
}

interface ForgetPasswordRequestAction {
  type: typeof FORGET_PASSWORD_REQUEST
}

interface ForgetPasswordSuccessAction {
  type: typeof FORGET_PASSWORD_SUCCESS
  payload: any
}

interface ForgetPasswordFailureAction {
  type: typeof FORGET_PASSWORD_FAILURE
  payload: string
}

interface CheckForgetPasswordCodeRequestAction {
  type: typeof CHECK_FORGET_PASSWORD_CODE_REQUEST
}

interface CheckForgetPasswordCodeSuccessAction {
  type: typeof CHECK_FORGET_PASSWORD_CODE_SUCCESS
  payload: any
}

interface CheckForgetPasswordCodeFailureAction {
  type: typeof CHECK_FORGET_PASSWORD_CODE_FAILURE
  payload: string
}

interface ResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_REQUEST
}

interface ResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS
  payload: any
}

interface ResetPasswordFailureAction {
  type: typeof RESET_PASSWORD_FAILURE
  payload: string
}

interface RegisterUserRequestAction {
  type: typeof REGISTER_USER_REQUEST
}

interface RegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCESS
  payload: any
}

interface RegisterUserFailureAction {
  type: typeof REGISTER_USER_FAILURE
  payload: string
}

interface SetUserLocalStorageRequestAction {
  type: typeof SET_USER_LOCALSTORAGE_REQUEST
}

interface SetUserLocalStorageSuccessAction {
  type: typeof SET_USER_LOCALSTORAGE_SUCCESS
  payload: any
}

interface SetUserLocalStorageFailureAction {
  type: typeof SET_USER_LOCALSTORAGE_FAILURE
  payload: string
}

// Union of action types
type AuthActionTypes =
  | LoginUserRequestAction
  | LoginUserSuccessAction
  | LoginUserFailureAction
  | LogoutUserRequestAction
  | LogoutUserSuccessAction
  | LogoutUserFailureAction
  | ConfirmEmailRequestAction
  | ConfirmEmailSuccessAction
  | ConfirmEmailFailureAction
  | VerifyAppleTokenRequestAction
  | VerifyAppleTokenSuccessAction
  | VerifyAppleTokenFailureAction
  | ForgetPasswordRequestAction
  | ForgetPasswordSuccessAction
  | ForgetPasswordFailureAction
  | CheckForgetPasswordCodeRequestAction
  | CheckForgetPasswordCodeSuccessAction
  | CheckForgetPasswordCodeFailureAction
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction
  | RegisterUserRequestAction
  | RegisterUserSuccessAction
  | RegisterUserFailureAction
  | SetUserLocalStorageRequestAction
  | SetUserLocalStorageSuccessAction
  | SetUserLocalStorageFailureAction

// Thunk actions
const loginUser =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST })
      const response = await Login(data)
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: error.message,
      })
      throw new Error(error.message)
    }
  }

const logoutUser = (): AppThunk<Promise<any>> => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST })
    await Logout()
    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: {},
    })
    return {}
  } catch (error: any) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: error.message,
    })
    throw new Error(error.message)
  }
}

const confirmEmail =
  (userId: string, data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: CONFIRM_EMAIL_REQUEST })
      const response = await ConfirmEmail(userId, data)
      dispatch({
        type: CONFIRM_EMAIL_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: CONFIRM_EMAIL_FAILURE,
        payload: error.message,
      })
      throw new Error(error.message)
    }
  }

const verifyAppleToken =
  (identityToken: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: VERIFY_APPLE_TOKEN_REQUEST })
      const response = await VerifyAppleToken(identityToken)
      dispatch({
        type: VERIFY_APPLE_TOKEN_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: VERIFY_APPLE_TOKEN_FAILURE,
        payload: error.message,
      })
      throw new Error(error.message)
    }
  }

const forgetPassword =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: FORGET_PASSWORD_REQUEST })
      const response = await ForgetPasswordMobile(data)
      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: FORGET_PASSWORD_FAILURE, payload: error.message })
      throw new Error(error.message)
    }
  }

const checkForgetPasswordCode =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: CHECK_FORGET_PASSWORD_CODE_REQUEST })
      const response = await CheckForgetPasswordCodeMobile(data)
      dispatch({
        type: CHECK_FORGET_PASSWORD_CODE_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: CHECK_FORGET_PASSWORD_CODE_FAILURE,
        payload: error.message,
      })
      throw new Error(error.message)
    }
  }

const resetPassword =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST })
      const response = await ResetPasswordMobile(data)
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message })
      throw new Error(error.message)
    }
  }

const register =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST })
      const response = await Register(data)
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: error.message,
      })
      throw new Error(error.message)
    }
  }

const setUserWithLocalStorage =
  (localStorageData: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SET_USER_LOCALSTORAGE_REQUEST })
      dispatch({
        type: SET_USER_LOCALSTORAGE_SUCCESS,
        payload: localStorageData,
      })
      return localStorageData
    } catch (error: any) {
      dispatch({ type: SET_USER_LOCALSTORAGE_FAILURE, payload: error.message })
      throw new Error(error.message)
    }
  }

export {
  loginUser,
  register,
  logoutUser,
  confirmEmail,
  verifyAppleToken,
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
  setUserWithLocalStorage,
}

export type { AuthActionTypes }
