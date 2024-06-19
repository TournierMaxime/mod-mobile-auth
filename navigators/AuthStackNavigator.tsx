import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import Login from "@mod/mobile-auth/views/Auth/Login"
import ForgetPassword from "@mod/mobile-auth/views/Auth/ForgetPassword"
import ConfirmEmail from "@mod/mobile-auth/views/Auth/ConfirmEmail"

export type AuthStackParamList = {
  Login: undefined
  ForgetPassword: undefined
  ConfirmEmail: { userId: string }
  MainStackNavigator: { screen: string; params: {} | null }
  AuthStackNavigator: { screen: string }
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

interface Props {
  isAuthenticated: boolean
  i18n: any
  t: any
}

const AuthStackNavigator: React.FC<Props> = ({ isAuthenticated, i18n, t }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <AuthStack.Screen
        name="Login"
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={false}
              title={t("utils.signIn")}
              type={""}
            />
          ),
        })}
      >
        {(props) => <Login {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="ForgetPassword"
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              title={t("utils.forgotYourPassword")}
              type={""}
            />
          ),
        })}
      >
        {(props) => <ForgetPassword {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="ConfirmEmail"
        options={({ route }) => ({
          userId: route.params.userId,
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={false}
              title={t("utils.confirm") + " Email"}
              type={""}
            />
          ),
        })}
      >
        {(props) => <ConfirmEmail {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator
