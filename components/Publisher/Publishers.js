/* created by D.satwik
  Created on 10/4/2019
  modified on 10/4/2019
  Leads of the publisher 
*/

import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import Next from "../../assets/js/Next";
import BackArrow from "../../assets/js/BackArrow";
import Loader from "../Navigation/Loader";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Button,
  Right
} from "native-base";
import Settings from "../../assets/js/Settings";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PageHeader from "../CustomComponents/PageHeader";
import axios from "axios";
// import Back from '../../assets/svg/back.svg';
import MyButton from "../CustomComponents/MyButton";
import Accept from "../../assets/js/Accept";
import Accept1 from "../../assets/js/Accept1";

import Reject from "../../assets/js/Reject";

const Publishers = props => {
  const [fetching, setFetching] = useState(true);
  const [searchbarValue, setSearch] = useState("");

  const [deals, setDeals] = useState([]);

  const [myDeals, setMyDeals] = useState(deals);

  useEffect(() => {
    const getdata = () => {
      const data = {
        page: 1,
        limit: 10,
        search: "",
        filters: {
          status: [],
          buyer_status: [],
          daterange: "",
          date: "",
          pub_id: "",
          buyer_id: "",
          campaign_id: ""
        },
        sortby: {
          created: -1
        }
      };
      const config = {
        url: "http://69.55.49.121:3003/api/v1/lead/list",
        method: "post",
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };

      axios(config)
        .then(response => {
          setDeals(response.data.data.list);
          setMyDeals(response.data.data.list);
          setFetching(false);
          //setDummyCampaigns(response.data.data)
          console.log("response publishers", response);
        })
        .catch(error => {
          console.log("in catch  ");
          console.log(error);
        });
    };

    getdata();
  }, []);

  const getdata = () => {
    const data = {
      page: 1,
      limit: 10,
      search: "",
      filters: {
        status: [],
        buyer_status: [],
        daterange: "",
        date: "",
        pub_id: "",
        buyer_id: "",
        campaign_id: ""
      },
      sortby: {
        created: -1
      }
    };
    const config = {
      url: "http://69.55.49.121:3003/api/v1/lead/list",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };

    axios(config)
      .then(response => {
        setDeals(response.data.data.list);
        setMyDeals(response.data.data.list);
        setFetching(false);
        //setDummyCampaigns(response.data.data)
        console.log("response publishers", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // function myfun() {
  //   console.log("in my fun");
  //   deals.splice(0, 2);
  //   console.log("deals add========", deals);
  // }
  // deals.splice(0, 1);
  const deals_list =
    deals.length > 0 ? (
      deals.map(deal => (
        <Card
          style={{
            width: wp(90.66),
            borderRadius: 4,
            borderColor: "transparent",
            elevation: 0
          }}
        >
          <Collapse style={{ flexDirection: "column", borderRadius: 4 }}>
            <CollapseHeader>
              <View style={{ height: hp(1) }}></View>
              <View
                style={{
                  width: wp(92),
                  height: hp(4.77),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <View style={{ width: wp(1.5) }}></View>

                {/* <View>
                  <Image
                    source={require("../../assets/png/icon.png")}
                    style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                  />
                </View> */}
                <View style={{ width: wp(3.52) }}></View>
                {/* <View style={{ width: wp(60) }}>
                  <Text style={{ color: "#00B0EB", fontWeight: "700" }}>
                    {deal.lead_details.firstname} {deal.lead_details.lastname}
                  </Text>
                </View> */}
                <View style={{ width: 10 }}></View>
                <View>
                  <Accept />
                </View>
                <View style={{ width: "5%" }}></View>
                {/* <View>
                  <Accept1 />
                </View> */}
                <View style={{ width: 10 }}></View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("LeadDetail", {
                      //firstname: deal.lead_details.firstname,
                      //lastname: deal.lead_details.firstname,
                      buyer_id: deal.buyer_id,
                      publisher_id: deal.publisher_id,
                      buyer_name: deal.buyer_name,
                      publisher_name: deal.publisher_name,
                      vertical_name: deal.vertical_name,
                      campaign_name: deal.campaign_name,
                      price: deal.price,
                      cost: deal.cost,
                      status: deal.status,
                      response: deal.response
                    });
                  }}
                >
                  <View>
                    <Next />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ height: hp(1) }}></View>
            </CollapseHeader>
            {/* <View style={{ height: hp(0.5) }}></View> */}
            <CollapseBody
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "4%"
              }}
            >
              <View
                style={{
                  width: wp(85),
                  borderRadius: 12,
                  backgroundColor: "#F4F5F7",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexWrap: "wrap"
                }}
              >
                <View style={{ width: wp(4.5) }}></View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ height: hp(1.5) }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      backgroundColor: "#484393",
                      borderRadius: 4,
                      padding: "1%",
                      textAlign: "center"
                    }}
                  >
                    LW Id
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.lead_id}
                  </Text>
                  <View style={{ height: hp(1.5) }}></View>
                </View>
                <View style={{ width: wp(4.5) }}></View>
                {/* <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
                 <View style={{ height: hp(1.5) }}></View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#FFFFFF",
                  backgroundColor: "#484393",
                  borderRadius: 4,
                  padding: 3,
                  textAlign: "center"
                }}
              >
                Buyer id
              </Text>
              <Text style={{ fontSize: 12, color: "#38383B" }}>
                {deal.buyer_id}
              </Text>
              <View style={{ height: hp(1.5) }}></View>
            </View>
                 <View style={{ width: wp(4.5) }}></View> */}
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ height: hp(1.5) }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      backgroundColor: "#484393",
                      borderRadius: 4,
                      padding: "1%",
                      textAlign: "center"
                    }}
                  >
                    Publisher Id
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.publisher_id}
                  </Text>
                  <View style={{ height: hp(1.5) }}></View>
                </View>
                <View style={{ width: wp(4.5) }}></View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ height: hp(1.5) }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      backgroundColor: "#484393",
                      borderRadius: 4,
                      padding: "1%",
                      textAlign: "center"
                    }}
                  >
                    Buyer Status
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.status == 1 ? "Success" : "Failed"}
                  </Text>
                  <View style={{ height: hp(1.5) }}></View>
                </View>
                <View style={{ width: wp(4.5) }}></View>

                {/* <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
                 <View style={{ height: hp(1.5) }}></View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#FFFFFF",
                  backgroundColor: "#484393",
                  borderRadius: 4,
                  padding: 3,
                  textAlign: "center"
                }}
              >
                Price
              </Text>
              <Text style={{ fontSize: 12, color: "#38383B" }}>
                {deal.price}
              </Text>
              <View style={{ height: hp(1.5) }}></View>
            </View>
                 <View style={{ width: wp(4.5) }}></View> */}

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={{ height: hp(1.5) }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      backgroundColor: "#484393",
                      borderRadius: 4,
                      padding: "1%",
                      textAlign: "center"
                    }}
                  >
                    Cost
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.cost}
                  </Text>
                  <View style={{ height: hp(1.5) }}></View>
                </View>
                <View style={{ width: wp(4.5) }}></View>
              </View>
            </CollapseBody>
          </Collapse>
        </Card>
      ))
    ) : (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ color: "#A3A1C9", paddingTop: hp(29.73) }}>
          OOPS..No Publishers found !!..
        </Text>
      </View>
    );
  return (
    <Container style={{ width: wp(100), backgroundColor: "#F0F0F0" }}>
      <PageHeader
        title={"Leads"}
        myfunc={() => {
          props.navigation.navigate("PublisherHome");
        }}
        profile={() => {
          props.navigation.navigate("PublisherProfile");
        }}
      ></PageHeader>
      <Content keyboardShouldPersistTaps={"handled"} style={{ width: wp(100) }}>
        <View style={{ height: hp(2.46) }} />

        <View
          style={{
            width: wp(100),
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              borderRadius: 35,
              backgroundColor: "#FFFFFF",

              width: wp(86.93)
            }}
          >
            <TextInput
              style={{
                width: "100%",
                height: hp(5.91),
                width: wp(86.93),
                paddingLeft: wp(7.46)
              }}
              value={searchbarValue}
              placeholder="Search Publisher"
              // textAlign="center"
              textAlignVertical="center"
              placeholderTextColor="#A3A1C9"
              onChangeText={value => {
                setSearch(value);
                value = value.toLowerCase();
                filterData = [...myDeals];
                anotherData = [...filterData];
                if (value != "") {
                  anotherData = filterData.filter(item => {
                    let prope =
                      // item.lead_id.toString() +
                      // " " +
                      // item.buyer_id.toString() +
                      // " " +
                      // item.publisher_id.toString() +
                      // " " +
                      // item.status
                      //   ? "success"
                      //   : "Failed" +
                      //     " " +
                      //     item.price.toString() +
                      //     " " +
                      //     item.cost.toString() +
                      //     " " +
                      // item.lead_details.firstname +
                      " " +
                      //  item.lead_details.lastname +
                      " " +
                      item.lead_id +
                      " " +
                      item.status;

                    prope = prope.toLowerCase();
                    return prope.includes(value);
                  });
                }
                setDeals(anotherData);
              }}
            />
          </View>
        </View>
        <View style={{ height: hp(1.72) }}></View>

        {fetching && (
          //   <View  style={{alignItems:'center',justifyContent:'center'}}>
          //   <View style={{height:hp(15)}} />
          //   <Image
          //     style={{ width: "50%", height: '50%' }}
          //     source={require("../../assets/loading.gif")}
          //   />
          // </View>
          <Loader />
        )}
        {!fetching && (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                width: wp(92)
              }}
            >
              {deals.length > 0 ? (
                <FlatList
                  contentContainerStyle={{
                    flex: 1,
                    flexDirection: "column",
                    height: "100%",
                    width: "100%"
                  }}
                  data={deals}
                  //keyExtractor={item => item.id.toString()}
                  renderItem={
                    deals.length > 0 ? (
                      ({ deal }) =>
                        deals.length > 0 ? (
                          <Card
                            style={{
                              width: wp(90.66),
                              borderRadius: 4,
                              borderColor: "transparent",
                              elevation: 0
                            }}
                          >
                            <Collapse
                              style={{
                                flexDirection: "column",
                                borderRadius: 4
                              }}
                            >
                              <CollapseHeader>
                                <View style={{ height: hp(1) }}></View>
                                <View
                                  style={{
                                    width: wp(92),
                                    height: hp(4.77),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start"
                                  }}
                                >
                                  <View style={{ width: wp(1.5) }}></View>

                                  {/* <View>
                      <Image
                        source={require("../../assets/png/icon.png")}
                        style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                      />
                    </View> */}
                                  <View style={{ width: wp(3.52) }}></View>
                                  {/* <View style={{ width: wp(60) }}>
                              <Text
                                style={{ color: "#00B0EB", fontWeight: "700" }}
                              >
                                // {deal.lead_details.firstname} 
                                {deal.lead_details.lastname}
                              </Text>
                            </View> */}
                                  <View style={{ width: 10 }}></View>
                                  <View>
                                    <Accept />
                                  </View>
                                  <View style={{ width: "5%" }}></View>
                                  {/* <View>
                      <Accept1 />
                    </View> */}
                                  <View style={{ width: 10 }}></View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      props.navigation.navigate("LeadDetail", {
                                        //firstname: deal.lead_details.firstname,
                                        //lastname: deal.lead_details.firstname,
                                        buyer_id: deal.buyer_id,
                                        publisher_id: deal.publisher_id,
                                        buyer_name: deal.buyer_name,
                                        publisher_name: deal.publisher_name,
                                        vertical_name: deal.vertical_name,
                                        campaign_name: deal.campaign_name,
                                        price: deal.price,
                                        cost: deal.cost,
                                        status: deal.status,
                                        response: deal.response
                                      });
                                    }}
                                  >
                                    <View>
                                      <Next />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                <View style={{ height: hp(1) }}></View>
                              </CollapseHeader>
                              {/* <View style={{ height: hp(0.5) }}></View> */}
                              <CollapseBody
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  paddingBottom: "4%"
                                }}
                              >
                                <View
                                  style={{
                                    width: wp(85),
                                    borderRadius: 12,
                                    backgroundColor: "#F4F5F7",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap"
                                  }}
                                >
                                  <View style={{ width: wp(4.5) }}></View>

                                  <View
                                    style={{
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center"
                                    }}
                                  >
                                    <View style={{ height: hp(1.5) }}></View>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        backgroundColor: "#484393",
                                        borderRadius: 4,
                                        padding: "1%",
                                        textAlign: "center"
                                      }}
                                    >
                                      LW Id
                                    </Text>
                                    <Text
                                      style={{ fontSize: 12, color: "#38383B" }}
                                    >
                                      {deal.lead_id}
                                    </Text>
                                    <View style={{ height: hp(1.5) }}></View>
                                  </View>
                                  <View style={{ width: wp(4.5) }}></View>
                                  {/* <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                     <View style={{ height: hp(1.5) }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      backgroundColor: "#484393",
                      borderRadius: 4,
                      padding: 3,
                      textAlign: "center"
                    }}
                  >
                    Buyer id
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.buyer_id}
                  </Text>
                  <View style={{ height: hp(1.5) }}></View>
                </View>
                     <View style={{ width: wp(4.5) }}></View> */}
                                  <View
                                    style={{
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center"
                                    }}
                                  >
                                    <View style={{ height: hp(1.5) }}></View>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        backgroundColor: "#484393",
                                        borderRadius: 4,
                                        padding: "1%",
                                        textAlign: "center"
                                      }}
                                    >
                                      Publisher Id
                                    </Text>
                                    <Text
                                      style={{ fontSize: 12, color: "#38383B" }}
                                    >
                                      {deal.publisher_id}
                                    </Text>
                                    <View style={{ height: hp(1.5) }}></View>
                                  </View>
                                  <View style={{ width: wp(4.5) }}></View>

                                  <View
                                    style={{
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center"
                                    }}
                                  >
                                    <View style={{ height: hp(1.5) }}></View>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        backgroundColor: "#484393",
                                        borderRadius: 4,
                                        padding: "1%",
                                        textAlign: "center"
                                      }}
                                    >
                                      Buyer Status
                                    </Text>
                                    <Text
                                      style={{ fontSize: 12, color: "#38383B" }}
                                    >
                                      {deal.status == 1 ? "Success" : "Failed"}
                                    </Text>
                                    <View style={{ height: hp(1.5) }}></View>
                                  </View>
                                  <View style={{ width: wp(4.5) }}></View>

                                  {/* <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                     <View style={{ height: hp(1.5) }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FFFFFF",
                      backgroundColor: "#484393",
                      borderRadius: 4,
                      padding: 3,
                      textAlign: "center"
                    }}
                  >
                    Price
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.price}
                  </Text>
                  <View style={{ height: hp(1.5) }}></View>
                </View>
                     <View style={{ width: wp(4.5) }}></View> */}

                                  <View
                                    style={{
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center"
                                    }}
                                  >
                                    <View style={{ height: hp(1.5) }}></View>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        backgroundColor: "#484393",
                                        borderRadius: 4,
                                        padding: "1%",
                                        textAlign: "center"
                                      }}
                                    >
                                      Cost
                                    </Text>
                                    <Text
                                      style={{ fontSize: 12, color: "#38383B" }}
                                    >
                                      {deal.cost}
                                    </Text>
                                    <View style={{ height: hp(1.5) }}></View>
                                  </View>
                                  <View style={{ width: wp(4.5) }}></View>
                                </View>
                              </CollapseBody>
                            </Collapse>
                          </Card>
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Text
                              style={{
                                color: "#A3A1C9",
                                paddingTop: hp(29.73)
                              }}
                            >
                              OOPS..No Publishers found !!..
                            </Text>
                          </View>
                        )
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{ color: "#A3A1C9", paddingTop: hp(29.73) }}
                        >
                          OOPS..No Publishers found !!..
                        </Text>
                      </View>
                    )
                  }
                />
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "#A3A1C9", paddingTop: hp(29.73) }}>
                    OOPS..No Publishers found !!..
                  </Text>
                </View>
              )}

              {/* {deals_list} */}
            </View>
          </View>
        )}

        <View style={{ height: hp(15) }}></View>
      </Content>
    </Container>
  );
};
export default Publishers;
