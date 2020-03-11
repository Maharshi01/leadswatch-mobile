/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  Root,
  Toast,
  Container,
  Content,
  Footer,
  Card,
  CardItem,
  Right,
  Left,
  Header,
  Body
} from "native-base";
import Delete from "../../assets/js/Delete";
import Edit from "../../assets/js/Edit";
import Copy from "../../assets/js/Copy";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { Switch } from "react-native-paper";
import axios from "axios";
import PageHeader from "../CustomComponents/PageHeader";
import MyButton from "../CustomComponents/MyButton";

const CampignsMain = props => {
  const [Campignslist, setCampignslist] = useState([]);
  const [switchvalue, setSwitchvalue] = useState();
  const [tableKey, setTableKey] = useState(0);
  const [fetching, setFetching] = useState(true);

  function updatekey(a, b) {
    setTableKey(a);
    console.log("avdjd", b);
  }
  function dashboard() {
    props.navigation.navigate("Dashboard");
  }

  useEffect(() => {
    const config = {
      url: "https://api.leadswatch.com/api/v1/campaign/list",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        setCampignslist(response.data.data);
        setFetching(false);
        console.log("Get Campaig", response.data.data);
      })
      .catch(error => {
        console.log("Buyerlisterror1", error);
      });
  }, [tableKey]);
  //camelcase
  camelize = function camelize(str) {
    return str.replace(/\W+(.)/g, function(match, chr) {
      return chr.toUpperCase();
    });
  };
  function clonecamp(a, b, c, d, e, f, g, bu, pu) {
    //console.log("random",Math.random() * 101)
    let p = [],
      q = [];

    for (let k = 0; k < pu.length; k++) {
      p.push({
        id: pu[k].publisher_id,
        price: pu[k].price,
        price_type: pu[k].price_type
      });
    }
    for (let j = 0; j < bu.length; j++) {
      q.push({
        id: bu[j].buyer_id,
        route_id: bu[j].routeid,
        priority: bu[j].priority
      });
    }
    const data = {
      vertical_id: a,
      name: b + (Math.floor(Math.random() * 101) + f) + " " + "copy",
      desc: c,
      startdate: d.split("T")[0],
      enddate: g.split("T")[0],
      buyers: q,
      publishers: p
    };
    console.log("clone data", data);
    const CloneCampaign = {
      url: "https://api.leadswatch.com/api/v1/campaign/create",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(CloneCampaign)
      .then(response => {
        if (response.status == 200) {
          console.log("Post Campaign Data", response);

          updatekey(Math.random, 2);
        }
      })
      .catch(error => {
        console.log(error.response);
        console.log("errornumber", error.response.data.error.sqlMessage);
      });
  }

  function editcamp(a, b, c, d, e, f, g, bu, pu, dup) {
    console.log("Edit Details", a, b, c, d, e, f, g, bu, pu);
    let w = [],
      s = [],
      x = [],
      z = [],
      rou = [],
      y = [];

    for (let i = 0; i < pu.length; i++) {
      w.push({
        id: pu[i].publisher_id,
        price: pu[i].price,
        price_type: pu[i].price_type
      });
      s.push(pu[i].publisher_id);
      z.push({
        id: pu[i].publisher_id,
        name: pu[i].firstname + pu[i].lastname
      });
    }
    // setPubflist(w);
    // setPubflistid(g);
    for (let i = 0; i < bu.length; i++) {
      x.push(bu[i].routeid);
      y.push({
        id: bu[i].buyer_id,
        name: bu[i].buyer_routename,
        routeid: bu[i].routeid
      });
      rou.push({
        id: bu[i].buyer_id,
        routeid: bu[i].routeid
      });
    }

    // setBuyeraddlist(h)

    console.log("publisherslist(edit)", w);
    console.log("publisheridlist(edit)", s);
    console.log("buyerslist(edit)", x);

    props.navigation.navigate("CreateCampigns", {
      func: updatekey,
      vertical_id: a,
      name: b,
      description: c,
      startdate: d.split("T")[0],
      activestatus: e == 1 ? true : false,
      id: f,
      enddate: g.split("T")[0],
      buyerlist: x,
      publisherslist: w,
      publisheridlist: s,
      publisheridnamelist: z,
      buyernameidlist: y,
      buyerrouteid: rou,
      allowduplicate:
        dup == 0 || null
          ? "Allow Duplicate in Campaigns"
          : "Allow Duplicate in Application"
    });
  }
  function deleteSure(a) {
    Alert.alert(
      "Alert",
      "Are You Sure You Want To Delete This??",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => deletecamp(a),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }
  function deletecamp(id) {
    updatekey(id + 5, 0);
    const data = {
      id: id
    };
    // console.log("Deleted Data Id", data)
    console.log(global.access_token);
    const config = {
      url: "https://api.leadswatch.com/api/v1/campaign/delete/" + id.toString(),
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        // console.log('Inside Delete Vertical---', response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function createcamp() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    props.navigation.navigate("CreateCampigns", {
      func: updatekey,

      vertical_id: "",
      // name: "Name",
      // description: "Enter description",
      startdate: today,
      enddate: today,
      allowduplicate: "Allow Duplicate in Campaigns",
      activestatus: true,
      id: "",
      buyerlist: [],
      publisherslist: [],
      publisheridlist: [],
      publisheridnamelist: [],
      buyernameidlist: [],
      buyerrouteid: []
    });
  }

  return (
    <Root>
      <Container>
        {/* <View style={{ height: hp(2) }} /> */}

        <PageHeader
          title={"Campaigns"}
          myfunc={() => dashboard()}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        ></PageHeader>

        {fetching && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: hp(15) }} />
            <Image
              style={{ width: "50%", height: "50%" }}
              source={require("../../assets/loading.gif")}
            />
          </View>
        )}
        {!fetching && (
          <Content keyboardShouldPersistTaps={'handled'} style={{ backgroundColor: "#F3F4F7" }}>
            <Body>
              <ScrollView>
                <View style={{ height: hp(2) }}></View>

                {Campignslist != "" ? (
                  Campignslist.map(item => (
                    <Card
                      style={{
                        width: wp(90.66),
                        // height: hp(9.77),
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#FFFFFF",
                        elevation: 0,
                        backgroundColor: "#FFFFFF",
                        justifyContent: "center",
                        alignItems: "center", // Centered horizontally
                        flex: 1
                      }}
                      key={item.id + Math.random}
                    >
                      <CardItem
                        style={{
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Body>
                          <View>
                            <Text
                              style={{
                                color: "#00B0EB",
                                fontSize: 18,
                                fontWeight: "600"
                                //fontFamily: Platform.OS === 'ios' ? Helvetica : Roboto
                              }}
                            >
                              {item.name}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                              <Text
                                style={{
                                  color: "#9B9B9B",
                                  fontSize: 16,
                                  fontWeight: "700"
                                  //fontFamily: "Roboto"
                                  //fontFamily: Platform.OS === 'ios' ? Helvetica : Roboto
                                }}
                              >
                                Status :
                              </Text>
                              <View style={{ width: wp(2) }}></View>
                              <Text
                                style={{
                                  color:
                                    item.active == 1 ? "#63E57D" : "#F53669",
                                  fontSize: 16,
                                  fontWeight: "600"
                                  //fontFamily: "Roboto"
                                  //fontFamily: Platform.OS === 'ios' ? Helvetica : Roboto
                                }}
                              >
                                {item.active == 1 ? "Active" : "Inactive"}
                              </Text>
                            </View>
                          </View>
                        </Body>
                        <Right style={{ justifyContent: "center" }}>
                          <View style={{ flexDirection: "row" }}>
                            <View>
                              <TouchableOpacity
                                onPress={() =>
                                  editcamp(
                                    item.vertical_id,
                                    item.name,
                                    item.desc,
                                    item.startdate,
                                    item.active,
                                    item.id,
                                    item.enddate,
                                    item.buyers,
                                    item.publishers,
                                    item.allowduplicate
                                  )
                                }
                              >
                                <Edit width={15} height={15} />
                              </TouchableOpacity>
                            </View>
                            <View style={{ width: wp(4) }} />
                            <View>
                              <TouchableOpacity
                                onPress={() =>
                                  clonecamp(
                                    item.vertical_id,
                                    item.name,
                                    item.desc,
                                    item.startdate,
                                    item.active,
                                    item.id,
                                    item.enddate,
                                    item.buyers,
                                    item.publishers,
                                    item.allowduplicate
                                  )
                                }
                              >
                                {/* <Text>clone</Text> */}
                                <Copy width={15} height={15} />
                              </TouchableOpacity>
                            </View>
                            <View style={{ width: wp(4) }} />

                            <View>
                              <TouchableOpacity
                                onPress={() => deleteSure(item.id)}
                              >
                                <Delete width={15} height={15} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Right>
                      </CardItem>
                    </Card>
                  ))
                ) : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    {/* <View style={{ height: "45%" }}></View> */}
                    <Text style={{ color: "#9B9B9B" }}>
                      No Campaigns!! Create By Clicking On Create Campaigns{" "}
                    </Text>
                    {/* <View style={{ height: "45%" }}></View> */}
                  </View>
                )}
                <View style={{ height: hp(5) }}></View>
              </ScrollView>
              <View style={{ height: hp(5) }}></View>
            </Body>
          </Content>
        )}
        {!fetching && (
          <View
            style={{
              position: "absolute",
              left: 20,
              bottom: 10,
              width: wp(90.66),
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <MyButton
              style={{
                width: wp(90.6),
                height: hp(7.211),
                backgroundColor: "#00B0EB",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
              myfunc={() => createcamp()}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Create Campaign{" "}
              </Text>
            </MyButton>
          </View>
        )}
      </Container>
    </Root>
  );
};

export default CampignsMain;
