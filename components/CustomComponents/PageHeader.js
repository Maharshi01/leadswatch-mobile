import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert
} from "react-native";

import axios from "axios";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import BackArrow from "../../assets/js/BackArrow";
import {
  Card,
  CardItem,
  Body,
  Container,
  Content,
  Left,
  Right
} from "native-base";
const PageHeader = props => {
  return (
    <View style={{
      width: wp(100),
      // , borderRadius: 10,
      // borderWidth: 1,
      //height:hp(8.63),
      backgroundColor: "#FFFFFF",
      borderColor: "transparent",
      justifyContent: "center",
      alignItems: 'center',
      //paddingTop: Platform.OS === 'android' ? 30 :30 ,
      paddingTop: Platform.OS === 'android' ? hp(4.5) : hp(4.5),
      paddingBottom: Platform.OS === 'android' ? hp(0.9) : hp(1),



      elevation: 0
    }}>
      <View
        style={{ width: wp(100), flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}
      >
        {/* <View style={{width:wp(3)}}></View> */}
        <TouchableOpacity onPress={() => { props.myfunc() }}>
          <BackArrow height="17" width="17" />

        </TouchableOpacity>



        <View style={{ width: wp(2.5) }}></View>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, color: "#484393", fontWeight: "bold" }}
          >
            {props.title}
          </Text>


          {props.subtitle &&
            <Text
              style={{
                fontSize: 12,
                color: "#00B0EB",
                fontWeight: "bold"
              }}
            >
              {props.subtitle}
            </Text>
          }
        </View>


        <View style={{ width: wp(2.5) }}></View>
        <TouchableOpacity
          onPress={() => { props.profile() }}
        >
          <View style={{ height: 52, width: wp(13) }}>

            {/* <Image
              source={require("../../assets/icon.png")}
              // style={{ height: "100%", width: "100%", borderRadius: 27 }}
              style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
            /> */}
            <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: wp(12.5)
                    }}
                    source={{
                      uri: `https://api.leadswatch.com/api/v1/file/user/${global.user_id}/26/26`
                    }}
                  />


          </View>
        </TouchableOpacity>


      </View>
    </View>

  );
}
export default PageHeader;