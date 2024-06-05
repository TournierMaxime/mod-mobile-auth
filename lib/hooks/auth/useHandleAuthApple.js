import * as AppleAuthentication from "expo-apple-authentication"
import { useState } from "react"
import { searchUsers } from "@mod/mobile-user/redux/actions/users"
import { useDispatch } from "react-redux"
import {
  register,
  loginUser,
  verifyAppleToken,
} from "../../../redux/actions/auth"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"

const useHandleAuthApple = ({ i18n, navigation }) => {
  const dispatch = useDispatch()

  const language = i18n.language
  const lang = language.slice(0, 2)

  const [isProcessingApple, setIsProcessingApple] = useState(false)
  const [appleMessage, setAppleMessage] = useState({
    success: null,
    error: null,
    info: "Wait we are connecting to your Apple account",
  })

  const onAppleButtonPress = async () => {
    setIsProcessingApple(true)
    let users
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      console.log("credential", credential)

      const appleToken = await dispatch(
        verifyAppleToken({ identityToken: credential.identityToken }),
      )

      console.log("appleToken", appleToken)

      if (appleToken) {
        users = await dispatch(
          searchUsers({
            email: appleToken.decodedToken.email,
            page: 1,
            size: 1,
          }),
        )
      }

      console.log("users", users)

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await dispatch(loginUser({ userId }))

        setIsProcessingApple(false)

        navigation.navigate("MainStackNavigator", {
          screen: "Home",
        })
      } else {
        const token = await registerForPushNotificationsAsync()

        const response = await dispatch(
          register({
            pseudo: `${credential.fullName.givenName} ${credential.fullName.familyName}`,
            email: credential.email ?? "",
            password: credential.user,
            provider: "Apple",
            verified: true,
            expoPushToken: token,
            lang,
          }),
        )

        await dispatch(loginUser({ userId: response.user.userId }))

        setIsProcessingApple(false)

        navigation.navigate("Home")
      }
    } catch (error) {
      console.log("An error occurred", error)
      setAppleMessage({ error: "An error occurred" })
      setIsProcessingApple(false)
    }
  }
  return { onAppleButtonPress, appleMessage, isProcessingApple }
}

export default useHandleAuthApple
