import React, { Fragment } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import GoogleSVG from "../../../../assets/images/GoogleSVG"
import AppleSVG from "../../../../assets/icon/AppleSVG"
import Message from "@mod/mobile-common/lib/components/utils/Message"
import useHandleLogin from "../../lib/hooks/auth/useHandleLogin"
import useHandleAuthGoogle from "../../lib/hooks/auth/useHandleAuthGoogle"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Utils from "@mod/mobile-common/lib/class/Utils"
import useHandleAuthApple from "../../lib/hooks/auth/useHandleAuthApple"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const LoginScreen = () => {
  const navigation = useNavigation()

  const { i18n, t } = useTranslation()

  const { handleLogin, data, setData, message } = useHandleLogin({ navigation })

  const {
    fontSize,
    notRegistered,
    forgotYourPassword,
    widthAspectRatio,
    placeholder,
    btnSubmit,
    authBtn,
  } = useResponsive()

  const { onAppleButtonPress, appleMessage, isProcessingApple } =
    useHandleAuthApple({ i18n, navigation })

  const { loginWithGoogle, googleMessage, isProcessing } = useHandleAuthGoogle({
    i18n,
    navigation,
  })

  const loading = useSelector((state) => state.auth.loading)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword")
  }

  const logo = require("../../../../assets/images/videotek_logo.webp")

  return (
    <ScrollView style={tw`flex ${background} h-full`}>
      <View style={tw`flex-col items-center`}>
        {isProcessing ? (
          <View style={tw`flex justify-center items-center`}>
            <ActivityIndicator size={"large"} />
            <Message priority={"info"} message={googleMessage.info} />
          </View>
        ) : isProcessingApple ? (
          <View style={tw`flex justify-center items-center`}>
            <ActivityIndicator size={"large"} />
            <Message priority={"info"} message={appleMessage.info} />
          </View>
        ) : (
          <Fragment>
            <View style={tw`mt-5 items-center`}>
              <View style={Platform.OS === "ios" ? tw`mt-4` : null}>
                <Image
                  style={{
                    resizeMode: "contain",
                    width: Utils.moderateScale(280),
                    height: Utils.moderateScale(80),
                  }}
                  source={logo}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={notRegistered(text)}>
                  {t("utils.notRegistered")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={widthAspectRatio()}>
              <Text style={fontSize(text)}>{t("utils.email")}</Text>
              <TextInput
                placeholder={t("utils.email")}
                onChangeText={(text) => setData({ ...data, email: text })}
                value={data.email}
                style={placeholder()}
              />
              <Text style={fontSize(text)}>{t("utils.password")}</Text>
              <TextInput
                placeholder={t("utils.password")}
                onChangeText={(text) => setData({ ...data, password: text })}
                value={data.password}
                secureTextEntry={true}
                style={placeholder()}
              />

              {message.error ? (
                <Message priority={"error"} message={message.error} />
              ) : null}

              {googleMessage.error ? (
                <Message priority={"error"} message={googleMessage.error} />
              ) : null}

              {appleMessage.error ? (
                <Message priority={"error"} message={appleMessage.error} />
              ) : null}

              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={forgotYourPassword(text)}>
                  {t("utils.forgotYourPassword")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row justify-center mt-4 mb-8 bg-indigo-600 rounded-lg`}
                onPress={handleLogin}
              >
                {loading ? (
                  <ActivityIndicator size={"large"} />
                ) : (
                  <Text style={btnSubmit()}>{t("utils.signIn")}</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={widthAspectRatio()}>
              <View
                style={tw`flex flex-row mt-4 flex-row justify-center mt-4 border border-gray-600 bg-white rounded-md`}
              >
                <TouchableOpacity
                  style={tw`flex flex-row items-center px-8 py-2.5 rounded-lg`}
                  onPress={() => loginWithGoogle()}
                >
                  <GoogleSVG />
                  <Text style={authBtn()}>
                    {t("utils.continueWith")} Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {Platform.OS === "ios" ? (
              <View style={widthAspectRatio()}>
                <View
                  style={tw`flex flex-row mt-4 flex-row justify-center mt-4 border border-gray-600 bg-white rounded-md`}
                >
                  <TouchableOpacity
                    style={tw`flex flex-row items-center px-8 py-2.5 rounded-lg`}
                    onPress={() => onAppleButtonPress()}
                  >
                    <AppleSVG />
                    <Text style={authBtn()}>
                      {t("utils.continueWith")} Apple
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </Fragment>
        )}
      </View>
    </ScrollView>
  )
}

export default LoginScreen
