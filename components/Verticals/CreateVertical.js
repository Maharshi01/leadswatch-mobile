import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Card,
  CardItem,
  Textarea,
  Right,
  Footer,
  Toast,
  Body
} from "native-base";
import MyButton from "../CustomComponents/MyButton";
import PageHeader from "../CustomComponents/PageHeader";

import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import BackArrow from "../../assets/js/BackArrow";
// import LinearGradient from 'react-native-linear-gradient';
export default function CreateVertical(props) {
  const [vertical, HandleVerticalName] = useState("");
  const [verticaldesc, HandleVerticalDesc] = useState("");
  const [verticalurl, HandleVerticalUrl] = useState("");
  function VerticalMainPage() {
    props.navigation.navigate("VerticalsMainPage");
  }
  function CreateVerticalFields() {
    if (vertical != "" && verticaldesc != "") {
      const data = {
        name: vertical,
        desc: verticaldesc,
        url: verticalurl
      };
      const config = {
        url: "https://api.leadswatch.com/api/v1/vertical/create",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config)
        .then(response => {
          console.log("Create Vertical---", response);
          AddField(response.data.data.insertId);
          props.navigation.navigate("CreateVerticalFields", {
            toastit: 1,
            response: response.data.data.insertId,
            data: data,
            func: props.navigation.state.params.func(
              response.data.data.insertId + 2
            ),
            button2: true
          });
        })
        .catch(error => {
          // console.log(error);
          if (error.message == "Network Error") {
            Alert.alert(
              "Network Error",
              "Please try again after some time",
              [
                {
                  text: "Ok",
                  onPress: () => console.log("Network Problem:)")
                }
              ],
              { cancelable: false }
            );
          }
          console.log(error.response);
          Alert.alert(
            "Error",
            error.response.data.error.message,
            [
              {
                text: "Ok"
                // onPress: () => console.log('Enter Valid Details'),
              }
            ],
            { cancelable: false }
          );
        });
    } else {
      Alert.alert("Please Fill All the Details!");
    }
  }
  function AddField(vert_id) {
    const data = {
      vertical_fields: [
        {
          vertical_id: vert_id,
          name: "email",
          description: "email",
          datatype: "string",
          list_data: [],
          dataformat: "",
          mandatory: 1
        },
        {
          vertical_id: vert_id,
          name: "phone",
          description: "phone",
          datatype: "number",
          list_data: [],
          dataformat: "",
          mandatory: 1
        }
      ]
    };
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/createfield",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("Created VerticalField Response", response);
        // if (response.status == 200) {
        //   props.navigation.navigate("CreateVerticalFields", {
        //     toastit: 1,
        //     response: response.data.data.insertId,
        //     data: data,
        //     func: props.navigation.state.params.func(
        //       response.data.data.insertId + 2
        //     ),
        //     button2: true
        //   });
        // }
      })
      .catch(error => {
        console.log("inside vert_id", vert_id);
        console.log("Erro", error.response);
      });
  }

  function HandleChangeVertical(vertical) {
    HandleVerticalName(vertical);
  }
  function HandleChangeVerticalDesc(verticaldesc) {
    HandleVerticalDesc(verticaldesc);
  }
  // function HandleChangeVerticalUrl(verticalurl) {
  //   HandleVerticalUrl(verticalurl);
  // }
  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      <PageHeader
        title={"Verticals"}
        subtitle={"Create Verticals"}
        myfunc={() => VerticalMainPage()}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>

      <Content
        keyboardShouldPersistTaps={"handled"}
        style={{ backgroundColor: "#F3F4F7" }}
      >
        <View style={{ height: hp(2.46) }}></View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Card
            style={{
              width: wp(92),
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "transparent",
              elevation: 0
            }}
          >
            <View style={{ width: wp(92), marginTop: "4%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ width: wp(92) }}>
                  <Text
                    style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}
                  >
                    Vertical Name
                  </Text>
                </View>
                <View style={{ width: wp(92) }}>
                  <TextInput
                    style={{
                      color: "#9B9B9B",
                      fontSize: 13,
                      // marginTop: "2%",
                      width: wp(80),
                      // borderBottomColor: "#E2E2E2",
                      // borderBottomWidth: 1,
                      paddingHorizontal: 0,
                      marginLeft: "2%"
                    }}
                    underlineColorAndroid="transparent"
                    value={vertical}
                    placeholderTextColor="#9B9B9B"
                    autoCapitalize="none"
                    placeholder="Enter the Vertical Name"
                    onChangeText={HandleChangeVertical}
                  />
                </View>
              </View>
            </View>

            <View style={{ width: wp(92), marginTop: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ width: wp(92), marginLeft: "2%" }}>
                  <Text
                    style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}
                  >
                    Description
                  </Text>
                </View>
                <View style={{ width: wp(92) }}>
                  <Textarea
                    style={{
                      marginLeft: 1,
                      marginTop: "1%",
                      marginBottom: "3%",
                      borderRadius: 4,
                      width: wp(88),
                      height: hp(10),
                      fontSize: 13,
                      color: "#9B9B9B",
                      paddingHorizontal: 0,
                      backgroundColor: "#F4F5F7",
                      alignSelf: "center"
                    }}
                    rowSpan={3}
                    placeholder="Description"
                    placeholderTextColor="#9B9B9B"
                    value={verticaldesc}
                    onChangeText={HandleChangeVerticalDesc}
                  />
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View style={{ height: hp(3.47) }}></View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: wp(90.66),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
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
              myfunc={() => CreateVerticalFields()}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Save</Text>
            </MyButton>
          </View>
        </View>
      </Content>

      {/* <Footer
        style={{
          width: wp(100),
          height: hp(10.62),
          backgroundColor: 'white',
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          justifyContent: "center",
          alignItems: "center"
        }}

      >
        <TouchableOpacity onPress={CreateVerticalFields}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </Footer> */}
    </Container>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    margin: 7,

    color: "blue",
    backgroundColor: "transparent"
  },
  labl_styl1: {
    color: "#4C7ADE",
    fontSize: 14,
    marginBottom: -10,
    marginLeft: 5
  },
  inpt_styl: {
    color: "#9B9B9B",
    fontSize: 18,
    marginTop: "5%"
  }
});
