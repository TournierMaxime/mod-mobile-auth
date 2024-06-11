import { useDispatch } from "react-redux"
import { register } from "../../../redux/actions/auth"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"
import { toast } from "@mod/mobile-common/lib/toast"

const useHandleRegister = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { t, i18n } = useTranslation()
  const language = i18n.language
  const lang = language.slice(0, 2)

  const [data, setData] = useState({
    pseudo: "",
    email: "",
    password: "",
    expoPushToken: "",
  })

  const handleRegister = toast(async () => {
    try {
      const token = await registerForPushNotificationsAsync()

      if (!data.pseudo || !data.email || !data.password) {
        throw new Error(t("errors.allFieldsAreMandatory"))
      }

      await dispatch(register({ ...data, lang, expoPushToken: token })).then(
        (response) => {
          navigation.navigate("ConfirmEmail", { userId: response.user.userId })
        },
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
    setData({})
    return {
      toastMessage: t("actions.yourAccountHasBeenCreated"),
    }
  })

  return { handleRegister, data, setData }
}

export default useHandleRegister
