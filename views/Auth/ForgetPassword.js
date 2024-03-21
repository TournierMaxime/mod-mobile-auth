import React from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import useHandleForgetPassword from "../../lib/hooks/auth/useHandleForgetPassword"
import useOnChange from "@mod/mobile-common/lib/hooks/utils/useOnChange"
import SuccessOrError from "@mod/mobile-common/lib/components/utils/SuccessOrError"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const ForgetPasswordScreen = () => {
  const { t } = useTranslation()

  const {
    data,
    setData,
    handleCheckForgetPasswordCode,
    handleForgetPassword,
    handleResetPassword,
    message,
    step,
  } = useHandleForgetPassword()

  const { onChange } = useOnChange({ data, setData })

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  return (
    <View>
      <View>
        {step === 1 && (
          <View style={tw`${background} p-4 h-full`}>
            <Text style={tw`font-medium text-lg mt-2 ${text}`}>
              {t("utils.enterYourEmailAddress")}
            </Text>
            <TextInput
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg bg-slate-100 rounded-md`}
              placeholder={t("utils.email")}
              value={data.email}
              onChangeText={(value) => onChange({ name: "email", value })}
            />

            <TouchableOpacity
              style={tw`mt-4 px-4 py-2 rounded-md flex-row justify-center items-center bg-indigo-600 rounded-lg`}
              onPress={handleForgetPassword}
            >
              <Text style={tw`text-white font-medium text-lg`}>
                {t("utils.confirm")}
              </Text>
            </TouchableOpacity>

            <SuccessOrError message={message} />
          </View>
        )}
        {step === 2 && (
          <View style={tw`${background} p-4 rounded-md h-full`}>
            <Text style={tw`font-medium text-lg mt-2 ${text}`}>
              {t("utils.enterYourVerificationCode")}
            </Text>
            <TextInput
              placeholder={t("utils.verificationCode")}
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg bg-slate-100 rounded-md`}
              value={data.code}
              maxLength={6}
              keyboardType="numeric"
              onChangeText={(value) =>
                onChange({ name: "code", value: Number(value) })
              }
            />

            <TouchableOpacity
              style={tw`mt-4 px-4 py-2 rounded-md flex-row justify-center items-center bg-indigo-600 rounded-lg`}
              onPress={handleCheckForgetPasswordCode}
            >
              <Text style={tw`text-white font-medium text-lg`}>
                {t("utils.confirm")}
              </Text>
            </TouchableOpacity>

            <SuccessOrError message={message} />
          </View>
        )}

        {step === 3 && (
          <View style={tw`${background} p-4 rounded-md h-full`}>
            <Text style={tw`font-medium text-lg mt-2 ${text}`}>
              {t("utils.enterYourNewPassword")}
            </Text>
            <TextInput
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg bg-slate-100 rounded-md`}
              placeholder={t("utils.password")}
              secureTextEntry={true}
              value={data.password}
              onChangeText={(value) => onChange({ name: "password", value })}
            />
            <TextInput
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg bg-slate-100 rounded-md`}
              placeholder={t("utils.confirmYourPassword")}
              secureTextEntry={true}
              value={data.confirmPassword}
              onChangeText={(value) =>
                onChange({ name: "confirmPassword", value })
              }
            />

            <TouchableOpacity
              style={tw`mt-4 px-4 py-2 rounded-md flex-row justify-center items-center bg-indigo-600 rounded-lg`}
              onPress={handleResetPassword}
            >
              <Text style={tw`text-white font-medium text-lg`}>
                {t("utils.confirm")}
              </Text>
            </TouchableOpacity>

            <SuccessOrError message={message} />
          </View>
        )}
        {step === 4 && (
          <View style={tw`${background} p-4 rounded-md h-full`}>
            <SuccessOrError message={message} />
          </View>
        )}
      </View>
    </View>
  )
}

export default ForgetPasswordScreen
