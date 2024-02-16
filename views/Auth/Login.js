import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import GoogleSVG from '../../../../assets/images/GoogleSVG'
import Message from '@mod/mobile-common/lib/components/utils/Message'
import useHandleLogin from '../../lib/hooks/auth/useHandleLogin'
import useHandleAuthGoogle from '../../lib/hooks/auth/useHandleAuthGoogle'
import { useSelector } from "react-redux"

const LoginScreen = () => {
  const navigation = useNavigation()

  const { i18n, t } = useTranslation()

  const { handleLogin, data, setData, message } = useHandleLogin({ navigation })

  const { loginWithGoogle, googleMessage } = useHandleAuthGoogle({
    i18n,
    navigation,
  })

  const loading = useSelector((state) => state.auth.loading)

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword')
  }

  return (
    <ScrollView style={tw`flex bg-white h-full`}>
      <View style={tw`flex-col items-center`}>
        <View style={tw`mt-5`}>
          <Text style={tw`text-gray-800 text-2xl font-bold sm:text-3xl`}>
            {t('utils.signIn')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={tw`font-medium text-base text-center my-2 text-indigo-600`}
            >
              {t('utils.notRegistered')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex flex-row`}>
          <TouchableOpacity onPress={() => loginWithGoogle()}>
            <View
              style={tw`bg-white px-8 py-2.5 m-2 border border-slate-200 rounded-lg`}
            >
              <GoogleSVG />
            </View>
          </TouchableOpacity>
        </View>

        <View style={tw`relative border-b border-slate-300 my-4`}>
          <Text style={tw`text-sm bg-white px-2 -top-2 inset-x-0 mx-auto`}>
            {t('utils.orContinueWith')}
          </Text>
        </View>

        <View style={tw`w-10/12`}>
          <Text style={tw`font-medium text-lg`}>{t('utils.email')}</Text>
          <TextInput
            placeholder={t('utils.email')}
            onChangeText={(text) => setData({ ...data, email: text })}
            value={data.email}
            style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
          />
          <Text style={tw`font-medium text-lg mt-2`}>
            {t('utils.password')}
          </Text>
          <TextInput
            placeholder={t('utils.password')}
            onChangeText={(text) => setData({ ...data, password: text })}
            value={data.password}
            secureTextEntry={true}
            style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
          />

          {message.error ? (
            <Message priority={'error'} message={message.error} />
          ) : null}

          {googleMessage.error ? (
            <Message priority={'error'} message={googleMessage.error} />
          ) : null}

          <View style={tw`mt-10 items-center`}>
            <TouchableOpacity onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator size={'large'} />
              ) : (
                <Text
                  style={tw`px-4 py-2 text-white text-xl font-medium bg-indigo-600 rounded-lg`}
                >
                  {t('utils.signIn')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={tw`mt-10 text-base font-medium text-indigo-600`}>
              {t('utils.forgotYourPassword')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default LoginScreen
