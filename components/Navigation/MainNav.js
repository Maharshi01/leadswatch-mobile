/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import Home from "../../assets/js/Home";
import Leads from "../../assets/js/Leads";
import Campagin from "../../assets/js/Campagin";
import PublishList from "../../assets/js/PublishList";
import Buyers from "../../assets/js/Buyers";
import Verticals from "../../assets/js/Verticals";
import AddPublisher from "../Publisher/AddPublisher";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BuyerNav from "./BuyerNav";
import CampignNav from "./CampignsNav";
import Lead from "../Lead/Lead";
import AdminLeadDetail from "../Lead/AdminLeadDetail";
import LeadByPublisher from "../Lead/LeadByPublisher";
import PublishNav from "./PublishNav";
import VerticalNav from "./VerticalNav";
import Dashboard from "../Dashboard";
import InvitedUsers from "../UserManagement/InvitedUsers";
import EditProfile from "../UserManagement/EditProfile";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PublishersList from "../Publisher/PublishersList";
import PublisherById from "../Publisher/PublisherById";
import ProfileDetails from "../UserManagement/ProfileDetails";
import SettingsScreen from "../UserManagement/SettingsScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";

// import InvitedUsers from '../UserManagement/InvitedUsers'

const Dash = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    ProfileDetails: { screen: ProfileDetails },
    SettingsScreen: { screen: SettingsScreen },
    InvitedUsers: { screen: InvitedUsers },
    PublisherById: { screen: PublisherById }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);

const Publish = createStackNavigator(
  {
    PublishersList: { screen: PublishersList },
    ProfileDetails: { screen: ProfileDetails },
    SettingsScreen: { screen: SettingsScreen },
    InvitedUsers: { screen: InvitedUsers },
    PublisherById: { screen: PublisherById },
    AddPublisher: { screen: AddPublisher }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);
const Leadss = createStackNavigator(
  {
    Lead: { screen: Lead },
    AdminLeadDetail: { screen: AdminLeadDetail },
    
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);
const TabNavigator = createBottomTabNavigator(
  {
    Dash: {
      screen: Dash,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({ tintColor }) => <TouchableOpacity onPress={()=>{
          console.log("i am clicked")
          global.dashb=true
          navigation.navigate("Dashboard",{date:new Date()});
        }}><Home fill={tintColor} size={25} /></TouchableOpacity>
      })
    },
    Lead    : {
      screen: Leadss,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({ tintColor }) => <TouchableOpacity onPress={()=>{
          navigation.navigate("Lead")
        }}>
        <Leads fill={tintColor} size={25} /></TouchableOpacity>
      })
    },
    CampignNav: {
      screen: CampignNav,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Campagin fill={tintColor} size={25} />
      })
    },
    Publish: {
      screen: Publish,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <PublishList fill={tintColor} size={25} />
        )
      })
    },
    BuyerNav: {
      screen: BuyerNav,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Buyers fill={tintColor} size={25} />
      })
    },
    VerticalNav: {
      screen: VerticalNav,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Verticals fill={tintColor} size={25} />
      })
    }
  },
  {
    initialRouteName: "Dash",

    tabBarOptions: {
      activeTintColor: "#484393",
      inactiveTintColor: "#9B9B9B",
      showLabel: false,
      style: {
        borderTopColor: "#F3F4F7",
        width: wp(100),
        // height:hp(10.68),
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        //height: Platform.OS === 'android' ? hp(10.63) : hp(5),
        // paddingTop:Platform.OS==='android'?0:30,
        // backgroundColor: 'rgba(255,255,255,0.9)',
        // borderTopColor: "black",
      
        // borderTopLeftRadius: 42,
        // borderTopRightRadius: 42,
        safeAreaInset: { bottom: 'never', top: 'never' },

        shadowColor: "#F3F4F7",
       
      }
    }
  }
);
export default createAppContainer(TabNavigator);
// export default MainNav;
