//author : surya
//date created : 10-09-2019
//name :Project  Main Page
//package : Shadow Properties
//Last Modified : 13-9-19
/*Todo:
added screen for stack navigation like login, signup,logout and home screens
*/

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginPage from "../UserManagement/LoginPage";
import SignupPage from "../UserManagement/SignupPage";
import PublisherSignup from "../UserManagement/PublisherSignup";
import ForgotPassword from "../UserManagement/ForgotPassword";
import ForgotPassword2 from "../UserManagement/ForgotPassword2";
import Subscription from "../CustomComponents/Subscription";
import GetStarted from "../UserManagement/GetStarted";
import MainNav from "./MainNav";
import LeadsSubscribe from "../CustomComponents/LeadsSubscribe";
// import SettingsScreen from '../UserManagement/SettingsScreen';

import PublishNav from "./PublishNav";

const AuthStack = createStackNavigator(
  {
    GetStarted: { screen: GetStarted },
    SignupPage: { screen: SignupPage },
    // SettingsScreen: { screen: SettingsScreen },
    LoginPage: { screen: LoginPage },
    ForgotPassword: { screen: ForgotPassword },
    ForgotPassword2: { screen: ForgotPassword2 },
    PublisherSignup: { screen: PublisherSignup }
    // CardDetails: { screen: CardDetails }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);
const MainNavigator = createStackNavigator(
  {
    MainNav: { screen: MainNav }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const MainNavigator2 = createStackNavigator(
  {
    PublishNav: { screen: PublishNav }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const LoginNav = createSwitchNavigator({
  Auth: {
    // when not logged in
    screen: AuthStack
  },
  MainNav: {
    // when logged in
    screen: MainNavigator
  },
  PublishNav: {
    // when logged in
    screen: MainNavigator2
  },
  subcription: {
    screen: Subscription
  },
  LeadsSubscribe:{
screen:LeadsSubscribe
  }
});

export default createAppContainer(LoginNav);
