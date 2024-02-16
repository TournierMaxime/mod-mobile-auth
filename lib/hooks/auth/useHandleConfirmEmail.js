import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useMessage from '@mod/mobile-common/lib/hooks/utils/useMessage'
import { loginUser, confirmEmail } from '../../../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const useHandleConfirmEmail = ({ userId }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [data, setData] = useState({ verificationCode: null })

  const { t } = useTranslation()

  const { message, setMessage } = useMessage()

  const handleConfirmEmail = async () => {
    try {
      await dispatch(confirmEmail(userId, data))
      setMessage({
        success: t('actions.yourAccountHasBeenSuccessfullyVerified'),
      })
      await dispatch(loginUser({ userId }))

      navigation.navigate('MainStackNavigator', {
        screen: 'UserProfile',
        userId,
      })
    } catch (error) {
      console.log(error)
      setMessage({ error: error.response.data.errMsg })
    }
    setData({})
  }

  return {
    handleConfirmEmail,
    data,
    setData,
    message,
  }
}

export default useHandleConfirmEmail
