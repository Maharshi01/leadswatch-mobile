

import Dashboard from '../Dashboard'
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Platform,
  Button,

  Alert
} from "react-native";
import axios from "axios";
import { Toast, Root } from 'native-base';
import Loader from "../Navigation/Loader";
// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
// import * as Keychain from 'react-native-keychain';
import Mail from "../../assets/js/Mail"
import Password from "../../assets/js/Password"
import BackArrow from "../../assets/js/BackArrow"
import Settings from "../../assets/js/Settings"
import Voucher from "../../assets/js/Voucher"
import { Container, Content } from 'native-base';
import RightCircle from "../../assets/js/RightCircle"
import LeftCircle from "../../assets/js/LeftCircle"
import Logo from "../../assets/js/Logo"
import * as SecureStore from 'expo-secure-store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const PublisherProfile = props => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [success, setSuccess] = useState(true);
  const [errorBordername, setErrorBordername] = useState({ borderColor: "red", borderWidth: 1, width: wp(42.133), color: "red" });
  const [errorBordername1, setErrorBordername1] = useState({ borderColor: "red", borderWidth: 1, color: "red" });
  const [fetching, setFetching] = useState(true);
  const [formStyle, setFormStyle] = useState({
    firstname: { width: wp(42.133) },
    // lastname: {width:wp(86.933)},
    lastname: { width: wp(42.133) },
    email: {},
    phoneNumber: {},
    password: '',
    confirmpassword: '',
    company: {},
    token: "",
  });
  const [fname, setfname] = useState(true)
  const [lname, setlname] = useState(true);


  function fun() {
    // if (props.navigation.getParam("toast") == 1) {
    Toast.show({
      text: 'Password Changed Successfully!!!',
      buttonText: '',
      duration: 2000,
      position: 'center',
      style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '20%' },
    });
    // }
  }
  function update() {
    const showToast = props.navigation.getParam(
      'showToast1',
    );
    console.log(showToast, "allahuakbar")
    if (firstname && lastname && phone && email && company) {
      // console.log(formStyle)

      const id = global.user_id;

      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        company: company,
        middlename: middlename,
        active: 1
      };
      const config = {
        url: `https://api.leadswatch.com/api/v1/user/update/${id}`,

        data: data,
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + global.access_token
        }
      };
      axios(config)
        .then(response => {
          // showToast()

          Toast.show({
            text: 'Updated Details Successfully!!!',
            buttonText: '',
            duration: 2000,
            position: 'center',
            style: { backgroundColor: 'rgba(0,0,0,0.5)', top: '20%' },
          });


          console.log("....", response)
          // Alert.alert(
          //   'Succesfull',
          //   "Profile has Updated Succesfully",
          //   [
          //     {
          //       text: 'Ok',
          //       onPress: () => console.log('Profile updated'),
          //     },
          //   ],
          //   { cancelable: false },
          // );
          // props.navigation.navigate('Pro');
        })
        .catch(error => {
          if (error.message == "Network Error") {
            Alert.alert(
              'Network Error',
              "Please try again after some time",
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('Network problem'),
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
        });
    }


    else {
      Alert.alert(
        'one or more fields are empty',
        "fill all details",
        [
          {
            text: 'Ok',
            onPress: () => console.log('enter valid details'),
          },
        ],
        { cancelable: false },
      );
    }

  }

  useEffect(() => {

    const id = global.user_id;
    const config = {
      url: `https://api.leadswatch.com/api/v1/user/${id}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };

    axios(config)
      .then(response => {
        console.log("response", response);
        if (response && response.data.data) {
          if (response.data.status_code == 200) {
            setSuccess(true);

            console.log(response.data)
          }
          setFetching(false);
          setFirstName(response.data.data.firstname);
          setMiddleName(response.data.data.middlename);
          setLastName(response.data.data.lastname);
          setCompany(response.data.data.company);
          setPhone(response.data.data.phone);
          setEmail(response.data.data.email);
        }

        console.log("response of publisher", response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  checkString = str => {
    var regex = new RegExp('^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$');

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  handleCompany = (value) => {
    setCompany(value)
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        company: errorBordername1,
      });
      setFormStyle(jk1);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        company: { color: "black" },
      });
      setFormStyle(jk1);
    }
  }
  handlePhNo = (value) => {
    if (value.length < 11) {
      setPhone(value)
      if (value.length < 9) {
        let jk1 = Object.assign({}, formStyle, {
          phoneNumber: errorBordername1,
        });
        setFormStyle(jk1);
      } else {
        let jk1 = Object.assign({}, formStyle, {
          phoneNumber: { color: "black" },
        });
        setFormStyle(jk1);
      }
    }
  }
  handleEmail = (value) => {
    setEmail(value)
    boolvalue = checkEmail(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        email: errorBordername1,
      });
      setFormStyle(jk1);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        email: {},
      });
      setFormStyle(jk1);
    }
  }
  handleLastName = (value) => {
    setLastName(value)
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        lastname: errorBordername,
      });
      setFormStyle(jk1);
      setlname(false)
    } else {
      let jk1 = Object.assign({}, formStyle, {
        lastname: { width: wp(42.333), color: "black" },
      });
      setFormStyle(jk1);
      setlname(true)
    }
  }
  handleFirstName = (value) => {
    setFirstName(value)
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        firstname: errorBordername,
      });
      setFormStyle(jk1);
      setfname(false)
    } else {
      let jk1 = Object.assign({}, formStyle, {
        firstname: { width: wp(42.333), color: "black" },
      });
      setFormStyle(jk1);
      setfname(true)
    }
  }
  handleMiddleName = (value) => {
    setMiddleName(value)
    boolvalue = checkString(value);
    console.log(boolvalue)
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        middlename: errorBordername1,
      });
      setFormStyle(jk1);
      setfname(false)
    } else {
      let jk1 = Object.assign({}, formStyle, {
        middlename: {},
      });
      setFormStyle(jk1);
      setfname(true)
    }
    if (value == "") {
      let jk1 = Object.assign({}, formStyle, {
        middlename: {},
      });
      setFormStyle(jk1);

    }
  }


  return (
    <Root>
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#F4F5F7",
          width: wp(100),
        }}>

        {fetching &&
          <Loader />

        }
        {!fetching && <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{
            width: wp(100), backgroundColor: "white",
            paddingTop: Platform.OS === 'android' ? hp(4.5) : hp(4.5),
            paddingBottom: Platform.OS === 'android' ? hp(0.9) : hp(1),

          }}>
            <View style={{ width: wp(100) }}>
              {/* <View style={{ height: hp(3.325) }} /> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.goBack(null);
                  }}
                  style={{ flexDirection: "row" }}>
                  {/* <Text style={{ width: 20 }}></Text>
                <Text>Back</Text> */}
                  <View style={{ width: wp(4.8) }}></View>
                  <View>
                    <BackArrow

                      height="17"
                      width="17"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { props.navigation.navigate("PublisherSettings", { fun: fun }) }}
                  style={{ flexDirection: "row", paddingRight: wp(6.5) }}
                >
                  <View>
                    <Settings
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ height: wp(26), width: wp(26), borderRadius: wp(13), justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{ height: wp(25), width: wp(25) }}>
                  <Image style={{ height: '100%', width: "100%", borderRadius: wp(12.5) }} source={require("../../assets/png/gunduBoss.png")} />
                </TouchableOpacity>
              </View>
              <View style={{ height: hp(27) - hp(6) - hp(13), justifyContent: "space-around", alignItems: "center" }}>
                <Text style={{ fontSize: 24, color: "#484393" }}>
                  {firstname} {middlename} {lastname}
                </Text>
                <Text style={{ color: "#00B0EB" }}>
                  Publisher
            </Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  marginLeft: "4%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <View style={{ flexDirection: "row" }}>


                  <View style={{ height: 20 }} />
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ height: hp(2) }}></Text>
                        <MyTextInput
                          styles={formStyle.firstname}
                          value1={firstname}
                          myfunc={handleFirstName}
                          placeholder="First Name"
                        />
                        <Text></Text>
                        {/* <Text>{errorValues.middlename}</Text> */}
                      </View>
                      <View style={{ width: wp(1) }} />
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ height: hp(2) }}></Text>
                        <MyTextInput
                          styles={formStyle.lastname}
                          value1={lastname}
                          myfunc={handleLastName}
                          placeholder="Last Name"
                        />
                        <Text></Text>
                        {/* <Text>{errorValues.middlename}</Text> */}
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <MyTextInput
                        styles={formStyle.middlename}
                        value1={middlename}
                        myfunc={handleMiddleName}
                        placeholder="Middle Name"
                      />
                      <Text></Text>
                      {/* <Text>{errorValues.middlename}</Text> */}
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <MyTextInput
                        styles={formStyle.email}
                        value1={email}
                        myfunc={handleEmail}
                        placeholder="Email"
                      />
                      <Text></Text>
                      {/* <Text>{errorValues.middlename}</Text> */}
                    </View>

                    <View style={{ flexDirection: "column" }}>
                      <MyTextInput
                        styles={formStyle.company}
                        value1={company}
                        myfunc={handleCompany}
                        placeholder="Company"
                      />
                      <Text></Text>
                      {/* <Text>{errorValues.middlename}</Text> */}
                    </View>

                    <View style={{ flexDirection: "column" }}>
                      <MyTextInput
                        styles={formStyle.phoneNumber}
                        value1={phone}
                        myfunc={handlePhNo}
                        placeholder="phone"
                      />
                      <Text></Text>
                      {/* <Text>{errorValues.middlename}</Text> */}
                    </View>
                  </View>

                </View>
              </View>
            </View>

          </View>
          <View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
            <MyButton style={{ backgroundColor: "#00B0EB" }} myfunc={() => update()}>
              <Text style={{ color: "white" }}>Update Details</Text>
            </MyButton>
            {/* <View style={{ height: hp(4) }} /> */}
            {/* <MyButton style={{ backgroundColor: "#00B0EB" }} myfunc={() => props.navigation.navigate("InvitedUsers")}>
              <Text style={{ color: "white" }}>Invite Publishers to your Team</Text>
            </MyButton> */}



            <View style={{ height: hp(2) }}></View>
            <MyButton style={{ backgroundColor: "#F53669" }} myfunc={() => {
              logmeout = async () => {
                // await Keychain.resetGenericPassword();
                console.log("tadaaaa")
                SecureStore.deleteItemAsync('at')
                SecureStore.deleteItemAsync('user_id')
                SecureStore.deleteItemAsync('role')
                SecureStore.deleteItemAsync('day')
                SecureStore.deleteItemAsync('month')
                SecureStore.deleteItemAsync('email')
                SecureStore.deleteItemAsync('hour')
                props.navigation.navigate('LoginPage');
              };
              logmeout()
            }}>
              <Text style={{ color: "white" }}>Logout</Text>
            </MyButton>
          </View>
          <View style={{ height: hp(14) }}></View>
        </KeyboardAwareScrollView>



        }
      </Container>

    </Root>

  );
};

export default PublisherProfile;