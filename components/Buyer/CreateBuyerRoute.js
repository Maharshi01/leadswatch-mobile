/* Created By Uday */
/* Last Modified on 24/10/2019 */
/**
 * name="Create Buyer Route Page"
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  Alert,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import IOSPicker from "react-native-ios-picker";
import Cancel from "../../assets/js/Cancel";
import Help from "../../assets/js/Help";
import { RadioButton } from "react-native-paper";
// import icon from "../../assets/svg/icon";
import * as SecureStore from "expo-secure-store";
import { Card, CardItem, Container, Textarea } from "native-base";
import PageHeader from "../CustomComponents/PageHeader";
import { Switch } from "react-native-paper";
import Modal from "react-native-modal";
// import { Platform } from "@unimodules/core";

const CreateBuyerRoute = props => {
  // states to handle name,desc,url,method,price,pricetype and noofleads
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [method, setMethod] = useState();
  const [url, setUrl] = useState();
  const [price, setPrice] = useState();
  const [pricetype, setPriceType] = useState();
  const [no_of_leads, setNoOfLeads] = useState();
  // states to handle Params
  const [paramstatus, setParamStatus] = useState(false);
  const [paramkey, setParamKey] = useState();
  const [paramtype, setParamValue] = useState("Select Datatype");
  const [paramdesc, setParamDesc] = useState();
  const [paramData, setParamData] = useState([]);
  //states to handle body
  const [bodyData, setBodyData] = useState([]);
  const [bodystatus, setBodyStatus] = useState(false);
  const [bodykey, setBodyKey] = useState();
  const [bodytype, setBodyType] = useState("Select Datatype");
  const [bodydesc, setBodyDesc] = useState();
  const [editbodyStatus, setEditBodyStatus] = useState(false);
  const [bodyindex, setBodyIndex] = useState();
  //states to handle headers
  const [headerindex, setHeaderIndex] = useState();
  const [headerData, setHeaderData] = useState([]);
  const [editheaderStatus, setEditHeaderStatus] = useState(false);
  const [headerstatus, setHeaderStatus] = useState(false);
  const [headerkey, setHeaderKey] = useState();
  const [headertype, setHeaderType] = useState("Select Datatype");
  const [headerdesc, setHeaderDesc] = useState();
  //states to handle auth
  const [authData, setAuthData] = useState([]);
  const [authstatus, setAuthStatus] = useState(false);
  const [authkey, setAuthKey] = useState();
  const [authtype, setAuthType] = useState("Select Datatype");
  const [authdesc, setAuthDesc] = useState();
  const [authrequired, setAuthRequired] = useState("Is it Required");
  const [paramrequired, setParamRequired] = useState("Is it Required");
  const [bodyrequired, setBodyRequired] = useState("Is it Required");
  const [headerrequired, setHeaderRequired] = useState("Is it Required");
  const [editauthStatus, setEditAuthStatus] = useState(false);
  const [authindex, setAuthIndex] = useState();
  const [editStatus, setEditStatus] = useState(false);
  const [bodyeditstatus, setBodyEditStatus] = useState(false);
  const [index, setIndex] = useState();
  const [verticals, setVerticals] = useState([]);
  const [verticalsfields, setVerticalsFields] = useState([]);
  const [pickervalue, setPickerValue] = useState("Select Vertical");
  const [parampicker, setParamPicker] = useState();
  const [selectedVerticalId, setSelectedVerticalId] = useState();
  const [bodypicker, setBodyPicker] = useState();
  const [mandatory, setMandatory] = useState(false);
  const [dataz, setData] = useState();
  const [open, setOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [cards, setCards] = useState(false);
  const [bcolor, setBcolor] = useState("#FFFFFF");
  const [bncolor, setBncolor] = useState("#FFFFFF");
  const [tcolor, setTcolor] = useState("#00B0EB");
  const [tncolor, setTncolor] = useState("#00B0EB");
  const [success_key, setSuccess] = useState();
  const [failure_key, setFailure] = useState();
  const [xmlarray, setXmlArray] = useState([]);
  const [xmlstate, setXmlState] = useState(false);
  const [xmlpost, setXmlPost] = useState([]);
  const [radiostatus, setRadioStatus] = useState();
  const [payloadpick,setPayloadPick]=useState([])
  const [xmlindexarray,setXmlIndexArray]=useState([]);
  const [tabledata,settabledata]=useState();
  const [mappedKeys,setMappedKeys]=useState({})
 
  //Function to get Verticals list
  useEffect(() => {
    getFileData = async () => {
      const fd1 = await SecureStore.getItemAsync("fd");
      setData(fd1);
    };
    getFileData();
    setData(SecureStore.getItemAsync("fd"));
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
  }, [tabledata]);
  //function to handle params fields called on clicking Add after giving Param fields
  function getParam() {
    if (paramkey && paramtype && paramdesc && paramrequired) {
      //Data to be posted to array
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
      setParamKey("")
      setParamDesc("")
      setParamValue("")
      setParamRequired("")
      console.log("paramData", paramData);
      setParamStatus(false); // to remove add screen
    } else {
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
  //function to handle body fields called on clicking Add after giving body fields
  function getBody() {
    if (bodykey && bodytype && bodydesc && bodyrequired) {
      //data to be pushed
      const bodydata = {
        key: bodykey,
        datatype: bodytype,
        map_field: bodydesc,
        required: bodyrequired
      };
      console.log("bodydata", bodydata);
      bodyData.push(bodydata);
      setBodyKey("")
      setBodyType("")
      setBodyDesc("")
      setBodyRequired("")
      console.log("bodyData", bodyData);
      setBodyStatus(false);
    } else {
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
  //function to handle headers fields called on clicking Add after giving header fields
  function getHeader() {
    if (headerkey && headertype && headerdesc && headerrequired) {
      //data to be pushed
      const headerdata = {
        key: headerkey,
        datatype: headertype,
        map_field: headerdesc,
        required: headerrequired
      };
      console.log("headerdata", headerdata);
      headerData.push(headerdata);
      setHeaderKey("")
      setHeaderType("")
      setHeaderDesc("")
      setHeaderRequired("")
      console.log("headerData", headerData);
      setHeaderStatus(false);
    } else {
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
  //function to handle auth fields called on clicking Add after giving auth fields
  function getAuth() {
    if (authkey && authtype && authdesc && authrequired) {
      const authdata = {
        key: authkey,
        datatype: authtype,
        map_field: authdesc,
        required: authrequired
      };
      console.log("Authdata", authdata);

      authData.push(authdata);
      setAuthKey("")
      setAuthType("")
      setAuthDesc("")
      setAuthRequired("")
      console.log("AuthData", authData);
      setAuthStatus(false);
    } else {
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
  // Mapping function to display added param fields
  const paramitems =
    paramData.length &&
    paramData.map((paramitem, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: wp(20) }}>{paramitem.key}</Text>
          <Text style={{ width: wp(20) }}>{paramitem.datatype}</Text>
          <Text style={{ width: wp(25) }}>{paramitem.map_field}</Text>
          <Text style={{ width: wp(10) }}>{paramitem.required}</Text>
          <Text
            style={{ width: wp(7) }}
            onPress={() => {
              setEditStatus(true);
              setParamStatus(false);
              setIndex(index);
              setParamKey(paramData[index].key);
              setParamValue(paramData[index].datatype);
              setParamDesc(paramData[index].map_field);
              setParamRequired(paramData[index].required);
            }}
          >
            Edit
          </Text>

          <TouchableOpacity
            onPress={() => {
              const newParamData = paramData.filter(
                (item, idx) => idx !== index
              );
              setParamData(newParamData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  // Mapping function to display added body fields
  const bodyitems =
    bodyData.length &&
    bodyData.map((bodyitem, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: wp(20) }}>{bodyitem.key}</Text>
          <Text style={{ width: wp(20) }}>{bodyitem.datatype}</Text>
          <Text style={{ width: wp(25) }}>{bodyitem.map_field}</Text>
          <Text style={{ width: wp(10) }}>{bodyitem.required}</Text>
          <Text
            style={{ width: wp(7) }}
            onPress={() => {
              setEditBodyStatus(true);
              setBodyStatus(false);
              setBodyIndex(index);
              setBodyKey(bodyData[index].key);
              setBodyType(bodyData[index].datatype);
              setBodyDesc(bodyData[index].map_field);
              setBodyRequired(bodyData[index].required);
            }}
          >
            Edit
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newBodyData = bodyData.filter((item, idx) => idx !== index);
              setBodyData(newBodyData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  // Mapping function to display added header fields
  const headeritems =
    headerData.length &&
    headerData.map((headeritem, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: wp(20) }}> {headeritem.key}</Text>
          <Text style={{ width: wp(20) }}>{headeritem.datatype}</Text>
          <Text style={{ width: wp(25) }}>{headeritem.map_field}</Text>
          <Text style={{ width: wp(10) }}>{headeritem.required}</Text>
          <Text
            style={{ width: wp(7) }}
            onPress={() => {
              setEditHeaderStatus(true);
              setHeaderStatus(false);
              setHeaderIndex(index);
              setHeaderKey(headerData[index].key);
              setHeaderType(headerData[index].datatype);
              setHeaderDesc(headerData[index].map_field);
              setHeaderRequired(headerData[index].required);
            }}
          >
            Edit
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newHeaderData = headerData.filter(
                (item, idx) => idx !== index
              );
              setHeaderData(newHeaderData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  // Mapping function to display added auth fields
  const authitems =
    authData.length &&
    authData.map((authitem, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: wp(20) }}>{authitem.key}</Text>
          <Text style={{ width: wp(20) }}>{authitem.datatype}</Text>
          <Text style={{ width: wp(25) }}>{authitem.map_field}</Text>
          <Text style={{ width: wp(10) }}>{authitem.required}</Text>
          <Text
            style={{ width: wp(7) }}
            onPress={() => {
              setEditAuthStatus(true);
              setAuthStatus(false);
              setAuthIndex(index);
              setAuthKey(authData[index].key);
              setAuthType(authData[index].datatype);
              setAuthDesc(authData[index].map_field);
              setAuthRequired(authData[index].required);
            }}
          >
            Edit
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newAuthData = authData.filter((item, idx) => idx !== index);
              setAuthData(newAuthData);
            }}
          >
            <Cancel />
          </TouchableOpacity>
        </View>
      );
    });
  InsideSave = async () => {
    SecureStore.setItemAsync("fd", " ");
  };
  selectPicker = async () => {
    SecureStore.setItemAsync("picker", radiostatus);
  };
  // function to get Vertcals Fields
  const showVerticals = id => {
    console.log("id", id);
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
  function payload(a,b){
    // setPayloadPick([])
    let temp=[]
   console.log("index",a)
   console.log("pickervalue",b)
   temp=[...global.payloadpick]
   temp[a]=b;
   global.payloadpick[a]=b;

   console.log("pickkkkk",temp)
  setPayloadPick(temp)
  }
  //Function to push route details to database
  function save_details() {
    console.log("XMLPOST", xmlpost);
    console.log("XML IndexArray",xmlindexarray);
    if (
      name &&
      desc &&
      price &&
      pricetype &&
      no_of_leads &&
      url &&
      method &&
      failure_key &&
      success_key
    ) {
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
          vertical_id: selectedVerticalId,
          vertical_buyer_active: mandatory ? 1 : 0,
          post_payload_data: dataz
            .split("\n")
            .join("")
            .split(" ")
            .join(""),
          failure_key: failure_key,
          success_key: success_key,
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
      console.log("Data==================================", data);
      console.log(global.access_token);

      const config = {
        url: "http://69.55.49.121:3003/api/v1/broutes/create",
        data: data,
        method: "post",
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
            InsideSave();
            props.navigation.navigate("BuyerRoutes", { success6: 1 });
          }
        })
        .catch(error => {
          console.log(
            "ErrorBuyerRoutesecreate",
            error.response.data.error.sqlMessage
          );
          Alert.alert(
            "Alert",
            error.response.data.error.sqlMessage,
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
        "Please Fill All Details To Proceed",
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
  //function to handle Textinputs
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
  pickfile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.warn(result);
    let result1 = await FileSystem.readAsStringAsync(result.uri);
    setData(result1);
    if(radiostatus==="Json"){
    var xml2js = require("react-native-xml2js");
    var obj = { name: "Super", Surname: "Man", age: 23 };
    var builder = new xml2js.Builder();
    var xmlconv = builder.buildObject(result1);
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
    if(radiostatus==="Xml"){ 
    var XMLParser = require("react-xml-parser");
    var xml = new XMLParser().parseFromString(result1);
   
    console.log("XML+++++++", xml);
    console.log("XMLGET", xml.getElementsByTagName("*"));
    var xmlget = xml.getElementsByTagName("*");
    global.payloadpick=[];
    for (var i = 0; i < xmlget.length; i++) {
      xmlarray.push(xmlget[i].name);
        if(xmlget[i].children.length>0){
        xmlindexarray.push(i)}
        console.log("XML IndexArray",xmlindexarray);
        
        global.payloadpick.push("")
       
    }
    setXmlState(true);
    console.log("xmlarray", xmlarray);
  }
    // SecureStore.setItemAsync("undo", result1);
  };

  const callModel = () => {
    setOpen(true);
  };
  SaveClick = async () => {
    SecureStore.setItemAsync("fd", dataz);
  };
  RevertClick = async () => {
    const getundo = await SecureStore.getItemAsync("undo");
    setData(getundo);
  };
  // function to handleTextarea
  function handleTextArea(dataz) {
    // data1 = dataz
    //   .split("\n")
    //   .join("")
    //   .split(" ")
    //   .join("");
    setData(dataz);
  }
  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F4F7"
      }}
    >
      {open && (
        <ShowModal
          open={open}
          setOpen={setOpen}
          verticalsfields={verticalsfields}
        />
      )}
      <PageHeader
        title="Buyer"
        subtitle="Create Buyer Route"
        myfunc={() => {
          props.navigation.navigate("BuyerRoutes");
        }}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ height: hp(2) }} />
        {Platform.OS == "ios" ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // borderColor: "#707070",
              borderRadius: 4,
              // borderWidth: 1,
              // borderColor:"transparent",
              width: wp(90)
            }}
          >
            {/* Picker to display Verticals */}

            <IOSPicker
              mode="modal"
              selectedValue={pickervalue}
              style={{ width: wp(88) }}
              onValueChange={(itemValue, itemIndex) => {
                setPickerValue(itemValue.name);
                setSelectedVerticalId(itemValue.id);
                showVerticals(itemValue.id);
              }}
            >
              <Picker.Item label="Select Vertical" />
              {verticals.map((item, a) => (
                <Picker.Item
                  label={item.name}
                  value={{ id: item.id, name: item.name }}
                />
              ))}
            </IOSPicker>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#707070",
              borderRadius: 4,
              borderWidth: 1,
              // borderColor:"transparent",
              width: wp(90)
            }}
          >
            {/* Picker to display Verticals */}
            <Picker
              selectedValue={pickervalue}
              style={{ width: wp(90) }}
              onValueChange={(itemValue, itemIndex) => {
                console.log("ItemValue", itemValue);
                setPickerValue(itemValue);
                setSelectedVerticalId(itemValue);
                showVerticals(itemValue);
                console.log("sele", selectedVerticalId);
              }}
            >
              <Picker.Item label="Select Vertical" />
              {verticals.map((item, a) => (
                <Picker.Item label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
        )}
        <View style={{ height: hp(2) }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}> Status:</Text>
          <Switch
            onValueChange={mandatory => setMandatory(mandatory)}
            value={mandatory}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0}}>
          <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
                          <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>Name</Text>
                <View style={{ height: hp(1) }} />
                <TextInput
                  style={{ width: wp(88),  marginLeft: "2%" }}
                  placeholder="Enter The Route Name"
                  onChangeText={value => route_name(value)}
                />
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90),borderRadius: 4,borderColor:"transparent",elevation:0}}>
           <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>
                  Description
                </Text>
                <View style={{ height: hp(1) }} />
                <TextInput
                  placeholder="Description"
                  style={{ width: wp(88) ,marginLeft: "2%"}}
                  onChangeText={value => route_desc(value)}
                />
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90),borderRadius: 4,borderColor:"transparent",elevation:0}}>
          <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>Method</Text>
                <View style={{ height: hp(1) }} />
                <TextInput
                  style={{ width: wp(88),marginLeft: "2%" }}
                  placeholder="Method"
                  onChangeText={value => route_method(value)}
                />
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0}}>
           <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>Url</Text>
                <View style={{ height: hp(1) }} />
                <TextInput
                  style={{ width: wp(88) ,marginLeft: "2%"}}
                  placeholder="Url"
                  onChangeText={value => route_url(value)}
                />
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0}}>
           <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>Price</Text>
                <View style={{ height: hp(1) }} />
                <TextInput
                  style={{ width: wp(88),marginLeft: "2%" }}
                  placeholder="Price"
                  onChangeText={value => route_price(value)}
                />
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0}}>
           <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>
                  PriceType
                </Text>
                <View style={{ height: hp(1) }} />
                {Platform.OS == "android" ? (
                  <View
                    style={{
                      borderColor: "#707070",
                      borderRadius: 4,
                      // borderWidth: 1,
                      width: wp(90)
                    }}
                  >
                    <Picker
                      mode="modal"
                      selectedValue={
                        !pricetype ? "Select Price Type" : pricetype
                      }
                      style={{ width: wp(90) }}
                      onValueChange={(itemValue, itemIndex) => {
                        route_pricetype(itemValue);
                      }}
                    >
                      <Picker default label="Select Price Type" />
                      <Picker label="Percentage" value="Percentage" />
                      <Picker label="Amount" value="Amount" />
                    </Picker>
                  </View>
                ) : (
                  <View
                    style={{
                      // borderColor: "#707070",
                      borderRadius: 4,
                      // borderWidth: 1,
                      width: wp(90)

                    }}
                  >
                    <IOSPicker
                      mode="modal"
                     
                      selectedValue={
                        !pricetype ? "Select Price Type" : pricetype
                      }
                      style={{ width: wp(90) }}
                      onValueChange={(itemValue, itemIndex) => {
                        route_pricetype(itemValue);
                      }}
                    >
                      <Picker default label="Select Price Type" />
                      <Picker label="Percentage" value="Percentage" />
                      <Picker label="Amount" value="Amount" />
                    </IOSPicker>
                  </View>
                )}
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0}}>
           <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>
                  Number of Leads
                </Text>
                <View style={{ height: hp(1) }} />
                <TextInput
                  style={{ width: wp(88) ,marginLeft: "2%"}}
                  placeholder="Number of leads"
                  onChangeText={value => route_leads(value)}
                />
              </View>
            </View>
          </Card>
          <Card style={{ width: wp(90), borderRadius: 4,borderColor:"transparent",elevation:0}}>
          <View style={{ width: wp(92), marginTop: "2%", marginLeft: "2%" }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>Response</Text>
                <View style={{ height: hp(1) }} />
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{ width: wp(40),marginLeft: "2%" }}
                    placeholder="Success"
                    onChangeText={value => route_response_success(value)}
                  />
                  <TextInput
                    style={{ width: wp(40),marginLeft: "2%" }}
                    placeholder="Failure"
                    onChangeText={value => route_response_failure(value)}
                  />
                </View>
              </View>
            </View>
          </Card>
          
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ height: hp(2) }} />
            <Text style={{color:"#484393",fontWeight:"700"}}>Do You have Post Information File??</Text>
            <View style={{ height: hp(1) }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: bcolor,
                    borderRadius: 28,
                    borderWidth: 1,
                    borderColor: "#00B0EB",
                    width: wp(44),
                    justifyContent: "center",
                    alignItems: "center",
                    height: hp(6)
                  }}
                  onPress={() => {
                    setShowUpload(true);
                    setCards(false);
                    setBncolor("#FFFFFF");
                    setBcolor("#00B0EB");
                    setTcolor("#FFFFFF");
                    setTncolor("#00B0EB");
                  }}
                >
                  <View style={{ width: wp(8) }} />

                  <Text
                    style={{
                      color: tcolor,
                      fontSize: 14,
                      fontWeight: "bold"
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: wp(2) }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: bncolor,
                    borderRadius: 28,
                    borderWidth: 1,
                    borderColor: "#00B0EB",
                    width: wp(44),
                    justifyContent: "center",
                    alignItems: "center",
                    height: hp(6)
                  }}
                  onPress={() => {
                    setCards(true);
                    setShowUpload(false);
                    setBncolor("#00B0EB");
                    setBcolor("#FFFFFF");
                    setTcolor("#00B0EB");
                    setTncolor("#FFFFFF");
                  }}
                >
                  <View style={{ width: wp(8) }} />

                  <Text
                    style={{
                      color: tncolor,
                      fontSize: 14,
                      fontWeight: "bold"
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ height: hp(2) }} />
          {cards && (
            <View>
              <Card style={{ width: wp(90), borderRadius: 4,elevation:0,borderColor:"transparent"}}>
                 <View style={{ width: wp(92), marginTop: "4%", marginLeft: "2%",marginBottom:"2%" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>
                      Params
                    </Text>
                    <View style={{ height: hp(1) }} />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20),
                          marginLeft:"2%"
                        }}
                      >
                        Key
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Datatype
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Mapfield
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Required
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(10)
                        }}
                        onPress={() => {
                          if (paramstatus == true) setParamStatus(false);
                          else setParamStatus(true);
                          setEditStatus(false);
                        }}
                      >
                        +
                      </Text>
                    </View>
                    {paramData.length > 0 && <View>{paramitems}</View>}
                    {paramstatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly",marginLeft:"2%"

                        }}
                      >
                        <TextInput
                          style={{ width: wp(88) }}
                          placeholder="key"
                          onChangeText={value => route_param_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "android" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        ) : (
                          // {/* <TextInput
                          //   style={{ width: wp(88) }}
                          //   placeholder="datatype"
                          //   onChangeText={value => route_param_value(value)}
                          // /> */}
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </IOSPicker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        {/* <View
                      style={{
                        borderColor: "#707070",
                        borderRadius: 4,
                        borderWidth: 1
                      }}
                    >
                      <Picker
                        selectedValue={parampicker}
                        style={{ width: wp(80) }}
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
                          style={{ width: wp(88) }}
                          placeholder="value"
                          onChangeText={value => route_param_desc(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <IOSPicker
                              mode="modal"
                              selectedValue={paramrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_param_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                              setParamStatus(true);
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
                          <View style={{ width: wp(7) }} />
                        </View>
                      </View>
                    )}
                    {editStatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <TextInput
                          style={{ width: wp(88) }}
                          placeholder="key"
                          value={paramkey}
                          onChangeText={value => route_param_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {/* <TextInput
                          style={{ width: wp(88) }}
                          placeholder="datatype"
                          value={paramtype}
                          onChangeText={value => route_param_value(value)}
                        /> */}
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <TextInput
                          style={{ width: wp(88) }}
                          value={paramdesc}
                          placeholder="value"
                          onChangeText={value => route_param_desc(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1
                            }}
                          >
                            <IOSPicker
                              mode="modal"
                              selectedValue={paramrequired}
                              style={{ width: wp(80) }}
                              onValueChange={(itemValue, itemIndex) => {
                                route_param_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1
                            }}
                          >
                            <Picker
                              selectedValue={paramrequired}
                              style={{ width: wp(80) }}
                              onValueChange={(itemValue, itemIndex) => {
                                route_param_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                        </View>
                        <View style={{ width: wp(7) }} />
                      </View>
                    )}
                  </View>
               </View>
              </Card>
              <Card style={{ width: wp(90), borderRadius: 4,elevation:0,borderColor:"transparent"}}>
                 <View style={{ width: wp(92), marginTop: "4%", marginLeft: "2%",marginBottom:"2%" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>Body</Text>
                    <View style={{ height: hp(1) }} />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20),
                          marginLeft:"2%"
                        }}
                      >
                        Key
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Datatype
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Mapfield
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Required
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(10)
                        }}
                        onPress={() => {
                          if (bodystatus == true) setBodyStatus(false);
                          else setBodyStatus(true);

                          setEditBodyStatus(false);
                        }}
                      >
                        +
                      </Text>
                    </View>
                    {bodyData.length > 0 && <View>{bodyitems}</View>}
                    {bodystatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          marginLeft:"2%"

                        }}
                      >
                        <TextInput
                          style={{ width: wp(88) }}
                          placeholder="key"
                          onChangeText={value => route_body_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <IOSPicker
                              mode="modal"
                              selectedValue={bodydesc}
                              onValueChange={(itemValue, itemIndex) => {
                                //setParamPicker(itemValue);
                                route_body_desc(itemValue);
                              }}
                            >
                              <Picker label="Select" />
                              {verticalsfields.map((item, a) => (
                                <Picker.Item
                                  label={item.name}
                                  value={item.name}
                                />
                              ))}
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <Picker
                              selectedValue={bodydesc}
                              onValueChange={(itemValue, itemIndex) => {
                                //setParamPicker(itemValue);
                                route_body_desc(itemValue);
                              }}
                            >
                              <Picker label="Select" />
                              {verticalsfields.map((item, a) => (
                                <Picker.Item
                                  label={item.name}
                                  value={item.name}
                                />
                              ))}
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                              setBodyStatus(true);
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
                          <View style={{ width: wp(7) }} />
                        </View>
                      </View>
                    )}
                    {editbodyStatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <TextInput
                          placeholder="key"
                          style={{ width: wp(88) }}
                          value={bodykey}
                          onChangeText={value => route_body_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <View
                          style={{
                            borderColor: "#707070",
                            borderRadius: 4,
                            borderWidth: 1,
                            width: wp(80)
                          }}
                        >
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
                              <Picker.Item
                                label={item.name}
                                value={item.name}
                              />
                            ))}
                          </IOSPicker>
                        </View>
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                          <View style={{ width: wp(7) }} />
                        </View>
                        <View style={{ width: wp(7) }} />
                      </View>
                    )}
                  </View>
               </View>
              </Card>
              <Card style={{ width: wp(90), borderRadius: 4,elevation:0,borderColor:"transparent"}}>
                 <View style={{ width: wp(92), marginTop: "4%", marginLeft: "2%" ,marginBottom:"2%"}}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>
                      Header
                    </Text>
                    <View style={{ height: hp(1) }} />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20),
                          marginLeft:"2%"
                        }}
                      >
                        Key
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Datatype
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Mapfield
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Required
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(10)
                        }}
                        onPress={() => {
                          if (headerstatus == true) setHeaderStatus(false);
                          else setHeaderStatus(true);

                          setEditHeaderStatus(false);
                        }}
                      >
                        +
                      </Text>
                    </View>
                    {headerData.length > 0 && <View>{headeritems}</View>}
                    {headerstatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          marginLeft:"2%"
                        }}
                      >
                        <TextInput
                          placeholder="key"
                          style={{ width: wp(88) }}
                          onChangeText={value => route_header_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {/* <TextInput
                          placeholder="datatype"
                          style={{ width: wp(88) }}
                          onChangeText={value => route_header_type(value)}
                        /> */}
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <Picker
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
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <TextInput
                          placeholder="Value"
                          style={{ width: wp(88) }}
                          onChangeText={value => route_header_desc(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <Picker
                              selectedValue={headerrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_header_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                              if (headerstatus == true) setHeaderStatus(false);
                              else setHeaderStatus(true);
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
                          <View style={{ width: wp(7) }} />
                        </View>
                      </View>
                    )}
                    {editheaderStatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <TextInput
                          placeholder="key"
                          style={{ width: wp(88) }}
                          value={headerkey}
                          onChangeText={value => route_header_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {/* <TextInput
                          placeholder="datatype"
                          style={{ width: wp(88) }}
                          value={headertype}
                          onChangeText={value => route_header_type(value)}
                        /> */}
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <TextInput
                          value={headerdesc}
                          placeholder="value"
                          style={{ width: wp(88) }}
                          onChangeText={value => route_header_desc(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
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
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <Picker
                              selectedValue={headerrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_header_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                          <View style={{ width: wp(7) }} />
                        </View>
                      </View>
                    )}
                  </View>
               </View>
              </Card>
              <Card style={{ width: wp(90), borderRadius: 4,elevation:0,borderColor:"transparent" }}>
                 <View style={{ width: wp(92), marginTop: "4%", marginLeft: "2%",marginBottom:"2%" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{
                      color: "#00B0EB",
                      fontSize: 14,
                      marginLeft: "2%",
                      fontWeight: "700"
                    }}>
                      Authorization
                    </Text>
                    <View style={{ height: hp(1) }} />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20),
                          marginLeft:"2%"
                        }}
                      >
                        Key
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Datatype
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Mapfield
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(20)
                        }}
                      >
                        Required
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#484393",
                          width: wp(10)
                        }}
                        onPress={() => {
                          if (authstatus == true) setAuthStatus(false);
                          else setAuthStatus(true);

                          setEditAuthStatus(false);
                        }}
                      >
                        +
                      </Text>
                    </View>
                    {authData.length > 0 && <View>{authitems}</View>}
                    {authstatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          marginLeft:"2%"
                        }}
                      >
                        <TextInput
                          style={{ width: wp(88) }}
                          placeholder="key"
                          onChangeText={value => route_auth_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {/* <TextInput
                          style={{ width: wp(88) }}
                          placeholder="datatype"
                          onChangeText={value => route_auth_type(value)}
                        /> */}
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <TextInput
                          style={{ width: wp(88) }}
                          placeholder="value"
                          onChangeText={value => route_auth_desc(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <IOSPicker
                              mode="modal"
                              selectedValue={authrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_auth_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <Picker
                              selectedValue={authrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_auth_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                              if (authstatus == true) setAuthStatus(false);
                              else setAuthStatus(true);
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
                          <View style={{ width: wp(7) }} />
                        </View>
                      </View>
                    )}
                    {editauthStatus && (
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-evenly"
                        }}
                      >
                        <TextInput
                          placeholder="key"
                          style={{ width: wp(88) }}
                          value={authkey}
                          onChangeText={value => route_auth_key(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {/* <TextInput
                          style={{ width: wp(88) }}
                          placeholder="datatype"
                          value={authtype}
                          onChangeText={value => route_auth_type(value)}
                        /> */}
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
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
                              <Picker label="Select Data Type" />
                              <Picker label="Int" value="Int" />
                              <Picker label="String" value="String" />
                              <Picker label="Varchar" value="Varchar" />
                              <Picker label="Decimal" value="Decimal" />
                              <Picker label="Boolean" value="Boolean" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />
                        <TextInput
                          placeholder="key"
                          style={{ width: wp(88) }}
                          value={authdesc}
                          onChangeText={value => route_auth_desc(value)}
                        />
                        <Text style={{ height: hp(1) }} />
                        {Platform.OS == "ios" ? (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <IOSPicker
                              mode="modal"
                              selectedValue={authrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_auth_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </IOSPicker>
                          </View>
                        ) : (
                          <View
                            style={{
                              borderColor: "#707070",
                              borderRadius: 4,
                              borderWidth: 1,
                              width: wp(80)
                            }}
                          >
                            <Picker
                              selectedValue={authrequired}
                              onValueChange={(itemValue, itemIndex) => {
                                route_auth_required(itemValue);
                              }}
                            >
                              <Picker label="Is it Required??" />
                              <Picker label="Yes" value="Yes" />
                              <Picker label="No" value="No" />
                            </Picker>
                          </View>
                        )}
                        <Text style={{ height: hp(1) }} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
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
                          <View style={{ width: wp(7) }} />
                        </View>
                      </View>
                    )}
                  </View>
               </View>
              </Card>
            </View>
          )}
          {showUpload && (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ height: hp(2) }} />
              <Text style={{color:"#484393",fontWeight:'700'}}>Upload your Post Information File</Text>
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
                        selectPicker()
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
                  <View style={{height:hp(1)}} />
              <View style={{}}>
                {/* <Button title="Upload" onPress={()=> pickfile()} /> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: wp(90),
                    backgroundColor: "#00B0EB",
                    borderRadius: 28
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#00B0EB",
                      borderRadius: 28,
                      width: wp(75),
                      justifyContent: "center",
                      alignItems: "center",
                      height: hp(6)
                    }}
                    onPress={() => pickfile()}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "bold"
                      }}
                    >
                      Upload
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{ width: wp(5), backgroundColor: "#00B0EB" }}
                  ></View>
                  
                </View>

              
              </View>
             
              <View style={{ height: hp(3) }} />

              <View
                style={{
                  height: hp(44),
                  backgroundColor: "#000000",
                  borderRadius: 8
                }}
              >
                <View style={{ height: hp(1) }} />
                <View
                  style={{
                    height: hp(3),
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ paddingLeft: "2%", color: "#FFFFFF" }}>
                    Map Buyer Fields Here
                  </Text>
                  <View style={{ paddingRight: "2%" }}>
                    <Help onPress={() => callModel()}></Help>
                  </View>
                </View>
                <View>
                  <Textarea
                    placeholder="//Edit your content here"
                    style={{
                      height: hp(40),
                      width: wp(90),
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#9B9B9B",
                      backgroundColor: "#333333",
                      color: "white"
                    }}
                    value={dataz}
                    onChangeText={handleTextArea}
                  />
                </View>
              </View>
              <View style={{ height: hp(1) }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#00B0EB",
                      borderRadius: 28,
                      borderWidth: 1,
                      borderColor: "#00B0EB",
                      width: wp(44),
                      justifyContent: "center",
                      alignItems: "center",
                      height: hp(6)
                    }}
                    onPress={() => {
                      //  SecureStore.setItemAsync('fd',dataz)
                      SaveClick();
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
                </View>
                <View style={{ width: wp(2) }} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#00B0EB",
                      borderRadius: 28,
                      borderWidth: 1,
                      borderColor: "#00B0EB",
                      width: wp(44),
                      justifyContent: "center",
                      alignItems: "center",
                      height: hp(6)
                    }}
                    onPress={() => {
                      RevertClick();
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
                      Revert Changes
                    </Text>
                  </TouchableOpacity>
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

                  {/* <Picker
                  
                   selected={payloadpick[index]}
                    onValueChange={(itemValue, itemIndex) => {
                       payload(index,itemValue)
                      console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
                     
                      xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
                    }}
                  >
                     <Picker label="select" value="select"/>
                    {verticalsfields.map((item, key) => (
                      <Picker label={item.name} value={item.name} />
                    ))}
                  </Picker>  */}
{Platform.OS == "ios" ? (
  //  <View
  //    style={{
  //      justifyContent: "center",
  //      alignItems: "center",
  //       borderColor: "#707070",
  //      borderRadius: 4,
  //       borderWidth: 1,
  //       borderColor:"transparent",
  //      width: wp(40)
  //    }}
  //  > 

     <IOSPicker
   mode="modal"
   selected={payloadpick[index]}
      //  style={{ width: wp(40) }}
       onValueChange={(itemValue, itemIndex) => {
         payload(index,itemValue)
        console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
      
        xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
      }}
   >
     <Picker label="select" value="select"/>
   {verticalsfields.map((item, key) => (
     <Picker label={item.name} value={item.name} />
   ))}

        </IOSPicker>
  //  </View>
 ) : (
//   <View
//    style={{
//      justifyContent: "center",
//      alignItems: "center",
//      borderColor: "#707070",
//      borderRadius: 4,
//      borderWidth: 1,
//       borderColor:"transparent",
//      width: wp(40)
//    }}
//  > 
<Picker
                  
                   selected={payloadpick[index]}
                    onValueChange={(itemValue, itemIndex) => {
                       payload(index,itemValue)
                      console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
                    
                      xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
                    }}
                  >
                     <Picker label="select" value="select"/>
                    {verticalsfields.map((item, key) => (
                      <Picker label={item.name} value={item.name} />
                    ))}
                  </Picker>
  //  </View>
   )}   


                 </View>
                 <Text style={{}}>Value:{payloadpick[index]}</Text>

                  </View> :<View></View>
                  }
                </View>
                </Card>
              ))}
          </View>

            </View>

          )}

          <View style={{ height: hp(2) }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
                Create Buyer Settings
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: hp(4) }} />
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
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {prop.verticalsfields.map((item, a) => (
          <Text>#{item.name}#</Text>
        ))}
      </View>
    </Modal>
  );
};

export default CreateBuyerRoute;


 //{Platform.OS == "ios" ? (
//   <View
//     style={{
//       justifyContent: "center",
//       alignItems: "center",
//       // borderColor: "#707070",
//       borderRadius: 4,
//       // borderWidth: 1,
//       // borderColor:"transparent",
//       width: wp(40)
//     }}
//   > <Picker label="select" value="select"/>
//   {verticalsfields.map((item, key) => (
//     <Picker label={item.name} value={item.name} />
//   ))}

//     <IOSPicker
//   mode="modal"
//   selected={payloadpick[index]}
//       style={{ width: wp(40) }}
//       onValueChange={(itemValue, itemIndex) => {
//         payload(index,itemValue)
//        console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
      
//        xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
//      }}
//   >

//        </IOSPicker>
//   </View>
// ):(<View
//   style={{
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "#707070",
//     borderRadius: 4,
//     borderWidth: 1,
//     // borderColor:"transparent",
//     width: wp(40)
//   }}
// > <Picker
                  
//                   selected={payloadpick[index]}
//                    onValueChange={(itemValue, itemIndex) => {
//                       payload(index,itemValue)
//                      console.log(  Object.assign(mappedKeys, { [ item ]: "#" +itemValue+ "#" }));
                    
//                      xmlpost.push({ key: item,datatype:typeof(itemValue),required:"Yes", map_field: itemValue });
//                    }}
//                  >
//                     <Picker label="select" value="select"/>
//                    {verticalsfields.map((item, key) => (
//                      <Picker label={item.name} value={item.name} />
//                    ))}
//                  </Picker>
//   </View>)} 