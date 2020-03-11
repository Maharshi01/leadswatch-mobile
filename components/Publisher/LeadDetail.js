// /* created by D.satwik
//   Created on 10/4/2019
//   modified on 10/4/2019

//   Property Details of Each Property

// */


import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Textarea,
  Button
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import PageHeader from "../CustomComponents/PageHeader";
// import Back from '../../assets/svg/back.svg';
// import Profile from '../../assets/svg/Profile.svg';
import MyButton from "../CustomComponents/MyButton";

const LeadDetail = props => {
  const [deal, setCampaigns] = useState();

  return (
    <Container style={{ width: wp(100), backgroundColor: "#F0F0F0" }}>
      <Content keyboardShouldPersistTaps={'handled'}>

        <PageHeader
          title={"Lead"}
          myfunc={() => {
            props.navigation.goBack(null);
          }}
          profile={() => {
            props.navigation.navigate("PublisherProfile");
          }}
        ></PageHeader>


        <View style={{ height: hp(2.46) }} />

        <View style={{ height: hp(1.72) }}></View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: wp(92)
            }}
          >
            <Card
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: wp(90.66),
                borderRadius: 4,
                borderColor: "transparent",
                elevation: 0,
              }}
            >
              <View style={{ height: hp(1.5) }}></View>
              <View
                style={{
                  width: wp(92),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <View style={{ width: wp(1.94) }}></View>

                <View style={{ width: wp(4) }}></View>
                <View style={{ width: wp(70) }}>
                  <Text style={{ color: "#00B0EB", fontWeight: "700" }}>
                    {props.navigation.getParam("firstname")}{" "}
                    {props.navigation.getParam("lastname")}
                  </Text>
                </View>
              </View>
              <View style={{ height: hp(1.5) }}></View>
              <CardItem
                style={{
                  width: wp(85),
                  borderRadius: 12,
                  backgroundColor: "#F4F5F7",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      First Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("firstname")}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      Last Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("lastname")}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Buyer Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("buyer_name")}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Campaign Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("campaign_name")}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Publisher Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("publisher_name")}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Vertical Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("vertical_name")}
                    </Text>
                  </View>
                </View>
                <View style={{ height: hp(2) }}></View>
                <View
                  style={{
                    width: wp(85),
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#FFFFFF",
                        backgroundColor: "#484393",
                        borderRadius: 4,
                        padding: 3,
                        textAlign: "center"
                      }}
                    >
                      Status
                    </Text>

                    <Text style={{ fontSize: 12, color: "#38383B" }}>
                      {props.navigation.getParam("status") == 1
                        ? "success"
                        : "Failed"}
                    </Text>
                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                  <View style={{ width: wp(3) }}></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#FFFFFF",
                        backgroundColor: "#484393",
                        borderRadius: 4,
                        padding: 3,
                        textAlign: "center"
                      }}
                    >
                      Price
                    </Text>
                    <Text style={{ fontSize: 12, color: "#38383B" }}>
                      {props.navigation.getParam("price")}
                    </Text>

                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                  <View style={{ width: wp(3) }}></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#FFFFFF",
                        backgroundColor: "#484393",
                        borderRadius: 4,
                        padding: 3,
                        textAlign: "center"
                      }}
                    >
                      Cost
                    </Text>
                    <Text style={{ fontSize: 12, color: "#38383B" }}>
                      {props.navigation.getParam("cost")}
                    </Text>
                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                </View>
              </CardItem>
              <View style={{ height: hp(1.5) }}></View>
              <CardItem
                style={{
                  width: wp(85),
                  borderRadius: 12,
                  backgroundColor: "#F4F5F7",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "2%"
                }}
              >
                <View style={{ height: hp(0.5) }}></View>
                <Text
                  style={{
                    // fontSize: 12,
                    // color: "#FFFFFF",
                    // backgroundColor: "#484393",
                    // borderRadius: 4,
                    // padding: 3,
                    // textAlign: "center"
                    fontWeight: "700",
                    color: "#9B9B9B",
                    fontSize: 14,
                    marginLeft: "2%",
                    // fontWeight: "700",
                    textAlign: "center"
                  }}
                >
                  Reason
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {props.navigation.getParam("response")}
                </Text>
                <View style={{ height: hp(1.5) }}></View>
              </CardItem>
              <View style={{ height: hp(1.5) }}></View>
            </Card>
          </View>
        </View>

        <View style={{ height: hp(15) }}></View>
      </Content>
    </Container>
  );
};
export default LeadDetail;
