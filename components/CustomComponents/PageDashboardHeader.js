import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
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
const PageDashboardHeader = props => {
  return (
    <View style={{ width: wp(100) }}>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          width: wp(100),
          //height:hp(8.63),
          // justifyContent: "space-around",
          paddingTop: Platform.OS === 'android' ? hp(4.5) : hp(4.5),
          paddingBottom: Platform.OS === 'android' ? hp(0.9) : hp(1),

          alignItems: "center",
        }}
      >
        <View
          style={{
            width: wp(80),
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 24, color: "#484393", fontWeight: "bold" }}>
            {props.title}
          </Text>

          {props.subtitle && (
            <Text
              style={{
                fontSize: 12,
                color: "#00B0EB",
                fontWeight: "bold"
              }}
            >
              {props.subtitle}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={{
            width: wp(20),
          }}
          onPress={() => { props.profile() }}
        >
          <View style={{ height: 50, width: 50 }}>
            {/* <Image

              source={require("../../assets/png/icon.png")}
              style={{ height: "100%", width: "100%", borderRadius: 25 }}
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
};
export default PageDashboardHeader;
