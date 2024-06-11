import { useDispatch } from "react-redux"
import { loginUser } from "../../../redux/actions/auth"
import { useState } from "react"
import { toast } from "@mod/mobile-common/lib/toast"
import { useTranslation } from "react-i18next"

const useHandleLogin = ({ navigation }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" })
  const { t } = useTranslation()

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
      console.log("handleLogin", error.message)
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

  return { handleLogin, data, setData }
}

export default useHandleLogin
