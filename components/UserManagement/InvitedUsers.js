/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
// import InviteBg from "../../assets/png/InviteBg"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { Container, Content } from 'native-base';
import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import PageHeader from "../CustomComponents/PageHeader";

const InvitedUsers = props => {
  const [email, setEmail] = useState('');
  const [errorBorder, setErrorBorder] = useState({borderColor:"red",borderWidth:1,color:"red"});
  const [s ,setS]=useState({color:"black"});
  sendInvite = () => {

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(email)) {


      const data = {
        email: email,
        member_type: 'p',
      };
      const config = {
        url: 'https://api.leadswatch.com/api/v1/user/invite',
        data: data,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.access_token,
        }
      };
      axios(config)
        .then(response => {

          Alert.alert(
            'Invited successfully',
            "They will join your team once they accept the invite",
            [
              {
                text: 'Ok',
                onPress: () => console.log('successfully invited'),
              },
            ],
            { cancelable: false },
          );
          console.log(response);
          props.navigation.navigate('Dashboard')
        })
        .catch(error => {
          Alert.alert(
            'Invitation Failed',
            (error.response.data.error.message) ? error.response.data.error.message : "Try again later",
            [
              {
                text: 'Ok',
                onPress: () => console.log('enter valid details'),
              },
            ],
            { cancelable: false },
          );
          console.log(error);
          console.log(error.response);
        });
      console.log('proceed to home screen');
    }
    else {
      Alert.alert("Enter Valid Email");
    }



    // value => this.verifyEmail(value)
  }
  checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  handleEmail=(value)=>{
  setEmail(value)
  boolvalue = checkEmail(value);
  if (boolvalue == false) {
    
    setS(errorBorder)
  } else {
    setS({color:"black"})
  }
}
  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F4F5F7",
        width: wp(100),
      }}>

          <PageHeader
            title={"Invite Publisher"}
            profile={() => {
              props.navigation.navigate("ProfileDetails");
            }}
            myfunc={() => {
              props.navigation.navigate("ProfileDetails");
            }}
            ></PageHeader>
    
      <Content
      keyboardShouldPersistTaps={'handled'}
        style={{}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',

          width: wp(100),
        }}>
          
        <View style={{ height: hp(34.48), width: wp(85.66) }}>
          <Image style={{ height: "100%", width: "100%" }} source={require("../../assets/png/InviteBg.png")}></Image>
        </View>


        <View style={{ height: wp(5.333) }} />
        <View style={{}}>
          <MyTextInput
            styles={s}
            value1={email}
            myfunc={handleEmail}
            placeholder="Email Address Of The Person You Want To Invite!!"
          />
        </View>
        <View style={{ height: hp(3.446) }} />
        <MyButton style={{ width: wp(43.46), height: hp(5.911), backgroundColor: '#00B0EB' }} myfunc={() => this.sendInvite()}>
          <Text style={{ color: "white" }}>Send Invite</Text>
        </MyButton>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({});
export default InvitedUsers;
