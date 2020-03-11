/* Created by Uday*/
/* on 04/10/2019 */
/**name=Buyer Contacts Page
 * last modified on 24/10/2019
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import PageHeader from "../CustomComponents/PageHeader";
import Edit from "../../assets/Edit";
import {
  Card,
  CardItem,
  Container,
  Content,
  Toast,
  Root
} from "native-base";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";

const BuyerContacts = props => {
  // State to store contacts
  const [buyer, setBuyer] = useState([]);
  // state to display loading screen
  const [fetching, setFetching] = useState(true);
  //useEffect to get buyer contact details
  useEffect(() => {
    const config = {
      url:
        "http://69.55.49.121:3003/api/v1/buyer/contacts/" +  // api address to get buyer Contacts list
        props.navigation.getParam("id"),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerContact", response);
        setBuyer(response.data.data);   // setting contacts details to buyer state
        setFetching(false);
      })
      .catch(error => {
        console.log("BuyerContactlisterror", error);
      });
  }, []);
  useEffect(()=>{
    // To display Toast Message after Creating contact
    if(props.navigation.getParam('success4')==1){
      console.log("im showing a Toast , lets party")
      Toast.show({
        text: 'Successfully Created Buyer Contact',  // Text to be displayed in Toast Message
        buttonText: '',
        textStyle:{textAlign:'center'},   // aligning text to center
        duration: 3000,   // Duration of Toast
        position: 'center',
        style: {backgroundColor: 'rgba(0,0,0,0.5)'},
      });
      props.navigation.setParams({success4:false})
 
    }
    // To display Toast Message after Updating contact
    if(props.navigation.getParam('success5')==1){
      console.log("im showing a Toast , lets party")
      Toast.show({
        text: 'Successfully Updated Buyer Contact',  // Text to be displayed in Toast Message
        buttonText: '',
        textStyle:{textAlign:'center'},// aligning text to center
        duration: 3000,// Duration of Toast
        position: 'center',
        style: {backgroundColor: 'rgba(0,0,0,0.5)'},
      });
      props.navigation.setParams({success5:false})
 
    }
  })
  // Function re-render functionality
  const myfunc = () => {
    const config = {
      url:
        "http://69.55.49.121:3003/api/v1/buyer/contacts/" +
        props.navigation.getParam("id"),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("BuyerListmyfunc", response);
        setBuyer(response.data.data);
      })
      .catch(error => {
        console.log("BuyerListerrormyfunc",  error.response.data.error.message);
      });
  };
  // Mapping function to display BuyerContacts Cards
  const buyeritems = buyer.map(buyeritem => {
    return (
      <Card style={{ width: wp(92), borderRadius: 6 }}>
        <CardItem style={{ flexDirection: "column", borderRadius: 6 }}>
        <View style={{ flexDirection: "row" }}>
            <View style={{ width: wp(1) }} />
            {/* View with firstname ,lastname and edit button */}
            <View
              style={{ width: wp(13), height: 52, flexDirection: "column" }}
            >
              <Image
                source={require("../../assets/icon.jpg")}
                style={{ height: "100%", width: "100%", borderRadius: 27 }}
              />
              <View style={{ height: hp(1) }} />
            </View>
            <View style={{ width: wp(2) }} />
            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(70),
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    color: "#00B0EB",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  {buyeritem.firstname}
                  {buyeritem.lastname}
                </Text>
                <View style={{ width: wp(6), flexDirection: "column" }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("EditBuyer", {
                        id: buyeritem.id,
                        firstname: buyeritem.firstname,
                        middlename: buyeritem.middlename,
                        lastname: buyeritem.lastname,
                        contact: buyeritem.phone,
                        email: buyeritem.email,
                        company: buyeritem.jobrole,
                        
                        myfunc: myfunc
                      });
                    }}
                  >
                    <Edit color="#9B9B9B" />
                  </TouchableOpacity>
                </View>
              </View>
              {/* View displaying jobrole */}
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 11 }}>
                  {buyeritem.jobrole}
                </Text>
              </View>
              {/* View displaying Phone and email */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: wp(70)
                }}
              >
                <Text style={{ color: "#9B9B9B", fontSize: 11, width: wp(20) }}>
                  {buyeritem.phone}
                </Text>
                <View style={{ width: wp(8) }} />
                <Text style={{ color: "#9B9B9B", fontSize: 11, width: wp(50) }}>
                  {buyeritem.email}
                </Text>
                <View style={{ height: hp(1) }} />
              </View>      
            </View>          
          </View>
        </CardItem>
      </Card>
    );
  });

  return (
    <Root>
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      {/* PageHeader is a Header Component */}
      <PageHeader
        title="Buyer"
        subtitle="Buyer Contacts"
        myfunc={() => {
          props.navigation.navigate("BuyerList");  // Function to navigate to back page
        }}
        profile={()=>{props.navigation.navigate('ProfileDetails')}}
      />
      {/* Displaying Contacts */}
      {!fetching && (
      <Content>
        <View style={{ height: hp(1) }} />
       {buyer.length>0 &&
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {buyeritems}
          </View>
        </View>
       }
       {buyer.length==0 &&
         <View style={{marginTop:'70%'}}><Text>No Contacts Found For This Buyer!Kindly Add Contacts </Text></View>
       }
       <View style={{height:hp(7)}}/>
      </Content>
      )}
      {/* To display loading screen */}
      {fetching && (
              //  <View>
              //  <View style={{height: hp(35)}} />
              // <View >
              //    <ActivityIndicator  size="large" color="#0000ff" />
              //  </View>
              //  </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: hp(15) }} />
            <Image
              style={{ width: "50%", height: "50%" }}
              source={require("../../assets/loading.gif")}
            />
          </View>
      )}
      {!fetching &&
      // VIEW DISPLAYING BUTTON
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
              backgroundColor: "#00B0EB",
              borderRadius: 28,
              width: wp(90)
            }}
          >
            <Text
              style={{
               textAlign:'center',
                paddingTop: 15,
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "bold"
              }}
              onPress={() => {
                props.navigation.navigate("CreateBuyerContact", {
                  id: props.navigation.getParam("id"),
                  myfunc: myfunc
                });
              }}
            >
              Create Buyer Contact
            </Text>
            <View style={{ height: hp(2) }} />
          </TouchableOpacity>
        </View>
      </View>
      }
    </Container>
    </Root>
  );
};
export default BuyerContacts;
