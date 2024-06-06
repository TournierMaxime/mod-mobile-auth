import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import {
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
  loginUser,
} from "../../../redux/actions/auth"
import useMessage from "@mod/mobile-common/lib/hooks/utils/useMessage"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const useHandleForgetPassword = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { message, setMessage } = useMessage()

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

  const handleForgetPassword = async () => {
    try {
      await dispatch(forgetPassword({ email: data.email, lang }))
      setMessage({
        success: t("actions.anEmailHasBeenSentToYouContainingA6DigitCode"),
      })
      setStep(2)
    } catch (error) {
      console.log(error)
      setMessage({ error: error.response.data.errMsg })
    }
  }

  const handleCheckForgetPasswordCode = async () => {
    try {
      await dispatch(
        checkForgetPasswordCode({ email: data.email, code: data.code }),
      )
      setMessage({ success: t("actions.yourVerificationCodeHasBeenValidated") })
      setStep(3)
    } catch (error) {
      console.log(error)
      setMessage({ error: error.response.data.errMsg })
    }
    setData({
      ...data,
      code: null,
    })
  }

  const handleResetPassword = async () => {
    try {
      const response = await dispatch(
        resetPassword({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      )
      setMessage({ success: t("actions.yourPasswordHasBeenSuccessfullyReset") })
      await dispatch(loginUser({ userId: response.userId }))
      setStep(4)
      setTimeout(() => {
        navigation.navigate("Home")
      }, 2000)
    } catch (error) {
      console.log(error)
      setMessage({ error: error.response.data.errMsg })
    }
    setData({
      ...data,
      password: "",
      confirmPassword: "",
    })
  }

  return {
    handleForgetPassword,
    handleResetPassword,
    handleCheckForgetPasswordCode,
    message,
    step,
    data,
    setData,
  }
}

export default useHandleForgetPassword
