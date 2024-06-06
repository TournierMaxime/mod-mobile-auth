import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import useHandleRegister from "../../lib/hooks/auth/useHandleRegister"
import useOnChange from "@mod/mobile-common/lib/hooks/utils/useOnChange"
import SuccessOrError from "@mod/mobile-common/lib/components/utils/SuccessOrError"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const RegisterScreen = () => {
  const { t } = useTranslation()

  const { message, handleRegister, data, setData } = useHandleRegister()

  const { onChange } = useOnChange({ data, setData })

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  const { fontSize, widthAspectRatio, placeholder, btnSubmit } = useResponsive()

  return (
    <View style={tw`items-center`}>
      <View style={widthAspectRatio()}>
        <View style={tw`${background} p-4 h-full mb-2`}>
          <Text style={fontSize(text)}>{t("utils.userName")}</Text>
          <TextInput
            style={placeholder()}
            placeholder={t("utils.userName")}
            value={data.pseudo}
            onChangeText={(value) => onChange({ name: "pseudo", value })}
          />
          <Text style={fontSize(text)}>{t("utils.email")}</Text>
          <TextInput
            style={placeholder()}
            placeholder={t("utils.email")}
            value={data.email}
            onChangeText={(value) => onChange({ name: "email", value })}
          />
          <Text style={fontSize(text)}>{t("utils.password")}</Text>
          <TextInput
            style={placeholder()}
            placeholder={t("utils.password")}
            secureTextEntry
            value={data.password}
            onChangeText={(value) => onChange({ name: "password", value })}
          />

          <TouchableOpacity
            style={tw`flex-row justify-center mt-4 bg-indigo-600 rounded-lg`}
            onPress={() => handleRegister()}
          >
            <Text style={btnSubmit()}>{t("utils.signUp")}</Text>
          </TouchableOpacity>
          <SuccessOrError message={message} />
        </View>
      </View>
    </View>
  )
}

export default RegisterScreen
