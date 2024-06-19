import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import useHandleConfirmEmail from "../../lib/hooks/auth/useHandleConfirmEmail"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "../../../../store"
import { AuthStackParamList } from "../../navigators/AuthStackNavigator"
import { NavigationProp } from "@react-navigation/native"
import Form from "modules/mod-mobile-common/lib/class/Form"

interface ConfirmEmailProps {
  i18n: any
  t: any
  navigation: NavigationProp<AuthStackParamList, "ConfirmEmail">
  route: any
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ route }) => {
  const { userId } = route.params

  const { handleConfirmEmail, data, setData } = useHandleConfirmEmail({
    userId,
  })

  const { widthAspectRatio, btnSubmit } = useResponsive()

  const { t } = useTranslation()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`items-center`}>
      <View style={widthAspectRatio()}>
        <View style={tw`${background} p-4 rounded-md h-full`}>
          {Form.inputNumber(
            data,
            setData,
            t("utils.code"),
            data?.verificationCode,
            "verificationCode",
          )}
          <TouchableOpacity
            style={tw`flex-row justify-center my-4 bg-indigo-600 rounded-lg`}
            onPress={handleConfirmEmail}
          >
            <Text style={btnSubmit()}>{t("utils.confirm")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ConfirmEmail
