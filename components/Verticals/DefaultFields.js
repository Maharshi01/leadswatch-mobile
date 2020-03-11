import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
// import { CheckBox } from 'react-native-elements';

import MyButton from "../CustomComponents/MyButton";
import PageHeader from "../CustomComponents/PageHeader";
import axios from "axios";
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
  Body
} from "native-base";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Switch } from "react-native-paper";
import BackArrow from "../../assets/js/BackArrow";
import Checked from "./Checked";

// import CheckBox from 'react-native-check-box';
export default function DefaultFields(props) {
  const [defaultList, setDefaultList] = useState([]);
  const [checked, setChecked] = useState([]);
  // const [field, setfield] = useState([]);
  // const [data, setfieldData] = useState([]);
  // const [modeSelected, setModeSelected] = useState([]);
  // const [switchValue, setSwitch] = useState([]);
  // const [index, setIndex] = useState(0);
  const [values, setValues] = useState({});
  // console.log(data)
  useEffect(() => {
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/defaultfields",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("Get DefaultList", response.data.data);

        let defaultList1 = response.data.data;
        populateValues = () => {
          len = defaultList1.length;
          console.log("DefaultList1 BeforePushing", defaultList1);
          jk = {};
          for (let i = 0; i < len; i++) {
            temp = defaultList1[i].name;
            console.log("DefaultList1[i].name", defaultList1[i].name);
            jk[temp] = false;
          }
          defaultList1.push(jk);
          console.log("DefaultList1 After Pushing", defaultList1);
          setValues(jk);
          setDefaultList(defaultList1);
          console.log("Values", values);
          console.log("jk", jk);
        };
        populateValues();
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  manageToggle = (evt, abilityName) => {
    if (isItemChecked(abilityName)) {
      setChecked({
        checked: checked.filter(i => i !== abilityName)
      });
    } else {
      setChecked({
        checked: [...checked, abilityName]
      });
    }
  };

  submitfield = () => {
    var cmai = [];
    // keys = Object.keys(values)
    // for (let j = 0; j < keys.length; j++) {
    for (let k = 0; k <= defaultList.length - 2; k++) {
      if (values[defaultList[k].name] == true) {
        a = {};
        (a["vertical_id"] = props.navigation.getParam("vertical_id")),
          (a["name"] = defaultList[k].name);
        a["description"] = defaultList[k].description;

        a["datatype"] = defaultList[k].datatype;
        // console.log("Nummmmm");
        // console.log(a["datatype"]);
        a["dataformat"] = defaultList[k].dataformat;
        if(defaultList[k].name=="credit score"){
          console.log("fuck the hell",defaultList[k].list_data)
          a["list_data"] = JSON.parse(defaultList[k].list_data);
        }
        else{
          a["list_data"] = defaultList[k].list_data;
        }
       

        console.log("lisrt_da", a["list_data"]);

        a["mandatory"] = defaultList[k].mandatory;

        cmai.push(a);
      }
    }

    console.log(cmai, "cmai");

    const data = {
      vertical_fields: cmai
    };
    console.log("Wanted", data);
    const config = {
      url: "https://api.leadswatch.com/api/v1/vertical/createfield",
      data: data,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + global.access_token
      }
    };
    axios(config)
      .then(response => {
        console.log("Default Fileds Selected", response);
        props.navigation.navigate("CreateVerticalFields", {
          func: props.navigation.state.params.func(Math.random())
        });
      })
      .catch(error => {
        console.log(error.response.data.error);
        Alert.alert(
          "Error",
          " " + error.response.data.error,
          [
            {
              text: "Ok"
              // onPress: () => console.log('Enter Valid Details'),
            }
          ],
          { cancelable: false }
        );
      });
  };

  function CreateVerticalFields() {
    props.navigation.navigate("CreateVerticalFields");
  }
  updateSelector = (name, value) => {
    let array = [...defaultList];
    let len = array.length;
    let jk = array[len - 1];
    jk[name] = value;
    array[len - 1] = jk;
    setValues(jk);
    setDefaultList(array);
    console.log("selected value", jk, "list", defaultList);
  };
  return (
    <Container style={{ backgroundColor: "#F3F4F7" }}>
      <PageHeader
        title={"Verticals"}
        subtitle={"Default Fields"}
        myfunc={() => CreateVerticalFields()}
        profile={() => {
          props.navigation.navigate("ProfileDetails");
        }}
      ></PageHeader>

      <View style={{ height: hp(1.46) }}></View>
      <Content keyboardShouldPersistTaps={'handled'} style={{ backgroundColor: "#F3F4F7" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Text></Text>
          <View style={{ width: wp(22) }}></View>
          <Text style={styles.textStyle}>FieldName</Text>
          <View style={{ width: wp(5) }}></View>
          <Text style={styles.textStyle}>FieldType</Text>
          <View style={{ width: wp(4) }}></View>
          <Text style={styles.textStyle}>Required</Text>
        </View>

        {defaultList.length > 0 &&
          defaultList.map((item, idx) => (
            <Checked
              key={idx}
              checked={values[item.name]}
              item={item}
              manageToggle={(name, value) => this.updateSelector(name, value)}
            ></Checked>
          ))}
      </Content>
      <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            position: "relative",
            left: 1,
            bottom: 10,
            width: wp(90.66),
            flexDirection: "row",
            justifyContent: "center",
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
            myfunc={() => submitfield()}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Apply</Text>
          </MyButton>
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    margin: 7,

    color: "blue",
    backgroundColor: "transparent"
  },
  labl_styl1: {
    color: "#4C7ADE",
    fontSize: 14,
    marginBottom: -10,
    marginLeft: 5
  },
  inpt_styl: {
    color: "#9B9B9B",
    fontSize: 18,
    marginTop: "5%"
  },
  textStyle: {
    width: wp(20),
    // fontFamily: "Roboto",
    // backgroundColor: "red",
    fontSize: 16,
    color: "#484393",
    fontWeight: "500"
  }
});
