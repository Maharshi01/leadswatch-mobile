/* Created by Uday*/
/* on 04/10/2019 */
/**name=Buyer Contacts CREATEPAGE
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
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import EditImage from "../../assets/js/EditImage";
import { Container, Content, Card, CardItem } from "native-base";
import PageHeader from "../CustomComponents/PageHeader";
const CreateBuyerContact = props => {
  const [buyer, setBuyer] = useState([]);
  // FUNCTION TO POST DATA TO DATABASE
  function save_details() {
    if (
      buyerDetails[0] &&
      buyerDetails[2] &&
      buyerDetails[3] &&
      buyerDetails[4] &&
      buyerDetails[5]
    ) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (buyerDetails[3].length == 10) {
        if (reg.test(buyerDetails[4])) {
          //data to be posted
          const data = {
            buyer_id: props.navigation.getParam("id"),
            firstname: buyerDetails[0],
            middlename: buyerDetails[1],
            lastname: buyerDetails[2],
            phone: buyerDetails[3],
            email: buyerDetails[4],
            jobrole: buyerDetails[5],
            type: "m"
          };
          console.log("Data", data);
          console.log(global.access_token);
          const config = {
            url: "https://api.leadswatch.com/api/v1/buyer/contacts/create", //post Url
            data: data, //data to be posted
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + global.access_token
            }
          };
          console.log("hello");
          axios(config)
            .then(response => {
              if (response.status == 200) {
                console.log("Buyercontact create response", response);
                const variable = props.navigation.getParam("myfunc"); // function to re-render after succesful creation
                variable();
                props.navigation.navigate("BuyerContacts", { success4: 1 });
              }
            })
            .catch(error => {
              console.log("Errorinaddphone", error.response.data.error.message);
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
          "Phone Number should be 10 digits and shouldn't contain alphabets!!",
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
  const [buyerDetails, SetBuyerDetails] = useState(["", ""]);

  buyer_firstname = value => {
    let array2 = [...buyerDetails];
    array2[0] = value;
    SetBuyerDetails(array2);
  };
  buyer_middlename = value => {
    let array2 = [...buyerDetails];
    array2[1] = value;
    SetBuyerDetails(array2);
  };
  buyer_lastname = value => {
    let array2 = [...buyerDetails];
    array2[2] = value;
    SetBuyerDetails(array2);
  };
  buyer_contact = value => {
    let array2 = [...buyerDetails];
    array2[3] = value;
    SetBuyerDetails(array2);
  };
  buyer_email = value => {
    let array2 = [...buyerDetails];
    array2[4] = value;
    SetBuyerDetails(array2);
  };
  buyer_jobrole = value => {
    let array2 = [...buyerDetails];
    array2[5] = value;
    SetBuyerDetails(array2);
  };

  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      {/* Header component */}
      <PageHeader
        title="Buyer"
        subtitle="Create Buyer Contact"
        myfunc={() => {
          props.navigation.navigate("BuyerContacts");
        }}
        profile={() => {
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
                  style={{ width: wp(85) }}
                  placeholder="JobRole"
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
                  style={{ width: wp(85) }}
                  placeholder="Phone"
                  onChangeText={value => buyer_contact(value)}
                />
              </View>
            </View>
          </View>
          <View style={{ height: hp(5) }} />
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
              {/* <View style={{ width: wp(8) }} /> */}

              <Text
                style={{
                  paddingTop: 15,
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "bold"
                }}
              >
                Create Buyer Contact
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

export default CreateBuyerContact;
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
