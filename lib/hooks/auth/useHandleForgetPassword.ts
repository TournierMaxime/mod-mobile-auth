import { useNavigation, NavigationProp } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import {
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
  loginUser,
} from "../../../redux/actions/auth"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "@mod/mobile-common/lib/toast"
import { AuthStackParamList } from "../../../navigators/AuthStackNavigator"
import { AppDispatch } from "../../../../../redux/store"

interface DataState {
  email: string
  code: number | null
  password: string
  confirmPassword: string
}

const useHandleForgetPassword = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const [step, setStep] = useState<number>(1)

  const [data, setData] = useState<DataState>({
    email: "",
    code: null,
    password: "",
    confirmPassword: "",
  })

  const { i18n, t } = useTranslation()
  const language = i18n.language
  const lang = language.slice(0, 2)

  const handleForgetPassword = toast(async () => {
    try {
      await dispatch(forgetPassword({ email: data.email, lang }))
      setStep(2)
    } catch (error: any) {
      throw new Error(error.response.data.errMsg)
    }
    return {
      toastMessage: t("actions.anEmailHasBeenSentToYouContainingA6DigitCode"),
    }
  })

  const handleCheckForgetPasswordCode = toast(async () => {
    try {
      await dispatch(
        checkForgetPasswordCode({ email: data.email, code: data.code }),
      )
      setStep(3)
    } catch (error: any) {
      throw new Error(error.response.data.errMsg)
    }
    setData({
      ...data,
      code: null,
    })
    return {
      toastMessage: t("actions.yourVerificationCodeHasBeenValidated"),
    }
  })

  const handleResetPassword = toast(async () => {
    try {
      await dispatch(
        resetPassword({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      ).then((response: any) => {
        dispatch(loginUser({ userId: response.userId })).then(() => {
          navigation.navigate("MainStackNavigator", {
            screen: "Home",
            params: {},
          })
        })
      })
    } catch (error: any) {
      throw new Error(error.response.data.errMsg)
    }
    setData({
      ...data,
      password: "",
      confirmPassword: "",
    })
    return {
      toastMessage: t("actions.yourPasswordHasBeenSuccessfullyReset"),
    }
  })

  return {
    handleForgetPassword,
    handleResetPassword,
    handleCheckForgetPasswordCode,
    step,
    data,
    setData,
  }
}

export default useHandleForgetPassword
