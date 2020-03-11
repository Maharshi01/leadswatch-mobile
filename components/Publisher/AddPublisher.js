/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/
/*Todo:
1)Validation for Signup function
2)Error validation color for text inputs
3)add svg impages at end of each text input
4) remove error messages after adding border color
*/
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Loader from "../Navigation/Loader";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import LogowithBg from "../../assets/js/LogowithBg";
import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
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
import PageHeader from "../CustomComponents/PageHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const AddPublisher = props => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    phoneNumber: "",
    // password: '',
    //confirmpassword: '',
    company: ""
    //token: "",
  });
  const [errorValues, setErrorValues] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    phoneNumber: "",
    // password: '',
    //confirmpassword: '',
    company: ""
    // token: "",
  });
  const [load, setLoad] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [seeCPass, setSeeCPass] = useState(true);
  const [errorBorder, setErrorBorder] = useState({
    borderColor: "red",
    borderWidth: 1,
    color: "red"
  });
  const [errorBordername, setErrorBordername] = useState({
    borderColor: "red",
    borderWidth: 1,
    width: wp(42.133),
    color: "red"
  });
  const [errorFont, setErrorFont] = useState({ color: "red" });
  const [formStyle, setFormStyle] = useState({
    firstname: { width: wp(42.133) },
    lastname: { width: wp(86.933) },
    middlename: { width: wp(42.133) },
    email: "",
    phoneNumber: "",
    // password: '',
    // confirmpassword: '',
    company: ""
    //token: "",
  });

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

  SignUp = () => {
    if (
      errorValues.email != "" ||
      (errorValues.firstname != "" &&
        errorValues.lastname != "" &&
        errorValues.middlename != "" &&
        errorValues.phoneNumber != "" &&
        errorValues.company != "")
    ) {
      Alert.alert(
        "Enter Valid Details",
        "One or More of the details entered is invalid",
        [
          {
            text: "Ok",
            onPress: () => console.log("enter valid details")
          }
        ],
        { cancelable: false }
      );
    } else if (
      formValues.email != "" &&
      formValues.firstname != "" &&
      formValues.lastname != "" &&
      formValues.phoneNumber != ""
    ) {
      const data = {
        firstname: formValues.firstname,
        middlename: formValues.middlename,
        lastname: formValues.lastname,
        email: formValues.email,
        phone: formValues.phoneNumber,
        company: formValues.company
      };
      console.log("data", data);
      const config = {
        url: "http://69.55.49.121:3003/api/v1/publisher/create",
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

          console.log("success");
          const variable1 = props.navigation.getParam("fun");
          variable1();
          const variable = props.navigation.getParam("getPublishersList");
          variable();

          props.navigation.navigate("PublishersList");
        })
        .catch(error => {
          console.log(formValues, "haha");

          console.log(error);
          console.log(error.message, "msg");
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

          console.log(error.response.data.error.message);
          console.log("Error Signing up");
        });
    } else {
      Alert.alert(
        "Form Values cannot be empty",
        "Enter all details",
        [
          {
            text: "Ok",
            onPress: () => console.log("enter valid details")
          }
        ],
        { cancelable: false }
      );
    }
  };

  handleCode = value => {
    let jk = Object.assign({}, formValues, { token: value });
    setFormValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      token: {}
    });
    setFormStyle(jk1);
  };
  handleCompany = value => {
    let jk = Object.assign({}, formValues, { company: value });
    setFormValues(jk);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk = Object.assign({}, errorValues, {
        company: "Enter Valid Name"
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        company: errorBorder
      });
      setFormStyle(jk1);
    } else {
      let jk = Object.assign({}, errorValues, {
        company: ""
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        company: {}
      });
      setFormStyle(jk1);
    }
  };
  handlePhNo = value => {
    if (value.length < 11) {
      let jk = Object.assign({}, formValues, {
        phoneNumber: value
      });
      setFormValues(jk);
      boolvalue = checkEmail(value);
      if (value.length < 9) {
        let jk = Object.assign({}, errorValues, {
          phoneNumber: "Enter Valid Phone Number"
        });
        setErrorValues(jk);
        let jk1 = Object.assign({}, formStyle, {
          phoneNumber: errorBorder
        });
        setFormStyle(jk1);
      } else {
        let jk = Object.assign({}, errorValues, {
          phoneNumber: ""
        });
        setErrorValues(jk);
        let jk1 = Object.assign({}, formStyle, {
          phoneNumber: {}
        });
        setFormStyle(jk1);
      }
    } else {
      Alert.alert("Phone number Should be 10");
    }
  };
  handleEmail = value => {
    let jk = Object.assign({}, formValues, { email: value });
    setFormValues(jk);
    boolvalue = checkEmail(value);
    if (boolvalue == false) {
      let jk = Object.assign({}, errorValues, {
        email: "Enter Valid email"
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        email: errorBorder
      });
      setFormStyle(jk1);
    } else {
      let jk = Object.assign({}, errorValues, {
        email: ""
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        email: {}
      });
      setFormStyle(jk1);
    }
  };
  handleLastName = value => {
    let jk = Object.assign({}, formValues, { lastname: value });
    setFormValues(jk);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk = Object.assign({}, errorValues, {
        lastname: "Enter Valid LastName"
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        lastname: errorBorder
      });
      setFormStyle(jk1);
    } else {
      let jk = Object.assign({}, errorValues, {
        lastname: ""
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        lastname: {}
      });
      setFormStyle(jk1);
    }
  };
  handleFirstName = value => {
    let jk = Object.assign({}, formValues, { firstname: value });
    setFormValues(jk);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk = Object.assign({}, errorValues, {
        firstname: "Enter Valid First Name"
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        firstname: errorBordername
      });
      setFormStyle(jk1);
    } else {
      let jk = Object.assign({}, errorValues, {
        firstname: ""
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        firstname: { width: wp(42.333) }
      });
      setFormStyle(jk1);
    }
  };
  handleMiddleName = value => {
    let jk = Object.assign({}, formValues, { middlename: value });
    setFormValues(jk);
    boolvalue = checkString(value);
    if (boolvalue == false) {
      let jk = Object.assign({}, errorValues, {
        middlename: "Enter Valid Name"
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        middlename: errorBordername
      });
      setFormStyle(jk1);
    } else {
      let jk = Object.assign({}, errorValues, {
        middlename: ""
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        middlename: { width: wp(42.333) }
      });
      setFormStyle(jk1);
    }
    if (value == "") {
      let jk = Object.assign({}, errorValues, {
        middlename: ""
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
        middlename: { width: wp(42.333) }
      });
      setFormStyle(jk1);
    }
  };
  // useEffect(()=>{

  // })

  return load ? (
    <Loader />
  ) : (
    <Container style={{ backgroundColor: "#F4F5F7" }}>
      <PageHeader
        title={"Add Publisher"}
        myfunc={() => {
          props.navigation.navigate("PublishersList");
        }}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>

      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            height: hp(100),
            width: wp(100),
            alignItems: "center"
            // justifyContent: "center"
          }}
        >
          <View style={{ width: wp(86.933) }}>
            <Text style={{ height: hp(3) }} />
            <Text style={{ color: "#484393", fontWeight: "700" }}>
              Add Publisher!
            </Text>
            <Text style={{ height: hp(1.724) }} />
          </View>
          {/* ************************************************** */}
          {/* ************************************************** */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <MyTextInput
                styles={formStyle.firstname}
                value1={formValues["firstname"]}
                myfunc={handleFirstName}
                placeholder="First Name"
              />
              <Text></Text>
              {/* <Text>{errorValues.firstname}</Text> */}
            </View>
            <View style={{ width: wp(2.666) }} />
            <View style={{ flexDirection: "column" }}>
              <MyTextInput
                styles={formStyle.middlename}
                value1={formValues["middlename"]}
                myfunc={handleMiddleName}
                placeholder="Middle Name"
              />
              <Text></Text>
              {/* <Text>{errorValues.middlename}</Text> */}
            </View>
          </View>
          <MyTextInput
            styles={formStyle.lastname}
            value1={formValues["lastname"]}
            myfunc={handleLastName}
            placeholder="Last Name"
          />
          <Text></Text>
          {/* <Text>{errorValues.lastname}</Text> */}
          <View
            style={[
              {
                flexDirection: "row",
                width: wp(86.933),
                height: hp(5.911),
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              },
              formStyle.email
            ]}
          >
            <TextInputWithIcon
              styles={{}}
              value1={formValues.email}
              myfunc={handleEmail}
              placeholder="Email"
            />
            <Mail />
            <View style={{ width: 20 }} />
          </View>
          <Text></Text>
          {/* <Text>{errorValues.email}</Text> */}
          {/* <View style={{flexDirection:"row"}}>
            <View style={{flexDirection:"column"}}>
              <View style={[{flexDirection:"row",width:wp(42.133),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.password]}>
           <TextInputWithIcon
         
            styles={{}}
            secureTextEntry={seePass}
            value1={formValues.password}
            myfunc={handlePassword}
            placeholder={"Password"}
            />
            <TouchableOpacity onPress={()=>{
              if(seePass==true)
              setSeePass(false)
              else
              setSeePass(true)
            }}>
            <Password />
            </TouchableOpacity>
            <View style={{width:20}} />
            </View>
            <Text></Text>
          
          </View>
          <View style={{width:wp(2.666)}} />
          <View style={{flexDirection:"column"}}>
            <View style={[{flexDirection:"row",width:wp(42.133),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.confirmpassword]}>
            <TextInputWithIcon
        
            styles={{}}
            secureTextEntry={seeCPass}
            value1={formValues['confirmpassword']}
            myfunc={handleConfirmPassword}
            placeholder={"ConfirmPassword"}
            />
            <TouchableOpacity onPress={()=>{
              if(seeCPass==true)
              setSeeCPass(false)
              else
              setSeeCPass(true)
            }}>
            <Password />
            </TouchableOpacity>
            <View style={{width:25}} />
            </View>
            <Text></Text>
          
          </View>
          </View> */}

          <View
            style={[
              {
                flexDirection: "row",
                width: wp(86.933),
                height: hp(5.911),
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              },
              formStyle.phoneNumber
            ]}
          >
            <TextInputWithIcon
              styles={{}}
              value1={formValues["phoneNumber"]}
              myfunc={handlePhNo}
              placeholder="Phone Number"
              keyboardType="number-pad"
            />
            <Phone />
            <View style={{ width: 20 }} />
          </View>
          <Text></Text>
          {/* <Text>{errorValues.phoneNumber}</Text> */}
          <View
            style={[
              {
                flexDirection: "row",
                width: wp(86.933),
                height: hp(5.911),
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              },
              formStyle.company
            ]}
          >
            <TextInputWithIcon
              styles={{}}
              value1={formValues["Company"]}
              myfunc={handleCompany}
              placeholder="Company"
            />
            <Company />
            <View style={{ width: 20 }} />
          </View>
          <Text></Text>
          {/* <Text>{errorValues.company}</Text> */}
          {/* <View style={[{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.token]}>
             <TextInputWithIcon
             styles={{}}
            value1={formValues['token']}
            myfunc={handleCode}
            placeholder={"Invite Code"}
            />            
            <Voucher />
            <View style={{width:20}} />
            </View> */}
          <Text></Text>
          {/* <Text>{errorValues.token}</Text> */}

          <View
            style={{
              bottom: hp(2),
              width: wp(90.66),
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end"
            }}
          >
            <MyButton
              style={{
                width: wp(90.66),
                height: hp(7.211),
                backgroundColor: "#00B0EB",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
              myfunc={() => this.SignUp()}
            >
              <Text style={{ color: "white" }}>Create Publisher</Text>
            </MyButton>
          </View>
          {/* <View style={{ height: 30 }}></View> */}
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AddPublisher;
