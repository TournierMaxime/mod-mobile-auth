import { useState } from "react"
import { useTranslation } from "react-i18next"
import { loginUser, confirmEmail } from "../../../redux/actions/auth"
import { useDispatch } from "react-redux"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { toast } from "@mod/mobile-common/lib/toast"
import { AuthStackParamList } from "../../../navigators/AuthStackNavigator"
import { AppDispatch } from "../../../../../redux/store"

interface DataState {
  verificationCode: number | null
}

interface HandleConfirmEmailProps {
  userId: string
}

const useHandleConfirmEmail = ({ userId }: HandleConfirmEmailProps) => {
  const dispatch: AppDispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const [data, setData] = useState<DataState>({ verificationCode: null })

  const { t } = useTranslation()

  const handleConfirmEmail = toast(async () => {
    try {
      await dispatch(confirmEmail(userId, data))

      await dispatch(loginUser({ userId })).then(() => {
        navigation.navigate("MainStackNavigator", {
          screen: "UserProfile",
          params: {
            userId,
          },
        })
      })
    } catch (error: any) {
      throw new Error(error.response.data.errMsg)
    }
    setData({
      verificationCode: null,
    })
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
