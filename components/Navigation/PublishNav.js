import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Text,
  TextInput,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from "react-native";
// import LinearGradient from 'react-native-linear-gradient';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Button,
  Toast,
  Root
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Home from "../../assets/js/Home";
import Leads from "../../assets/js/Leads";
import Campagin from "../../assets/js/Campagin";
import Publishers from "../Publisher/Publishers";
import Campaigns from "../Publisher/Campaigns";
import PublisherHome from "../Publisher/PublisherHome";
import PublisherProfile from "../Publisher/PublisherProfile";
import LeadDetail from "../Publisher/LeadDetail";
import PublisherSettings from "../Publisher/PublisherSettings";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

const Dashboard = createStackNavigator(
  {
    PublisherHome: { screen: PublisherHome },
    PublisherProfile: { screen: PublisherProfile },
    PublisherSettings: { screen: PublisherSettings }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);

const Lead = createStackNavigator(
  {
    Publishers: { screen: Publishers },
    LeadDetail: { screen: LeadDetail },

    PublisherProfile: { screen: PublisherProfile },
    PublisherSettings: { screen: PublisherSettings }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);
Lead.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};

  if (routeName === "PublisherProfile") {
    navigationOptions.tabBarVisible = false;
  }
  if (routeName === "PublisherSettings") {
    navigationOptions.tabBarVisible = false;
  }
  if (routeName === "LeadDetail") {
    navigationOptions.tabBarVisible = false;
  }

  return navigationOptions;
};

const CampignNav = createStackNavigator(
  {
    Campaigns: { screen: Campaigns },

    PublisherProfile: { screen: PublisherProfile },
    PublisherSettings: { screen: PublisherSettings }
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
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("i am clicked");
              global.dashb = true;
              navigation.navigate("PublisherHome", { date: new Date() });
            }}
          >
            <Home fill={tintColor} size={25} />
          </TouchableOpacity>
        )

        // <Home fill={tintColor} size={25} />
      })
    },
    Lead: {
      screen: Lead,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Leads fill={tintColor} size={25} />
      })
    },
    CampignNav: {
      screen: CampignNav,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <Campagin fill={tintColor} size={25} />
      })
    }
  },
  {
    initialRouteName: "Dashboard",
    tabBarOptions: {
      activeTintColor: "#484393",
      inactiveTintColor: "#9B9B9B",
      showLabel: false,
      style: {
        borderTopColor: "#F3F4F7",
        width: wp(100),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // height: Platform.OS === 'android' ? hp(10.63) : hp(5),
        //paddingTop:Platform.OS==='android'?0:30,
        // backgroundColor: 'rgba(255,255,255,0.9)',
        // borderTopColor: "black",

        borderTopLeftRadius: 42,
        borderTopRightRadius: 42,

        shadowColor: "#F3F4F7"
      }
    }
  }
);
export default createAppContainer(TabNavigator);
