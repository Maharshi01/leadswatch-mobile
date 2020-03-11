/* created by D.satwik
  Created on 10/4/2019
  modified on 10/4/2019

  Property Details of Each Property


*/

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Loader from "../Navigation/Loader";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Button
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import PageHeader from "../CustomComponents/PageHeader";
// import Back from '../../assets/svg/back.svg';
// import Profile from '../../assets/svg/Profile.svg';
import MyButton from "../CustomComponents/MyButton";

const Campaigns = props => {
  const [searchbarValue, setSearch] = useState("");

  const [campaigns, setCampaigns] = useState([]);
  const [fetching, setFetching] = useState(true);
  console.log("campaigns", campaigns);

  //const [dummyCampaigns,setDummyCampaigns] = (campaigns);
  const [myDeals, setMyDeals] = useState(campaigns);
  console.log("mydeals", myDeals);

  useEffect(() => {
    const getdata = () => {
      const config = {
        url: "https://api.leadswatch.com/api/v1/campaign/publishers",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };

      axios(config)
        .then(response => {
          setCampaigns(response.data.data);
          setMyDeals(response.data.data);
          setFetching(false);
          //setDummyCampaigns(response.data.data)
          console.log("response", response);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getdata();
  }, []);

  const deals_list =
    campaigns.length > 0 ? (
      campaigns.map(deal => (
        <Card style={{ width: wp(90.66), borderRadius: 4, borderColor: "transparent", elevation: 0 }}>
          <CardItem style={{ flexDirection: "column", borderRadius: 4 }}>
            <View
              style={{
                width: wp(92),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <View style={{ width: wp(2.64) }}></View>
              {/* <View style={{ width: wp(13), height: 52 }}>
                <Image
                  source={require("../../assets/png/icon.png")}
                  style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                />
              </View> */}
              <View style={{ width: wp(3.52) }}></View>
              <View >
                <Text style={{ color: "#00B0EB", fontWeight: "700" }}>{deal.name}</Text>
              </View>
            </View>
            <View style={{ height: hp(1.5) }}></View>

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
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <View style={{ height: hp(1.5) }}></View>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#FFFFFF",
                    backgroundColor: "#484393",
                    borderRadius: 4,
                    padding: 3
                  }}
                >
                  First Name
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {deal.firstname}
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
                    padding: 3,
                    textAlign: "center"
                  }}
                >
                  Last Name
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {deal.lastname}
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
                    padding: 3,
                    textAlign: "center"
                  }}
                >
                  Email
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {deal.email}
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
                    padding: 3,
                    textAlign: "center"
                  }}
                >
                  Campaign Name
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {deal.name}
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
                    padding: 3,
                    textAlign: "center"
                  }}
                >
                  Campaign Description
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {deal.desc}
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
                    padding: 3,
                    textAlign: "center"
                  }}
                >
                  Phone
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {deal.phone}
                </Text>
                <View style={{ height: hp(1.5) }}></View>
              </View>
              <View style={{ width: wp(4.5) }}></View>

              {/* <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start"
                }}
              >
             <View style={{ height: hp(1.5) }}></View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FFFFFF",
                    backgroundColor: "#484393",
                    borderRadius: 4,
                    padding: 3
                  }}
                >
                  Amount
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>Hola</Text>
                <View style={{ height: hp(1.5) }}></View>
              </View>
               <View style={{ width: wp(4.5) }}></View>

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start"
                }}
              >
             <View style={{ height: hp(1.5) }}></View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FFFFFF",
                    backgroundColor: "#484393",
                    borderRadius: 4,
                    padding: 3
                  }}
                >
                  Amount
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>Hola</Text>
                <View style={{ height: hp(1.5) }}></View>
              </View>
               <View style={{ width: wp(4.5) }}></View> */}
            </View>
          </CardItem>
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
            No Campaigns found...
        </Text>
        </View>
      );
  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>

      <PageHeader
        title={"Campaigns"}
        myfunc={() => {
          props.navigation.navigate("PublisherHome");
        }}
        profile={() => {
          props.navigation.navigate("PublisherProfile");
        }}
      ></PageHeader>

      <Content keyboardShouldPersistTaps={'handled'} style={{ backgroundColor: "#F3F4F7" }}>


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
              placeholder="Search Campaigns"
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
                      item.name +
                      " " +
                      item.desc +
                      " " +
                      item.firstname +
                      " " +
                      item.lastname +
                      " " +
                      item.email +
                      " " +
                      item.phone;

                    prope = prope.toLowerCase();
                    return prope.includes(value);
                  });
                }
                setCampaigns(anotherData);
              }}
            />
          </View>
        </View>
        <View style={{ height: hp(1.72) }}></View>

        {fetching &&
          //   <View  style={{alignItems:'center',justifyContent:'center'}}>
          //   <View style={{height:hp(15)}} />
          //   <Image
          //     style={{ width: "100%", height: '100%' }}
          //     source={require("../../assets/loading.gif")}
          //   />
          // </View>
          <Loader />
        }
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
              {deals_list}
            </View>
          </View>
        )}

        <View style={{ height: hp(15) }}></View>
      </Content>
    </Container>
  );
};
export default Campaigns;
