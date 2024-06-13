import { useState } from "react"
import { useTranslation } from "react-i18next"
import { loginUser, confirmEmail } from "../../../redux/actions/auth"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { toast } from "@mod/mobile-common/lib/toast"

const useHandleConfirmEmail = ({ userId }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [data, setData] = useState({ verificationCode: null })

  const { t } = useTranslation()

  const handleConfirmEmail = toast(async () => {
    try {
      await dispatch(confirmEmail(userId, data))

      await dispatch(loginUser({ userId })).then(() => {
        navigation.navigate("MainStackNavigator", {
          screen: "UserProfile",
          userId,
        })
      })
    } catch (error) {
      throw new Error(error.response.data.errMsg)
    }
    setData({})
    return {
      toastMessage: t("actions.yourAccountHasBeenSuccessfullyVerified"),
    }
  })

  return {
    handleConfirmEmail,
    data,
    setData,
  }
}

export default useHandleConfirmEmail
