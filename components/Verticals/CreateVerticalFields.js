import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from "axios";
import MyButton from "../CustomComponents/MyButton";
import PageHeader from "../CustomComponents/PageHeader";
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
  Root,
  Body
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BackArrow from "../../assets/js/BackArrow";
// import LinearGradient from 'react-native-linear-gradient';
import Delete from "../../assets/js/Delete";
import Edit from "../../assets/js/Edit";
const CreateVerticalFields = props => {
  const dummydata = props.navigation.getParam("dummydata");
  const [displayname, setDisplayName] = useState("");
  const [displaydesc, setDisplaydesc] = useState("");
  const [displayurl, setDisplayurl] = useState("");
  const [verticalId, setVerticalId] = useState(
    !props.navigation.getParam("response")
      ? props.navigation.getParam("vertical_id").toString()
      : props.navigation.getParam("response").toString()
  );
  const [Verticals_Field_list, setVerticalField] = useState([]);

  const [searchbarValue, setSearch] = useState("");
  const [prev, setPrev] = useState(null);
  const [num, setNum] = useState([0]);
  const [next, setNext] = useState(2);
  const [total, setTotal] = useState([0]);
  const [limit, setLimit] = useState([0]);

  const [pageno, setPageNo] = useState(2);
  const [indicator, setIndicator] = useState(false);

  const [tableKey1, setTableKey1] = useState(0);
  function updatekey1(a) {
    setTableKey1(a);
  }

  function fun1() {
    Toast.show({
      text: "Edited Successfully!",
      buttonText: "",
      duration: 2000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
    });
  }

  useEffect(() => {
    if (props.navigation.getParam("toastit") == 1) {
      Toast.show({
        text: "Vertical Created Successfully!!!",
        buttonText: "",
        duration: 2000,
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
      });
      props.navigation.setParams({ toastit: 0 });
    }

    if (!props.navigation.getParam("data")) {
      const id = props.navigation.getParam("id");
      const name = props.navigation.getParam("name");
      const desc = props.navigation.getParam("desc");
      const url = props.navigation.getParam("url");

      // console.log("In If", id, name, desc, url)
      setDisplayName(name);
      setDisplaydesc(desc);
      setDisplayurl(url);
    } else {
      const data = props.navigation.getParam("data");
      // console.log("In else", data.name, data.desc, data.url)
      setDisplayName(data.name);
      setDisplaydesc(data.desc);
      setDisplayurl(data.url);
    }

    // const config = {
    //   url: "https://api.leadswatch.com/api/v1/vertical/fieldlist/" + verticalId.toString(),
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + global.access_token
    //   }
    // };
    // axios(config)
    //   .then(response => {
    //     setVerticalField(response.data.data)
    //     console.log("Get Verticals_Field_List", Verticals_Field_list)
    //   })
    //   .catch(error => {
    //     // console.log("get Error", error);
    //     if (error.message == "Network Error") {
    //       Alert.alert(
    //         'Network Error',
    //         "Please try again after some time",
    //         [
    //           {
    //             text: 'Ok',
    //             onPress: () => console.log('Network Problem:)'),
    //           },
    //         ],
    //         { cancelable: false },
    //       );
    //     }
    //     console.log(error.response);
    //     Alert.alert(
    //       'Error',
    //       error.response.data.error.message,
    //       [
    //         {
    //           text: 'Ok',
    //           // onPress: () => console.log('Enter Valid Details'),
    //         },
    //       ],
    //       { cancelable: false },
    //     );
    //   });

    const data = {
      page: 1,
      limit: 5,
      search: "",
      sortby: {
        created: -1
      }
    };
    const config = {
      url: `https://api.leadswatch.com/api/v1/vertical/fieldlist/${verticalId}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("GotVerticalsList", response);
        console.log("setVerticalField", response.data.data.list);
        setVerticalField(response.data.data.list);
        setTotal(response.data.data.total_count);
        setPrev(response.data.data.prev_page);
        setNext(response.data.data.next_page);
        let a = [];
        for (
          let i = 1;
          i <=
          Math.ceil(
            response.data.data.total_count / response.data.data.per_page
          );
          i++
        ) {
          a.push(i);
        }
        setNum(a);

        setLimit(response.data.data.per_page);
      })
      // Error handling
      .catch(error => {
        // console.log("get Error", error);
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
  }, [tableKey1]);

  const getDetails = () => {
    if (Verticals_Field_list.length != total) setIndicator(true);
    const data = {
      page: pageno,
      limit: 5,
      search: "",
      sortby: {
        created: -1
      }
    };
    console.log("get details data ===== ", data);
    const config = {
      url: `https://api.leadswatch.com/api/v1/vertical/fieldlist/${verticalId}`,
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        //  console.log("BuyerList", response);
        // Buyers list is set to deals state
        console.log("response on touch end", response.data.data.list);
        //setNextPage(response.data.data.next_page);
        if (response.data.data.list.length > 0) {
          temp = [...Verticals_Field_list, ...response.data.data.list];
          setVerticalField(temp);
        }
        // console.log("===============", deals.length);
        if (total == response.data.data.list.length) {
          setIndicator(false);
        }

        // To make activity Indicator off
        if (total == response.data.data.list.length) {
          setIndicator(false);
        }
        setIndicator(false);
        // setFetching(false);
      })
      // Error handling
      .catch(error => {
        console.log("Buyerlisterror1", error);
        Alert.alert(error.response.data.error.message);
      });
  };

  // console.log("satwik gaadu cheppina problem",Verticals_Field_list)

  function Addfieldnavigation(
    id,
    name,
    desc,
    datatype,
    list_data,
    dateformat,
    mandatory
  ) {
    // console.log("dsvcfdv", props.navigation.getParam("vertical_id"));
    // console.log("on edit click ", id);
    // console.log("mandatory====", verticalId);
    props.navigation.navigate("AddField", {
      fun1: fun1,
      id: verticalId,
      id_field: id,
      name: name,
      desc: desc,
      datatype: datatype,
      list_data: list_data,
      dateformat: dateformat,
      mandatory: mandatory,
      func: updatekey1,
      button1: true
    });
  }
  function HandleChangeVerticalname(displayname) {
    setDisplayName(displayname);
  }
  function HandleChangeVerticalDesc(displaydesc) {
    setDisplaydesc(displaydesc);
  }
  function HandleChangeVerticalUrl(displayurl) {
    setDisplayurl(displayurl);
  }
  function CreateVertical() {
    props.navigation.navigate("VerticalsMainPage");
  }
  function AddField() {
    props.navigation.navigate("AddField", {
      fun2: fun2,
      response: props.navigation.getParam("response"),
      id: props.navigation.getParam("vertical_id"),
      func: updatekey1,
      button: true
    });
  }
  function DefaultFields() {
    props.navigation.navigate("DefaultFields", {
      vertical_id: verticalId,
      func: updatekey1
    });
  }
  function fun2() {
    Toast.show({
      text: "VerticalField Created Successfully!",
      buttonText: "",
      duration: 2000,
      position: "center",
      style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }
    });
  }
  function EditVertical(id) {
    if (displayname != "" && displaydesc != "") {
      const data = {
        name: displayname,
        desc: displaydesc,
        url: displayurl,
        active: 1
      };
      const config = {
        url:
          "https://api.leadswatch.com/api/v1/vertical/update/" + id.toString(),
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config)
        .then(response => {
          console.log("Edit button List Id", id);
          // console.log("Edited Vertical Data", response)
          props.navigation.navigate("VerticalsMainPage", {
            toastit2: 1,
            func: props.navigation.state.params.funcRender(Math.random())
          });
          if (response.status == 200) {
            const variable = props.navigation.getParam("fun");
            variable();
          }
        })
        .catch(error => {
          console.log("Iam here....");
          console.log("errore", error);
          // console.log("erro", error.response.data.error.message);
          // Alert.alert(
          //   "Error",
          //   error.response.data.error.message,
          //   [
          //     {
          //       text: "Ok"
          //       // onPress: () => console.log('Enter Valid Details'),
          //     }
          //   ],
          //   { cancelable: false }
          // );

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
          // console.log("hey you",error.response.message);
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
      Alert.alert("Please Fill all the Details!");
    }
  }

  function deleteSure1(id) {
    Alert.alert(
      "Alert",
      "Are You Sure You Want To Delete This??",
      [
        {
          text: "Cancel",
          style: "ok"
        },

        {
          text: "ok",
          onPress: () => DeleteVerticalField(id),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }

  const DeleteVerticalField = id => {
    updatekey1(id + Math.random());
    const data = {
      id: id
    };
    // console.log("Deleting Vertical Field Id", data)
    // console.log(global.access_token)
    const config = {
      url:
        "https://api.leadswatch.com/api/v1/vertical/deletefield/" +
        id.toString(),
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        // console.log('Deleted Vertical Field details', response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Root>
      <Container style={{ backgroundColor: "#F3F4F7" }}>
        <PageHeader
          title={"Verticals"}
          subtitle={"Vertical Fields"}
          myfunc={() => CreateVertical()}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        ></PageHeader>

        <Content
          keyboardShouldPersistTaps={"handled"}
          style={{ backgroundColor: "#F3F4F7" }}
          onScroll={({ nativeEvent }) => {
            if (
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height
            ) {
              setPageNo(pageno + 1);
              getDetails();
              //test();
            }
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
                      value={displayname}
                      placeholderTextColor="#9B9B9B"
                      autoCapitalize="none"
                      onChangeText={HandleChangeVerticalname}
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
                      placeholderTextColor="#9B9B9B"
                      value={displaydesc}
                      onChangeText={HandleChangeVerticalDesc}
                    />
                  </View>
                </View>
              </View>
            </Card>
          </View>

          {Verticals_Field_list.length > 0 &&
            Verticals_Field_list.map(item => (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
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
                  key={item.id}
                >
                  <CardItem
                    style={{
                      width: wp(90.66),
                      // height: hp(8.77),
                      borderRadius: 4,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    {/* <Text >{item.id}</Text> */}

                    <Text style={styles.textStyle}>{item.name}</Text>
                    <View style={{ width: wp(2) }}></View>
                    <Text style={styles.textStyle1}>{item.datatype}</Text>
                    <View style={{ width: wp(2) }}></View>

                    {/* <Text >{item.dataformat}</Text> */}

                    <Text style={styles.textStyle3}>
                      Required:
                      {item.mandatory ? (
                        <Text style={{ color: "#63E57D" }}>{"  "}Yes</Text>
                      ) : (
                        <Text style={{ color: "#F53669" }}>{"  "}No</Text>
                      )}
                    </Text>
                    <View style={{ width: wp(1.5) }}></View>
                    {/* {console.log(item.id, item.name, item.description, item.datatype, item.dataformat, item.mandatory)} */}
                    {item.name == "phone" || item.name == "email" ? (
                      <View>
                        <Text style={{ color: "#D3D3D3", fontWeight: "700" }}>
                          Default
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            Addfieldnavigation(
                              item.id,
                              item.name,
                              item.description,
                              item.datatype,
                              item.list_data,
                              item.dataformat,
                              item.mandatory
                            )
                          }
                        >
                          <Edit height={15} width={15} />
                        </TouchableOpacity>
                        <View style={{ width: wp(4.47) }}></View>

                        <TouchableOpacity onPress={() => deleteSure1(item.id)}>
                          <Delete height={15} width={15} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </CardItem>
                </Card>
                <View style={{ height: hp(0.4) }}></View>
              </View>
            ))}
          {indicator && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={{ height: hp(20) }}></View>
        </Content>

        {props.navigation.getParam("button") && (
          <View>
            <View style={{ position: "absolute", bottom: 15, left: 30 }}>
              <TouchableOpacity
                style={{
                  width: wp(40.466),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() =>
                  EditVertical(props.navigation.getParam("vertical_id"))
                }
              >
                <Text style={{ color: "white", fontWeight: "700" }}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: hp(1) }}></View>
            <View style={{ position: "absolute", bottom: 15, right: 30 }}>
              <MyButton
                style={{
                  width: wp(40.466),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                myfunc={() => AddField()}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Add New Field
                </Text>
              </MyButton>
            </View>

            {/* <View
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                bottom: 15,
                width: wp(90.66),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <MyButton
                style={{
                  width: wp(85.466),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                myfunc={() => DefaultFields()}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Choose from
                </Text>
              </MyButton>
            </View> */}
          </View>
        )}

        {props.navigation.getParam("button2") && (
          <View>
            <View style={{ position: "absolute", bottom: 10, left: 30 }}>
              <MyButton
                style={{
                  width: wp(90.466),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                myfunc={() => AddField()}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Add New Field
                </Text>
              </MyButton>
            </View>

            {/* <View
              style={{
                position: "absolute",
                left: 100,
                right: 30,
                bottom: 10,
                width: wp(90.66),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <MyButton
                style={{
                  width: wp(40.466),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                myfunc={() => DefaultFields()}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  Choose from
                </Text>
              </MyButton>
            </View> */}
          </View>
        )}
      </Container>
    </Root>
  );
};
export default CreateVerticalFields;
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
  },
  textStyle: {
    width: wp(20),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#00B0EB",
    fontWeight: "500"
  },
  textStyle1: {
    width: wp(15),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#00B0EB",
    fontWeight: "500"
  },
  textStyle3: {
    width: wp(30),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#00B0EB",
    fontWeight: "500"
  }
});
