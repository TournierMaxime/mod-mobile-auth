import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import useHandleRegister from '../../lib/hooks/auth/useHandleRegister'
import useOnChange from '@mod/mobile-common/lib/hooks/utils/useOnChange'
import SuccessOrError from "@mod/mobile-common/lib/components/utils/SuccessOrError"

const RegisterScreen = () => {
  const { t } = useTranslation()

  const { message, handleRegister, data, setData } = useHandleRegister()

  const { onChange } = useOnChange({ data, setData })

  return (
    <View style={tw`bg-white p-4 rounded-md h-full`}>
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.userName')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.userName')}
        value={data.pseudo}
        onChangeText={(value) => onChange({ name: 'pseudo', value })}
      />
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.email')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.email')}
        value={data.email}
        onChangeText={(value) => onChange({ name: 'email', value })}
      />
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.password')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.password')}
        secureTextEntry
        value={data.password}
        onChangeText={(value) => onChange({ name: 'password', value })}
      />

        <TouchableOpacity style={tw`flex-row justify-center mt-4 bg-indigo-600 rounded-lg`} onPress={() => handleRegister()}>
          <Text
            style={tw`px-4 py-2 text-white text-xl font-medium`}
          >
            {t('utils.signUp')}
          </Text>
        </TouchableOpacity>
      <SuccessOrError message={message} />
    </View>
  )
}

export default RegisterScreen
