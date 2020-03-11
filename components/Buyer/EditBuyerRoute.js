/* Created By Uday */
/* Last Modified on 17/10/2019 */
/**
 * name="Update Buyer Route Page"
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Button,
  Picker,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { Switch } from "react-native-paper";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IOSPicker from 'react-native-ios-picker';
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import Cancel from '../../assets/js/Cancel';
import Help from "../../assets/js/Help";
import * as SecureStore from 'expo-secure-store';
import {
  Card,
  CardItem,
  Body,
  Container,
  Content,
  Left,
  Right,
  Header,
  Textarea
} from "native-base";
import PageHeader from "../CustomComponents/PageHeader";
import { Platform } from "@unimodules/core";
const EditBuyerRoute = props => {
    const [buyerroute,setBuyerRoute]=useState([])
  const [buyerroutesett,setBuyerRouteSett]=useState([])
  const [mandatory,setMandatory]=useState()
  const [name,setName]=useState(props.navigation.getParam('name'))
  const [desc,setDesc]=useState(props.navigation.getParam('desc'))
  const [method,setMethod]=useState(props.navigation.getParam('method'))
  const [url,setUrl]=useState(props.navigation.getParam('url'))
  const [price, setPrice] = useState(props.navigation.getParam('price'));
  const [pricetype, setPriceType] = useState(props.navigation.getParam('pricetype'));
  const [no_of_leads, setNoOfLeads] = useState(props.navigation.getParam('noofleads'));
  const [success,setSuccess]=useState();
  const [failure,setFailure]=useState();
  const [open, setOpen] = useState(false);
  // states for handling Params
  const [paramstatus, setParamStatus] = useState(false);
  const [paramkey, setParamKey] = useState();
  const [paramtype, setParamValue] = useState("Select Data Type");
  const [paramdesc, setParamDesc] = useState();
  const [paramData, setParamData] = useState([]);
  const [paramrequired, setParamRequired] = useState("Is it Required");
  // states for handling Body
  const [bodyData, setBodyData] = useState([]);
  const [bodystatus, setBodyStatus] = useState(false);
  const [bodykey, setBodyKey] = useState();
  const [bodytype, setBodyType] = useState("Select Data Type");
  const [bodydesc, setBodyDesc] = useState();
  const [bodyindex, setBodyIndex] = useState();
  const [bodyrequired, setBodyRequired] = useState("Is it Required");
  const [editbodyStatus, setEditBodyStatus] = useState(false);
  // states for handling Header
  const [headerindex, setHeaderIndex] = useState();
  const [headerData, setHeaderData] = useState([]);
  const [editheaderStatus, setEditHeaderStatus] = useState(false);
  const [headerstatus, setHeaderStatus] = useState(false);
  const [headerkey, setHeaderKey] = useState();
  const [headertype, setHeaderType] = useState("Select Data Type");
  const [headerdesc, setHeaderDesc] = useState();
  const [headerrequired, setHeaderRequired] = useState("Is it Required");
  // states for handling Auth
  const [authData, setAuthData] = useState([]);
  const [authstatus, setAuthStatus] = useState(false);
  const [authkey, setAuthKey] = useState();
  const [authtype, setAuthType] = useState("Select Data Type");
  const [authdesc, setAuthDesc] = useState();
  const [authrequired, setAuthRequired] = useState("Is it Required");
  const [editauthStatus, setEditAuthStatus] = useState(false);
  const [authindex, setAuthIndex] = useState();
  const [editStatus, setEditStatus] = useState(false);
  const [bodyeditstatus, setBodyEditStatus] = useState(false);
  const [index, setIndex] = useState();
  const [verticals, setVerticals] = useState([]);
  const [verticalsfields, setVerticalsFields] = useState([]);
  const [pickervalue, setPickerValue] = useState();
  const [parampicker, setParamPicker] = useState();
  const [pickername,setPickerName]=useState()
  const [payload,setPayload]=useState()
  const [xmlarray, setXmlArray] = useState([]);
  const [xmlstate, setXmlState] = useState(false);
  const [xmlpost, setXmlPost] = useState([]);
  const [radiostatus, setRadioStatus] = useState();
  const [payloadpick,setPayloadPick]=useState([])
  const [xmlindexarray,setXmlIndexArray]=useState([]);
  const[tabledata,settabledata]=useState();
  const [mappedKeys,setMappedKeys]=useState({})
  // Getting details of Verticals and routes list
  useEffect(() => {
    SelectedPicker()
    console.log("Pppppppppppp",props.navigation.getParam('price'))
    const config1 = {
      url: "http://69.55.49.121:3003/api/v1/vertical/list",

      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config1)
      .then(response => {
        console.log("Verticals", response);
        setVerticals(response.data.data);
      })
      .catch(error => {
        console.log("BuyerVerticalsserror", error);
      });

      const config = {
      url: 'http://69.55.49.121:3003/api/v1/broutes/detail/'+props.navigation.getParam('route_id'),
      
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+global.access_token
      }
    }
      axios(config).then((response) => {
    // console.log("BuyerRoute",response)
    setBuyerRoute(response.data.data)
    console.log("BuyerRoute=======================",response.data.data[0])
    console.log("BuyerRouteSettings=******88888888888",response.data.data[0]["route_settings"][0])
    console.log("\\\\\\\\\\\\\\\\\\\\\\\hgh", response.data.data[0]['route_settings'].length)
      setMandatory(response.data.data[0].vertical_buyer_active)
      console.log("VerticalidEdit",response.data.data[0].vertical_id)
      setPickerValue(response.data.data[0].vertical_id)
      setPickerName(response.data.data[0].vertical_name)
      showVerticals(response.data.data[0].vertical_id)
     setPriceType(response.data.data[0].price_type)
     setPayload(response.data.data[0].post_payload_data)
     setSuccess(response.data.data[0].success_key)
     setFailure(response.data.data[0].failure_key)
     setRadioStatus(response.data.data[0].payload_format)
      for(i=0; (i<response.data.data[0]['route_settings'].length); i++){
        console.log("inside for loop")
              // to push into paramData array
              if(response.data.data[0]['route_settings'][i].category==="params"){
                console.log("inside if loop params")
                paramData.push(response.data.data[0]['route_settings'][i])
              }
              // condition to push into paramData array
              if(response.data.data[0]['route_settings'][i].category==="body"){
               bodyData.push(response.data.data[0]['route_settings'][i])
              }
              //  to push into paramData array
              if(response.data.data[0]['route_settings'][i].category==="header"){
                
                headerData.push(response.data.data[0]['route_settings'][i])
              }
              //to push into paramData array
              if(response.data.data[0]['route_settings'][i].category==="auth"){
                authData.push(response.data.data[0]['route_settings'][i])
              }
            }
            if(response.data.data[0].payload_format==="Json"){
              var xml2js = require("react-native-xml2js");
              var obj = { name: "Super", Surname: "Man", age: 23 };
              var builder = new xml2js.Builder();
              var xmlconv = builder.buildObject(response.data.data[0].post_payload_data);
              console.log("XMLCONV", xmlconv);
              var XMLParser = require("react-xml-parser");
              var xml = new XMLParser().parseFromString(xmlconv);
              console.log("XML+++++++", xml);
              console.log("XMLGET", xml.getElementsByTagName("*"));
              var xmlget = xml.getElementsByTagName("*");
              for (var i = 0; i < xmlget.length; i++) {
                
                  xmlarray.push(xmlget[i].name);
                  if(xmlget[i].children.length>0){
                  xmlindexarray.push(i)}
               
              }
              setXmlState(true);
              console.log("xmlarray", xmlarray);
              }
              if(response.data.data[0].payload_format==='Xml'){
              var XMLParser = require("react-xml-parser");
              var xml = new XMLParser().parseFromString(response.data.data[0].post_payload_data);
             
              console.log("XML+++++++", xml);
              console.log("XMLGET", xml.getElementsByTagName("*"));
              var xmlget = xml.getElementsByTagName("*");
              global.editpayloadpick=[];
              for (var i = 0; i < xmlget.length; i++) {
                xmlarray.push(xmlget[i].name);
                  if(xmlget[i].children.length>0){
                  xmlindexarray.push(i)}
                  console.log("XML IndexArray",xmlindexarray);
                  
                  global.editpayloadpick.push("")
                 
              }
              setXmlState(true);
              console.log("xmlarray", xmlarray);
              }
    }).catch((error) => {
    
      console.log("BuyerRoutegeterror",error)
    })
  }, []);
   SelectedPicker= async () => {
    const getundo = await SecureStore.getItemAsync("picker");
    setRadioStatus(getundo);
  };
  //function to add Params data
  function getParam() {
    if(paramkey && paramtype && paramdesc && paramrequired){
    const paramdata = {
      key: paramkey,
      datatype: paramtype,
      map_field: paramdesc,
      required: paramrequired
    };
    console.log("Paramdata", paramdata);
    console.log(typeof paramData);
    console.log(paramData.prototype);
    paramData.push(paramdata);
    console.log("paramData", paramData);
  }else {
    Alert.alert(
      "Alert",
      "Please Fill All details to Add",
      [
        {
          text: "ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }
  }
  //function to add Body Data
  function getBody() {
    if (bodykey && bodytype && bodydesc && bodyrequired) {
    const bodydata = {
      key: bodykey,
      datatype: bodytype,
      map_field: bodydesc,
      required: bodyrequired
    };
    console.log("bodydata", bodydata);
    bodyData.push(bodydata);
    console.log("bodyData", bodyData);
  }else {
    Alert.alert(
      "Alert",
      "Please Fill All details to Add",
      [
        {
          text: "ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }
  }
  //function to Header Data
  function getHeader() {
    if (headerkey && headertype && headerdesc && headerrequired) {
    const headerdata = {
      key: headerkey,
      datatype: headertype,
      map_field: headerdesc,
      required: headerrequired
    };
    console.log("headerdata", headerdata);
    headerData.push(headerdata);
    console.log("headerData", headerData);
  }else {
    Alert.alert(
      "Alert",
      "Please Fill All details to Add",
      [
        {
          text: "ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }
  }
  //function to add Authorization Data
  function getAuth() {
    if (authkey && authtype && authdesc && authrequired) {
    const authdata = {
      key: authkey,
      datatype: authtype,
      map_field: authdesc,
      required: authrequired
    };
    console.log("Paramdata", authdata);

    authData.push(authdata);
    console.log("paramData", authData);
  }else {
    Alert.alert(
      "Alert",
      "Please Fill All details to Add",
      [
        {
          text: "ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "ok"
        }
      ],
      { cancelable: false }
    );
  }
  }
  // Displaying Param Items after adding
  const paramitems =
    paramData.length &&
    paramData.map((paramitem, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          
          <Text style={{width:wp(20)}}>{paramitem.key}</Text>
          <Text style={{width:wp(20)}}>{paramitem.datatype}</Text>
          <Text style={{width:wp(25)}}>{paramitem.map_field}</Text>
          <Text style={{width:wp(10)}}> {paramitem.required}</Text>
          <Text
          style={{width:wp(7)}}
            onPress={() => {
              setEditStatus(true);
              setParamStatus(false);
              setIndex(index);
              setParamKey(paramData[index].key);
              setParamValue(paramData[index].datatype);
              setParamDesc(paramData[index].map_field);
              setParamRequired(paramData[index].required)
            }}
          >
            Edit
          </Text>
         
          <TouchableOpacity
    
            onPress={() => {
              const newParamData = paramData.filter(
                (item, idx) => idx !== index);
             console.log(newParamData);
              setParamData(newParamData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
          <Text style={{width:wp(1)}}></Text>
        </View>
      );
    });
    // Displaying Body Items after adding
  const bodyitems =
    bodyData.length &&
    bodyData.map((bodyitem, index) => {
      return (
        <View style={{ flexDirection: "row",  }}>
          <Text style={{width:wp(20)}}>{bodyitem.key}</Text>
          <Text style={{width:wp(20)}}>{bodyitem.datatype}</Text>
          <Text style={{width:wp(25)}}>{bodyitem.map_field}</Text>
          <Text style={{width:wp(10)}}>{bodyitem.required}</Text>
          <Text
          style={{width:wp(7)}}
            onPress={() => {
              setEditBodyStatus(true);
              setBodyStatus(false);
              setBodyIndex(index);
              setBodyKey(bodyData[index].key);
              setBodyType(bodyData[index].datatype);
              setBodyDesc(bodyData[index].map_field);
              setBodyRequired(bodyData[index].required)
            }}
          >
            Edit
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newBodyData = bodyData.filter(
                (item, idx) => idx !== index
              );
              console.log(newBodyData)
              setBodyData(newBodyData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
    // Displaying Header Items after adding
  const headeritems =
    headerData.length &&
    headerData.map((headeritem, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{width:wp(20)}}>{headeritem.key}</Text>
          <Text style={{width:wp(20)}}>{headeritem.datatype}</Text>
          <Text style={{width:wp(25)}}>{headeritem.map_field}</Text>
          <Text style={{width:wp(10)}}>{headeritem.required}</Text>
          <Text
          style={{width:wp(7)}}
            onPress={() => {
              setEditHeaderStatus(true);
              setHeaderStatus(false);
              setHeaderIndex(index);
              setHeaderKey(headerData[index].key);
              setHeaderType(headerData[index].datatype);
              setHeaderDesc(headerData[index].map_field);
              setHeaderRequired(headerData[index].required)
              
            }}
          >
            Edit
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newHeaderData = headerData.filter(
                (item, idx) => idx !== index
              );
              console.log("HeaderData",newHeaderData)
              setHeaderData(newHeaderData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
    // Displaying Auth Items after adding
  const authitems =
    authData.length &&
    authData.map((authitem, index) => {
      return (
        <View style={{ flexDirection: "row"}}>
          <Text style={{width:wp(20)}}>{authitem.key}</Text>
          <Text style={{width:wp(20)}}>{authitem.datatype}</Text>
          <Text style={{width:wp(25)}}>{authitem.map_field}</Text>
          <Text style={{width:wp(10)}}>{authitem.required}</Text>
          <Text
          style={{width:wp(7)}}
            onPress={() => {
              setEditAuthStatus(true);
              setAuthStatus(false);
              setAuthIndex(index);
              setAuthKey(authData[index].key);
              setAuthType(authData[index].datatype);
              setAuthDesc(authData[index].map_field);
              setAuthRequired(authData[index].required)
            }}
          >
            Edit
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newAuthData = authData.filter(
                (item, idx) => idx !== index
              );
              setAuthData(newAuthData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  // function to show vertical fields based on vertical id
  function showVerticals(id) {
    console.log("Inside Show Verticalsid", id);
    const config2 = {
      url: "http://69.55.49.121:3003/api/v1/vertical/fieldlist/" + id,

      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config2)
      .then(response => {
        console.log("Verticalsfields===================>", response.data.data);
        setVerticalsFields(response.data.data);
      })
      .catch(error => {
        console.log("BuyerVerticalsfieldsserror", error);
      });
  };
  function payloadFile(a,b){
    // setPayloadPick([])
    let temp=[]
   console.log("index",a)
   console.log("pickervalue",b)
   temp=[...global.editpayloadpick]
   temp[a]=b;
   global.editpayloadpick[a]=b;

   console.log("pickkkkk",temp)
  setPayloadPick(temp)
  }
  // function to push Data into Database
  function save_details() {
    if (name != "" && desc != "") {
      const data = {
        route: {
          name: name,
          desc: desc,
          buyer_id: props.navigation.getParam("buyer_id"),
          price: price,
          price_type: pricetype,
          no_of_leads: no_of_leads,
          url: url,
          method: method,
          vertical_id: pickervalue,
          active:1,
          vertical_buyer_active:mandatory?1:0,
          post_payload_data:payload,
          success_key:success,
          failure_key:failure,
          mapped_keys:mappedKeys,
          payload_format:radiostatus
        },
        route_settings: {
          params: paramData,
          body: bodyData,
          header: headerData,
          auth: authData,
          payload:xmlpost
        }
      };
      console.log("Data==============================================", data);
      console.log(global.access_token);

      const config = {
        url: 'http://69.55.49.121:3003/api/v1/broutes/update/'+props.navigation.getParam('route_id'),
        data: data,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.access_token
        }
      };
      console.log("hello");
      axios(config)
        .then(response => {
          if (response.status == 200) {
            console.log("Createroute", response);
            const variable = props.navigation.getParam("myfunc");
            variable();
            props.navigation.navigate("BuyerRoutes", { success7: 1 });
          }
        })
        .catch(error => {
          console.log("ErrorBuyerRoutesecreate", error.response.data.error.sqlMessage

          );
          Alert.alert(
            "Alert",
            error.response.data.error.sqlMessage

            [
              {
                text: "ok",
                onPress: () => console.log("Cancel Pressed"),
                style: "ok"
              }
            ],
            { cancelable: false }
          );

          // setError("Please Enter Correct card details")
          console.log(error);
        });
    } else {
      Alert.alert(
        "Alert",
        "Please Fill All details",
        [
          {
            text: "ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "ok"
          }
        ],
        { cancelable: false }
      );
    }
  }
  // SaveClick=async()=>{
  //   SecureStore.setItemAsync('efd',payload)
  // }
  // RevertClick=async()=>{
  //   const geteundo=await SecureStore.getItemAsync('eundo')
  //   setPayload(geteundo)
  // }
  //functions for handling text inputs
  route_name = value => {
    setName(value);
  };
  route_desc = value => {
    setDesc(value);
  };
  route_method = value => {
    setMethod(value);
  };
  route_url = value => {
    setUrl(value);
  };
  route_price = value => {
    setPrice(value);
  };
  route_pricetype = value => {
    setPriceType(value);
  };
  route_leads = value => {
    setNoOfLeads(value);
  };
  route_param_key = value => {
    setParamKey(value);
  };
  route_param_value = value => {
    setParamValue(value);
  };
  route_param_desc = value => {
    setParamDesc(value);
  };
  route_param_required = value => {
    setParamRequired(value);
  };
  route_body_key = value => {
    setBodyKey(value);
  };
  route_body_type = value => {
    setBodyType(value);
  };
  route_body_desc = value => {
    setBodyDesc(value);
  };
  route_body_required = value => {
    setBodyRequired(value);
  };
  route_header_key = value => {
    setHeaderKey(value);
  };
  route_header_type = value => {
    setHeaderType(value);
  };
  route_header_desc = value => {
    setHeaderDesc(value);
  };
  route_header_required = value => {
    setHeaderRequired(value);
  };
  route_auth_key = value => {
    setAuthKey(value);
  };
  route_auth_type = value => {
    setAuthType(value);
  };
  route_auth_desc = value => {
    setAuthDesc(value);
  };
  route_auth_required = value => {
    setAuthRequired(value);
  };
  route_response_success = value => {
    setSuccess(value);
  };
  route_response_failure = value => {
    setFailure(value);
  };
  function handlePayload(payload){
    setPayload(payload)
  }
  const callModel = () => {
    setOpen(true);
  };
  return (
    <Container style={{justifyContent:"center",alignItems:"center",backgroundColor:'#F3F4F7'}}>
      {open && (
        <ShowModal
          open={open}
          setOpen={setOpen}
          verticalsfields={verticalsfields}
        />
      )}
      <PageHeader title="Buyer" subtitle="Update Buyer Route" myfunc={() => {
              props.navigation.navigate("BuyerRoutes");
            }} 
            profile={()=>{props.navigation.navigate('ProfileDetails')}}/>
<KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>    
    <View style={{height:hp(2)}} />
    {Platform.OS=='ios'?
        <View style={{justifyContent:"center",alignItems:'center',borderColor:'#707070',borderRadius:6,borderWidth:1,width:wp(90)}}>
        {/* Picker to display Verticals */}
        <IOSPicker
        mode="modal"
          selectedValue={pickername}
          style={{ width:wp(88)}}
          onValueChange={(itemValue, itemIndex) => {
            console.log("item=========",itemValue.name,itemValue.id)
            setPickerValue(itemValue.id);
            setPickerName(itemValue.name)
            showVerticals(itemValue.id);
          }}
        >
          
          {verticals.map((item, a) => (
            <Picker.Item label={item.name} value={{"id":item.id,"name":item.name}} />
          ))}
        </IOSPicker>
        </View>:
        <View style={{justifyContent:"center",alignItems:'center',borderColor:'#707070',borderRadius:6,borderWidth:1,width:wp(90)}}>
        {/* Picker to display Verticals */}
        <Picker
          selectedValue={pickervalue}
          style={{ width:wp(90)}}
          onValueChange={(itemValue, itemIndex) => {
            setPickerValue(itemValue);
            showVerticals(itemValue);
          }}
        >
          
          {verticals.map((item, a) => (
            <Picker.Item label={item.name} value={item.id} />
          ))}
        </Picker>
        </View>}

        <View style={{height:hp(2)}} />
        <View style={{flexDirection:"row"}} >
          <Text>Status:</Text>
          <Switch
            onValueChange={mandatory => setMandatory(mandatory)}
            value={mandatory==1?true:false}
          />
        </View>
        <View style={{height:hp(2)}} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Name</Text>
                <View style={{height:hp(1)}} />
                <TextInput
                style={{width:wp(88)}}
                  placeholder="name"
                  value={name}
                  onChangeText={value => route_name(value)}
                />
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>
                  Description
                </Text>
                <View style={{height:hp(1)}} />
                <TextInput
                style={{width:wp(88)}}
                  placeholder="Description"
                  value={desc}
                  onChangeText={value => route_desc(value)}
                />
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Method</Text>
                <View style={{height:hp(1)}} />
                <TextInput
                style={{width:wp(88)}}
                  placeholder="Method"
                  value={method}
                  onChangeText={value => route_method(value)}
                />
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Url</Text>
                <View style={{height:hp(1)}} />
                <TextInput
                style={{width:wp(88)}}
                  placeholder="Url"
                  value={url}
                  onChangeText={value => route_url(value)}
                />
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Price</Text>
                <View style={{height:hp(1)}} />
                <TextInput
                style={{width:wp(88)}}
                  placeholder="Price"
                  value={price.toString()}
                  onChangeText={value => route_price(value)}
                />
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>
                  PriceType
                </Text>
                <View style={{height:hp(1)}} />
                {Platform.OS=='ios'?
                <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1
                      }}
                    >
                    
                      <IOSPicker
                      mode="modal"
                        selectedValue={pricetype}
                        style={{ width: wp(80) }}
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_pricetype(itemValue);
                        }}
                      >
                        <Picker label="Select Price Type"  />
                        <Picker label="Percentage" value="Percentage" />
                        <Picker label="Amount" value="Amount" />
                      </IOSPicker>
                    </View>:<View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1
                      }}
                    >
                      <View style={{height:hp(1)}} />
                      <Picker
                      mode="modal"
                        selectedValue={pricetype}
                        style={{ width: wp(80) }}
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_pricetype(itemValue);
                        }}
                      >
                        <Picker label="Select Price Type"  />
                        <Picker label="Percentage" value="Percentage" />
                        <Picker label="Per Lead" value="Amount" />
                      </Picker>
                    </View>}
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>
                  Number of Leads
                </Text>
                <View style={{height:hp(1)}} />
                <TextInput
                style={{width:wp(88)}}
                value={no_of_leads.toString()}
                  placeholder="Number of leads"
                  onChangeText={value => route_leads(value)}
                />
              </View>
            </CardItem>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>
                  Response
                </Text>
                <View style={{height:hp(1)}} />
                <View style={{flexDirection:"row"}}>
                <TextInput
                  value={success}
                  style={{ width: wp(40) }}
                  placeholder="Success"
                  onChangeText={value => route_response_success(value)}
                />
                <TextInput
                   value={failure}
                  style={{ width: wp(40) }}
                  placeholder="Failure"
                  onChangeText={value => route_response_failure(value)}
                />
                </View>
              </View>
            </CardItem>
          </Card>
          {/* Params Handling */}
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Params</Text>
                <View style={{height:hp(1)}} />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Key</Text>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Datatype</Text>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Mapfield</Text>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Required</Text>
                  <Text
                  style={{fontSize:14,color:"#484393",width:wp(10)}}
            onPress={() => {
              if (paramstatus == true) setParamStatus(false);
                          else setParamStatus(true);
                          
              setEditStatus(false);
            }}
          >
            +
          </Text>
                </View>
                <Text style={{height:hp(1)}} />
                {paramData.length > 0 && <View>{paramitems}</View>}
                {paramstatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
            style={{width:wp(88)}}
              placeholder="key"
              onChangeText={value => route_param_key(value)}
            />
            <Text style={{height:hp(1)}} />
          {Platform.OS=='ios'?
            <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={paramtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_param_value(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:
                          <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                        
                            selectedValue={paramtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_param_value(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
        <Text style={{height:hp(1)}} />
        {/* <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1}}>
            <Picker
              selectedValue={paramdesc}
              style={{ width:wp(80)}}
              onValueChange={(itemValue, itemIndex) => {
                setParamPicker(itemValue);
                route_param_desc(itemValue);
              }}
            >
              <Picker label="Select Vertical Fields" value="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </Picker>
            </View> */}
            <TextInput
            style={{width:wp(88)}}
              placeholder="value"
              onChangeText={value => route_param_desc(value)}
            />
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={paramrequired}
                       
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_param_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??"  />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="No" />
                      </IOSPicker>
                    </View>:<View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <Picker
                     
                        selectedValue={paramrequired}
                       
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_param_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??" />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="No" />
                      </Picker>
                    </View>}
            <Text style={{height:hp(1)}} />
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  setParamStatus(false);
                  getParam();
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Add
                </Text>
              
             
          
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
        {editStatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="key"
              style={{width:wp(88)}}
              value={paramkey}
              onChangeText={value => route_param_key(value)}
            />
            <Text style={{height:hp(1)}} />
           {Platform.OS=='ios'?
           <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={paramtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_param_value(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:
                          <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                         
                            selectedValue={paramtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_param_value(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
            <Text style={{height:hp(1)}} />
            
             <TextInput
              placeholder="datatype"
              style={{width:wp(88)}}
              value={paramdesc}
              onChangeText={value => route_param_desc(value)}
            />
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={paramrequired}
                        
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_param_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??"  />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>:
                     <View
                     style={{
                       borderColor: "#707070",
                       borderRadius: 6,
                       borderWidth: 1,
                       width:wp(80)
                     }}
                   >
                     <Picker
                    
                       selectedValue={paramrequired}
                       
                       onValueChange={(itemValue, itemIndex) => {
                         
                         route_param_required(itemValue);
                       }}
                     >
                       <Picker label="Is it Required??"  />
                       <Picker label="Yes" value="Yes" />
                       <Picker label="No" value="NO" />
                     </Picker>
                   </View>}
            <Text style={{height:hp(1)}} />
            
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  const newParam = paramData.map((item, key) => {
                    if (key === index) {
                      return {
                        key: paramkey,
                        datatype: paramtype,
                        map_field: paramdesc,
                        required: paramrequired
                      };
                    } else {
                      return item;
                    }
                  });
                  setParamStatus(false);
                  setEditStatus(false);
                  setParamData(newParam);
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Save
                </Text>
      
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
              </View>
            </CardItem>
          </Card>
          {/* Body Fields Handling */}
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Body</Text>
                <View style={{height:hp(1)}} />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Key</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Datatype</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Mapfield</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Required</Text>
      
                  <Text
                  style={{fontSize:14,color:"#484393",width:wp(10)}}
            onPress={() => {
              if (bodystatus == true) setBodyStatus(false);
              else setBodyStatus(true);
              setEditBodyStatus(false);
            }}
          >
            +
          </Text>
                </View>
                <Text style={{height:hp(1)}} />
                {bodyData.length > 0 && <View>{bodyitems}</View>}
                {bodystatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
            style={{width:wp(88)}}
              placeholder="key"
              onChangeText={value => route_body_key(value)}
            />
            <Text style={{height:hp(1)}} />
           {Platform.OS=='ios'?
             <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={bodytype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_body_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:
                          <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                           
                            selectedValue={bodytype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_body_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
        <Text style={{height:hp(1)}} />
        {Platform.OS=='ios'?
        <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1,width:wp(80)}}>
            <IOSPicker
            mode="modal"
              selectedValue={bodydesc}
              
              onValueChange={(itemValue, itemIndex) => {
                setBodyDesc(itemValue);
                route_body_desc(itemValue);
              }}
            >
              <Picker label="Select" value="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </IOSPicker>
            </View>:<View style={{borderColor:'#707070',borderRadius:6,borderWidth:1,width:wp(80)}}>
            <Picker
            
              selectedValue={bodydesc}
              
              onValueChange={(itemValue, itemIndex) => {
                setBodyDesc(itemValue);
                route_body_desc(itemValue);
              }}
            >
              <Picker label="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </Picker>
            </View>}
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                        mode="modal"
                        selectedValue={bodyrequired}
                     
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_body_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??" />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>:
                    <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 6,
                      borderWidth: 1,
                      width:wp(80)
                    }}
                  >
                    <Picker
                    
                      selectedValue={bodyrequired}
                   
                      onValueChange={(itemValue, itemIndex) => {
                        
                        route_body_required(itemValue);
                      }}
                    >
                      <Picker label="Is it Required??" />
                      <Picker label="Yes" value="Yes" />
                      <Picker label="No" value="NO" />
                    </Picker>
                  </View>}
            <Text style={{height:hp(1)}} />
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  setBodyStatus(false);
                  getBody();
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Add
                </Text>
              
             
          
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
        {editbodyStatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="key"
              style={{width:wp(88)}}
              value={bodykey}
              onChangeText={value => route_body_key(value)}
            />
            <Text style={{height:hp(1)}} />
           {Platform.OS=='ios'?
             <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={bodytype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_body_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type" />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:<View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                          
                            selectedValue={bodytype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_body_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1,width:wp(80)}}>
            <IOSPicker
            mode="modal"
              selectedValue={bodydesc}
       
              onValueChange={(itemValue, itemIndex) => {
                setParamPicker(itemValue);
                route_body_desc(itemValue);
              }}
            >
              <Picker label="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </IOSPicker>
            </View>:
            <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1,width:wp(80)}}>
            <Picker
         
              selectedValue={bodydesc}
       
              onValueChange={(itemValue, itemIndex) => {
                setParamPicker(itemValue);
                route_body_desc(itemValue);
              }}
            >
              <Picker label="Select"  />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </Picker>
            </View>}
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={bodyrequired}
                       
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_body_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??" />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>:
                    <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 6,
                      borderWidth: 1,
                      width:wp(80)
                    }}
                  >
                    <Picker
                    
                      selectedValue={bodyrequired}
                     
                      onValueChange={(itemValue, itemIndex) => {
                        
                        route_body_required(itemValue);
                      }}
                    >
                      <Picker label="Is it Required??"  />
                      <Picker label="Yes" value="Yes" />
                      <Picker label="No" value="NO" />
                    </Picker>
                  </View>}
            <Text style={{height:hp(1)}} />
            
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  const newParam = bodyData.map((item, key) => {
                    if (key === bodyindex) {
                      return {
                        key: bodykey,
                        datatype: bodytype,
                        map_field: bodydesc,
                        required: bodyrequired
                      };
                    } else {
                      return item;
                    }
                  });
                  setBodyStatus(false);
                  setEditBodyStatus(false);
                  setBodyData(newParam);
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Save
                </Text>
      
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
              </View>
            </CardItem>
          </Card>
          {/* Header Fields handling */}
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Header</Text>
                <View style={{height:hp(1)}} />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Key</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Datatype</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Mapfield</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Required</Text>
      
                  <Text
                  style={{fontSize:14,color:"#484393",width:wp(10)}}
            onPress={() => {
              if (headerstatus == true) setHeaderStatus(false);
              else setHeaderStatus(true);
              setEditHeaderStatus(false);
            }}
          >
            +
          </Text>
                </View>
                <Text style={{height:hp(1)}} />
                {headerData.length > 0 && <View>{headeritems}</View>}
                {headerstatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="key"
              onChangeText={value => route_header_key(value)}
            />
            <Text style={{height:hp(1)}} />
          {Platform.OS=='ios'?
             <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={headertype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_header_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:
                           <View
                           style={{
                             borderColor: "#707070",
                             borderRadius: 6,
                             borderWidth: 1,
                             width: wp(80)
                           }}
                         >
                           <Picker
                           
                             selectedValue={headertype}
                             onValueChange={(itemValue, itemIndex) => {
                               route_header_type(itemValue);
                             }}
                           >
                             <Picker label="Select Data Type"  />
                             <Picker label="Int" value="Int" />
                             <Picker label="String" value="String" />
                             <Picker label="Varchar" value="Varchar" />
                             <Picker label="Decimal" value="Decimal" />
                             <Picker label="Boolean" value="Boolean" />
                           </Picker>
                           </View>}
        <Text style={{height:hp(1)}} />
      
            <TextInput
              placeholder="Value"
              onChangeText={value => route_header_desc(value)}
            />
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={headerrequired}
                       
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_header_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??" />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>:
                    <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 6,
                      borderWidth: 1,
                      width:wp(80)
                    }}
                  >
                    <Picker
               
                      selectedValue={headerrequired}
                     
                      onValueChange={(itemValue, itemIndex) => {
                        
                        route_header_required(itemValue);
                      }}
                    >
                      <Picker label="Is it Required??"  />
                      <Picker label="Yes" value="Yes" />
                      <Picker label="No" value="NO" />
                    </Picker>
                  </View>}
            <Text style={{height:hp(1)}} />
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  setHeaderStatus(false);
                  getHeader();
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Add
                </Text>
              
             
          
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
        {editheaderStatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="key"
              style={{width:wp(88)}}
              value={headerkey}
              onChangeText={value => route_header_key(value)}
            />
            <Text style={{height:hp(1)}} />
           {Platform.OS='ios'?
             <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={headertype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_header_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type" />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:
                          <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                         
                            selectedValue={headertype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_header_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data TYpe"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
            <Text style={{height:hp(1)}} />
            {/* <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1}}>
            <Picker
              selectedValue={headerdesc}
              style={{ width:wp(80)}}
              onValueChange={(itemValue, itemIndex) => {
                setParamPicker(itemValue);
                route_header_desc(itemValue);
              }}
            >
              <Picker label="Select" value="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </Picker>
            </View> */}
             <TextInput
              placeholder="datatype"
              style={{width:wp(88)}}
              value={headerdesc}
              onChangeText={value => route_header_desc(value)}
            />
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={headerrequired}
                    
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_header_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??"  />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>
                    :<View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 6,
                      borderWidth: 1,
                      width:wp(80)
                    }}
                  >
                    <Picker
                  
                      selectedValue={headerrequired}
                  
                      onValueChange={(itemValue, itemIndex) => {
                        
                        route_header_required(itemValue);
                      }}
                    >
                      <Picker label="Is it Required??"  />
                      <Picker label="Yes" value="Yes" />
                      <Picker label="No" value="NO" />
                    </Picker>
                  </View>}
            <Text style={{height:hp(1)}} />
            
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  const newParam = headerData.map((item, key) => {
                    if (key === headerindex) {
                      return {
                        key: headerkey,
                        datatype: headertype,
                        map_field: headerdesc,
                        required: headerrequired
                      };
                    } else {
                      return item;
                    }
                  });
                  setHeaderStatus(false);
                  setEditHeaderStatus(false);
                  setHeaderData(newParam);
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Save
                </Text>
      
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
              </View>
            </CardItem>
          </Card>
          {/* Auth fields handling */}
          <Card style={{ width: wp(90), borderRadius: 6 }}>
            <CardItem style={{ borderRadius: 6 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#9B9B9B", fontSize: 12 }}>Authorization</Text>
                <View style={{height:hp(1)}} />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Key</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Datatype</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Mapfield</Text>
      
                  <Text style={{fontSize:14,color:"#484393",width:wp(20)}}>Required</Text>
      
                  <Text
                  style={{fontSize:14,color:"#484393",width:wp(10)}}
            onPress={() => {
              if (authstatus == true) setAuthStatus(false);
              else setAuthStatus(true);
              setEditAuthStatus(false);
            }}
          >
            +
          </Text>
                </View>
                <Text style={{height:hp(1)}} />
                {authData.length > 0 && <View>{authitems}</View>}
                {authstatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="key"
              style={{width:wp(88)}}
              onChangeText={value => route_auth_key(value)}
            />
            <Text style={{height:hp(1)}} />
          {Platform.OS=='ios'?
             <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={authtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_auth_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>:<View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                          
                            selectedValue={authtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_auth_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
        <Text style={{height:hp(1)}} />
        {/* <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1}}>
            <Picker
              selectedValue={authdesc}
              style={{ width:wp(80) }}
              onValueChange={(itemValue, itemIndex) => {
                setParamPicker(itemValue);
                route_auth_desc(itemValue);
              }}
            >
              <Picker label="Select" value="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </Picker>
            </View> */}
             <TextInput
            style={{width:wp(88)}}
              placeholder="Value"
              onChangeText={value => route_auth_desc(value)}
            />
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={authrequired}
                     
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_auth_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??"  />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>:
                    <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 6,
                      borderWidth: 1,
                      width:wp(80)
                    }}
                  >
                    <Picker
                  
                      selectedValue={authrequired}
                   
                      onValueChange={(itemValue, itemIndex) => {
                        
                        route_auth_required(itemValue);
                      }}
                    >
                      <Picker label="Is it Required??"  />
                      <Picker label="Yes" value="Yes" />
                      <Picker label="No" value="NO" />
                    </Picker>
                  </View>}
            <Text style={{height:hp(1)}} />
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  setAuthStatus(false);
                  getAuth();
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Add
                </Text> 
          
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
          </View>
        )}
        {editauthStatus && (
          <View
            style={{ flexDirection: "column", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="key"
              style={{width:wp(88)}}
              value={authkey}
              onChangeText={value => route_auth_key(value)}
            />
            <Text style={{height:hp(1)}} />
           {Platform.OS=="ios"?
             <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <IOSPicker
                           mode="modal"
                            selectedValue={authtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_auth_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </IOSPicker>
                          </View>: <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 6,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
                          <Picker
                      
                            selectedValue={authtype}
                            onValueChange={(itemValue, itemIndex) => {
                              route_auth_type(itemValue);
                            }}
                          >
                            <Picker label="Select Data Type"  />
                            <Picker label="Int" value="Int" />
                            <Picker label="String" value="String" />
                            <Picker label="Varchar" value="Varchar" />
                            <Picker label="Decimal" value="Decimal" />
                            <Picker label="Boolean" value="Boolean" />
                          </Picker>
                          </View>}
            <Text style={{height:hp(1)}} />
            {/* <View style={{borderColor:'#707070',borderRadius:6,borderWidth:1}}>
            <Picker
              selectedValue={authdesc}
              style={{ width:wp(80) }}
              onValueChange={(itemValue, itemIndex) => {
                setParamPicker(itemValue);
                route_auth_desc(itemValue);
              }}
            >
              <Picker label="Select" value="Select" />
              {verticalsfields.map((item, a) => (
                <Picker.Item label={item.name} value={item.name} />
              ))}
            </Picker> */}
            {/* </View> */}
            <TextInput
              placeholder="value"
              style={{width:wp(88)}}
              value={authdesc}
              onChangeText={value => route_auth_desc(value)}
            />
            <Text style={{height:hp(1)}} />
            {Platform.OS=='ios'?
            <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <IOSPicker
                      mode="modal"
                        selectedValue={authrequired}
                       
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_auth_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??"  />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </IOSPicker>
                    </View>:<View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 6,
                        borderWidth: 1,
                        width:wp(80)
                      }}
                    >
                      <Picker
                     
                        selectedValue={authrequired}
                       
                        onValueChange={(itemValue, itemIndex) => {
                          
                          route_auth_required(itemValue);
                        }}
                      >
                        <Picker label="Is it Required??"  />
                        <Picker label="Yes" value="Yes" />
                        <Picker label="No" value="NO" />
                      </Picker>
                    </View>}
            <Text style={{height:hp(1)}} />
            
            <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity
                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(82),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={() => {
                  const newAuth = authData.map((item, key) => {
                    if (key === authindex) {
                      return {
                        key: authkey,
                        datatype: authtype,
                        map_field: authdesc,
                        required: authrequired
                      };
                    } else {
                      return item;
                    }
                  });
                  setAuthStatus(false);
                  setEditAuthStatus(false);
                  setAuthData(newAuth);
                }}
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Save
                </Text>
      
          </TouchableOpacity>
          <View style={{width:wp(7)}} />
        </View>
        
          </View>
        )}
              </View>
            </CardItem>
          </Card>
          <View style={{height:hp(2)}} />
          <View>
          <View style={{height:hp(44),backgroundColor:"#000000",borderRadius:8}}>
              <View style={{ height: hp(1) }} />
                <View style={{height:hp(3),flexDirection:"row",justifyContent:'space-between'}}>
                  
                  <Text style={{paddingLeft:'2%',color:'#FFFFFF'}}>Map Buyer Fields Here</Text>
                  <View style={{paddingRight:'2%'}}>
                  <Help  onPress={() => callModel()}></Help>
                  </View>
                </View>
                <View>

              <Textarea
               placeholder="//Edit your content here"
                style={{
                  height: hp(40),
                  width: wp(90),
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "#9B9B9B",
                  backgroundColor: "#333333",
                  color: "white"
                  
                }}
                value={payload}
                onChangeText={handlePayload}
              />
              </View>
              
            </View>
            
            <View style={{height:hp(1)}} />
            <View>
              {Platform.OS == "android" ? (
                  <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 4,
                      borderWidth: 1
                    }}
                  >
                    <Picker
                      mode="modal"
                      selectedValue={
                       radiostatus
                      }
                      style={{ width: wp(90) }}
                      onValueChange={(itemValue, itemIndex) => {
                        setRadioStatus(itemValue)
                      
                      }}
                    >
                      <Picker default label="Select File Type" />
                      <Picker label="Xml" value="Xml" />
                      <Picker label="Json" value="Json" />
                    </Picker>
                  </View>
                ) : (
                  <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 4,
                      borderWidth: 1
                    }}
                  >
                    <IOSPicker
                      mode="modal"
                      selectedValue={
                        radiostatus
                      }
                      style={{ width: wp(90) }}
                      onValueChange={(itemValue, itemIndex) => {
                        setRadioStatus(itemValue)
                      }}
                    >
                      <Picker default label="Select File Type" />
                      <Picker label="Xml" value="Xml" />
                      <Picker label="Json" value="Json" />
                    </IOSPicker>
                  </View>
                )}
                  </View>
          </View>
          <View style={{height:hp(2)}} />
              <View>
            {xmlstate &&
              xmlarray.map((item, index) => (
                <Card style={{ width: wp(90), borderRadius: 4,elevation:0,borderColor:"transparent" ,backgroundColor:'#FFFFFF',width:wp(90)}}>
                <View style={{flexDirection:"row",justifyContent:'space-evenly',alignItems:"center"}}>
                   {/* <View style={{height:hp(1)}} /> */}
                  <Text style={{
                      color: "#484393",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>{item}</Text>
                 
                  {((!xmlindexarray.includes(index)))?
                  <View>

                  <View style={{borderColor: "#707070",
                   borderRadius: 4,
                   borderWidth: 1,
                   width: wp(40),
                  }}>
                    {Platform.OS == "android" ? (
                  <Picker
                  
                   selected={payloadpick[index]}
                    onValueChange={(itemValue, itemIndex) => {
                       payloadFile(index,itemValue)
                      console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
                     
                      xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
                    }}
                  >
                     <Picker label="select" value="select"/>
                    {verticalsfields.map((item, key) => (
                      <Picker label={item.name} value={item.name} />
                    ))}
                  </Picker>):(<IOSPicker
                  mode="modal"
                  selected={payloadpick[index]}
                   onValueChange={(itemValue, itemIndex) => {
                      payloadFile(index,itemValue)
                     console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
                    
                     xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
                   }}
                 >
                    <Picker label="select" value="select"/>
                   {verticalsfields.map((item, key) => (
                     <Picker label={item.name} value={item.name} />
                   ))}
                 </IOSPicker>)}
                 </View>
                 <Text>{payloadpick[index]}</Text>

                  </View>:<View></View>
                  }
                </View>
                </Card>
              ))}
          </View>

          
          <View style={{height:hp(2)}} />
          <View style={{ flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
              
              <TouchableOpacity

                style={{
                  backgroundColor: "#00B0EB",
                  borderRadius: 28,
                  width: wp(90),
                  justifyContent: "center",
                  alignItems: "center",
                  height: hp(6)
                }}
                onPress={save_details}
                 
              >
                <View style={{ width: wp(8) }} />

                <Text
                  style={{
                    
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "bold"
                  }}
                >
                  Update Buyer Settings
                </Text>
      
          </TouchableOpacity>
        </View>
        <View style={{height:hp(4)}} />
        </View>
       
      
       
      </KeyboardAwareScrollView>
    </Container>
  );
};
const ShowModal = prop => {
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
      <View style={{ backgroundColor: "white", borderRadius: 8 ,justifyContent:"center",alignItems:"center"}}>
        
          {prop.verticalsfields.map((item, a) => (
           <Text>#{item.name}#</Text>
          ))}
        
      </View>
    </Modal>
  );
};

export default EditBuyerRoute;



