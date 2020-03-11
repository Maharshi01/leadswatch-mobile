/* Created by Uday*/
/* on 04/10/2019 */
/**name=Buyer Contacts EditPAGE
 * last modified on 24/10/2019
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditImage from "../../assets/js/EditImage";
import PageHeader from "../CustomComponents/PageHeader";
import { Container, Content, Card, CardItem } from "native-base";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";

const EditBuyerContact = props => {
  // States to handle details
  const [firstname, setFirstName] = useState(
    props.navigation.getParam("firstname")
  );
  const [lastname, setLastName] = useState(
    props.navigation.getParam("lastname")
  );
  const [middlename, setMiddleName] = useState(
    props.navigation.getParam("middlename")
  );
  const [phone, setPhone] = useState(props.navigation.getParam("contact"));
  const [email, setEmail] = useState(props.navigation.getParam("email"));
  const [jobrole, setJobRole] = useState(props.navigation.getParam("jobrole"));
  function delete_buyer_contact() {
    const config = {
      url:
        "https://api.leadswatch.com/api/v1/buyer/contacts/delete/" +
        props.navigation.getParam("contact_id"),

      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };

    axios(config)
      .then(response => {
        console.log("BuyerContactListdelete", response);
        if (response.status == 200) {
          const variable = props.navigation.getParam("myfunc");
          variable();
          props.navigation.navigate("BuyerContacts", { success2: 1 });
        }
      })
      .catch(error => {
        console.log("BuyerContactDeleteerror", error);
      });
  }
  // function to post data to database
  function save_details() {
    if (
      firstname != "" &&
      lastname != "" &&
      phone != "" &&
      email != "" &&
      jobrole != ""
    ) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (phone.length == 10) {
        if (reg.test(email) == true) {
          // data to be posted
          const data = {
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            phone: phone,
            email: email,
            jobrole: jobrole,
            type: "m",
            active: 1
          };
          console.log("Data", data);
          console.log(global.access_token);
          const config = {
            url:
              "https://api.leadswatch.com/api/v1/buyer/contacts/update/" + //Update Url
              props.navigation.getParam("contact_id"),
            data: data, //data to be posted
            method: "put",
            headers: {
              //headers
              "Content-Type": "application/json",
              Authorization: "Bearer " + global.access_token
            }
          };
          console.log("hello");
          axios(config)
            .then(response => {
              if (response.status == 200) {
                console.log("Editcontact", response);
                const variable = props.navigation.getParam("myfunc"); // Function call to re-render in Contacts Page
                variable();
                props.navigation.navigate("BuyerContacts", { success5: 1 });
              }
            })
            .catch(error => {
              console.log("Errorinaddphone", error.response.data.error.message);
              Alert.alert(
                "Alert",
                error.response.data.error.message,
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
        } else {
          Alert.alert(
            "Alert",
            "Email Should be in Correct Format.For Example abc@example.com",
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
          "Phone number should be 10 digits without alphabets",
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
  // Functions to handle Details
  buyer_firstname = value => {
    setFirstName(value);
  };
  buyer_middlename = value => {
    setMiddleName(value);
  };
  buyer_lastname = value => {
    setLastName(value);
  };
  buyer_contact = value => {
    setPhone(value);
  };
  buyer_email = value => {
    setEmail(value);
  };
  buyer_jobrole = value => {
    setJobRole(value);
  };
  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      {/* Header Component */}
      <PageHeader
        title="Buyer"
        subtitle="Update Contact Details"
        myfunc={() => {
          props.navigation.navigate("BuyerContacts");   // Function to navigate to back screen
        }}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      />
      <KeyboardAwareScrollView enableOnAndroid>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(6.6) }} />
            {/* View displaying Profile Image */}
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
             {/* View displaying Textinputs to fill details */}
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
                    value={firstname}
                    onChangeText={value => buyer_firstname(value)}
                  />
                </View>
                <View style={{ width: wp(2.666) }} />
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
                    value={lastname}
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
                  value={email}
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
                  style={{ width: wp(85) }}
                  placeholder="JobRole"
                  value={jobrole}
                  onChangeText={value => buyer_jobrole(value)}
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
                  style={{ width: wp(40) }}
                  placeholder="Phone"
                  value={phone}
                  onChangeText={value => buyer_contact(value)}
                />
              </View>
            </View>
          </View>
          <View style={{ height: hp(4) }} />
          {/* View displaying button */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(6.6) }} />
            <TouchableOpacity
              style={{
                backgroundColor: "#00B0EB",
                borderRadius: 28,
                width: wp(87),
                justifyContent: "center",
                alignItems: "center",
                height: hp(6)
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
                Update Buyer Contact
              </Text>
              <View style={{ height: hp(2) }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: hp(40) }} />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default EditBuyerContact;
// Styles for profile Image
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
