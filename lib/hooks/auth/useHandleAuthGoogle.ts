import { authorize } from "react-native-app-auth"
import axios from "axios"
import { GOOGLE_AUTH_CLIENT_ID, GOOGLE_REDIRECT_URI } from "@env"
import { register, loginUser } from "../../../redux/actions/auth"
import { searchUsers } from "@mod/mobile-user/redux/actions/users"
import { useDispatch } from "react-redux"
import { useState } from "react"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"
import { toast } from "@mod/mobile-common/lib/toast"
import { AuthStackParamList } from "../../../navigators/AuthStackNavigator"
import { AppDispatch } from "../../../../../redux/store"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

const useHandleAuthGoogle = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const { t, i18n } = useTranslation()

  const language = i18n.language
  const lang = language.slice(0, 2)

  const [isProcessing, setIsProcessing] = useState(false)

  const config = {
    issuer: "https://accounts.google.com",
    clientId: GOOGLE_AUTH_CLIENT_ID,
    redirectUrl: GOOGLE_REDIRECT_URI,
    scopes: ["openid", "profile", "email"],
    serviceConfiguration: {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    },
  }

  const loginWithGoogle = toast(async () => {
    setIsProcessing(true)
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
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      const userData = response.data
      const email = userData.email.toString()

      const users = await dispatch(
        searchUsers({ email: email, page: 1, size: 1 }),
      )

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await dispatch(loginUser({ userId })).then(() => {
          navigation.navigate("MainStackNavigator", {
            screen: "Home",
            params: {},
          })
        })

        setIsProcessing(false)
      } else {
        const token = await registerForPushNotificationsAsync()
        await dispatch(
          register({
            pseudo: userData.name,
            email: userData.email,
            password: userData.sub,
            image: userData.picture,
            provider: "Google",
            verified: true,
            expoPushToken: token,
            lang,
          }),
        ).then((response: any) => {
          dispatch(loginUser({ userId: response.user.userId })).then(() => {
            navigation.navigate("MainStackNavigator", {
              screen: "Home",
              params: {},
            })
          })
        })

        setIsProcessing(false)
      }
    } catch (error: any) {
      setIsProcessing(false)
      throw new Error(error)
    }
    return {
      toastMessage: t("actions.youAreNowLoggedWithYourGoogleAccount"),
    }
  })

  return {
    loginWithGoogle,
    isProcessing,
  }
}

export default useHandleAuthGoogle
