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
  TouchableOpacity,
} from 'react-native';

import {widthPercentageToDP} from 'react-native-responsive-screen';
//import LoginNav from "./components/Navigation/LoginNav"

const AdminDashboard = props => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('EditProfile')}
          style={{
            width: widthPercentageToDP(50),
            height: 50,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <View style={{height: 30}} />
        <TouchableOpacity
          style={{
            width: widthPercentageToDP(50),
            height: 50,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Buyers</Text>
        </TouchableOpacity>
        <View style={{height: 30}} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PublishersList')}
          style={{
            width: widthPercentageToDP(50),
            height: 50,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Publishers List</Text>
        </TouchableOpacity>
        <View style={{height: 30}} />
        <TouchableOpacity
          style={{
            width: widthPercentageToDP(50),
            height: 50,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Leads</Text>
        </TouchableOpacity>
        <View style={{height: 30}} />
      </View>
      <View>
        <TouchableOpacity
          style={{
            width: widthPercentageToDP(50),
            height: 50,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Verticals</Text>
        </TouchableOpacity>
        <View style={{height: 30}} />
      </View>
    </View>
  );
};

export default AdminDashboard;
