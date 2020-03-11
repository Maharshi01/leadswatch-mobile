import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, Image, Linking, Dimensions, picker, TextInput, ScrollView } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import BuyerList from "../Buyer/BuyerList";
import CreateBuyer from "../Buyer/CreateBuyer";
import BuyerRoutes from "../Buyer/BuyerRoutes";
import EditBuyer from "../Buyer/EditBuyer";
import BuyerSettings from "../Buyer/BuyerSettings";
import BuyerContacts from "../Buyer/BuyerContacts";
import CreateBuyerContact from "../Buyer/CreateBuyerContact";
import EditBuyerContact from "../Buyer/EditBuyerContact";
import CreateBuyerRoute from "../Buyer/CreateBuyerRoute";
import EditBuyerRoute from "../Buyer/EditBuyerRoute";
import ProfileDetails from '../UserManagement/ProfileDetails';
import SettingsScreen from '../UserManagement/SettingsScreen'


const BuyerNav = () => {
  return (

    <AppStackNavigator></AppStackNavigator>

  );


}



const AppStackNavigator = createStackNavigator({
  BuyerList: {
    screen: BuyerList
  },

  CreateBuyer: {
    screen: CreateBuyer
  },
  EditBuyer: {
    screen: EditBuyer
  },
  BuyerRoutes: {
    screen: BuyerRoutes
  },
  BuyerSettings: {
    screen: BuyerSettings
  },
  BuyerContacts: {
    screen: BuyerContacts
  },
  CreateBuyerContact: {
    screen: CreateBuyerContact
  },
  EditBuyerContact: {
    screen: EditBuyerContact
  },
  CreateBuyerRoute: {
    screen: CreateBuyerRoute
  },
  EditBuyerRoute: {
    screen: EditBuyerRoute
  },
  ProfileDetails: { screen: ProfileDetails },
  SettingsScreen: { screen: SettingsScreen },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  });
export default createAppContainer(AppStackNavigator);
// export default BuyerNav;