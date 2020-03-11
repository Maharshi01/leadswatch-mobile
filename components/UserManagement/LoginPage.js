/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/

/*todo:
1.handle account deactivated
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
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Root, Toast, Container, Content } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
// import * as Keychain from 'react-native-keychain';
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import RightCircle from "../../assets/js/RightCircle";
import LeftCircle from "../../assets/js/LeftCircle";
import Logo from "../../assets/js/Logo";
import Logo1 from "../../assets/js/Logo1";
import Mail from "../../assets/js/Mail";
import Password from "../../assets/js/Password";
import MyButton from "../CustomComponents/MyButton";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
const LoginPage = props => {
  const [error, setError] = useState("");
  const [formValues, setForm] = useState(["", ""]);
  const [seePass, setSeePass] = useState(true);
  useEffect(() => {
    if (props.navigation.getParam("signup") == true) {
      console.log("showing toast");
      Toast.show({
        text: "Succesfully Registered",
        textStyle: { textAlign: "center" },
        buttonText: "",
        duration: 3000,
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
      });
      props.navigation.setParams({ signup: false });
    }
  }, []);
  Login = () => {
    if (formValues[0] == "" && formValues[1] == "") {
      setError("Please Enter Your Login Credentials");
    } else {
      const data = {
        email: formValues[0],
        password: formValues[1]
      };
      global.email = formValues[0];
      const config = {
        url: "https://api.leadswatch.com/api/v1/user/login",
        data: data,
        method: "post"
      };
      axios(config)
        .then(response => {
          console.log(response);
          global.access_token = response.data.data.token;
          console.log(global.access_token);
          global.email = formValues[0];
          global.user_id = response.data.data.id;
          global.role = response.data.data.role_id;
          global.publisher = response.data.data.publisher;
          global.subscription = response.data.data.subscription;
          global.loginT = true;
          storeDetails = async () => {
            console.log("storing variables");
            // Store the credentials
            const d = new Date();
            const currentDay = "" + d.getDay();
            const currentMonth = "" + d.getMonth();
            const currentHour = "" + d.getHours();
            const access_token = response.data.data.token;
            SecureStore.setItemAsync("day", currentDay);
            SecureStore.setItemAsync("month", currentMonth);
            SecureStore.setItemAsync("hour", currentHour);
            SecureStore.setItemAsync("at", access_token);
            SecureStore.setItemAsync("user_id", String(global.user_id));
            SecureStore.setItemAsync("role", String(global.role));
            SecureStore.setItemAsync("email", global.email);
            SecureStore.setItemAsync("subcription", String(global.subscription));

            // await Keychain.setGenericPassword(username, password);
          };
          storeDetails();
          console.log(global.user_id, "userid", global.role, "role");
          if (global.role == 2) {
            if (global.subscription == 0) {
              props.navigation.navigate("subcription", { login: true });
            } else {
              props.navigation.navigate("MainNav", { login: true });
            }
          } else {
            props.navigation.navigate("PublishNav", { login: true });
          }

          // console.log(response);
          // global.access_token = response.data.result.token;
        })
        .catch(error => {
          if (error.message == "Network Error") {
            setError("Try Again Later");
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
          } else if (
            error.response.data.error.message ===
            "Your account had been deactivated"
          ) {
            console.log(error.response);

            Alert.alert(
              "error",
              error.response.data.error.message,
              [
                {
                  text: "Ok",
                  onPress: () => console.log("account deactivated")
                }
              ],
              { cancelable: false }
            );
            setError("Contact Admin to start using the app again ");
            console.log(error.response);
            console.log(error);
          } else {
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
            setError(error.response.data.error.message);
            console.log(error.response);
            console.log(error);
          }
        });
      console.log("proceed to home screen");

      //here the sign up code should be written
    }
  };
  emailText = value => {
    let array2 = [...formValues];
    array2[0] = value;
    setForm(array2);
    setError("");
  }; //4C7AD6
  passText = value => {
    let array2 = [...formValues];
    array2[1] = value;
    setForm(array2);
    setError("");
  };
  return (
    <Root>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F5F7",
          width: wp(100)
        }}
      >
        <Content
          style={{}}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",

            width: wp(100)
          }}
        >
          <View
            style={{
              height: hp(23.974),
              width: wp(100),
              flexDirection: "row"
            }}
          >
            {/* <LogowithBg height={hp(26.974)} width={wp(100)}/> */}
            <View style={{ width: wp(15), justifyContent: "flex-end" }}>
              <LeftCircle />
            </View>
            {/* <View style={{width:wp(38),justifyContent:"center",alignItems:"center"}}>
            <Logo />
            <Text style={{color:"#484393",fontWeight:"bold"}}>L E A D S W A T C H</Text>
          </View> */}
            <View
              style={{
                width: wp(70),
                justifyContent: "center",
                alignItems: "flex-end",
                flexDirection: "row"
              }}
            >
              <Logo1 height={hp(15)} width={wp(30)} />
              <View
                style={{
                  flexDirection: "column",
                  height: hp(15),
                  width: wp(33),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: wp(7),
                    color: "#484393",
                    fontWeight: "bold"
                  }}
                >
                  LEADS{" "}
                </Text>

                <Text
                  style={{
                    fontSize: wp(7),
                    color: "#00B0EB",
                    fontWeight: "bold"
                  }}
                >
                  WATCH{" "}
                </Text>
              </View>
            </View>
            <View style={{ width: wp(15), alignItems: "flex-end" }}>
              <RightCircle />
            </View>
          </View>
          <View style={{ width: wp(86.933) }}>
            <Text style={{ height: hp(3) }} />
            <Text style={{ color: "#484393", fontWeight: "700" }}>
              Voila! glad to see you
            </Text>
            <Text style={{ height: hp(1.724) }} />
          </View>

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
              styles={{ width: wp(84) }}
              value1={formValues[0]}
              myfunc={this.emailText}
              placeholder="Email Address"
            />
            <Mail />
            <View style={{ width: 20 }} />
          </View>
          <Text></Text>
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
              secureTextEntry={seePass}
              styles={{ width: wp(84) }}
              value1={formValues[1]}
              myfunc={this.passText}
              placeholder="Password"
            />
            <TouchableOpacity onPress={() => setSeePass(!seePass)}>
              <Password />
            </TouchableOpacity>
            <View style={{ width: 20 }} />
          </View>
          <Text>{error}</Text>
          <View
            style={{
              width: wp(84),
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            {/* <TouchableOpacity
              onPress={() => console.log("hi")}>
              <Text style={{color: '#4C7AD6'}}>Remember Me</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgotPassword")}
            >
              <Text style={{ color: "#484393" }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Text></Text>
          <Text></Text>
          <MyButton myfunc={() => this.Login()}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          </MyButton>
          <Text></Text>
          <Text></Text>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => props.navigation.navigate("SignupPage")}
          >
            <Text style={{ color: "#484393" }}>New user? Signup</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    </Root>
  );
};
const styles = StyleSheet.create({});
export default LoginPage;
