/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import CampignsMain from "../Campigns/CampignsMain";
import CreateCampigns from "../Campigns/CreateCampigns";






import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileDetails from '../UserManagement/ProfileDetails';
import SettingsScreen from '../UserManagement/SettingsScreen'

const CampignNavigator = createStackNavigator(
  {
    CampignsMain: { screen: CampignsMain },
    CreateCampigns: { screen: CreateCampigns },
    ProfileDetails: { screen: ProfileDetails },
    SettingsScreen: { screen: SettingsScreen },

  },


  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: true,
    },
  },
);
const CampignsNav = createAppContainer(CampignNavigator);
export default CampignsNav;