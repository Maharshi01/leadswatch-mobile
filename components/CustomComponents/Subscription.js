/**
 * Created by Uday on 12/09/2019
 * package =settings sub module Account Card on file
 *
 * last modified 12/09/2019
 *
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
  Button,
  Platform,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Toast,
  Root
} from "native-base";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';


// import CheckBox from "react-native-check-box";
import PageHeader from "../CustomComponents/PageHeader";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import moment from 'moment';

// const RAZOR_KEY = 'rzp_test_cnSufqUs3yzyIw';
// const PAY_URL = 'http://67.205.152.239:8002';

const Subscription = props => {
  const [checked, setChecked] = useState("false");

  const [fetching, setFetching] = useState(true);
  const [plans, setPlans] = useState([]);
  const[firstname,setFirstname]=useState();
  const[lastname,setLastname]=useState();
  const[email,setemail]=useState();
  const[phonenumber,setphonenumber]=useState();
//   const user_id =  SecureStore.getItemAsync("user_id")
// console.log("user_id",user_id)

  const [pay, setPay] = useState();
  const subscriptionStartData = days => {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var start = +new Date(year, month, day + 14);
    const start_at = start / 1000;
    return start_at;
  };

  const prorataAmount = amt => {
    const rate = amt / 30;
    const days = moment().daysInMonth() - moment().format('D');
    const amtToPay = (rate * days).toFixed(2);
    return amtToPay;
  };
  console.log("asd", global.user_id);

  const subscribe = async () => {
    setChecked("true")

    const start_at = subscriptionStartData(14);
    const payamt = prorataAmount(249);

    const addons = [
      {
        item: {
          name: 'Leadswatch Basic Plan - 249',
          amount: payamt * 100,
          currency: 'USD'
        }
      }
    ];

    try {
      const subscriptionPost = {
        plan_id:'plan_DewmPte2CZ73CQ',
        // "plan_DdxPmXD5UdORWP",//test
        //'plan_DewmPte2CZ73CQ',//live
        total_count: 60,
        start_at: start_at,
        addons: addons,
        notes: {
          plan_id:1,
          user_id:  global.user_id,
          amount: payamt * 100,
          payamt: payamt + ' (prorata)'
        },
        customer_notify: 1
      };

      console.log('subPost:', subscriptionPost);

      const response = await fetch(
        `https://api.razorpay.com/v1/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
            //'Basic cnpwX3Rlc3RfY25TdWZxVXMzeXp5SXc6RHp0dmd6V2hHbE1IVzd3bUZiZWJPdE45' //test mode
               'Basic cnpwX2xpdmVfRFYxQ1pLcVlFU2luY3o6a2o2OFpFU04xdHhScVBwT2Y0MWU5Q2dU'//live mode 
          },
          body: JSON.stringify(subscriptionPost)
        }
        
      );

      if (!response.ok) {
        console.log(await response.json());
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      console.log('subscription', resData);
      props.navigation.navigate('LeadsSubscribe', { pay: resData ,firstname:firstname,lastname:lastname,email:email,phonenumber:phonenumber});
    } catch (err) {
      // send to custom analytics server
      console.log('Error ', err);
      throw err;
    }
  };

  console.log(pay);

  useEffect(() => {
    const getdata = () => {
      const config = {
        url: "https://api.leadswatch.com/api/v1/user/plans-list",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };

      axios(config)
        .then(response => {
          setFetching(false);
          setPlans(response.data.data);

          console.log("response publishers", response);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getdata();
    const config1 = {
      url: "https://api.leadswatch.com/api/v1/user/detail/"+global.user_id.toString(),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };

    axios(config1)
      .then(response => {
        // setFetching(false);
        // setPlans(response.data.data);
        setFirstname(response.data.data.firstname);
        setLastname(response.data.data.lastname);
        setphonenumber(response.data.data.phone);
        setemail(response.data.data.email);
        console.log("response publishers", response);
      })
      .catch(error => {
        console.log(error);
      });

    
  }, []);
  const planSelected = value => {
    console.log("inside plan seleetd", value);
    setChecked("true")
   
    const config = {
      url: "https://api.leadswatch.com/api/v1/user/subscribe",
      //  data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };

    axios(config)
      .then(response => {
        console.log("response", response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const plans_list =
    plans.length > 0 ? (
      plans.map(plan => (
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {Platform.OS == "ios" ? (
        <View style={{borderColor:"black",borderWidth:1,height: 40,
        width: 40,
        borderRadius: 20,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',}}>
            <RadioButton
            style={{ alignItems: 'center',
        justifyContent: 'center',
      marginBottom:10}}
              // status={global.subscription == 1 ? checked : !checked}
              value={"true"}
            />
          </View>):( <View >
            <RadioButton
            style={{ alignItems: 'center',
        justifyContent: 'center',
      marginBottom:10}}
              // status={global.subscription == 1 ? checked : !checked}
              value={"true"}
            />
          </View>)}
          <View style={{ width: wp(3) }}></View>
          <View>
            <Text>{plan.name}</Text>
            <Text>{plan.description}</Text>
            <Text>Actuall:{plan.amount}</Text>
            <Text>Discount:{plan.discount_amount}</Text>
          </View>
        </View>
      ))
    ) : (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ color: "#A3A1C9", paddingTop: hp(20.73) }}>
          No Plans Yet....
        </Text>
      </View>
    );

  return (
    <Root>
      <Container>
        {/* <PageHeader
          title={"Subscription"}
          myfunc={() => {
            props.navigation.goBack(null);
          }}
          profile={() => {
            props.navigation.navigate("PublisherProfile");
          }}
        ></PageHeader> */}
        <Header
          style={{
            backgroundColor: "transparent",
            paddingTop: Platform.OS === "android" ? hp(4.5) : hp(4.5),
            // paddingBottom: Platform.OS === "android" ? hp(0.9) : hp(1),
            elevation: 0,
            borderBottomColor: "transparent",
            borderBottomWidth:0,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
             <View style={{height:hp(5)}}></View>
            <Text
              style={{ fontSize: 24, color: "#484393", fontWeight: "bold" }}
            >
              Subscription
            </Text>
            {/* <Text style={{font}}>Subscription</Text> */}
            <View style={{height:hp(5)}}></View>
          </View>
        </Header>
        <Content>
          {!fetching && (
            <View
              style={{
                width: wp(100),
                height: hp(100),
                justifyContent: "center",
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
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <RadioButton.Group
                    onValueChange={value => {
                      subscribe();
                    }}
                    value={checked}
                  >
                    {plans_list}
                  </RadioButton.Group>
                </View>
                <View style={{ height: hp(3) }}></View>

                <View>
                  <Text>CONTACT US</Text>
                </View>
                <View style={{ height: hp(1) }}></View>
                <View>
                  <Text>FISSION Info Tech</Text>
                </View>
                <View style={{ height: hp(1) }}></View>
                <View>
                  <Text>info@fission.it</Text>
                </View>
              </View>
            </View>
          )}

          {fetching && (
            <View>
              <Text> LOADING....</Text>
            </View>
          )}
        </Content>
      </Container>
    </Root>
  );
};
export default Subscription;
