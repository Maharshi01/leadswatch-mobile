/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const Loader = props => {
  return (
    <View
      style={{
        height: hp(100),
        weight: wp(100),
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View style={{ height: hp(15), width: hp(15) }}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={require("../../assets/gifs/loader.gif")}
        ></Image>
      </View>
      <Text>Loading Please wait</Text>
    </View>
  );
};

export default Loader;
