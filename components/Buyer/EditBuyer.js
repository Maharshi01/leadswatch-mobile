/* Created by Uday*/
/*on 04/10/2019 */
/**
 * last modified on 24/10/2019
 *  Page="EditBuyer"
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
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
import EditImage from "../../assets/js/EditImage";
import PageHeader from "../CustomComponents/PageHeader";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Container, Content, Card, CardItem } from "native-base";
const EditBuyer = props => {
  const [buyerDetails, SetBuyerDetails] = useState(["", ""]);
  // Details sent through props to Edit
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
  const [company, setCompany] = useState(props.navigation.getParam("company"));
  const [photo, setPhoto] = useState();
  // useEffect(() => {
  //   // Camera Permissions
  //   console.log("iam here in useffect doing nothing");
  //   perm = async () => {
  //     const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  //     console.log(permission, "youdie");
  //     if (permission.status !== "granted") {
  //       const newPermission = await Permissions.askAsync(
  //         Permissions.CAMERA_ROLL
  //       );
  //       if (newPermission.status === "granted") {
  //         console.log("Granted");
  //       }
  //     }
  //   };
  //   perm();
  // }, []);
  function delete_buyer() {
    const config = {
      url:
        "https://api.leadswatch.com/api/v1/buyer/delete/" +
        props.navigation.getParam("id"),

      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerListdelete", response);
        if (response.status == 200) {
          const variable = props.navigation.getParam("myfunc");
          variable();
          props.navigation.navigate("BuyerList", { success2: 1 });
        }
      })
      .catch(error => {
        console.log("BuyerListDeleteerror", error);
      });
  }
  // Function to post to database
  function save_details() {
    // Data to be posted
    const data = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      phone: phone,
      email: email,
      company: company,
      active: 1
    };
    console.log("Data", data);
    console.log(global.access_token);
    if (firstname != "" && lastname != "" && email != "" && phone != "") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (phone.length == 10) {
        if (reg.test(email) === true) {
          const config = {
            url:
              "https://api.leadswatch.com/api/v1/buyer/update/" + //Update Url
              props.navigation.getParam("id"),
            data: data, // Data to be posted
            method: "put",
            headers: {
              // Headers
              "Content-Type": "application/json",
              Authorization: "Bearer " + global.access_token
            }
          };
          console.log("hello");
          axios(config)
            .then(response => {
              if (response.status == 200) {
                const variable = props.navigation.getParam("myfunc"); // Function to re-render
                variable();
                props.navigation.navigate("BuyerList", { success3: 1 }); // Navigation to back Screen
              }
            })
            .catch(error => {
              //Error handling
              console.log("Errorinaddphone", error);
              Alert.alert(
                "Alert",
                error.response.data.error.message[
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
          "Phone number should be 10 digits and shouldn't contain alphabets",
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
  // function to handle firstname
  buyer_firstname = value => {
    setFirstName(value);
  };
  // function to handle lastname
  buyer_lastname = value => {
    setLastName(value);
  };
  // function to handle Phone
  buyer_contact = value => {
    setPhone(value);
  };
  // function to handle email
  buyer_email = value => {
    setEmail(value);
  };
  // function to handle company
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
  handleImage = async () => {
    // handles the Camera Permissions
    const permission = await Permissions.getAsync(Permissions.CAMERA);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermission.status === "granted") {
        //its granted.
        console.log("handle image button clicked");
    // To Launch Camera after permissions
    const response = await ImagePicker.launchCameraAsync({});
    console.log("ImageUploading", response);
    const uri = response.uri;
    let picdata = new FormData();
    picdata.append("picture", {uri: uri, name: 'image.jpg', type: 'multipart/form-data'});
    picdata.append("id", props.navigation.getParam("id"));
    const config = {
      url: "https://api.leadswatch.com/api/v1/file/buyer/upload",
      method: "post",
      data: picdata,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json"
      }
    };
    axios(config)
      .then(response => {
        console.log("Imageupload", response);
      })
      // Error handling
      .catch(error => {
        console.log("ImageUploaderror1", error);
        // alert(error.response.data.error.message);
      });
      }
    }
    else{
      const response = await ImagePicker.launchCameraAsync({});
      console.log("ImageUploading", response);
      const uri = response.uri;
      let picdata = new FormData();
      picdata.append("picture", {uri: uri, name: 'image.jpg', type: 'multipart/form-data'});
      picdata.append("id", props.navigation.getParam("id"));
      const config = {
        url: "https://api.leadswatch.com/api/v1/file/buyer/upload",
        method: "post",
        data: picdata,
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        }
      };
      axios(config)
        .then(response => {
          console.log("Imageupload", response);
        })
        // Error handling
        .catch(error => {
          console.log("ImageUploaderror1", error);
          // alert(error.response.data.error.message);
        });
    }
    
  };

  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      {/* PageHeader is a Header Component */}
      <PageHeader
        title="Buyer"
        subtitle="Update Buyer Details"
        myfunc={() => {
          props.navigation.navigate("BuyerList"); // To navigate to back screen
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
                   source={{uri: `https://api.leadswatch.com/api/v1/file/buyer/${props.navigation.getParam('id')}/26/26`
                  }}
                    resizeMode="cover"
                    style={styles.backdrop}
                  />
                </View>
                <View style={styles.overlay}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Helooooooooooooo");
                      handleImage();
                    }}
                  >
                    <EditImage />
                  </TouchableOpacity>
                </View>
              </View>

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
                  placeholder="Company"
                  value={company}
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
                  value={phone}
                  onChangeText={value => buyer_contact(value)}
                />
              </View>
            </View>
          </View>
          <View style={{ height: hp(5) }} />
          {/* View to display Button */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(6.6) }} />
            <TouchableOpacity
              style={{
                width: wp(87),
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
                Update
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
export default EditBuyer;
// Styles to display Profile pic
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
    borderRadius: 80,
    paddingBottom: 20
  },
  overlay: {
    width: wp(5),
    height: hp(3),
    left: wp(34)
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
