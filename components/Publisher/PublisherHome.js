/* created by D.satwik
  Created on 10/4/2019
  modified on 10/4/2019

  DashBoard of the Publisher

*/

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import DashCardToLeads from '../CustomComponents/DashCardToLeads';
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
import Loader from "../Navigation/Loader";
import DashCardLeads from "../CustomComponents/DashCardLeads";
import DashCardCampaign from "../CustomComponents/DashCardCampaign";
import PageDashboardHeader from "../CustomComponents/PageDashboardHeader";
import axios from "axios";

const PublisherHome = props => {
  const [data, setData] = useState("");
  const [load, setLoad] = useState(true);
  const [fetching,setFecthing] = useState(true);
  useEffect(() => {
    console.log("in use effect ");
    if (props.navigation.getParam("login") == true) {
      console.log("showing toast");

      Toast.show({
        text: "Login Successful",
        textStyle: { textAlign: "center" },
        buttonText: "",
        duration: 3000,
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
      });
      props.navigation.setParams({ login: false });
    }
  }, []);
  useEffect(() => {
    console.log("reporting when load is ", load)
    if (load == false) {
      console.log("loginT is",global.loginT)
      if (global.loginT == true && load==false) {
        console.log("showing toast")

        Toast.show({
          text: "Login Successful",
          textStyle: { textAlign: 'center' },
          buttonText: 'okay',
          duration: 5000,
          position: 'center',
          style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '10%' },
        })
        global.loginT=false
      }
    }

  }, [load])

  useEffect(() => {
    const config = {
      url: `https://api.leadswatch.com/api/v1/dashboard/publisher`,
      // data: data,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log(response.data.data, "Dashboard details");
        setData(response.data.data);
        setFecthing(false);
        setTimeout(() => setLoad(false), 3000);
      })
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            "Network Error",
            "Please try again after some time",
            [
              {
                text: "Ok",
                onPress: () => console.log("Network problem")
              }
            ],
            { cancelable: false }
          );
        }
        console.log(error.response);
        // Alert.alert(
        //   "error",
        //   error.response.data.error.message,
        //   [
        //     {
        //       text: "Ok",
        //       onPress: () => console.log("enter valid details")
        //     }
        //   ],
        //   { cancelable: false }
        // );
        // console.log(error.response);
        // console.log(error);
        // console.log(error.response);
      });
  }, [props.navigation.getParam('date')]);
  function myfunctoast() {
    if (props.navigation.getParam("success") == 1) {
      Toast.show({
        text: "Successfully Updated Publisher Details",
        buttonText: "",
        duration: 5000,
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
      });
      props.navigation.setParams({ success: 0 });
    }
  }
  return load ? (
    <Root>
      {/* <View>
        <View style={{ height: hp(35) }} />
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View> */}
      <Loader/>
      {/* <Loader content={"your DashBoard is being built , please wait"}/> */}
    </Root>
  ) : (
    <Root>
      <Container
        style={{
          backgroundColor: "#F3F4F7" ,
          justifyContent: "center",
          alignItems: "center",
          width: wp(100)
        }}
      >
        
            <PageDashboardHeader
              title={"Dashboard"}
              profile={() => {
                props.navigation.navigate("PublisherProfile");
              }}
            ></PageDashboardHeader>
          

        {myfunctoast()}
        <Content
        keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{
            backgroundColor: "#F3F4F7" ,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
         
         <View style={{ height: 30 }} />
            <DashCardToLeads content={data.total_leads} />
          <View style={{ height: 50 }} />
          <DashCardLeads content={data.avg_leads} />
          {/* <View style={{ height: 40 }} />
          <DashCardCampaign content={data.avg_campaigns} /> */}

          <View style={{ height: 40 }} />
        </Content>
      </Container>
    </Root>
  );
};

export default PublisherHome;
