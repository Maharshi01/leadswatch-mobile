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
  ActivityIndicator
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import Next from "../../assets/js/Next";
import BackArrow from "../../assets/js/BackArrow";
import Loader from "../Navigation/Loader";
import MyButton from "../CustomComponents/MyButton";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
import Funnel from "../../assets/js/Funnel";
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
import DatePicker from "react-native-datepicker";
import PageHeader from "../CustomComponents/PageHeader";
import axios from "axios";
// import Back from '../../assets/svg/back.svg';
import MyTextInput from "../CustomComponents/MyTextInput";
import Accept from "../../assets/js/Accept";

const Lead = props => {
  const [fetching, setFetching] = useState(true);
  //const [searchbarValue, setSearch] = useState("");

  const [deals, setDeals] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [status, setStatus] = useState([]);
  const [myDeals, setMyDeals] = useState(deals);
  const [pageno, setPageNo] = useState(2);
  const [total, setTotal] = useState();
  const [searchval, setSearchVal] = useState("");
  const [searchvalbuyer, setSearchValBuyer] = useState("");
  const [searchvalpublisher, setSearchValPublisher] = useState("");
  const [searchvalcampaign, setSearchValCampaign] = useState("");
  const [indicator, setIndicator] = useState(false);
  const [date, setDate] = useState("");
  const [enddate, setenddate] = useState("");
  const [startdate, setstartdate] = useState("");
  const [label, hideLabel] = useState(true);
  const [labelText, setLabelText] = useState("ALL");
  const [menu, hideMenu] = useState(false);

  const [buyerstatus, setBuyerStatus] = useState([]);
  const [buyerlabel, hideBuyerLabel] = useState(true);
  const [buyerlabelText, setBuyerLabelText] = useState("ALL");
  const [buyermenu, hideBuyerMenu] = useState(false);

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
          setTotal(response.data.data.total_count);
          setNextPage(response.data.data.next_page);
          setFetching(false);
          //setDummyCampaigns(response.data.data)
          console.log("response Lead", response);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getdata();
  }, []);

  // function convert(str) {
  //   var date = new Date(str),
  //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   return [date.getFullYear(), mnth, day].join("-");
  // }

  const getdata1 = a => {
    if (a == 2) {
      console.log("on button lcikc");
      setPageNo(2);
      if (startdate !== "" && enddate !== "") {
        var range = startdate + "to" + enddate;
      } else {
        range = "";
      }
      const data = {
        page: 1,
        limit: 10,
        search: searchval ? searchval : "",
        filters: {
          status: status.length > 0 ? status : [],
          buyer_status: buyerstatus.length > 0 ? buyerstatus : [],
          daterange: range,
          date: date == "" ? "" : date,
          pub_id: "",
          buyer_id: "",
          campaign_id: ""
        },
        sortby: {
          created: -1
        }
      };
      console.log("getdata1  data === ", data);
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
          console.log("response of the getdataaa", response);
          setDeals(response.data.data.list);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // console.log("on button lcikc");
      // setPageNo(2);
      console.log("adadajbdada buyer statys======", buyerstatus);
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
      console.log("getdata1  data === ", data);
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
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const getDetails = () => {
    if (deals.length != total) setIndicator(true);

    console.log("in getDetails at the ennd", pageno);

    if (startdate !== "" && enddate !== "") {
      var range = startdate + "to" + enddate;
    } else {
      range = "";
    }
    const data = {
      page: pageno,
      limit: 10,
      search: searchval ? searchval : "",
      filters: {
        status: status,
        buyer_status: [],
        daterange: range,
        date: date == "" ? "" : date,
        pub_id: searchvalpublisher,
        buyer_id: searchvalbuyer,
        campaign_id: searchvalcampaign
      },
      sortby: {
        created: -1
      }
    };
    console.log("get details data ===== ", data);
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
        //  console.log("BuyerList", response);
        // Buyers list is set to deals state
        console.log("response on touch end", response.data.data.list);
        //setNextPage(response.data.data.next_page);
        if (response.data.data.list.length > 0) {
          temp = [...deals, ...response.data.data.list];
          setDeals(temp);
        }
        console.log("===============", deals.length);
        if (total == response.data.data.list.length) {
          setIndicator(false);
        }

        // To make activity Indicator off
        if (total == response.data.data.list.length) {
          setIndicator(false);
        }
        setIndicator(false);
        setFetching(false);
      })
      // Error handling
      .catch(error => {
        console.log("Buyerlisterror1", error);
        Alert.alert(error.response.data.error.message);
      });
  };

  const refreshfilter = () => {
    setenddate("");
    setstartdate("");
    setDate("");
    setSearchValPublisher("");
    setSearchValBuyer("");
    setSearchValCampaign("");
    // setswitch1("");
    // setstatusfil("");
    setSearchVal("");
    setStatus([]);
    setLabelText("ALL");

    getdata1(1);
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
                <View style={{ width: wp(60) }}>
                  <Text style={{ color: "#00B0EB", fontWeight: "700" }}>
                    {deal.lead_details.firstname} {deal.lead_details.lastname}
                  </Text>
                </View>
                {/* <View style={{ width: 10 }}></View>
                <View>
                  <Accept />
                </View> */}
                <View style={{ width: 10 }}></View>
                <View>
                  <Accept />
                </View>
                <View style={{ width: wp(2) }}></View>
                <View>
                  <Accept />
                </View>
                <View style={{ width: 10 }}></View>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("AdminLeadDetail", {
                      deal: deal,
                      firstname: deal.lead_details.firstname,
                      lastname: deal.lead_details.firstname,
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
                    Date
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.push_date.split("T")[0]}
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
                    Time
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.push_date.split("T")[1].split(".")[0]}
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
                    Status
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.status_text == "true" ? "Success" : "Failed"}
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
                  <View style={{ width: wp(4.5) }}></View>
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
                    Buyer Id
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.buyer_id}
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
                    {deal.status_text == "true" ? "Accepted" : "Rejected"}
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
                    Price
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.price}
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
                    Cost
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.cost}
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
                    Profit
                  </Text>
                  <Text style={{ fontSize: 12, color: "#38383B" }}>
                    {deal.cost - deal.price}
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
          OOPS..No Leads found !!..
        </Text>
      </View>
    );

  console.log("deals_list ", deals);
  return (
    <Container style={{ width: wp(100), backgroundColor: "#F0F0F0" }}>
      <PageHeader
        title={"Leads"}
        myfunc={() => {
          props.navigation.navigate("Dashboard");
        }}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>
      <Content
        keyboardShouldPersistTaps={"handled"}
        style={{ width: wp(100) }}
        // onTouchEnd={() => {
        //   console.log("ontouch end", pageno);

        //   setPageNo(pageno + 1);
        //   getDetails();
        // }}
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
        {/* <TextInput
          placeholder="Search"
          style={{ width: "90%", borderWidth: 1 }}
          onChangeText={value => {
            setSearchVal(value);
          }}
        /> */}
        {/* <TextInputWithIcon
          styles={{}}
          myfunc={setSearchVal}
          placeholder="Search"
        /> */}
        <View style={{ height: hp(2) }}></View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* <View style={{ flexDirection: "column" }}>
            <MyTextInput
              styles={{}}
              value1={searchval}
              myfunc={setSearchVal}
              placeholder="Search"
              textAlign="center"
            />
            <Text></Text>
            {/* <Text>{errorValues.firstname}</Text> 
          </View> */}
          <View
            style={[
              {
                flexDirection: "row",
                width: wp(86.933),
                height: hp(5.911),
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              }
            ]}
          >
            <TextInputWithIcon
              styles={{}}
              value1={searchval}
              myfunc={setSearchVal}
              placeholder="Search"
            />
            <Funnel />
            <View style={{ width: 20 }} />
          </View>
        </View>

        <View style={{ height: hp(2) }}></View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "column" }}>
            <MyTextInput
              styles={{ width: wp(20), borderRadius: 0, paddingLeft: 0 }}
              value1={searchvalbuyer}
              myfunc={setSearchValBuyer}
              placeholder="Buyer id"
              textAlign="center"
            />
            <Text></Text>
            {/* <Text>{errorValues.firstname}</Text> */}
          </View>
          <View style={{ flexDirection: "column" }}>
            <MyTextInput
              styles={{ width: wp(20), borderRadius: 0, paddingLeft: 0 }}
              value1={searchvalcampaign}
              myfunc={setSearchValPublisher}
              placeholder="Pub id"
              textAlign="center"
            />
            <Text></Text>
            {/* <Text>{errorValues.firstname}</Text> */}
          </View>
          <View style={{ flexDirection: "column" }}>
            <MyTextInput
              styles={{ width: wp(20), borderRadius: 0, paddingLeft: 0 }}
              value1={searchvalcampaign}
              myfunc={setSearchValCampaign}
              placeholder="Campaign id"
              textAlign="center"
            />
            <Text></Text>
            {/* <Text>{errorValues.firstname}</Text> */}
          </View>
        </View>
        {/* 
        <Button
          title="Apply Filter"
          onPress={() => {
            getdata1();
          }}
        /> */}

        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <DatePicker
            style={{ width: wp(92) }}
            date={date}
            mode="date"
            placeholder="Date"
            format="YYYY-MM-DD"
            // minDate="2016-05-01"
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
              console.log("date =========", date);
              setDate(date);
            }}
          />
        </View>

        <View style={{ height: hp(2) }}></View>

        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View>
            <DatePicker
              style={{ width: wp(40) }}
              date={startdate}
              mode="date"
              placeholder="Start Date"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
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
                setstartdate(date);
              }}
            />
          </View>

          <View>
            <DatePicker
              style={{ width: wp(40) }}
              date={enddate}
              mode="date"
              placeholder="End Date"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
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
                setenddate(date);
              }}
            />
          </View>
        </View>

        <View style={{ height: hp(2) }}></View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {label && status && (
            <TouchableOpacity
              onPress={() => {
                hideMenu(true);
                hideLabel(false);
              }}
              style={[
                {
                  width: wp(86.933),
                  height: hp(5.911),
                  backgroundColor: "white",
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 40,
                  justifyContent: "center"
                }
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{labelText}</Text>
                <Text>X</Text>
              </View>
            </TouchableOpacity>
          )}

          {menu && (
            <View
              style={[
                {
                  width: wp(86.933),
                  paddingLeft: 20,
                  backgroundColor: "white"
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  hideMenu(false);
                  hideLabel(true);
                  setStatus([]);
                  setLabelText("ALL");
                }}
                style={{
                  justifyContent: "center",
                  height: hp(5.911)
                }}
              >
                <Text>ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  hideMenu(false);
                  hideLabel(true);
                  setStatus([1]);
                  setLabelText("ACTIVE");
                }}
                style={{
                  justifyContent: "center",
                  height: hp(5.911)
                }}
              >
                <Text>ACTIVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  hideMenu(false);
                  hideLabel(true);
                  setStatus([0]);
                  setLabelText("INACTIVE");
                }}
                style={{
                  justifyContent: "center",
                  height: hp(5.911)
                }}
              >
                <Text>INACTIVE</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: hp(2) }}></View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {buyerlabel && buyerstatus && (
            <TouchableOpacity
              onPress={() => {
                hideBuyerMenu(true);
                hideBuyerLabel(false);
              }}
              style={[
                {
                  width: wp(86.933),
                  height: hp(5.911),
                  backgroundColor: "white",
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 40,
                  justifyContent: "center"
                }
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{buyerlabelText}</Text>
                <Text>X</Text>
              </View>
            </TouchableOpacity>
          )}

          {buyermenu && (
            <View
              style={[
                {
                  width: wp(86.933),
                  paddingLeft: 20,
                  backgroundColor: "white"
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  hideBuyerMenu(false);
                  hideBuyerLabel(true);
                  setBuyerStatus([]);
                  setBuyerLabelText("ALL");
                }}
                style={{
                  justifyContent: "center",
                  height: hp(5.911)
                }}
              >
                <Text>ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  hideBuyerMenu(false);
                  hideBuyerLabel(true);
                  setBuyerStatus([1]);
                  setBuyerLabelText("ACTIVE");
                }}
                style={{
                  justifyContent: "center",
                  height: hp(5.911)
                }}
              >
                <Text>ACTIVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  hideBuyerMenu(false);
                  hideBuyerLabel(true);
                  setBuyerStatus([0]);
                  setBuyerLabelText("INACTIVE");
                }}
                style={{
                  justifyContent: "center",
                  height: hp(5.911)
                }}
              >
                <Text>INACTIVE</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: hp(2) }}></View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <MyButton
            style={{
              width: wp(40.66),
              height: hp(7.211),
              backgroundColor: "#00B0EB",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            myfunc={() => getdata1(2)}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Apply Filter{" "}
            </Text>
          </MyButton>

          <MyButton
            style={{
              width: wp(40.66),
              height: hp(7.211),
              backgroundColor: "#00B0EB",
              borderRadius: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            myfunc={() => refreshfilter()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Reset </Text>
          </MyButton>
        </View>
        {/* <MyButton
          style={{
            width: wp(90.66),
            height: hp(7.211),
            backgroundColor: "#00B0EB",
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center"
          }}
          myfunc={() => getdata1()}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Apply Filter{" "}
          </Text>
        </MyButton> */}

        <View style={{ height: hp(2.46) }} />

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
              {/* {myfun()} */}
              {deals_list}

              {indicator && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
          </View>
        )}
        <View style={{ height: hp(15) }}></View>
      </Content>
    </Container>
  );
};
export default Lead;
