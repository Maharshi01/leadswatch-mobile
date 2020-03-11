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
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import axios from "axios";
import { tsPropertySignature } from "@babel/types";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import MyButton from "../CustomComponents/MyButton";

import { Container, Content, Card, Root, Toast } from "native-base";
// import Edit from "../../assets/js/Edit"
import Delete from "../../assets/js/Delete";
import Edit from "../../assets/js/Edit";
import PageHeader from "../CustomComponents/PageHeader";
import Loader from "../Navigation/Loader";
const PublishersList = props => {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);
  const [fetching, setFetching] = useState(true);
  const fun = () => {
    console.log("in fun toast");
    Toast.show({
      text: "Succesfully Registered",
      textStyle: { textAlign: "center" },
      buttonText: "okay",
      duration: 5000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "10%" }
    });
  };
  function registration() {
    props.navigation.navigate("AddPublisher", {
      fun: fun,
      getPublishersList: getPublishersList
    });
  }

  const list_items = list.map(ele => (
    <Card
      key={ele.user_id}
      style={{
        flexDirection: "row",
        width: widthPercentageToDP(90),
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        elevation: 0,
        borderColor: "transparent"
      }}
    >
      <View
        style={{
          height: widthPercentageToDP(10),
          width: widthPercentageToDP(10),
          borderRadius: widthPercentageToDP(5)
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderRadius: widthPercentageToDP(5)
          }}
          source={require("../../assets/png/gunduBoss.png")}
        />
      </View>
      <View style={{ width: widthPercentageToDP(60) }}>
        <View style={{}}>
          <Text style={{ color: "#00B0EB", fontWeight: "bold" }}>
            {"    "}
            {ele.firstname} {ele.lastname}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text>{"    "}Status: </Text>
            {ele.active == 1 ? (
              <Text style={{ color: "#63E57D", fontWeight: "700" }}>
                Active
              </Text>
            ) : (
              <Text style={{ color: "#F53669", fontWeight: "700" }}>
                Inactive
              </Text>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("button clicked");
          props.navigation.navigate("PublisherById", {
            pubId: ele.id,
            getPublishersList: getPublishersList,
            showToast: showToast
          });
          console.log("am i still here");
        }}
      >
        <Edit></Edit>
      </TouchableOpacity>
      <Text style={{ width: widthPercentageToDP(5) }}></Text>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center" }}
        onPress={() => {
          //
          const data = {
            id: ele.id
          };
          const config = {
            url: `http://69.55.49.121:3003/api/v1/publisher/delete/${ele.id}`,
            // data: data,
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + global.access_token
            }
          };
          axios(config)
            .then(response => {
              console.log(response, "deleted a publisher");
              // console.log(response.data.data, 'publishers list');
              // setList(response.data.data);
              getPublishersList();
              // props.navigation.navigate('Dashboard')
              // console.log(response);
              // global.access_token = response.data.result.token;
            })
            .catch(error => {
              // setError('Please Enter Correct Login Credentials');
              console.log(error.response);
              console.log(error);
              console.log(error.response);
            });
          console.log("proceed to home screen");

          console.log("deleting the publisher");
        }}
      >
        <Delete height={15} width={15} />
      </TouchableOpacity>
    </Card>
  ));
  useEffect(() => {
    getPublishers = () => {
      const config = {
        url: "http://69.55.49.121:3003/api/v1/publisher/list",
        // data: data,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config)
        .then(response => {
          console.log(response);
          console.log(response.data.data, "publishers list");
          setList(response.data.data);
          setLoad(true);
          setFetching(false);
          // props.navigation.navigate('Dashboard')
          // console.log(response);
          // global.access_token = response.data.result.token;
        })
        .catch(error => {
          if (error.message == "Network Error") {
            Alert.alert(
              "Network Error",
              "Please try again after some time",
              [
                {
                  text: "Ok",
                  onPress: () => console.log("Netwrork problem")
                }
              ],
              { cancelable: false }
            );
          }
          console.log(error.response);
          Alert.alert(
            "error",
            error.response.data.error.message,
            [
              {
                text: "Ok",
                onPress: () => console.log("enter valid details")
              }
            ],
            { cancelable: false }
          );
          // setError('Please Enter Correct Login Credentials');
          console.log(error.response);
          console.log(error);
          console.log(error.response);
        });
      console.log("proceed to home screen");
    };
    getPublishers();
  }, []);

  const getPublishersList = () => {
    const config = {
      url: "http://69.55.49.121:3003/api/v1/publisher/list",
      // data: data,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log(response);
        console.log(response.data.data, "publishers list");
        setList(response.data.data);
        setLoad(true);
        // props.navigation.navigate('Dashboard')
        // console.log(response);
        // global.access_token = response.data.result.token;
      })
      .catch(error => {
        // setError('Please Enter Correct Login Credentials');
        console.log(error.response);
        console.log(error);
        console.log(error.response);
      });
    console.log("proceed to home screen");

    // value => this.verifyEmail(value)
  };
  const showToast = () => {
    console.log("hello toasty");

    console.log("showing toast");

    Toast.show({
      text: "Updated Succesfully",
      textStyle: { textAlign: "center" },
      buttonText: "okay",
      duration: 5000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "10%" }
    });
  };

  return (
    <Root>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F5F7",
          width: widthPercentageToDP(100)
        }}
      >
        <PageHeader
          title={"Publisher List"}
          myfunc={() => {
            props.navigation.navigate("Dashboard");
          }}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        ></PageHeader>

        <Content
        keyboardShouldPersistTaps={'handled'}
          style={{}}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",

            width: widthPercentageToDP(100)
          }}
        >
          <View style={{ height: heightPercentageToDP(2) }}></View>

          {fetching && <Loader />}
          {!fetching && list_items}

          <View style={{ height: heightPercentageToDP(4) }}></View>
        </Content>
        <View
          style={{
            position: "relative",

            bottom: heightPercentageToDP(2),
            width: widthPercentageToDP(90.66),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MyButton
            style={{
              width: widthPercentageToDP(90.66),
              height: heightPercentageToDP(7.211),
              backgroundColor: "#00B0EB",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            myfunc={() => registration()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Add Publisher{" "}
            </Text>
          </MyButton>
        </View>
      </Container>
    </Root>
  );
};
export default PublishersList;
