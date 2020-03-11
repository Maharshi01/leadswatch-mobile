// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   StatusBar,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   ActivityIndicator
// } from "react-native";

// import {
//   Collapse,
//   CollapseHeader,
//   CollapseBody
// } from "accordion-collapse-react-native";
// import {
//   Container,
//   Header,
//   Content,
//   Card,
//   CardItem,
//   Thumbnail,
//   Body,
//   Button
// } from "native-base";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp
// } from "react-native-responsive-screen";
// import axios from "axios";
// import PageHeader from "../CustomComponents/PageHeader";
// // import Back from '../../assets/svg/back.svg';
// // import Profile from '../../assets/svg/Profile.svg';
// import MyButton from "../CustomComponents/MyButton";

// const AdminLeadDetail = props => {
//   const [deal, setCampaigns] = useState();

//   return (
//     <Container style={{ width: wp(100), backgroundColor: "#F0F0F0" }}>
//       <Content>
//         <View
//           style={{
//             // backgroundColor: "red",
//             width: wp(100),
//             height: hp(10.62),
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <PageHeader
//             title={"Lead"}
//             myfunc={() => {
//               props.navigation.goBack(null);
//             }}
//             profile={() => {
//               props.navigation.navigate("PublisherProfile");
//             }}
//           ></PageHeader>
//         </View>

//         <View style={{ height: hp(2.46) }} />

//         <View style={{ height: hp(1.72) }}></View>

//         <View
//           style={{
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <View
//             style={{
//               width: wp(92)
//             }}
//           >
//             <Card style={{ width: wp(90.66), borderRadius: 8 }}>
//               <CardItem style={{ flexDirection: "column", borderRadius: 8 }}>
//                 <View
//                   style={{
//                     width: wp(92),
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "flex-start"
//                   }}
//                 >
//                   <View style={{ width: wp(2.64) }}></View>
//                   <View style={{ width: wp(13), height: 52 }}>
//                     <Image
//                       source={require("../../assets/png/icon.png")}
//                       style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
//                     />
//                   </View>
//                   <View style={{ width: wp(20) }}></View>
//                   <View style={{ width: wp(70) }}>
//                     <Text>
//                       {props.navigation.getParam("firstname")}{" "}
//                       {props.navigation.getParam("lastname")}
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={{ height: hp(1) }}></View>
//                 <View
//                   style={{
//                     width: wp(85),
//                     borderRadius: 12,
//                     backgroundColor: "#F4F5F7",
//                     flexDirection: "row",
//                     justifyContent: "flex-start",
//                     alignItems: "flex-start",
//                     flexWrap: "wrap"
//                   }}
//                 >
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       textAlign: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
//                         padding: 3
//                       }}
//                     >
//                       Status
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("status") == 1
//                         ? "success"
//                         : "Failed"}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       textAlign: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
//                         padding: 3
//                       }}
//                     >
//                       First Name
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("firstname")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Last Name
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("lastname")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Buyer Name
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("buyer_name")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>

//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Campaign Name
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("campaign_name")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Publisher Name
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("publisher_name")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Vertical Name
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("vertical_name")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Price
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("price")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Cost
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("cost")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                   <View
//                     style={{
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <View style={{ height: hp(0.5) }}></View>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: "#FFFFFF",
//                         backgroundColor: "#484393",
//                         borderRadius: 4,
// padding: "1%",//                         textAlign: "center"
//                       }}
//                     >
//                       Reason
//                     </Text>
//                     <Text style={{ fontSize: 12, color: "#38383B" }}>
//                       {props.navigation.getParam("response")}
//                     </Text>
//                     <View style={{ height: hp(1.5) }}></View>
//                   </View>
//                   <View style={{ width: wp(2.35) }}></View>
//                 </View>
//               </CardItem>
//             </Card>
//           </View>
//         </View>

//         <View style={{ height: hp(15) }}></View>
//       </Content>
//     </Container>
//   );
// };
// export default AdminLeadDetail;

// /* created by D.satwik
//   Created on 10/4/2019
//   modified on 10/4/2019

//   Property Details of Each Property

// */

// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   StatusBar,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   ActivityIndicator
// } from "react-native";

// import {
//   Collapse,
//   CollapseHeader,
//   CollapseBody
// } from "accordion-collapse-react-native";
// import {
//   Container,
//   Header,
//   Content,
//   Card,
//   CardItem,
//   Thumbnail,
//   Body,
//   Button
// } from "native-base";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp
// } from "react-native-responsive-screen";
// import axios from "axios";
// import PageHeader from "../CustomComponents/PageHeader";
// // import Back from '../../assets/svg/back.svg';
// // import Profile from '../../assets/svg/Profile.svg';
// import MyButton from "../CustomComponents/MyButton";

// const LeadDetail = props => {
//   const [searchbarValue, setSearch] = useState("");

//   const [campaigns, setCampaigns] = useState([]);
//   const [fetching, setFetching] = useState(true);
//   console.log("campaigns", campaigns);

//   //const [dummyCampaigns,setDummyCampaigns] = (campaigns);
//   const [myDeals, setMyDeals] = useState(campaigns);
//   console.log("mydeals", myDeals);

//   useEffect(() => {
//     const getdata = () => {
//       const config = {
//         url: "http://69.50.49.121:3003/api/v1/campaign/publishers",
//         method: "get",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + global.access_token
//         }
//       };

//       axios(config)
//         .then(response => {
//           setCampaigns(response.data.data);
//           setMyDeals(response.data.data);
//           setFetching(false);
//           //setDummyCampaigns(response.data.data)
//           console.log("response", response);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     };
//     getdata();
//   }, []);

//   const deals_list =
//     campaigns.length > 0 ? (
//       campaigns.map(deal => (
//         <Card style={{ width: wp(90.66), borderRadius: 8 }}>
//           <CardItem style={{ flexDirection: "column", borderRadius: 8 }}>
//             <View
//               style={{
//                 width: wp(92),
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "flex-start"
//               }}
//             >
//               <View style={{ width: wp(2.64) }}></View>
//               <View style={{ width: wp(10), height: hp(6) }}>
//                 <Image
//                   source={require("../../assets/png/icon.png")}
//                   style={{ height: "100%", width: "100%", borderRadius: 100 }}
//                 />
//               </View>
//               <View style={{ width: wp(3.52) }}></View>
//               <View>
//                 <Text>Publisher Name</Text>
//               </View>
//             </View>

//             <View style={{ height: hp(0.5) }}></View>
//             <View
//               style={{
//                 width: wp(85),
//                 borderRadius: 12,
//                 backgroundColor: "#F4F5F7",
//                 flexDirection: "row",
//                 justifyContent: "flex-start",
//                 alignItems: "flex-start",
//                 flexWrap: "wrap"
//               }}
//             >
//               {/* <View style={{ width: wp(2.35) }}></View> */}
//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textAlign: "center"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3
//                   }}
//                 >
//                   First Name
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>
//                   {deal.firstname}
//                 </Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>
//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3,
//                     textAlign: "center"
//                   }}
//                 >
//                   Last Name
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>
//                   {deal.lastname}
//                 </Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>
//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3,
//                     textAlign: "center"
//                   }}
//                 >
//                   Email
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>
//                   {deal.email}
//                 </Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>

//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3,
//                     textAlign: "center"
//                   }}
//                 >
//                   Campaign Name
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>
//                   {deal.name}
//                 </Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>
//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3,
//                     textAlign: "center"
//                   }}
//                 >
//                   Campaign Description
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>
//                   {deal.desc}
//                 </Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>
//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3,
//                     textAlign: "center"
//                   }}
//                 >
//                   Phone
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>
//                   {deal.phone}
//                 </Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>

//               {/* <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "flex-start"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3
//                   }}
//                 >
//                   Amount
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>Hola</Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View>

//               <View
//                 style={{
//                   flexDirection: "column",
//                   justifyContent: "flex-start"
//                 }}
//               >
//                 <View style={{ height: hp(0.5) }}></View>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: "#FFFFFF",
//                     backgroundColor: "#484393",
//                     borderRadius: 4,
//                     padding: 3
//                   }}
//                 >
//                   Amount
//                 </Text>
//                 <Text style={{ fontSize: 12, color: "#38383B" }}>Hola</Text>
//                 <View style={{ height: hp(1.5) }}></View>
//               </View>
//               <View style={{ width: wp(2.35) }}></View> */}
//             </View>
//           </CardItem>
//         </Card>
//       ))
//     ) : (
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "center"
//         }}
//       >
//         <Text style={{ color: "#A3A1C9", paddingTop: hp(29.73) }}>
//           OOPS..No Campaigns found !!..
//         </Text>
//       </View>
//     );
//   return (
//     <Container style={{ width: wp(100), backgroundColor: "#F0F0F0" }}>
//       <Content>
//         <View
//           style={{
//             // backgroundColor: "red",
//             width: wp(100),
//             height: hp(10.62),
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <PageHeader
//             title={"Campaigns"}
//             myfunc={() => {
//               props.navigation.navigate("PublisherHome");
//             }}
//             profile={() => {
//               props.navigation.navigate("PublisherProfile");
//             }}
//           ></PageHeader>
//         </View>

//         <View style={{ height: hp(2.46) }} />

//         <View
//           style={{
//             width: wp(100),
//             alignItems: "center",
//             flexDirection: "row",
//             justifyContent: "center"
//           }}
//         >
//           <View
//             style={{
//               borderRadius: 35,
//               backgroundColor: "#FFFFFF",

//               width: wp(86.93)
//             }}
//           >
//             <TextInput
//               style={{
//                 width: "100%",
//                 height: hp(5.91),
//                 width: wp(86.93),
//                 paddingLeft: wp(7.46)
//               }}
//               value={searchbarValue}
//               placeholder="Search Campaigns"
//               textAlignVertical="center"
//               placeholderTextColor="#A3A1C9"
//               onChangeText={value => {
//                 setSearch(value);
//                 value = value.toLowerCase();
//                 filterData = [...myDeals];
//                 anotherData = [...filterData];
//                 if (value != "") {
//                   anotherData = filterData.filter(item => {
//                     let prope =
//                       item.name +
//                       " " +
//                       item.desc +
//                       " " +
//                       item.firstname +
//                       " " +
//                       item.lastname +
//                       " " +
//                       item.email +
//                       " " +
//                       item.phone;

//                     prope = prope.toLowerCase();
//                     return prope.includes(value);
//                   });
//                 }
//                 setCampaigns(anotherData);
//               }}
//             />
//           </View>
//         </View>
//         <View style={{ height: hp(1.72) }}></View>

//         {fetching && (
//           <View>
//             <View style={{ height: hp(35) }} />
//             <View>
//               <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//           </View>
//         )}
//         {!fetching && (
//           <View
//             style={{
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center"
//             }}
//           >
//             <View
//               style={{
//                 width: wp(92)
//               }}
//             >
//               {deals_list}
//             </View>
//           </View>
//         )}

//         <View style={{ height: hp(15) }}></View>
//       </Content>
//     </Container>
//   );
// };
// export default LeadDetail;

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

import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Textarea,
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
// import console = require("console");

const AdminLeadDetail = props => {
  const [deal, setCampaigns] = useState();
  const details = props.navigation.getParam("deal");
  console.log(details);
  return (
    <Container style={{ width: wp(100), backgroundColor: "#F0F0F0" }}>
      <PageHeader
        title={"Lead"}
        myfunc={() => {
          props.navigation.goBack(null);
        }}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>
      <Content>
        <View style={{ height: hp(2.46) }} />

        <View style={{ height: hp(1.72) }}></View>

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
            <Card
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: wp(90.66),
                borderRadius: 4,
                borderColor: "transparent",
                elevation: 0
              }}
            >
              <View style={{ height: hp(1.5) }}></View>
              <View
                style={{
                  width: wp(92),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <View style={{ width: wp(1.94) }}></View>
                {/* <View>
                  <Image
                    source={require("../../assets/png/icon.png")}
                    style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
                  />
                </View> */}
                <View style={{ width: wp(4) }}></View>
                <View style={{ width: wp(70) }}>
                  <Text style={{ color: "#00B0EB", fontWeight: "700" }}>
                    {props.navigation.getParam("firstname")}{" "}
                    {props.navigation.getParam("lastname")}
                  </Text>
                </View>
              </View>
              <View style={{ height: hp(1.5) }}></View>
              <CardItem
                style={{
                  width: wp(85),
                  borderRadius: 12,
                  backgroundColor: "#F4F5F7",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      LW ID
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.lead_id}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      {/* Status */}
                      First Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {/* {details.status_text=="true"?"Success":"Fail"} */}
                      {details.lead_details.firstname}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      Last Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.lead_details.lastname}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      Publisher ID
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.publisher_id}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      Publisher Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.publisher_name}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      Vertical Id
                    </Text>
                    <View style={{ width: wp(4) }}></View>
                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.vertical_id}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9B9B9B"
                      }}
                    >
                      Vertical Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.vertical_name}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Campaign Id
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.campaign_id}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Campaign Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {props.navigation.getParam("campaign_name")}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Buyer Id
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.buyer_id}
                    </Text>
                  </View>
                  <View style={{ height: hp(2) }}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,

                        color: "#9B9B9B"
                      }}
                    >
                      Buyer Name
                    </Text>
                    <View style={{ width: wp(4) }}></View>

                    <Text
                      style={{ width: wp(45), fontSize: 14, color: "#484393" }}
                    >
                      {details.buyer_name}
                    </Text>
                  </View>
                </View>
                <View style={{ height: hp(2) }}></View>
                <View
                  style={{
                    width: wp(85),
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
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
                      {details.status_text == "true" ? "Success" : "Fail"}{" "}
                    </Text>
                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                  <View style={{ width: wp(3) }}></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
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
                      {details.status_text == "true" ? "Accepted" : "Rejected"}{" "}
                    </Text>
                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                  <View style={{ width: wp(3) }}></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
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
                      {details.cost - details.price}
                    </Text>
                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                  <View style={{ width: wp(3) }}></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
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
                      {props.navigation.getParam("price")}
                    </Text>

                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                  <View style={{ width: wp(3) }}></View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ height: hp(0.5) }}></View>
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
                      {props.navigation.getParam("cost")}
                    </Text>
                    <View style={{ height: hp(1.5) }}></View>
                  </View>
                </View>
              </CardItem>
              <View style={{ height: hp(1.5) }}></View>
              <CardItem
                style={{
                  width: wp(85),
                  borderRadius: 12,
                  backgroundColor: "#F4F5F7",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ height: hp(0.5) }}></View>
                <Text
                  style={{
                    // fontSize: 12,
                    // color: "#FFFFFF",
                    // backgroundColor: "#484393",
                    // borderRadius: 4,
                    // padding: 3,
                    // textAlign: "center"
                    color: "#9B9B9B",
                    fontSize: 14,
                    marginLeft: "2%",
                    // fontWeight: "700",
                    textAlign: "center"
                  }}
                >
                  Reason
                </Text>
                <Text style={{ fontSize: 12, color: "#38383B" }}>
                  {props.navigation.getParam("response")}
                </Text>
                <View style={{ height: hp(1.5) }}></View>
              </CardItem>
              <View style={{ height: hp(1.5) }}></View>
            </Card>
          </View>
        </View>

        <View style={{ height: hp(15) }}></View>
      </Content>
    </Container>
  );
};
export default AdminLeadDetail;
