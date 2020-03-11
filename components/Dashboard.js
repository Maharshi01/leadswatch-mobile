/*
Created By Suchith Ponnuru
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
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Container,
  Content,
  Root,
  Toast
} from 'native-base';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
//import LoginNav from "./components/Navigation/LoginNav"
// import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';
import DashCardLeads from './CustomComponents/DashCardLeads'
import DashCardBuy from './CustomComponents/DashCardBuy'
import DashCardToLeads from './CustomComponents/DashCardToLeads'
import DashCardCampaign from './CustomComponents/DashCardCampaign'
import DashCardPub from './CustomComponents/DashCardPub'
import DashCardVert from './CustomComponents/DashCardVert'
import PageDashboardHeader from './CustomComponents/PageDashboardHeader'
// import PageDashboardHeader from './Navigation/Loader'
import axios from "axios";
import Loader from './Navigation/Loader';

const Dashboard = props => {
  const [data, setData] = useState("")
  const [load, setLoad] = useState(true)
  
  useEffect(() => {
    const config = {
      url: `https://api.leadswatch.com/api/v1/dashboard/admin`,
      // data: data,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + global.access_token,
      },
    };
    axios(config)
      .then(response => {

        console.log(response.data.data, 'Dashboard details');
        setData(response.data.data);
        setTimeout(() => setLoad(false), 5000)
          ;
      })
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            'Network Error',
            "Please try again after some time",
            [
              {
                text: 'Ok',
                onPress: () => console.log('Netwrork problem'),
              },
            ],
            { cancelable: false },
          );
        }
        console.log(error.response);
        Alert.alert(
          'error',
          error.response.data.error.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log('enter valid details'),
            },
          ],
          { cancelable: false },
        );
        console.log(error.response);
        console.log(error);
        console.log(error.response);
      });
  }, [])
  useEffect(() => {
    const config = {
      url: `https://api.leadswatch.com/api/v1/dashboard/admin`,
      // data: data,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + global.access_token,
      },
    };
    axios(config)
      .then(response => {

        console.log(response.data.data, 'Dashboard details');
        setData(response.data.data);
        
          ;
      })
      .catch(error => {
        if (error.message == "Network Error") {
          Alert.alert(
            'Network Error',
            "Please try again after some time",
            [
              {
                text: 'Ok',
                onPress: () => console.log('Netwrork problem'),
              },
            ],
            { cancelable: false },
          );
        }
        console.log(error.response);
        Alert.alert(
          'error',
          error.response.data.error.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log('enter valid details'),
            },
          ],
          { cancelable: false },
        );
        console.log(error.response);
        console.log(error);
        console.log(error.response);
      });
  }, [props.navigation.getParam('date')])
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
  showToast1=() => {
    console.log("hello toasty")
      
        console.log("showing toast")

        Toast.show({
          text: "Updated Succesfully",
          textStyle: { textAlign: 'center' },
          buttonText: 'okay',
          duration: 5000,
          position: 'center',
          style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '10%' },
        })
        
      
    }
  return load ? (
    <Root>
      <Loader content={"your DashBoard is being built , please wait"} />
    </Root>
  ) : (
      <Root style={{marginTop:20,paddingTop:20,backgroundColor:"red"}}>
        <Container style={{backgroundColor:"#F3F4F7", justifyContent: 'center', width: widthPercentageToDP(100), }}>
    <PageDashboardHeader title={"Dashboard"} profile={() => { props.navigation.navigate('ProfileDetails',{showToast1:this.showToast1}) }}></PageDashboardHeader>
          <Content
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:"#F3F4F7",
            }}>
           
            <View style={{ height: 30 }} />
            <DashCardToLeads content={data.total_leads} />
            <View style={{ height: heightPercentageToDP(6) }} />
            <DashCardLeads content={data.avg_leads} />
            <View style={{ height: heightPercentageToDP(6) }} />
            <DashCardCampaign content={data.campaigns} />
            <View style={{ height: heightPercentageToDP(6) }} />
            <DashCardPub content={data.publishers} />
            <View style={{ height: heightPercentageToDP(6) }} />
            <DashCardBuy content={data.buyers} />
            <View style={{ height: heightPercentageToDP(6) }} />
            
            <View style={{ height: 30 }} />
          </Content>
        </Container>
      </Root>
    );

};

export default Dashboard;
