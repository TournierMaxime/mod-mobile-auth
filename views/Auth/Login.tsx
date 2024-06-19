import React, { Fragment } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import GoogleSVG from "../../../../assets/images/GoogleSVG"
import AppleSVG from "../../../../assets/icon/AppleSVG"
import useHandleAuthGoogle from "../../lib/hooks/auth/useHandleAuthGoogle"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Utils from "@mod/mobile-common/lib/class/Utils"
import useHandleAuthApple from "../../lib/hooks/auth/useHandleAuthApple"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import StepAuth from "./StepAuth"
import { RootState } from "../../../../store"
import { AuthStackParamList } from "../../navigators/AuthStackNavigator"

interface LoginProps {
  i18n: any
  t: any
  navigation: NavigationProp<AuthStackParamList, "Login">
}

const LoginScreen: React.FC<LoginProps> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  const { t } = useTranslation()

  const { forgotYourPassword, widthAspectRatio, authBtn } = useResponsive()

  const { onAppleButtonPress, isProcessingApple } = useHandleAuthApple()

  const { loginWithGoogle, isProcessing } = useHandleAuthGoogle()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
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
          </View>
        ) : isProcessingApple ? (
          <View style={tw`flex justify-center items-center`}>
            <ActivityIndicator size={"large"} />
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
            </View>

            <View style={widthAspectRatio()}>
              <StepAuth />

              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={forgotYourPassword(text)}>
                  {t("utils.forgotYourPassword")}
                </Text>
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
