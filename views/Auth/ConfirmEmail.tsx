import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import useOnChange from "@mod/mobile-common/lib/hooks/utils/useOnChange"
import useHandleConfirmEmail from "../../lib/hooks/auth/useHandleConfirmEmail"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "../../../../redux/store"
import { AuthStackParamList } from "../../navigators/AuthStackNavigator"
import { NavigationProp } from "@react-navigation/native"

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

  const { onChange } = useOnChange({ data, setData })

  const { fontSize, widthAspectRatio, placeholder, btnSubmit } = useResponsive()

  const { t } = useTranslation()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`items-center`}>
      <View style={widthAspectRatio()}>
        <View style={tw`${background} p-4 rounded-md h-full`}>
          <Text style={fontSize(text)}>{t("utils.code")}</Text>
          <TextInput
            style={placeholder()}
            placeholder={t("utils.code")}
            onChangeText={(value) =>
              onChange({ name: "verificationCode", value: Number(value) })
            }
            value={
              data.verificationCode !== null
                ? data.verificationCode.toString()
                : ""
            }
            keyboardType="numeric"
            maxLength={6}
          />
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
