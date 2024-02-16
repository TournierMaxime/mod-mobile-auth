import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'
import useHandleForgetPassword from '../../lib/hooks/auth/useHandleForgetPassword'
import useOnChange from '@mod/mobile-common/lib/hooks/utils/useOnChange'
import SuccessOrError from '@mod/mobile-common/lib/components/utils/SuccessOrError'

const ForgetPasswordScreen = () => {
  const { t } = useTranslation()

  const {
    data,
    setData,
    handleCheckForgetPasswordCode,
    handleForgetPassword,
    handleResetPassword,
    message,
    step
  } = useHandleForgetPassword()

  const { onChange } = useOnChange({ data, setData })

  return (
    <View>
      <View>
        {step === 1 && (
          <View style={tw`bg-white p-4 rounded-md h-full`}>
            <Text style={tw`font-medium text-lg mt-2`}>
              {t('utils.enterYourEmailAddress')}
            </Text>
            <TextInput
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
              placeholder={t('utils.email')}
              value={data.email}
              onChangeText={(value) => onChange({ name: 'email', value })}
            />
            <View style={tw`flex-row justify-center`}>
              <TouchableOpacity
                style={[
                  tw`mt-4 px-4 py-2 rounded-md items-center mr-4 w-auto`,
                  { backgroundColor: '#22C55E' },
                ]}
                onPress={handleForgetPassword}
              >
                <Text style={tw`text-white font-medium text-lg`}>
                  {t('utils.confirm')}
                </Text>
              </TouchableOpacity>
            </View>

            <SuccessOrError message={message} />
          </View>
        )}
        {step === 2 && (
          <View style={tw`bg-white p-4 rounded-md h-full`}>
            <Text style={tw`font-medium text-lg mt-2`}>
              {t('utils.enterYourVerificationCode')}
            </Text>
            <TextInput
              placeholder={t('utils.verificationCode')}
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
              value={data.code}
              maxLength={6}
              keyboardType='numeric'
              onChangeText={(value) =>
                onChange({ name: 'code', value: Number(value) })
              }
            />
            <View style={tw`flex-row justify-center`}>
              <TouchableOpacity
                style={[
                  tw`mt-4 px-4 py-2 rounded-md items-center mr-4 w-auto`,
                  { backgroundColor: '#22C55E' },
                ]}
                onPress={handleCheckForgetPasswordCode}
              >
                <Text style={tw`text-white font-medium text-lg`}>
                  {t('utils.confirm')}
                </Text>
              </TouchableOpacity>
            </View>
            <SuccessOrError message={message} />
          </View>
        )}

        {step === 3 && (
          <View style={tw`bg-white p-4 rounded-md h-full`}>
            <Text style={tw`font-medium text-lg mt-2`}>
              {t('utils.enterYourNewPassword')}
            </Text>
            <TextInput
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
              placeholder={t('utils.password')}
              secureTextEntry={true}
              value={data.password}
              onChangeText={(value) => onChange({ name: 'password', value })}
            />
            <TextInput
              style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
              placeholder={t('utils.confirmYourPassword')}
              secureTextEntry={true}
              value={data.confirmPassword}
              onChangeText={(value) =>
                onChange({ name: 'confirmPassword', value })
              }
            />
            <View style={tw`flex-row justify-center`}>
              <TouchableOpacity
                style={[
                  tw`mt-4 px-4 py-2 rounded-md items-center mr-4 w-auto`,
                  { backgroundColor: '#22C55E' },
                ]}
                onPress={handleResetPassword}
              >
                <Text style={tw`text-white font-medium text-lg`}>
                  {t('utils.confirm')}
                </Text>
              </TouchableOpacity>
            </View>
            <SuccessOrError message={message} />
          </View>
        )}
        {step === 4 && (
          <View style={tw`bg-white p-4 rounded-md h-full`}>
            <Text style={tw`font-medium text-lg mb-4`}>
              {t('actions.yourPasswordHasBeenSuccessfullyReset')}
            </Text>
            <SuccessOrError message={message} />
          </View>
        )}
      </View>
    </View>
  )
}

export default ForgetPasswordScreen
