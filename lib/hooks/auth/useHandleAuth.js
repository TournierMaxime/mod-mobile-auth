import { useDispatch } from "react-redux"
import { loginUser, register } from "../../../redux/actions/auth"
import { searchUsers } from "@mod/mobile-user/redux/actions/users"
import { useState } from "react"
import { toast } from "@mod/mobile-common/lib/toast"
import { useTranslation } from "react-i18next"
import { useNavigation } from "@react-navigation/native"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"

const useHandleAuth = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { t, i18n } = useTranslation()
  const language = i18n.language
  const lang = language.slice(0, 2)

  const [data, setData] = useState({
    email: "",
    password: "",
    pseudo: "",
    expoPushToken: "",
  })

  const [existingUser, setExistingUser] = useState(false)

  const searchUser = toast(async () => {
    try {
      const response = await dispatch(
        searchUsers({
          email: data.email,
          page: 1,
          size: 1,
        }),
      )
      if (response && response.users.length > 0) setExistingUser(true)
    } catch (error) {
      throw new Error(error)
    }
  })

  const handleLogin = toast(async () => {
    try {
      if (!data.email || !data.password) {
        throw new Error(t("errors.emailPasswordMissingOrInvalid"))
      }

      await dispatch(
        loginUser({ email: data.email, password: data.password }),
      ).then(() => {
        navigation.navigate("MainStackNavigator", {
          screen: "Home",
        })
      })
    } catch (error) {
      throw new Error(error.response.data.errMsg)
    }
    setData({
      email: "",
      password: "",
    })
    return {
      toastMessage: t("actions.successfullyConnected"),
    }
  })

  const handleRegister = toast(async () => {
    try {
      const token = await registerForPushNotificationsAsync()

      if (!data.pseudo || !data.email || !data.password) {
        throw new Error(t("errors.allFieldsAreMandatory"))
      }

      await dispatch(register({ ...data, lang, expoPushToken: token })).then(
        (response) => {
          navigation.navigate("ConfirmEmail", {
            userId: response.user.userId,
          })
        },
      )
    } catch (error) {
      throw new Error(error)
    }
    setData({})
    return {
      toastMessage: t("actions.yourAccountHasBeenCreated"),
    }
  })

  return {
    handleLogin,
    handleRegister,
    searchUser,
    data,
    setData,
    existingUser,
  }
}

export default useHandleAuth
