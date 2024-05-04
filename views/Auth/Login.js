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
import Message from "@mod/mobile-common/lib/components/utils/Message"
import useHandleLogin from "../../lib/hooks/auth/useHandleLogin"
import useHandleAuthGoogle from "../../lib/hooks/auth/useHandleAuthGoogle"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const LoginScreen = () => {
  const navigation = useNavigation()

  const { i18n, t } = useTranslation()

  const { handleLogin, data, setData, message } = useHandleLogin({ navigation })

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

  return (
    <ScrollView style={tw`flex ${background} h-full`}>
      <View style={tw`flex-col items-center`}>
        {isProcessing ? (
          <View style={tw`flex justify-center items-center`}>
            <ActivityIndicator size={"large"} />
            <Message
              priority={"info"}
              message={"Wait we are connecting to your Google account"}
            />
          </View>
        ) : (
          <Fragment>
            <View style={tw`mt-5 items-center`}>
              <View style={Platform.OS === "ios" ? tw`mt-4` : null}>
                <Image
                  style={[tw`w-30 h-15`, { resizeMode: "contain" }]}
                  source={require("../../../../assets/images/videotek_logo.webp")}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={tw`font-medium text-base text-center my-2 text-indigo-600 ${text}`}
                >
                  {t("utils.notRegistered")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={tw`w-10/12`}>
              <Text style={tw`font-medium text-lg ${text}`}>
                {t("utils.email")}
              </Text>
              <TextInput
                placeholder={t("utils.email")}
                onChangeText={(text) => setData({ ...data, email: text })}
                value={data.email}
                style={tw`mt-2 px-3 py-2 text-gray-500 text-lg bg-slate-100 rounded-md`}
              />
              <Text style={tw`font-medium text-lg mt-2 ${text}`}>
                {t("utils.password")}
              </Text>
              <TextInput
                placeholder={t("utils.password")}
                onChangeText={(text) => setData({ ...data, password: text })}
                value={data.password}
                secureTextEntry={true}
                style={tw`mt-2 px-3 py-2 text-gray-500 text-lg bg-slate-100 rounded-md`}
              />

              {message.error ? (
                <Message priority={"error"} message={message.error} />
              ) : null}

              {googleMessage.error ? (
                <Message priority={"error"} message={googleMessage.error} />
              ) : null}

              <View>
                <TouchableOpacity onPress={handleForgetPassword}>
                  <Text
                    style={tw`mt-4 text-base font-medium text-indigo-600 text-center ${text}`}
                  >
                    {t("utils.forgotYourPassword")}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={tw`flex-row justify-center mt-4 bg-indigo-600 rounded-lg`}
                onPress={handleLogin}
              >
                {loading ? (
                  <ActivityIndicator size={"large"} />
                ) : (
                  <Text style={tw`px-4 py-2 text-white text-xl font-medium`}>
                    {t("utils.signIn")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={tw`flex flex-row mt-4 w-10/12 flex-row justify-center mt-4 border border-slate-200 bg-white rounded-lg`}
            >
              <TouchableOpacity
                style={tw`flex flex-row items-center px-8 py-2.5 rounded-lg`}
                onPress={() => loginWithGoogle()}
              >
                <GoogleSVG />
                <Text style={tw`ml-2`}>
                  {t("utils.continueWithGoogle")} Google
                </Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </View>
    </ScrollView>
  )
}

export default LoginScreen
