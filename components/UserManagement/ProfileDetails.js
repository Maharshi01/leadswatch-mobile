// /*
// Created By Surya Teja
// Created on : 4th October 2019
// package:User Management
// Last MOdified : 7th October 2019

// */
// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import axios from 'axios';
// import EditProfile from './EditProfile';
// const ProfileDetails = () => {
//   const [list, setList] = useState([]);
//   useEffect(() => {
//     getPublishers = () => {
//       // const data = {
//       //   email: email,
//       //   member_type: 'p',
//       // };
//       const config = {
//         url: `https://api.leadswatch.com/api/v1/user/${global.user_id}`,
//         // data: data,
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + global.access_token,
//         },
//       };
//       axios(config)
//         .then(response => {
//           console.log(response);
//           console.log(response.data.data, 'user data');
//           setList(response.data.data);

//           // props.navigation.navigate('Dashboard')
//           // console.log(response);
//           // global.access_token = response.data.result.token;
//         })
//         .catch(error => {
//           // setError('Please Enter Correct Login Credentials');
//           console.log(error.response);
//           console.log(error);
//           console.log(error.response);
//         });
//       console.log('proceed to home screen');

//       // value => this.verifyEmail(value)
//     };
//     getPublishers();
//   }, []);

//   return (
//     <View style={{}}>
//       {list != [] && (
//         <View style={{flexDirection: 'column'}}>
//           <View
//             key={list.user_id}
//             style={{justifyContent: 'center', alignItems: 'center'}}>
//             <Text>Your email:{list.email}</Text>
//           </View>
//           <View style={{width: 10}} />
//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <View style={{flexDirection: 'row'}}>
//               <Text style={{fontWeight: 'bold'}}>Role: </Text>
//               <Text>{list.role_id == 2 ? 'Admin' : ''}</Text>
//             </View>
//           </View>
//         </View>
//       )}
//       {/* <Text>Hello profile</Text> */}
//     </View>
//   );
// };
// export default ProfileDetails;
import Dashboard from "../Dashboard";
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
  Button,
  Alert
} from "react-native";
import * as Permissions from 'expo-permissions';
import axios from "axios";
import { Toast, Root } from "native-base";
// import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
// import * as Keychain from 'react-native-keychain';
import Mail from "../../assets/js/Mail";
import Password from "../../assets/js/Password";
import BackArrow from "../../assets/js/BackArrow";
import Settings from "../../assets/js/Settings";
import Voucher from "../../assets/js/Voucher";
import { Container, Content } from "native-base";
import RightCircle from "../../assets/js/RightCircle";
import LeftCircle from "../../assets/js/LeftCircle";
import Logo from "../../assets/js/Logo";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ProfileDetails = props => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [success, setSuccess] = useState(true);
  const [errorBordername, setErrorBordername] = useState({
    borderColor: "red",
    borderWidth: 1,
    width: wp(42.133),
    color: "red"
  });
  const [errorBordername1, setErrorBordername1] = useState({
    borderColor: "red",
    borderWidth: 1,
    color: "red"
  });
  const [formStyle, setFormStyle] = useState({
    firstname: { width: wp(42.133) },
    // lastname: {width:wp(86.933)},
    lastname: { width: wp(42.133) },
    email: {},
    phoneNumber: {},
    password: "",
    confirmpassword: "",
    company: {},
    token: ""
  });
  const [fname, setfname] = useState(true);
  const [lname, setlname] = useState(true);

  function fun() {
    // if (props.navigation.getParam("toast") == 1) {
    Toast.show({
      text: "Password Changed Successfully!!!",
      textStyle: { textAlign: "center" },
      buttonText: "okay",
      duration: 5000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "10%" }
    });
    // }
  }
  function update() {
    const showToast = props.navigation.getParam("showToast1");
    console.log(showToast, "allahuakbar");
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
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config)
        .then(response => {
          // showToast()

          Toast.show({
            text: "Updated Details Successfully!!!",
            textStyle: { textAlign: "center" },
            buttonText: "okay",
            duration: 5000,
            position: "center",
            style: { backgroundColor: "rgba(0,0,0,0.5)", top: "10%" }
          });

          console.log("....", response);
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
          console.log(error.response);
        });
    } else {
      Alert.alert(
        "one or more fields are empty",
        "fill all details",
        [
          {
            text: "Ok",
            onPress: () => console.log("enter valid details")
          }
        ],
        { cancelable: false }
      );
    }
  }

  useEffect(() => {
    const id = global.user_id;
    const config = {
      url: `https://api.leadswatch.com/api/v1/user/detail/${id}`,
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
            console.log(response.data);
          }
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
    var regex = new RegExp("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$");

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
  handleCompany = value => {
    setCompany(value);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        company: errorBordername1
      });
      setFormStyle(jk1);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        company: { color: "black" }
      });
      setFormStyle(jk1);
    }
  };
  handlePhNo = value => {
    if (value.length < 11) {
      setPhone(value);
      if (value.length < 9) {
        let jk1 = Object.assign({}, formStyle, {
          phoneNumber: errorBordername1
        });
        setFormStyle(jk1);
      } else {
        let jk1 = Object.assign({}, formStyle, {
          phoneNumber: { color: "black" }
        });
        setFormStyle(jk1);
      }
    }
  };
  handleEmail = value => {
    setEmail(value);
    boolvalue = checkEmail(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        email: errorBordername1
      });
      setFormStyle(jk1);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        email: {}
      });
      setFormStyle(jk1);
    }
  };
  handleLastName = value => {
    setLastName(value);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        lastname: errorBordername
      });
      setFormStyle(jk1);
      setlname(false);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        lastname: { width: wp(42.333), color: "black" }
      });
      setFormStyle(jk1);
      setlname(true);
    }
  };
  handleFirstName = value => {
    setFirstName(value);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        firstname: errorBordername
      });
      setFormStyle(jk1);
      setfname(false);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        firstname: { width: wp(42.333), color: "black" }
      });
      setFormStyle(jk1);
      setfname(true);
    }
  };
  handleMiddleName = value => {
    setMiddleName(value);
    boolvalue = checkString(value);
    console.log(boolvalue);
    if (boolvalue == false) {
      let jk1 = Object.assign({}, formStyle, {
        middlename: errorBordername1
      });
      setFormStyle(jk1);
      setfname(false);
    } else {
      let jk1 = Object.assign({}, formStyle, {
        middlename: {}
      });
      setFormStyle(jk1);
      setfname(true);
    }
    if (value == "") {
      let jk1 = Object.assign({}, formStyle, {
        middlename: {}
      });
      setFormStyle(jk1);
    }
  };
  handleImage = async () => {
    console.log("In handke image")
    
    // handles the Camera Permissions
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // const permission = await Permissions.getAsync(Permissions.CAMERA);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log("nerperkec");
      // const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermission.status === "granted") {
        const response = await ImagePicker.launchCameraAsync({});
        console.log("ImageUploading", response);
        const uri = response.uri;
        let picdata = new FormData();
        picdata.append("picture", {
          uri: uri,
          name: "image.jpg",
          type: "multipart/form-data"
        });
        picdata.append("id", global.user_id);
        const config = {
          url: "https://api.leadswatch.com/api/v1/file/user/upload",
          method: "post",
          data: picdata,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
          }
        };
        axios(config)
          .then(response => {
            console.log("Imageupload", response);
          })
          // Error handling
          .catch(error => {
            console.log("ImageUploaderror1", error);
            console.log("ImageUploaderror123", error.response);
            // alert(error.response.data.error.message);
          });
      }
    }
    console.log("handle image button clicked");
    // To Launch Camera after permissions
    
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
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          enableOnAndroid
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: hp(28.586),
              width: wp(100),
              backgroundColor: "white"
            }}
          >
            <View style={{ height: hp(5.295), width: wp(100) }}>
              <View style={{ height: hp(3.325) }} />
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
                  style={{ flexDirection: "row" }}
                >
                  {/* <Text style={{ width: 20 }}></Text>
                <Text>Back</Text> */}
                  <View style={{ width: wp(4.8) }}></View>
                  <View>
                    <BackArrow height="13" width="16" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("SettingsScreen", { fun: fun });
                  }}
                  style={{ flexDirection: "row", paddingRight: wp(6.5) }}
                >
                  <View>
                    <Settings />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  height: wp(26),
                  width: wp(26),
                  borderRadius: wp(13),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {handleImage()}}
                  style={{ height: wp(25), width: wp(25) }}
                >
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: wp(12.5)
                    }}
                    source={{
                      uri: `https://api.leadswatch.com/api/v1/file/user/${global.user_id}/26/26`
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: hp(27) - hp(6) - hp(13),
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 24, color: "#484393" }}>
                  {firstname} {middlename} {lastname}
                </Text>
                <Text style={{ color: "#00B0EB" }}>Admin</Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
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
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <MyButton
              style={{ backgroundColor: "#00B0EB" }}
              myfunc={() => update()}
            >
              <Text style={{ color: "white" }}>Update Details</Text>
            </MyButton>
            <View style={{ height: hp(4) }} />
            <MyButton
              style={{ backgroundColor: "#00B0EB" }}
              myfunc={() => props.navigation.navigate("InvitedUsers")}
            >
              <Text style={{ color: "white" }}>
                Invite Publishers to your Team
              </Text>
            </MyButton>

            <View style={{ height: hp(4) }}></View>
            <MyButton
              style={{ backgroundColor: "#F53669" }}
              myfunc={() => {
                logmeout = async () => {
                  // await Keychain.resetGenericPassword();
                  console.log("tadaaaa");
                  SecureStore.deleteItemAsync("at");
                  SecureStore.deleteItemAsync("user_id");
                  SecureStore.deleteItemAsync("role");
                  SecureStore.deleteItemAsync("day");
                  SecureStore.deleteItemAsync("month");
                  SecureStore.deleteItemAsync("email");
                  SecureStore.deleteItemAsync("hour");
                  props.navigation.navigate("LoginPage");
                };
                logmeout();
              }}
            >
              <Text style={{ color: "white" }}>Logout</Text>
            </MyButton>
          </View>
          <View style={{ height: hp(2) }}></View>
        </KeyboardAwareScrollView>
      </Container>
    </Root>
  );
};

export default ProfileDetails;
