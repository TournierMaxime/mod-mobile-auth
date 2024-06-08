import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import Login from "@mod/mobile-auth/views/Auth/Login"
import Register from "@mod/mobile-auth/views/Auth/Register"
import ForgetPassword from "@mod/mobile-auth/views/Auth/ForgetPassword"
import ConfirmEmail from "@mod/mobile-auth/views/Auth/ConfirmEmail"

const AuthStack = createNativeStackNavigator()

const AuthStackNavigator = ({ isAuthenticated, i18n, t }) => {
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
            />
          ),
        })}
      >
        {(props) => <Login {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="Register"
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              title={t("utils.signUp")}
            />
          ),
        })}
      >
        {(props) => <Register {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="ForgetPassword"
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              title={t("utils.forgotYourPassword")}
            />
          ),
        })}
      >
        {(props) => <ForgetPassword {...props} i18n={i18n} t={t} />}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="ConfirmEmail"
        options={() => ({
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={false}
              title={t("utils.confirm") + " Email"}
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
