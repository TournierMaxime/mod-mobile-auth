import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import Message from '@mod/mobile-common/lib/components/utils/Message'
import tw from 'twrnc'
import useOnChange from "@mod/mobile-common/lib/hooks/utils/useOnChange"
import useHandleConfirmEmail from '../../lib/hooks/auth/useHandleConfirmEmail'
import SuccessOrError from "@mod/mobile-common/lib/components/utils/SuccessOrError"

const ConfirmEmail = ({ route }) => {
  const { userId } = route.params

  const { handleConfirmEmail, data, setData, message } = useHandleConfirmEmail({ userId })

  const { onChange } = useOnChange({ data, setData })

  const { t } = useTranslation()

  return (
    <View style={tw`bg-white p-4 rounded-md h-full`}>
      <Message message={t('actions.anEmailHasBeenSentToYouContainingA6DigitCode')} priority={"info"} />
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.code')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.code')}
        onChangeText={(value) => onChange({ name: 'verificationCode', value: Number(value) })}
        value={data.verificationCode}
        keyboardType='numeric'
        maxLength={6}
      />
        <TouchableOpacity style={tw`flex-row justify-center my-4 bg-indigo-600 rounded-lg`} onPress={handleConfirmEmail}>
          <Text
            style={tw`px-4 py-2 text-white text-xl font-medium`}
          >
            {t('utils.confirm')}
          </Text>
        </TouchableOpacity>

      <SuccessOrError message={message} />
    </View>
  )
}

export default ConfirmEmail
