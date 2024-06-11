import { useNavigation } from "@react-navigation/native"
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

const useHandleForgetPassword = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [step, setStep] = useState(1)

  const [data, setData] = useState({
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
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
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
      ).then((response) => {
        dispatch(loginUser({ userId: response.userId })).then(() => {
          navigation.navigate("MainStackNavigator", {
            screen: "Home",
          })
        })
      })
    } catch (error) {
      console.log(error)
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
