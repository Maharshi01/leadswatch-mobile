import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  // Picker,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import Cancel from "../../assets/js/Cancel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Card,
  CardItem,
  Textarea,
  Picker,
  Right,
  Footer,
  Toast,
  Body
} from "native-base";
import MyButton from "../CustomComponents/MyButton";
import PageHeader from "../CustomComponents/PageHeader";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Switch } from "react-native-paper";
import BackArrow from "../../assets/js/BackArrow";
// import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";

export default function AddFields(props) {
  const [verticalId, setVerticalId] = useState(
    !props.navigation.getParam("response")
      ? props.navigation.getParam("id").toString()
      : props.navigation.getParam("response").toString()
  );
  const [name, setName] = useState();
  const [description, setDescription] = useState("");
  const [datatype, setDataType] = useState();
  const [list_data, setlistData] = useState([{ label: "" }]);
  const [dateformat, setDateFormat] = useState("");
  const [mandatory, setMandatory] = useState();
  const [label, setLabel] = useState();
  const [labelvalue, setValue] = useState();
  const [listData, setListData] = useState([]);
  const [status, setStatus] = useState(false);
  const [editstatus, setEditStatus] = useState(false);
  const [index, setIndex] = useState();
  const [table, setTable] = useState();
  const [initial, setInitial] = useState(false);
  const [verticalfielddetails, setverticalfieldDetails] = useState();

  const [vertId, setVertId] = useState();

  function updatekey(a) {
    setTable(a);
  }

  if (datatype == undefined) {
    setDataType("string");
  }
  function CreateVerticalFields() {
    props.navigation.navigate("CreateVerticalFields");
  }
  function HandleChangeVerticalName(name) {
    setName(name);
  }
  function HandleChangeVerticaldescription(description) {
    setDescription(description);
  }
  function HandleChangeVerticaldataformat(dateformat) {
    setDateFormat(dateformat);
  }
  const list_label = value => {
    setLabel(value);
  };

  const list_value = value => {
    setValue(value);
  };

  function getparam() {
    //Data to be posted to array
    const paramdata = {
      label: label
      // labelvalue: labelvalue,
    };
    console.log("Paramdata", paramdata);
    // console.log(typeof paramData);
    // console.log(paramData.prototype);
    listData.push(paramdata);
    console.log("listData", listData);
    // setParamStatus(false); // to remove add screen
    updatekey(Math.random());
  }

  const listitems1 =
    //  if(list_data==="undefined"){}
    datatype == "list" &&
    list_data.length !== "undefined" &&
    list_data.map((listitem, index) => {
      return (
        <View
          style={{
            width: wp(82),
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text>{listitem.label}</Text>
          <Text style={{ width: wp(7) }}></Text>
          {/* <Text
                    textStyle={{ color: "red" }}
                    onPress={() => {
                        setLabel(listData[index].label);
                        // setDataType("List");
                        setInitial(false)
                        setEditStatus(true);
                        setIndex(index);

                    }}
                >
                    Edit
         </Text> */}
          <Text style={{ width: wp(8) }}></Text>
          <TouchableOpacity
            onPress={() => {
              const newlistData = list_data.filter(
                (item, idx) => idx !== index
              );
              setlistData(newlistData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  const listitems =
    listData.length &&
    listData.map((listitem, index) => {
      return (
        <View
          style={{
            width: wp(82),
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Text>{listitem.label}</Text>
          <Text style={{ width: wp(7) }}></Text>
          {/* <Text
                        textStyle={{ color: "red" }}
                        onPress={() => {
                            setLabel(listData[index].label);
                            // setDataType("List");
                            setInitial(false)
                            setEditStatus(true);
                            setIndex(index);

                        }}
                    >
                        Edit
             </Text> */}
          <Text style={{ width: wp(8) }}></Text>
          <TouchableOpacity
            onPress={() => {
              const newlistData = listData.filter((item, idx) => idx !== index);
              setListData(newlistData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  console.log("lisguyfgriy", list_data);

  useEffect(() => {
    const id_field = props.navigation.getParam("id_field");
    console.log(
      "VerticalFieldId ------",
      props.navigation.getParam("vertical_id")
    );

    console.log("id_field", props.navigation.getParam("id_field"));
    const config = {
      url: `https://api.leadswatch.com/api/v1/vertical/fielddetail/${id_field}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("VerticalFieldDetail", response);
        //Sending all details to states to edit
        if (response.status == 200) {
          setverticalfieldDetails(response.data.data);
          setName(response.data.data.name);
          setVertId(response.data.data.vertical_id);
          setDescription(response.data.data.description);
          setDataType(response.data.data.datatype);
          setDateFormat(response.data.data.dataformat);
          setlistData(JSON.parse(response.data.data.list_data));
          setMandatory(response.data.data.mandatory ? true : false);
        } else {
          setverticalfieldDetails(response.data.data);
          setName(response.data.data.name);
          setDescription(response.data.data.description);
          setDataType(response.data.data.datatype);
          setDateFormat(response.data.data.dataformat);
          setlistData([{ label: "sat" }]);
          setMandatory(response.data.data.mandatory ? true : false);
        }
      })
      // Error handling
      .catch(error => {
        console.log("VerticalFiledDetailError", error);
        // window.alert(error.response.data.error.message);
      });

    // if (props.navigation.getParam("string")) {
    //     console.log("Inside ")

    //     setDataType("string")
    // }

    // if (props.navigation.getParam("id")) {
    //     // console.log("hjhvsadfsghtddgf", props.navigation.getParam("id"))

    //     const name1 = props.navigation.getParam("name");
    //     const desc1 = props.navigation.getParam("desc");
    //     const datatype1 = props.navigation.getParam("datatype");
    //     const dateformat1 = props.navigation.getParam("dateformat");
    //     const list_data1 = props.navigation.getParam("list_data");
    //     const mandatory1 = props.navigation.getParam("mandatory");
    //     // console.log(name1, desc1, datatype1, dateformat1, mandatory1)
    //     setName(name1)
    //     setDescription(desc1)
    //     setDataType(datatype1)
    //     setlistData(list_data1)
    //     setDateFormat(dateformat1)
    //     // setMandatory(mandatory1)
    //     console.log("list-data1 for id", list_data1)
    //     console.log("list-data for id", list_data)
    // }
  }, []);

  // console.log("list-data for id outside", list_data)
  function EditVerticalField(id) {
    if (name != "" && description != "" && datatype != "") {
      setDateFormat(dateformat);
      const data = {
        vertical_id: vertId,
        name: name,
        description: description,
        datatype: datatype,
        list_data: listData.concat(list_data),
        dataformat: dateformat,
        mandatory: mandatory,
        active: 1
      };
      const config = {
        url:
          "https://api.leadswatch.com/api/v1/vertical/updatefield/" +
          props.navigation.getParam("id_field").toString(),
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config)
        .then(response => {
          // console.log("Edited Data-------", response)
          // console.log(id)

          if (response.status == 200) {
            const variable = props.navigation.getParam("fun1");
            variable();
            props.navigation.navigate(
              "CreateVerticalFields",
              props.navigation.state.params.func(Math.random())
            );
          }
        })
        .catch(error => {
          // console.log("Edit Error----------", error);
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
      // console.log(name, description, datatype, dateformat, mandatory)
    }
    // console.log("Inside Edit Field ID", id);
    //console.log(name, description, datatype, dateformat, mandatory)
  }

  function CreateVerticalFieldsData() {
    if (name != "" && description != "" && datatype != "") {
      setDateFormat(dateformat);
      const data = {
        vertical_fields: [
          {
            vertical_id: !props.navigation.getParam("response")
              ? props.navigation.getParam("id").toString()
              : props.navigation.getParam("response").toString(),
            name: name,
            description: description,
            datatype: datatype,
            list_data: listData,
            dataformat: dateformat,
            mandatory: mandatory ? true : false
          }
        ]
      };
      console.log(data);
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
          // console.log("Inside Create Vertical Field---(Post)", response.data.data.insertId)
          props.navigation.navigate("CreateVerticalFields", {
            verticalId: verticalId,
            func: props.navigation.state.params.func(
              response.data.data.insertId
            )
          });
          if (response.status == 200) {
            const variable = props.navigation.getParam("fun2");
            variable();
          }
        })
        .catch(error => {
          // console.log(error.response);
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
          console.log(error.response.data.error);
          Alert.alert(
            "Error",
            "" + error.response.data.error,
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
      Alert.alert("Please Fill All the details!");
    }
  }

  // console.log("list-data for id outside before return", list_data)

  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      <PageHeader
        title={"Verticals"}
        subtitle={"Add Field"}
        myfunc={() => CreateVerticalFields()}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>

      <Content
        keyboardShouldPersistTaps={"handled"}
        style={{ backgroundColor: "#F3F4F7" }}
      >
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          enableOnAndroid
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ height: hp(2.46) }}></View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Card
              style={{
                justifyContent: "center",
                width: wp(92),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
                elevation: 0
              }}
            >
              <View
                style={{ width: wp(92), marginTop: "4%", marginLeft: "2%" }}
              >
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
                      Field Name
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
                      value={name}
                      placeholderTextColor="#9B9B9B"
                      autoCapitalize="none"
                      placeholder="Enter the VerticalField Name"
                      onChangeText={HandleChangeVerticalName}
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
                  <View>
                    <Textarea
                      style={{
                        marginLeft: 1,
                        marginTop: "1%",
                        // marginBottom: "3%",
                        borderRadius: 4,
                        width: wp(88),
                        height: hp(10),
                        fontSize: 13,
                        color: "#9B9B9B",
                        paddingHorizontal: 0,
                        backgroundColor: "#F4F5F7",
                        alignSelf: "center"
                      }}
                      rowSpan={8}
                      placeholder="Description"
                      placeholderTextColor="#9B9B9B"
                      value={description}
                      onChangeText={HandleChangeVerticaldescription}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}
              >
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
                      Vertical Datatype
                    </Text>
                  </View>
                  <View>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select"
                      iosIcon={
                        <Icon
                          name="arrow-dropdown-circle"
                          style={{ color: "#007aff", fontSize: 25 }}
                        />
                      }
                      selectedValue={datatype}
                      style={{ height: 40, width: wp(80) }}
                      onValueChange={itemValue => {
                        setDataType(itemValue);
                      }}
                    >
                      <Picker.Item
                        color="#9B9B9B"
                        label="String"
                        value="string"
                      />
                      <Picker.Item
                        color="#9B9B9B"
                        label="Number"
                        value="number"
                      />
                      <Picker.Item
                        color="#9B9B9B"
                        label="Boolean"
                        value="boolean"
                      />
                      <Picker.Item color="#9B9B9B" label="List" value="list" />
                    </Picker>
                  </View>
                  {datatype == "list" &&
                    props.navigation.getParam("id_field") &&
                    list_data.length >= 0 && <View>{listitems1}</View>}
                  {listData.length > 0 && <View>{listitems}</View>}

                  {datatype == "list" && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: wp(82)
                      }}
                    >
                      <Text
                        style={{
                          color: "#00B0EB",
                          fontSize: 14,
                          fontWeight: "700"
                        }}
                      >
                        Label
                      </Text>
                      <Text
                        style={{
                          color: "#00B0EB",
                          fontSize: 14,
                          fontWeight: "700"
                        }}
                      >
                        Value
                      </Text>
                      <Text
                        style={{
                          color: "#00B0EB",
                          fontSize: 14,
                          fontWeight: "700"
                        }}
                        onPress={() => {
                          setInitial(true);
                          setEditStatus(false);
                        }}
                      >
                        +
                      </Text>
                    </View>
                  )}
                  {initial && (
                    <View
                      style={{
                        width: wp(90.66),
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <TextInput
                        style={{ width: wp(82) }}
                        placeholder="Label"
                        onChangeText={value => list_label(value)}
                      />
                      {/* <TextInput
                                                style={{ width: wp(80) }}
                                                placeholder="Value"
                                                onChangeText={value => list_value(value)}
                                            /> */}
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#00B0EB",
                          borderRadius: 28,
                          width: wp(81.66),
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          height: hp(6)
                        }}
                        onPress={() => {
                          setInitial(false);
                          getparam();
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "700"
                          }}
                        >
                          Add
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              {/* <View style={{ width: wp(92), marginLeft: "2%" }} >
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
                                            Date
                                </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            style={{
                                                color: "#9B9B9B",
                                                fontSize: 13,
                                                marginBottom: "2%",
                                                width: wp(80),
                                                // borderBottomColor: "#E2E2E2",
                                                // borderBottomWidth: 1,
                                                paddingHorizontal: 0,
                                                marginLeft: "2%"
                                            }}
                                            underlineColorAndroid="transparent"
                                            value={dateformat}
                                            placeholderTextColor="#9B9B9B"
                                            autoCapitalize="none"
                                            placeholder="YYYY/MM/DD"
                                            onChangeText={HandleChangeVerticaldataformat}
                                        />
                                    </View>
                                </View>
                            </View> */}
            </Card>
            <Card
              style={{
                width: wp(90.66),
                // height: hp(8.77),
                borderRadius: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "transparent",
                elevation: 0
              }}
            >
              <CardItem
                style={{
                  width: wp(90.66),
                  // height: hp(8.77),
                  borderRadius: 4
                }}
              >
                <Body
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.textStyle}>Mandatory</Text>
                  <View style={{ width: wp(8.78) }}></View>
                  <Switch
                    onValueChange={mandatory => setMandatory(mandatory)}
                    value={mandatory}
                  />
                </Body>
              </CardItem>
            </Card>
          </View>
        </KeyboardAwareScrollView>
      </Content>

      {props.navigation.getParam("button") && (
        <View>
          <View
            style={{
              position: "absolute",
              left: 20,
              bottom: 10,
              width: wp(90.66),
              flexDirection: "row",

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
              myfunc={() => CreateVerticalFieldsData()}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Save</Text>
            </MyButton>
          </View>
        </View>
      )}
      {props.navigation.getParam("button1") && (
        <View>
          <View
            style={{
              position: "absolute",
              left: 20,
              bottom: 10,
              width: wp(90.66),
              flexDirection: "row",
              alignItems: "flex-end"
            }}
          >
            <TouchableOpacity
              style={{
                width: wp(90.66),
                height: hp(7.211),
                backgroundColor: "#00B0EB",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => EditVerticalField(props.navigation.getParam("id"))}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{ height: hp(2.47) }}></View>
    </Container>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    width: wp(60),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#00B0EB",
    fontWeight: "500"
  }
});
