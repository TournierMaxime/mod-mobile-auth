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
import { toast } from "@mod/mobile-common/lib/toast"
import { useTranslation } from "react-i18next"
import { AppDispatch } from "../../../../../store"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AuthStackParamList } from "../../../navigators/AuthStackNavigator"

const useHandleAuthApple = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const { t, i18n } = useTranslation()

  const language = i18n.language
  const lang = language.slice(0, 2)

  const [isProcessingApple, setIsProcessingApple] = useState<boolean>(false)

  const onAppleButtonPress = toast(async () => {
    setIsProcessingApple(true)
    let users
    try {
      const credential: AppleAuthentication.AppleAuthenticationCredential =
        await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        })

      if (!credential.identityToken) {
        throw new Error("No identity token returned from Apple Sign In")
      }

      const appleToken = await dispatch(
        verifyAppleToken({ identityToken: credential.identityToken }),
      )

      if (appleToken) {
        users = await dispatch(
          searchUsers({
            email: appleToken.decodedToken.email,
            page: 1,
            size: 1,
          }),
        )
      }

      if (users.users && users.users.length > 0) {
        const userId = users.users[0].userId

        await dispatch(loginUser({ userId })).then(() => {
          navigation.navigate("MainStackNavigator", {
            screen: "Home",
            params: {},
          })
        })

        setIsProcessingApple(false)
      } else {
        const token = await registerForPushNotificationsAsync()
        await dispatch(
          register({
            pseudo: `${credential.fullName?.givenName ?? ""} ${
              credential.fullName?.familyName ?? ""
            }`,
            email: appleToken.decodedToken.email,
            password: credential.user,
            provider: "Apple",
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

        setIsProcessingApple(false)
      }
    } catch (error: any) {
      setIsProcessingApple(false)
      throw new Error(error.message)
    }
    return {
      toastMessage: t("actions.youAreNowLoggedWithYourAppleAccount"),
    }
  })

  return {
    onAppleButtonPress,
    isProcessingApple,
  }
}

export default useHandleAuthApple
