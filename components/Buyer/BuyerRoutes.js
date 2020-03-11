/* Created by Uday*/
/*on 06/10/2019 */
/**
 * last modified on 24/10/2019
 * name=BuyerRoutes Page
 */
import React, { useState, useEffect } from "react";
import Edit from "../../assets/Edit";
import { View, Text, TouchableOpacity, Image,ActivityIndicator } from "react-native";
import { Card, CardItem, Container, Content, Toast, Root } from "native-base";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import PageHeader from "../CustomComponents/PageHeader";
const BuyerRoutes = props => {
  //state to store buyer routes
  const [buyer, setBuyer] = useState([]);
  // state to display loading screen
  const [fetching, setFetching] = useState(true);
  //Function to get Routes List
  useEffect(() => {
    const config = {
      url:
        "http://69.55.49.121:3003/api/v1/broutes/list/" +
        props.navigation.getParam("buyer_id"),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerRoutes", response);
        setBuyer(response.data.data);  //setting data from database to buyer state
        setFetching(false);
      })
      .catch(error => {
        console.log("BuyerRouteserror", error);
      });
  }, []);
  //For Toast Messages
  useEffect(() => {
   // To display Toast after succesful Creation of Buyer Route
    if (props.navigation.getParam("success6") == 1) {
      console.log("im showing a Toast , lets party");
      Toast.show({
        text: "Successfully Created Buyer Route",  //Text to be displayed in Toast
        buttonText: "",
        textStyle: { textAlign: "center" },   //Aligning Text
        duration: 3000,                    // Duration of Toast Message
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }  //Aligning Toast
      });
      props.navigation.setParams({ success6: false });
    }
    if (props.navigation.getParam("success7") == 1) {
      console.log("im showing a Toast , lets party");
      Toast.show({
        text: "Successfully Updated Buyer Route",  //Text to be displayed in Toast
        buttonText: "",
        textStyle: { textAlign: "center" },   //Aligning Text
        duration: 3000,                     // Duration of Toast Message
        position: "center",
        style: { backgroundColor: "rgba(0,0,0,0.5)", top: "20%" }   //Aligning Toast
      });
      props.navigation.setParams({ success7: false });
    }
  });
  //Function for re-rendering After Navigation
  const myfunc = () => {
    const config = {
      url:
        "http://69.55.49.121:3003/api/v1/broutes/list/" +
        props.navigation.getParam("buyer_id"),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerRoutesListmyfunc", response);
        setBuyer(response.data.data);
      })
      .catch(error => {
        console.log("BuyerRoutesListerrormyfunc", error);
      });
  };
  //Mapping array data to view to display routes
  const routeitems = buyer.map(routeitem => {
    return (
      <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0 }}>
        <CardItem style={{ borderRadius: 4, width: wp(90) }}>
          <View style={{ flexDirection: "row", width: wp(90) }}>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "column",
                width: "85%"
              }}
            >
              <Text style={{ fontSize: 12, color: "#9B9B9B" }}>
                {routeitem.name}
              </Text>
              <Text style={{ fontSize: 14, color: "#484393" }}>
                {routeitem.url}
              </Text>
              <Text style={{ fontSize: 14, color: "#484393" }}>
                {routeitem.method}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("EditBuyerRoute", {
                  buyer_id: props.navigation.getParam("buyer_id"),
                  route_id: routeitem.routeid,
                  name: routeitem.name,
                  desc: routeitem.desc,
                  url: routeitem.url,
                  method: routeitem.method,
                  price: routeitem.price,
                  pricetype: routeitem.price_type,
                  noofleads: routeitem.no_of_leads,
                  success_key:routeitem.success_key,
                  failure_key:routeitem.failure_key,
                  myfunc: myfunc
                });
              }}
              style={{ flexDirection: "row", justifyContent: "flex-end" }}
            >
              <Edit color="#9B9B9B" />
            </TouchableOpacity>
          </View>
        </CardItem>
      </Card>
    );
  });
  return (
    <Root>
      <Container style={{ backgroundColor: "#F3F4F7" }}>
        {/* Header Component */}
        <PageHeader
          title="Buyer"
          subtitle="Buyer Routes"
          myfunc={() => {
            props.navigation.navigate("BuyerList");
          }}
          profile={() => {
            props.navigation.navigate("ProfileDetails");
          }}
        />
       {/* Displaying Routes */}
        {!fetching && (
          <Content keyboardShouldPersistTaps={'handled'}>
            <View style={{ height: hp(2) }} />
            {buyer.length > 0 && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {routeitems}
                <View style={{height:hp(10)}}></View>
              </View>
              
            )}
            {buyer.length == 0 && (
             <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:Platform.OS==='android'? 250 :"60%"}}>
                <Text>
                  No Routes found for This Buyer.Kindly Add some to view.
                </Text>
              </View>
            )}
          </Content>
        )}
        {/* To display ActivityIndicator */}
        {fetching && (
          // <View style={{ alignItems: "center", justifyContent: "center" }}>
          //   <View style={{ height: hp(15) }} />
          //   <Image
          //     style={{ width: "50%", height: "50%" }}
          //     source={require("../../assets/loading.gif")}
          //   />
          // </View>
          <View>
          <View style={{height: hp(35)}} />
         <View >
            <ActivityIndicator  size="large" color="#0000ff" />
          </View>
          </View>
        )}
        {!fetching && (
          <View>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 10,
                left: 10
              }}
            >
              <View style={{ width: wp(3) }} />
              <TouchableOpacity
                 style={{
                  width: wp(90.66),
                  height: hp(7.211),
                  backgroundColor: "#00B0EB",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() => {
                  props.navigation.navigate("CreateBuyerRoute", {
                    buyer_id: props.navigation.getParam("buyer_id"),
                    myfunc: myfunc
                  });
                }}
              >
                <Text
                  style={{
                    paddingLeft: 30,
                    paddingTop: 15,
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                  
                >
                  Create Buyer Route
                </Text>

                <View style={{ height: hp(2) }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Container>
    </Root>
  );
};

export default BuyerRoutes;
