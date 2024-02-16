import {
  Login,
  Logout,
  ConfirmEmail,
  ForgetPasswordMobile,
  CheckForgetPasswordCodeMobile,
  ResetPasswordMobile,
  Register,
} from '../../../../services/auth'

const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_USER_REQUEST' })
    const response = await Login(data)
    dispatch({
      type: 'LOGIN_USER_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'LOGIN_USER_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOGOUT_USER_REQUEST' })
    const response = Logout()
    dispatch({
      type: 'LOGOUT_USER_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'LOGOUT_USER_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const confirmEmail = (userId, data) => async (dispatch) => {
  try {
    dispatch({ type: 'CONFIRM_EMAIL_REQUEST' })
    const response = await ConfirmEmail(userId, data)
    dispatch({
      type: 'CONFIRM_EMAIL_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'CONFIRM_EMAIL_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: 'FORGET_PASSWORD_REQUEST' })
    const response = await ForgetPasswordMobile(email)
    dispatch({ type: 'FORGET_PASSWORD_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'FORGET_PASSWORD_FAILURE', payload: error.message })
    console.log(error)
    throw error
  }
}

const checkForgetPasswordCode = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'CHECK_FORGET_PASSWORD_CODE_REQUEST' })
    const response = await CheckForgetPasswordCodeMobile(data)
    dispatch({
      type: 'CHECK_FORGET_PASSWORD_CODE_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'CHECK_FORGET_PASSWORD_CODE_FAILURE',
      payload: error.message,
    })
    console.log(error)
    throw error
  }
}

const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'RESET_PASSWORD_REQUEST' })
    const response = await ResetPasswordMobile(data)
    dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: 'RESET_PASSWORD_FAILURE', payload: error.message })
    throw error
  }
}

const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_USER_REQUEST' })
    const response = await Register(data)
    dispatch({
      type: 'REGISTER_USER_SUCCESS',
      payload: response.data,
    })
    return response.data
  } catch (error) {
    dispatch({
      type: 'REGISTER_USER_FAILURE',
      payload: error.message,
    })
    throw error
  }
}

const setUserWithLocalStorage = (localStorageData) => async (dispatch) => {
  try {
    dispatch({ type: 'SET_USER_LOCALSTORAGE_REQUEST' })
    dispatch({
      type: 'SET_USER_LOCALSTORAGE_SUCCESS',
      payload: localStorageData,
    })
    console.log('Action', localStorageData)
    return localStorageData
  } catch (error) {
    dispatch({ type: 'SET_USER_LOCALSTORAGE_FAILURE', payload: error })
    console.log(error)
    throw error
  }
}

export {
  loginUser,
  register,
  logoutUser,
  confirmEmail,
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
  setUserWithLocalStorage,
}
