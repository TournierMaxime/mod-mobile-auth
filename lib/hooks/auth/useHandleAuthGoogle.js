import { authorize } from 'react-native-app-auth'
import axios from 'axios'
import { GOOGLE_AUTH_CLIENT_ID, GOOGLE_REDIRECT_URI } from '@env'
import { createUser, loginUser } from '../../../redux/actions/auth'
import { searchUsers } from '../../../../../redux/actions/users'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"

const useHandleAuthGoogle = ({ i18n, navigation }) => {
  const dispatch = useDispatch()

  const language = i18n.language
  const lang = language.slice(0, 2)

  const config = {
    issuer: 'https://accounts.google.com',
    clientId: GOOGLE_AUTH_CLIENT_ID,
    redirectUrl: GOOGLE_REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    },
  }

  const [googleMessage, setGoogleMessage] = useState({
    success: null,
    error: null,
  })

  const loginWithGoogle = async () => {
    try {
      const result = await authorize(config)
      const { accessToken } = result

      /*       const refreshedState = await refresh(config, {
        refreshToken: result.refreshToken,
      })

   
      await revoke(config, {
        tokenToRevoke: refreshedState.refreshToken,
      }) */

      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      const userData = response.data

      const users = await dispatch(
        searchUsers({ email: userData.email, page: 1, size: 1 })
      )

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await dispatch(loginUser({ userId }))

        navigation.navigate('Home')
      } else {
        const token = await registerForPushNotificationsAsync()
        console.log('token', token);
        const register = await dispatch(
          createUser({
            pseudo: userData.name,
            email: userData.email,
            password: userData.sub,
            provider: 'Google',
            verified: true,
            expoPushToken: token,
            lang,
          })
        )

        await dispatch(loginUser({ userId: register.user.userId }))

        navigation.navigate('Home')
      }
    } catch (error) {
      console.log('An error occurred', error)
      setGoogleMessage({ error: 'An error occurred' })
    }
  }

  return {
    loginWithGoogle,
    googleMessage,
  }
}

export default useHandleAuthGoogle
