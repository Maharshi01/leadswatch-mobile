import  React, { useState, useEffect } from 'react';
import { WebView, View,Dimensions } from 'react-native';
import axios from "axios";
import * as SecureStore from "expo-secure-store";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const LeadsSubscribe = props => {
  const pay = props.navigation.getParam('pay');
  const RAZOR_KEY = 'rzp_live_DV1CZKqYESincz';
  //'rzp_test_cnSufqUs3yzyIw'//test
  //'rzp_live_DV1CZKqYESincz';//live
  const PAY_URL = 'https://api.leadswatch.com/api/v1/user/';
  //'http://67.205.152.239:8002/'
  //'https://api.leadswatch.com/api/v1/user/';
  const subId = pay.id;
  const { firstname, lastname, email, phone } = {
    firstname: props.navigation.getParam('firstname'),
    lastname: props.navigation.getParam('lastname'),
    email: props.navigation.getParam('email'),
    phone: props.navigation.getParam('phonenumber')
  };
  const access_token =  SecureStore.getItemAsync("at")
  let paymentStatus = null;

  const _onMessage = data => {
    console.log("RESPONSE",data);
  };

  const _onLoad = state => {
    console.log("stateurl",state.url);
    if (state.url.indexOf(PAY_URL + 'razorpay') != -1) {

    }
    if (state.url.indexOf('?status=authorized') != -1) {
      console.log('Payment Successfull');

      paymentStatus = 1;
      SecureStore.setItemAsync("subcription", String(paymentStatus));
      props.navigation.navigate('MainNav');

  //  const data ={
    
  //     "plan_id": 1,
  //     "razorpay_plan_id": "plan_00000000000001",
  //     "razorpay_sub_id": "sub_00000000000001",
  //     "razorpay_payment_id": "pay_29QQoUBi66xm2f",
  //     "amount": 1,
  //     "user_id":9
  // };
  //     const config = {
  //       url: "https://api.leadswatch.com/api/v1/user/razorpay",
  //       data: data,
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " +access_token
  //       }
  //     };
  // console.log("suchihpinnuru",config);
  //     axios(config)
  //       .then(response => {
  //         console.log("response", response);
  //         SecureStore.setItemAsync("subcription", String(paymentStatus));

          
  //         props.navigation.navigate('MainNav');
          
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });

    }
    if (state.url.indexOf('?status=failed') != -1) {
      console.log('Payment Failed');
     
      paymentStatus = 0;
      SecureStore.setItemAsync("subcription", String(paymentStatus));

      props.navigation.navigate("subcription");
    }

    
    

    }
    

  const name = firstname + ' ' + lastname;
  const description="Standard Subscription";
  const qs = `rzp_key=${RAZOR_KEY}&subId=${subId}&name=${name}&description=${description}&email=${email}&phone=${phone}`;
  const url =`${PAY_URL}subscribe?${qs}`;
  console.log("url",url);
  return (
    <WebView
      source={{
        uri: url
      }}
      style={{ marginTop: 20, width: deviceWidth,
        height: deviceHeight }}
      useWebKit={true}
      scalesPageToFit={false}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onNavigationStateChange={_onLoad}
      onMessage={_onMessage}
    />
    // <WebView useWebKit={true} source={{url: 'https://www.google.com'}} />

  );
}

export default LeadsSubscribe;
