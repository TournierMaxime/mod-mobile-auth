import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  SET_USER_LOCALSTORAGE_REQUEST,
  SET_USER_LOCALSTORAGE_SUCCESS,
  SET_USER_LOCALSTORAGE_FAILURE,
  CONFIRM_EMAIL_REQUEST,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAILURE,
  VERIFY_APPLE_TOKEN_REQUEST,
  VERIFY_APPLE_TOKEN_SUCCESS,
  VERIFY_APPLE_TOKEN_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  CHECK_FORGET_PASSWORD_CODE_REQUEST,
  CHECK_FORGET_PASSWORD_CODE_SUCCESS,
  CHECK_FORGET_PASSWORD_CODE_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  AuthActionTypes,
} from "../actions/auth"

interface AuthState {
  isAuthenticated: boolean
  data: any
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  data: {},
  error: null,
}

const authReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_USER_SUCCESS:
      AsyncStorage.setItem("userData", JSON.stringify(action.payload))
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        isLoading: false,
      }
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case LOGOUT_USER_SUCCESS:
      AsyncStorage.removeItem("userData")
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      }
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case SET_USER_LOCALSTORAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case SET_USER_LOCALSTORAGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case SET_USER_LOCALSTORAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const confirmEmailReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case CONFIRM_EMAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const verifyAppleTokenReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case VERIFY_APPLE_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case VERIFY_APPLE_TOKEN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case VERIFY_APPLE_TOKEN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const passwordReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case CHECK_FORGET_PASSWORD_CODE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case CHECK_FORGET_PASSWORD_CODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case CHECK_FORGET_PASSWORD_CODE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const registerUserReducer = (
  state = initialState,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

export {
  authReducer,
  confirmEmailReducer,
  passwordReducer,
  registerUserReducer,
  verifyAppleTokenReducer,
}
