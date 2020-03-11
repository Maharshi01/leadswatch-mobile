/* Created by Uday*/
/*on 04/10/2019 */
/**
 * last modified on 24/10/2019
 * Page="CreateBuyer"
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from "react-native";
import axios from "axios";
import EditImage from "../../assets/js/EditImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Container, Content, Card, CardItem } from "native-base";
import PageHeader from "../CustomComponents/PageHeader";

const CreateBuyer = props => {
  // State to store buyer Details
  const [buyerDetails, SetBuyerDetails] = useState(["", ""]);
  // States to Store Buyer Details
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [middlename, setMiddleName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [company, setCompany] = useState();
  //function to push buyer user details
  function save_details() {
    // Data to be posted to Database
    const data = {
      firstname: firstname,
      middlename: "",
      lastname: lastname,
      phone: phone,
      email: email,
      company: company
    };
    console.log("");
    if (firstname && lastname && email && phone && company) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === true) {
        console.log("Data", data);
        console.log(global.access_token);
        const config = {
          url: "https://api.leadswatch.com/api/v1/buyer/create",  //post Url
          data: data, //data to be posted
          method: "post",
          headers: {  //headers
            "Content-Type": "application/json",
            Authorization: "Bearer " + global.access_token
          }
        };
        console.log("hello");
        axios(config)
          .then(response => {
            console.log("CreateBuyerResponse", response);
            if (response.status == 200) {
              const variable = props.navigation.getParam("myfunc"); //Calling function to re-render in Buyers List Page
              variable();
              props.navigation.navigate("BuyerList", { success2: 1 }); // Navigation to back Screen After successful Creation
            }
          })
          .catch(error => {    // Error Message
            console.log("Errorinaddphone", error.response.data.error.sqlMessage);
            Alert.alert(
              "Alert",
              error.response.data.error.sqlMessage,
              [
                {
                  text: "ok",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "ok"
                }
              ],
              { cancelable: false }
            );
            console.log(error);
          });
      } else { // Email Validation
        Alert.alert(
          "Alert",
          "Email should be entered in Correct fromat.Ex:abc@gmail.com",
          [
            {
              text: "ok",
              onPress: () => console.log("Cancel Pressed"),
              style: "ok"
            }
          ],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Alert",
        "Please Fill All details",
        [
          {
            text: "ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "ok"
          }
        ],
        { cancelable: false }
      );
    }
  }
  // Function to validate Phone
  check_phone = value => {
    if (value.length == 10) {
      setPhone(value);
    } else if (value.length > 10) {
      Alert.alert("Phone Number Should be 10 digits");
    }
  };
  // function to handle firstname
  buyer_firstname = value => {
    setFirstName(value);
  };
  buyer_middlename = value => {
    setMiddleName(value);
  };
  // function to handle lastname
  buyer_lastname = value => {
    setLastName(value);
  };
  // function to handle Email
  buyer_email = value => {
    setEmail(value);
  };
   // function to handle Company
  buyer_company = value => {
    setCompany(value);
  };
  buyer_amount = value => {
    let array2 = [...buyerDetails];
    array2[6] = value;
    SetBuyerDetails(array2);
  };
  buyer_leads = value => {
    let array2 = [...buyerDetails];
    array2[7] = value;
    SetBuyerDetails(array2);
  };

  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      {/* PageHeader is a Header Compoent */}
      <PageHeader
        title="Buyer" 
        subtitle="Create Buyer"
        myfunc={() => {  // Function to Navigate to Back Screen
          props.navigation.navigate("BuyerList");
        }}
        profile={() => {  // Function to Navigate to ProfileDetails Page
          props.navigation.navigate("ProfileDetails");
        }}
      />
      <KeyboardAwareScrollView enableOnAndroid>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(6.6) }} />
            <View style={{ flexDirection: "column" }}>
              <View style={{ height: hp(2) }} />
              <View style={styles.container}>
                <View style={styles.backgroundContainer}>
                  <Image
                    source={require("../../assets/icon.jpg")}
                    resizeMode="cover"
                    style={styles.backdrop}
                  />
                </View>
                <View style={styles.overlay}>
                  <EditImage />
                </View>
              </View>
              <View style={{ height: hp(2) }} />
              {/* View displaying Firstname and Lastname email and phone */}
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: wp(42),
                    height: hp(6),
                    flexDirection: "row",
                    borderRadius: 25,
                    backgroundColor: "#FFFFFF"
                  }}
                >
                  <View style={{ width: wp(5) }} />
                  <TextInput
                    style={{ width: wp(40) }}
                    placeholder="First Name"
                    onChangeText={value => buyer_firstname(value)}
                  />
                </View>
                <View style={{ width: wp(2.66) }} />
                <View
                  style={{
                    width: wp(42),
                    height: hp(6),
                    borderRadius: 25,
                    flexDirection: "row",
                    backgroundColor: "#FFFFFF"
                  }}
                >
                  <View style={{ width: wp(5) }} />
                  <TextInput
                    style={{ width: wp(40) }}
                    placeholder="Last Name"
                    onChangeText={value => buyer_lastname(value)}
                  />
                </View>
              </View>
              <View style={{ height: hp(2) }} />
              <View
                style={{
                  width: wp(87),
                  height: hp(6),
                  borderRadius: 25,
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <View style={{ width: wp(5) }} />
                <TextInput
                  style={{ width: wp(85) }}
                  placeholder="Email Address"
                  onChangeText={value => buyer_email(value)}
                />
              </View>
              <View style={{ height: hp(2) }} />
              <View
                style={{
                  width: wp(87),
                  height: hp(6),
                  borderRadius: 25,
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <View style={{ width: wp(5) }} />
                <TextInput
                  placeholder="Company"
                  style={{ width: wp(85) }}
                  onChangeText={value => buyer_company(value)}
                />
              </View>
              <View style={{ height: hp(2) }} />
              <View
                style={{
                  width: wp(87),
                  height: hp(6),
                  borderRadius: 25,
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF"
                }}
              >
                <View style={{ width: wp(5) }} />
                <TextInput
                  style={{ width: wp(85) }}
                  placeholder="Phone"
                  onChangeText={value => check_phone(value)}
                />
              </View>
            </View>
          </View>
          <View style={{ height: hp(5) }} />
          {/* View Displaying Create Buyer Button */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(6.6) }} />
            <TouchableOpacity
               style={{
                width: wp(90.66),
                height: hp(7.211),
                backgroundColor: "#00B0EB",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={save_details}
            >
              <View style={{ width: wp(8) }} />

              <Text
                style={{
                  paddingTop: 15,
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "bold"
                }}
              >
                Create
              </Text>
              <View style={{ height: hp(2) }} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CreateBuyer;
// Styles for displaying Profile Image
var styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: wp(30),
    right: 0,
    width: 80,
    height: 80
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: 100,
    height: 100,
    borderRadius: 100,
    paddingBottom: 20
  },
  overlay: {
    width: wp(5),
    height: hp(3),
    left: 130
  },
  logo: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 15,
    height: 15,
    borderRadius: 100
  },
  backdrop: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    borderRadius: 40
  }
});
