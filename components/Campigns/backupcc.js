/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Picker,

  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
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
  Body,
  Left
} from "native-base";
import IOSPicker from 'react-native-ios-picker';

import { Switch } from "react-native-paper";
import Modal from "react-native-modal";
import Cancel from "../../assets/js/Cancel";
import PageHeader from "../CustomComponents/PageHeader";
import MyButton from "../CustomComponents/MyButton";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import NumericInput from "react-native-numeric-input";

import DatePicker from "react-native-datepicker";
import Up from "../../assets/js/Up";
import Down from "../../assets/js/Down";
//import LoginNav from "./components/Navigation/LoginNav"

const CreateCampigns = props => {
  const [id, setId] = useState(props.navigation.state.params.id);
  const [name, setName] = useState(props.navigation.state.params.name);
  const [fetching, setFetching] = useState(true);
  const [description, setDescription] = useState(
    props.navigation.state.params.description
  );

  const [verticalid, setVerticalid] = useState(
    props.navigation.state.params.vertical_id
  );
  const [open, setOpen] = useState(false);
  const [startdate, setStartdate] = useState(
    props.navigation.state.params.startdate
  );
  const [enddate, setEnddate] = useState(props.navigation.state.params.enddate);
  const [verticallist, setVerticallist] = useState([]);
  const [buyerlist, setBuyerlist] = useState([]);
  const [buyerlist1, setBuyerlist1] = useState([]);

  const [publisherlist, setPublisherlist] = useState([]);
  const [pubmid, setPubmid] = useState();
  const [pubname, setPubname] = useState();
  const [pubnamearray, setPubnamearray] = useState(
    props.navigation.state.params.publisheridnamelist
  );

  const [publisherlist1, setPublisherlist1] = useState([]);
  const [buyeraddlist, setBuyeraddlist] = useState(
    props.navigation.state.params.buyerlist
  );
  const [buyeraddnameidlist, setBuyeraddnameidlist] = useState(
    props.navigation.state.params.buyernameidlist
  );

  const [pubflist, setPubflist] = useState(
    props.navigation.state.params.publisherslist
  );
  const [pubflistid, setPubflistid] = useState(
    props.navigation.state.params.publisheridlist
  );
  const [table, setUpdate] = useState();
  const [switchstatus, setSwitchstatus] = useState(
    props.navigation.state.params.activestatus
  );
  //  console.log("buyerlist",buyeraddlist);
  //  console.log("publist",pubflist);
  //  console.log("publistid",pubflistid);
  useEffect(() => {
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/list",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        setVerticallist(response.data.data);
        setFetching(false);
        console.log("surya", response.data.data);
        // let tempdata = response.data.data;
        //condition
      })
      .catch(error => {
        console.log("vertical", error);
      });
    if (verticalid == "") {
    } else {
      const config1 = {
        url:
          "https://api.leadswatch.com/api/v1/buyer/verticalbuyers/" +
          verticalid.toString(),
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config1)
        .then(response => {
          setBuyerlist(response.data.data);
          setBuyerlist1(response.data.data);
          console.log("aaaaaaaaaa", response.data.data);
        })
        .catch(error => {
          console.log("vertticalbuy1", error);
        });
    }

    const config2 = {
      url: "https://api.leadswatch.com/api/v1/publisher/list",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config2)
      .then(response => {
        setPublisherlist(response.data.data);
        setPublisherlist1(response.data.data);
        console.log("aaaaaaaaaa234", response.data.data);
      })
      .catch(error => {
        console.log("publisher", error);
      });
  }, [table]);

  function update(a) {
    setUpdate(a);
  }
  function dashboard() {
    props.navigation.navigate("CampignsMain");
  }

  function EditCampigns() {
    let a = [];
    for (i = 0; i < buyeraddlist.length; i++) {
      a.push({
        id: buyeraddlist[i],
        priority: buyeraddlist.indexOf(buyeraddlist[i]) + 1
      });
    }
    // console.log(a)
    if (
      name !== "" &&
      description !== "" &&
      verticalid !== "" &&
      a.length > 0 &&
      pubflist.length > 0
    ) {
      const data = {
        vertical_id: verticalid,
        name: name,
        desc: description,
        startdate: startdate,
        enddate: enddate,
        active: switchstatus,
        buyers: a,
        publishers: pubflist
      };
      const EditCampigns = {
        url: "https://api.leadswatch.com/api/v1/campaign/update/" + id.toString(),
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(EditCampigns)
        .then(response => {
          props.navigation.navigate(
            "CampignsMain",
            // { success: 2 },
            props.navigation.state.params.func(id,1)
          );
        })
        .catch(error => {
          console.log("Edit Error----------", error);
          if (error.response.status === 500) {
            Alert.alert(
              'Alert ',
              "Name is given in previous Campaigns",
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            //Alert.alert("Name is given in previous Campaigns");
          } else {
            Alert.alert(
              'Alert ',
              "Input data is not correct check all the inputs",
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          
            //Alert.alert("Input data is not correct check all the inputs");
          }
        });
    } else {
      Alert.alert(
        'Alert ',
        "enter all values",
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      //Alert.alert("enter all values");
    }
  }
  function CreateCampigns() {
    let a = [];
    for (i = 0; i < buyeraddlist.length; i++) {
      a.push({
        id: buyeraddlist[i],
        priority: buyeraddlist.indexOf(buyeraddlist[i]) + 1
      });
    }
    console.log("A values---", a);
    if (
      name !== "" &&
      description !== "" &&
      verticalid !== "" &&
      a.length > 0 &&
      pubflist.length > 0
    ) {
      const data = {
        vertical_id: verticalid,
        name: name,
        desc: description,
        startdate: startdate,
        enddate: enddate,
        buyers: a,
        publishers: pubflist
      };
      const CreateCampigns = {
        url: "https://api.leadswatch.com/api/v1/campaign/create",
        data: data,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(CreateCampigns)
        .then(response => {
          if(response.status==200)
          {
            console.log("Post Campaign Data", response);
          // const variable = props.navigation.getParam('fun');
          // variable();
          props.navigation.navigate(
            "CampignsMain",
            // { success: 1 },
            // props.navigate.state.params.fun(),
            props.navigation.state.params.func(Math.random,2)
          );

          }
          
          // console.log("Inside Create Vertical Field---(Post)", response.data.data.insertId)
        })
        .catch(error => {
          console.log(error.response);
          console.log("errornumber", error.response.data.error.sqlMessage);
          if (error.response.status === 500) {
            Alert.alert(
              'Alert ',
              "Name is given in previous Campaigns",
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            //Alert.alert("Name is given in previous Campaigns");
          } else {
          }
        });
    } else {
      Alert.alert(
        'Alert ',
        "enter all values",
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
     // Alert.alert("enter all values");
    }
  }

  function HandleChangeName(name) {
    setName(name);
  }
  function callModel(a, fname, lname) {
    setOpen(true);
    setPubmid(a);
    setPubname(fname + lname);
  }
  function addbuyer(id, fname, lname) {
    if (buyeraddlist.includes(id)) {
    } else {
      buyeraddlist.push(id);
      buyeraddnameidlist.push({
        id: id,
        name: fname + lname
      });
      update(Math.random);
    }

    console.log("buyeraddlist", buyeraddlist);
  }
  function downarray(id) {
    let a = buyeraddlist.indexOf(id);
    if (buyeraddlist.length < 2 && a == buyeraddlist.length) {
    } else {
      var b = buyeraddlist[a];
      buyeraddlist[a] = buyeraddlist[a + 1];
      buyeraddlist[a + 1] = b;
      let z = buyeraddnameidlist[a];
      buyeraddnameidlist[a] = buyeraddnameidlist[a + 1];
      buyeraddnameidlist[a + 1] = z;
      update(Math.random);
    }

    console.log("suhihtihtihtitht", buyeraddlist);
  }
  function uparray(id) {
    let a = buyeraddlist.indexOf(id);
    if (buyeraddlist.length < 2 && a == 0) {
    } else {
      var b = buyeraddlist[a];
      buyeraddlist[a] = buyeraddlist[a - 1];
      buyeraddlist[a - 1] = b;
      let z = buyeraddnameidlist[a];
      buyeraddnameidlist[a] = buyeraddnameidlist[a - 1];
      buyeraddnameidlist[a - 1] = z;
      update(Math.random);
    }

    console.log("suhihtihtihtitht2", buyeraddlist);
  }
  function HandleChangedesc(description) {
    // console.log("desccccccccccccccccccccccccccccccccccccc", description);
    setDescription(description);
  }
  function HandleChangestartdate(date) {
    setStartdate(date);
  }
  function HandleChangeenddate(date) {
    setEnddate(date);
  }
  function setMandatory() {
    if (switchstatus == true) {
      setSwitchstatus(false);
    } else {
      setSwitchstatus(true);
    }
  }
  function pubsubmit(id, pricevalue, pricetype, name) {
    console.log("pubname", name);
    if (pubflistid.includes(id)) {
    } else {
      pubflist.push({ id: id, price: pricevalue, price_type: pricetype });
      pubflistid.push(id);
      pubnamearray.push({ id: id, name: name });
    }
    setPubmid("");
    setPubname("");

    console.log("suchihtpub", pubflist);
    console.log("suchihtpubid", pubflistid);
  }
  function deletebuyer(id) {
    let a = buyeraddlist.indexOf(id);
    const buyerdeletelist = buyeraddlist.filter((item, idx) => idx !== a);
    setBuyeraddlist(buyerdeletelist);
    const newbuyerdeletelist = buyeraddnameidlist.filter(
      (item, idx) => idx !== a
    );
    setBuyeraddnameidlist(newbuyerdeletelist);
  }

  function cancelpub(pubid) {
    let a = pubflistid.indexOf(pubid);
    const pubdeletelist = pubflist.filter((item, idx) => idx !== a);
    setPubflist(pubdeletelist);
    const pubdeletelistid = pubflistid.filter((item, idx) => idx !== a);
    setPubflistid(pubdeletelistid);
    const newpubnamearray = pubnamearray.filter((item, idx) => idx !== a);
    setPubnamearray(newpubnamearray);
  }

  function changevertical(verticalid) {
    if (id !== "") {
      Alert.alert("once selected you canot change");
    } else {
      setVerticalid(verticalid);
      console.log("asasasasas", verticalid);
      const config1 = {
        url:
          "https://api.leadswatch.com/api/v1/buyer/verticalbuyers/" +
          verticalid.toString(),
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      axios(config1)
        .then(response => {
          setBuyerlist(response.data.data);
          setBuyerlist1(response.data.data);
        })
        .catch(error => {
          console.log("Buyerlisterror1", error);
        });
    }
  }
 
  return (
    <Container >
     
        <PageHeader
          title={"Campaigns"}
          subtitle={"Create/Update Campaigns"}
          myfunc={() => dashboard()}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        ></PageHeader>
     
      {open && (
        <ShowModal
          open={open}
          setOpen={setOpen}
          id={pubmid}
          fun={pubsubmit}
          name={pubname}
        />
      )}
      {/* <View style={{ height: hp(2) }} /> */}
      

      {fetching && (
        <View>
          <View style={{ height: hp(35) }} />
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      )}

      {!fetching && (
        <Content style={{ backgroundColor: "#F3F4F7" }}>
          <View style={{ height: hp(2) }}></View>
          <Body>
            <Card style={styles.card}>
              <CardItem>
                <View style={{ flexDirection: "column" }}>
                  <View>
                    <Label style={styles.label}>Campaign Name</Label>
                  </View>
                  <View>
                    <TextInput
                      style={{
                        color: "#9B9B9B",
                        fontSize: 15,
                        marginTop: "2%",
                        width: wp(80),
                        borderBottomColor: "#E2E2E2",
                        borderBottomWidth: 1,
                        paddingHorizontal: 0,
                        marginLeft: "1%"
                      }}
                      placeholder="Name"
                      placeholderTextColor="#9B9B9B"
                      underlineColorAndroid="transparent"
                      value={name}
                      placeholderTextColor="#9B9B9B"
                      autoCapitalize="none"
                      onChangeText={HandleChangeName}
                    />
                  </View>
                </View>
              </CardItem>
              <CardItem>
                <Left style={{flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
                  
                  <Label style={styles.label}>CampaignStatus</Label>
                 
                
                
                </Left>
                <Right>
                <Switch
                  onValueChange={switchstatus => setMandatory(switchstatus)}
                  value={switchstatus}
                />

                </Right>
                
              </CardItem>
              <CardItem>
                <View style={{ flexDirection: "column" }}>
                  <View>
                    <Label style={styles.label}>description</Label>
                  </View>
                  <View style={{ height: hp(0.5) }}></View>
                  <View style={{ justifyContent: "center" }}>
                    <Textarea
                      style={{
                        width: wp(80),
                        height: hp(10),
                        color: "#9B9B9B",
                        paddingHorizontal: 0,
                        backgroundColor: "#F4F5F7",
                        alignSelf: "center"
                      }}
                      placeholder="Description"
                      placeholderTextColor="#9B9B9B"
                      rowSpan={5}
                      placeholderTextColor="#9B9B9B"
                      value={description}
                      onChangeText={HandleChangedesc}
                    />
                  </View>
                </View>
              </CardItem>
             
              <CardItem>
                <Left>
                  <View>
                    <View>
                      <Label style={styles.label}>StartDate</Label>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <DatePicker
                        style={{ width: 90 }}
                        date={startdate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            width: 0,
                            height: 0
                          },
                          dateInput: {
                            borderWidth: 0
                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={date => {
                          HandleChangestartdate(date);
                        }}
                      />
                    </View>
                  </View>
                </Left>
                <Right>
                  <View>
                    <View>
                      <Label style={styles.label}>EndDate</Label>
                    </View>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <DatePicker
                        style={{ width: 90 }}
                        date={enddate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            width: 0,
                            height: 0
                          },
                          dateInput: {
                            justifyContent: "center",
                            borderWidth: 0
                          }
                          // ... You can check the source to find the other keys.
                        }}
                        onDateChange={date => {
                          HandleChangeenddate(date);
                        }}
                      />
                    </View>
                  </View>
                </Right>
              </CardItem>
            </Card>
            <View style={{ height: hp(2) }} />

            <Card style={styles.card}>
              <Label style={styles.label}>Vertical</Label>
              <CardItem>
                {verticallist == "" ? (
                  <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#9B9B9B" }}>Add Verticals</Text>
                  </View>
                ) : (
                  {
                    ...Platform.OS === 'android'?( 
                    <Picker
                      style={{ width: wp(80) }}
                      selectedValue={verticalidname}
                      onValueChange={changevertical}
                    >
                      <Picker.Item label="select" value={0} />
                      {verticallist.map(item => (
                        <Picker.Item label={item.name} value={item.id} />
                      ))}
                    </Picker>
                    ):(
                   <IOSPicker
                                mode="modal"
                                //data={verticallist.id}
                      style={{ width: wp(80) }}
                      selectedValue={verticalid}
                      onValueChange={changevertical}
                    >
                      <Picker.Item label="select" value={0} />
                      {verticallist.map(item => (
                        <Picker.Item key ={item.id} label={item.name} value={item.id} />
                      ))}
                    </IOSPicker>

                    )
                  }
                 
                )}
              </CardItem>
            </Card>
            <View style={{ height: hp(2) }} />

            <Label style={styles.label}>Buyer</Label>
            <View style={{ height: hp(1) }} />

            {buyerlist.map(item => (
              <TouchableOpacity
                onPress={() => {
                  addbuyer(item.id, item.firstname, item.lastname);
                }}
              >
                <Card
                  style={{
                    justifyContent: "center",
                    width: wp(90.66),
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "transparent",
                    elevation: 0,
                    backgroundColor: "#F3F4F7"
                  }}
                >
                  <CardItem>
                    <Text>
                      {item.firstname} {item.lastname}
                    </Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))}

            <Card
              style={{
                justifyContent: "center",
                width: wp(90.66),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
                elevation: 0,
                backgroundColor: "#F3F4F7"
              }}
            >
              <Label style={styles.label}>Added Buyer List</Label>
              {buyeraddlist != "" ? (
                buyeraddnameidlist.map(buyeriditem => (
                  <Card>
                    <CardItem>
                      <Left>
                        <TouchableOpacity
                          onPress={() => {
                            deletebuyer(buyeriditem.id);
                          }}
                        >
                          <Cancel />
                        </TouchableOpacity>
                      </Left>
                      <Body>
                        <Text>{buyeriditem.name}</Text>
                      </Body>
                      <Right>
                        <View style={{ flexDirection: "row" }}>
                          <View>
                            <Text>
                              {buyeraddlist.indexOf(buyeriditem.id) + 1}
                            </Text>
                          </View>
                          <View style={{ width: wp(2) }}></View>
                          <View>
                            {/* <Text>
                           {buyeraddlist.indexOf(buyeriditem)+1}
                         </Text> */}
                            {buyeraddlist.indexOf(buyeriditem.id) == 0 ? (
                              <Text></Text>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  uparray(buyeriditem.id);
                                }}
                              >
                                <Up />
                              </TouchableOpacity>
                            )}
                            {buyeraddlist.indexOf(buyeriditem.id) ==
                            buyeraddlist.length - 1 ? (
                              <Text></Text>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  downarray(buyeriditem.id);
                                }}
                              >
                                <Down />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </Right>
                    </CardItem>
                  </Card>
                ))
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#9B9B9B" }}>
                    Add from above list and sort by priority
                  </Text>
                </View>
              )}
            </Card>
            <View style={{ height: hp(2) }} />

            <Label style={styles.label}>Publisher</Label>
            <View style={{ height: hp(1) }} />

            {publisherlist.map(item => (
              <TouchableOpacity
                onPress={() => {
                  callModel(item.id, item.firstname, item.lastname);
                }}
              >
                <Card
                  style={{
                    justifyContent: "center",
                    width: wp(90.66),
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "transparent",
                    elevation: 0
                  }}
                >
                  <CardItem>
                    <Text>
                      {item.firstname} {item.lastname}
                    </Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))}
            <View style={{ height: hp(2) }} />

            <Card
              style={{
                justifyContent: "center",
                width: wp(90.66),
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
                elevation: 0,
                backgroundColor: "#F3F4F7"
              }}
            >
              <Label style={styles.label}>Add publisher List</Label>
              {pubflistid == "" ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#9B9B9B" }}>
                    Add from above publisher list
                  </Text>
                </View>
              ) : (
                pubnamearray.map(pubflistiditem => (
                  <Card>
                    <CardItem>
                      <Left>
                        <TouchableOpacity
                          onPress={() => {
                            cancelpub(pubflistiditem.id);
                          }}
                        >
                          <Cancel />
                        </TouchableOpacity>
                      </Left>
                      <Body>
                        <Text>{pubflistiditem.name}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                ))
              )}
            </Card>
          </Body>
          {/* {id !== "" ? (
           <View style={{ position: "absolute", left: 20, bottom: 10, width: wp(90.66), flexDirection: "row", alignItems: "center" }}>

           <MyButton
             style={{
               width: wp(90.66),
               height: hp(7.211),
               backgroundColor: "#00B0EB",
               borderRadius: 40,
               justifyContent: "center",
               alignItems: "center"
             }} myfunc={() => EditCampigns()}>
             <Text style={{ color: "white", fontWeight: "700" }}>Edit Campigns</Text>
           </MyButton>
         </View>
        ) : (
          <View style={{ position: "absolute", left: 20, bottom: 10, width: wp(90.66), flexDirection: "row", alignItems: "center" }}>

          <MyButton
            style={{
              width: wp(90.66),
              height: hp(7.211),
              backgroundColor: "#00B0EB",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }} myfunc={() => CreateCampigns()}>
            <Text style={{ color: "white", fontWeight: "700" }}>Create NewCampigns</Text>
          </MyButton>
        </View>
        )} */}
          <View style={{ height: hp(10) }} />
        </Content>
      )}

      {id !== "" ? (
        <View
          style={{
            position: "absolute",
            left: 20,
            bottom: 10,
            width: wp(90.66),
            flexDirection: "row",
            alignItems: "center"
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
            myfunc={() => EditCampigns()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Edit Campigns
            </Text>
          </MyButton>
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            left: 20,
            bottom: 10,
            width: wp(90.66),
            flexDirection: "row",
            alignItems: "center"
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
            myfunc={() => CreateCampigns()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>CreateNewCampigns</Text>
          </MyButton>
        </View>
      )}
    </Container>
  );
};

const ShowModal = prop => {
  const [value, onChangeText] = React.useState("Start a Conversation");
  const [publivalue, setpublivalue] = useState("10");
  const [id1, setId1] = useState(prop.id);
  const [publiptype, setpublictype] = useState("percentage");
  const [publipcu, setPublipcu] = useState("INR");
  function HandleChangeName(publivalue) {
    setpublivalue(publivalue);
  }
  function submitpub() {
    prop.fun(id1, publivalue, publiptype, prop.name);
    setpublivalue();
    setId1();
    setpublictype();
    prop.setOpen(false);
  }
  return (
    <Modal
      isVisible={prop.open}
      onBackdropPress={() => {
        prop.setOpen(false);
      }}
      backdropColor={"black"}
      backdropOpacity={0.5}
      animationIn={"zoomInDown"}
      animationOut={"zoomOutUp"}
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
    >
      <View
        style={{
          borderRadius:20,
          backgroundColor: "#F3F4F7",
          width: wp(90.66),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ height: hp(3) }} />

        <Card
          style={{
            justifyContent: "center",
            width: wp(80.66),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "transparent",
            elevation: 0,
            borderRadius: 5
          }}
        >
          <Label style={styles.label}>Pricevalue</Label>
          <CardItem>
            <TextInput
              style={{
                color: "#9B9B9B",
                fontSize: 15,
                marginTop: "2%",
                width: wp(70),
                borderBottomColor: "#E2E2E2",
                borderBottomWidth: 1,
                paddingHorizontal: 0,
                marginLeft: "1%"
              }}
              underlineColorAndroid="transparent"
              value={publivalue}
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              onChangeText={HandleChangeName}
            />
          </CardItem>
        </Card>
        <Card
          style={{
            justifyContent: "center",
            width: wp(80.66),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "transparent",
            elevation: 0,
            borderRadius: 5
          }}
        >
          <Label style={styles.label}>Cost per lead</Label>
          <CardItem>
          {Platform.OS === 'android'?( 
            <Picker
              selectedValue={publiptype}
              onValueChange={value => setpublictype(value)}
              style={{ width: wp(80) }}
            >
              <Picker.Item
                label="percentage"
                value="percentage"
                color="#9B9B9B"
              />
              <Picker.Item label="perLead" value="perLead" color="#9B9B9B" />
            </Picker>
                    ):(
                      <IOSPicker
                      mode="modal"
              selectedValue={publiptype}
              onValueChange={value => setpublictype(value)}
              style={{ width: wp(80) }}
            >
              <Picker.Item
                label="percentage"
                value="percentage"
                color="#9B9B9B"
              />
              <Picker.Item label="perLead" value="perLead" color="#9B9B9B" />
            </IOSPicker>
                      

                    )}
          </CardItem>
        </Card>
        <Card
          style={{
            justifyContent: "center",
            width: wp(80.66),
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "transparent",
            elevation: 0,
            borderRadius: 5
          }}
        >
          <Label style={styles.label}>Price type</Label>
          <CardItem>
          {Platform.OS === 'android'?( 
            <Picker style={{ width: wp(80) }}>
            <Picker.Item label="Inr" value="INR" color="#9B9B9B" />
            <Picker.Item label="dollar" value="DOLLAR" color="#9B9B9B" />
            <Picker.Item label="euro" value="EURO" color="#9B9B9B" />
          </Picker>
                    ):(
                      <IOSPicker
                      mode="modal"
              // selectedValue={publiptype}
              // onValueChange={value => setpublictype(value)}
              style={{ width: wp(80) }}
            >
              <Picker.Item label="Inr" value="INR" color="#9B9B9B" />
            <Picker.Item label="dollar" value="DOLLAR" color="#9B9B9B" />
            <Picker.Item label="euro" value="EURO" color="#9B9B9B" />
            </IOSPicker>
                      

                    )}
           
          </CardItem>
        </Card>
        <View style={{ height: hp(3) }} />
        <View
          style={{
            width: wp(80.66),
            flexDirection: "row",
            alignItems: "flex-end"
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
            myfunc={() => submitpub()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Submit publishers
            </Text>
          </MyButton>
        </View>
        <View style={{ height: hp(3) }} />
      </View>
    </Modal>
  );
};

export default CreateCampigns;
const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    width: wp(90.66),

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    elevation: 0.4,
    backgroundColor: "#FFFFFF",

    alignItems: "center", // Centered horizontally
    flex: 1
  },
  label: {
    color: "#00B0EB",
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 5,
    fontWeight: "600"
  }
});
