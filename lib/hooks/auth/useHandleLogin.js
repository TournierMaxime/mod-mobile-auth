import { useDispatch } from "react-redux"
import { loginUser } from "../../../redux/actions/auth"
import { useState } from "react"
import useMessage from "@mod/mobile-common/lib/hooks/utils/useMessage"

const useHandleLogin = ({ navigation }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" })

  const { message, setMessage } = useMessage()

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email: data.email, password: data.password }))

      navigation.navigate("MainStackNavigator", {
        screen: "Home",
      })
    } catch (error) {
      console.log("handleLogin", error.message)
      setMessage({ error: error.response.data.errMsg })
    }
    setData({})
  }

  return { handleLogin, data, setData, message }
}

export default useHandleLogin
