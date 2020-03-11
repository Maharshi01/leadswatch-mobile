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
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
import PageHeader from "../CustomComponents/PageHeader";
// import * as Keychain from 'react-native-keychain';
import Mail from "../../assets/js/Mail";
import Password from "../../assets/js/Password";
import Phone from "../../assets/js/Phone";
import Company from "../../assets/js/Company";
import Voucher from "../../assets/js/Voucher";
import { Container, Content } from "native-base";
import RightCircle from "../../assets/js/RightCircle";
import LeftCircle from "../../assets/js/LeftCircle";
import Logo from "../../assets/js/Logo";

const SettingsScreen = props => {
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [pass, setpass] = useState("");
  const [pass2, setpass2] = useState("");
  const [message, setmessage] = useState("");
  useEffect(() => {
    setEmail(global.email);
  }, []);

  verifyEmail = str => {
    if (pass != "" && pass2 != "" && otp != "") {
      if (pass == pass2) {
        //check for valid email id and set the error messages
        // https://api.shadow.properties/user/reset-password
        const data = {
          email: email,
          password: otp,
          newpassword: pass
        };
        const config = {
          url: "https://api.leadswatch.com/api/v1/user/change-password",
          data: data,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + global.access_token
          }
        };
        axios(config)
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              const variable = props.navigation.getParam("fun");
              variable();
              props.navigation.navigate("ProfileDetails");
            }

            console.log("Successully changed password");
          })
          .catch(error => {
            // setError('Please Enter Correct Login Credentials');

            console.log(error);
            console.log(error.response);
          });
        console.log("proceed to home screen");

        setmessage("a link has been sent to your email for password reset");
      } else {
        // Alert.alert("Passwords Are not equal");
        Alert.alert(
          "Alert",
          "Passwords Are Not Equal",
          [
            {
              text: "ok",
              onPress: () => console.log("Cancel Pressed"),
              style: "ok"
            }
          ],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Alert",
        "Enter Valid Fields",
        [
          {
            text: "ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "ok"
          }
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F5F7",
        width: wp(100)
      }}
    >
      {/* <View
        style={{
          // backgroundColor: "red",
          width: wp(100),
          height: hp(10.62),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      > */}
      <PageHeader
        title={"Settings"}
        subtitle={"Change Password"}
        myfunc={() => {
          props.navigation.navigate("ProfileDetails");
        }}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>
      {/* </View> */}
      <Content
      keyboardShouldPersistTaps={'handled'}
        style={{}}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",

          width: wp(100)
        }}
      >
        <View style={{ height: wp(8) }} />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: wp(86.933),
              height: hp(5.911),
              backgroundColor: "white",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextInputWithIcon
              secureTextEntry={true}
              value1={otp}
              myfunc={setotp}
              placeholder="Enter Old Password"
            />
            {/* <Mail /> */}
          </View>
          <View style={{ height: wp(4) }} />
          <View
            style={{
              flexDirection: "row",
              width: wp(86.933),
              height: hp(5.911),
              backgroundColor: "white",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextInputWithIcon
              secureTextEntry={true}
              value1={pass}
              myfunc={setpass}
              placeholder="Enter New Password"
            />

            {/* <Mail /> */}
          </View>

          <View style={{ height: wp(4) }} />
          <View
            style={{
              flexDirection: "row",
              width: wp(86.933),
              height: hp(5.911),
              backgroundColor: "white",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextInputWithIcon
              //  styles={{width:wp(42.133)}}
              secureTextEntry={true}
              value1={pass2}
              myfunc={setpass2}
              placeholder="Re-Enter Password"
            />
          </View>
          <View style={{ height: wp(8) }} />
          <MyButton
            style={{
              width: wp(90.66),
              height: hp(7.211),
              backgroundColor: "#00B0EB",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            myfunc={() => this.verifyEmail()}
          >
            <Text style={{ color: "white" }}>Continue</Text>
          </MyButton>

          <View style={{ height: wp(4) }} />
        </View>
      </Content>
    </Container>
  );
};

export default SettingsScreen;
