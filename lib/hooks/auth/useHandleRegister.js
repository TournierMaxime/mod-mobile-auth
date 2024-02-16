import { useDispatch } from 'react-redux'
import { register } from '../../../redux/actions/auth'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import useMessage from '@mod/mobile-common/lib/hooks/utils/useMessage'
import registerForPushNotificationsAsync from '@mod/mobile-common/lib/components/utils/Notifications'

const useHandleRegister = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { message, setMessage } = useMessage()

  const { t, i18n } = useTranslation()
  const language = i18n.language
  const lang = language.slice(0, 2)

  const [data, setData] = useState({
    pseudo: '',
    email: '',
    password: '',
    expoPushToken: '',
  })

  const handleRegister = async () => {
    try {
      const token = await registerForPushNotificationsAsync()
      const response = await dispatch(
        register({ ...data, lang, expoPushToken: token })
      )
      setMessage({ success: t('actions.yourAccountHasBeenCreated') })

      setTimeout(() => {
        navigation.navigate('ConfirmEmail', { userId: response.user.userId })
      }, 3000)
    } catch (error) {
      console.log(error)
      setMessage({ error: error.response.data.errMsg })
    }
    setData({})
  }

  return { handleRegister, data, setData, message }
}

export default useHandleRegister
