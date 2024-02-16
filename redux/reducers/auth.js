import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  data: {},
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'LOGIN_USER_SUCCESS':
      AsyncStorage.setItem('userData', JSON.stringify(action.payload))
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case 'LOGIN_USER_FAILURE':
      AsyncStorage.setItem('userData', JSON.stringify(action.payload))
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'LOGOUT_USER_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'LOGOUT_USER_SUCCESS':
      AsyncStorage.removeItem('userData')
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      }
    case 'LOGOUT_USER_FAILURE':
      AsyncStorage.removeItem('userData')
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case 'SET_USER_LOCALSTORAGE_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'SET_USER_LOCALSTORAGE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'SET_USER_LOCALSTORAGE_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const confirmEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_EMAIL_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'CONFIRM_EMAIL_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'CONFIRM_EMAIL_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORGET_PASSWORD_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'FORGET_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'FORGET_PASSWORD_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case 'CHECK_FORGET_PASSWORD_CODE_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'CHECK_FORGET_PASSWORD_CODE_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'CHECK_FORGET_PASSWORD_CODE_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    case 'RESET_PASSWORD_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    default:
      return state
  }
}

const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'REGISTER_USER_FAILURE':
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
}
