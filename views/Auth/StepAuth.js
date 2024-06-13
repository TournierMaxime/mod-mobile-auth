import React, { Fragment, useState } from "react"
import useHandleAuth from "../../lib/hooks/auth/useHandleAuth"
import { TextInput, Text, TouchableOpacity } from "react-native"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useTranslation } from "react-i18next"
import tw from "twrnc"

const StepAuth = () => {
  const {
    handleLogin,
    handleRegister,
    searchUser,
    existingUser,
    data,
    setData,
  } = useHandleAuth()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { text } = useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  const { fontSize, placeholder, btnSubmit } = useResponsive()

  const [step, setStep] = useState(1)

  const renderForm = () => {
    switch (step) {
      case 2:
        if (existingUser) {
          return (
            <Fragment>
              <Text style={fontSize(text)}>{t("utils.password")}</Text>
              <TextInput
                placeholder={t("utils.password")}
                onChangeText={(text) => setData({ ...data, password: text })}
                value={data.password}
                secureTextEntry={true}
                style={placeholder()}
              />
              <TouchableOpacity
                style={tw`flex-row justify-center mt-4 mb-8 ${
                  !data.password ? `bg-slate-200` : `bg-indigo-600`
                } rounded-lg`}
                onPress={handleLogin}
                disabled={!data.password}
              >
                <Text style={btnSubmit()}>{t("utils.signIn")}</Text>
              </TouchableOpacity>
            </Fragment>
          )
        } else {
          return (
            <Fragment>
              <Text style={fontSize(text)}>{t("utils.userName")}</Text>
              <TextInput
                placeholder={t("utils.userName")}
                onChangeText={(text) => setData({ ...data, pseudo: text })}
                value={data.pseudo}
                style={placeholder()}
              />
              <TouchableOpacity
                style={tw`flex-row justify-center mt-4 mb-8 ${
                  !data.pseudo ? `bg-slate-200` : `bg-indigo-600`
                } rounded-lg`}
                onPress={() => setStep(3)}
                disabled={!data.pseudo}
              >
                <Text style={btnSubmit()}>{t("utils.next")}</Text>
              </TouchableOpacity>
            </Fragment>
          )
        }
      case 3:
        if (!existingUser) {
          return (
            <Fragment>
              <Text style={fontSize(text)}>{t("utils.password")}</Text>
              <TextInput
                placeholder={t("utils.password")}
                onChangeText={(text) => setData({ ...data, password: text })}
                value={data.password}
                secureTextEntry={true}
                style={placeholder()}
              />
              <TouchableOpacity
                style={tw`flex-row justify-center mt-4 mb-8 ${
                  !data.password ? `bg-slate-200` : `bg-indigo-600`
                } rounded-lg`}
                onPress={handleRegister}
                disabled={!data.password}
              >
                <Text style={btnSubmit()}>{t("utils.signUp")}</Text>
              </TouchableOpacity>
            </Fragment>
          )
        }
      default:
        return (
          <Fragment>
            <Text style={fontSize(text)}>{t("utils.email")}</Text>
            <TextInput
              placeholder={t("utils.email")}
              onChangeText={(text) => setData({ ...data, email: text })}
              value={data.email}
              style={placeholder()}
            />
            <TouchableOpacity
              style={tw`flex-row justify-center mt-4 mb-8 ${
                !data.email ? `bg-slate-200` : `bg-indigo-600`
              } rounded-lg`}
              onPress={() => {
                searchUser(), setStep(2)
              }}
              disabled={!data.email}
            >
              <Text style={btnSubmit()}>{t("utils.next")}</Text>
            </TouchableOpacity>
          </Fragment>
        )
    }
  }

  return renderForm()
}

export default StepAuth
