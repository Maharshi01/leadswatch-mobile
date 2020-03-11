/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import axios from 'axios';
import {Switch} from 'react-native-paper';
import BackArrow from "../../assets/js/BackArrow"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
 import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";

import PageHeader from "../CustomComponents/PageHeader";

import { Container, Content } from 'native-base';
const PublisherById = props => {
  const [list, setList] = useState([]);
  const [mandatory, setMandatory] = useState(true);
  const [errorBordername, setErrorBordername] = useState({borderColor:"red",borderWidth:1,width:wp(42.133),color:"red"});
  const [errorBordername1, setErrorBordername1] = useState({borderColor:"red",borderWidth:1,color:"red"});
  const [formStyle, setFormStyle] = useState({
    firstname: {width:wp(42.133)},
    // lastname: {width:wp(86.933)},
    lastname: {width:wp(42.133)},
    email: {},
    phoneNumber: {},
    password: '',
    confirmpassword: '',
    company: {},
    token: "",
  });
  const [fname,setfname]=useState(true)
  const [lname,setlname]=useState(true)
  
  useEffect(() => {
    getPublishers = () => {
      const id = props.navigation.getParam('pubId');
      const config = {
        url: `https://api.leadswatch.com/api/v1/publisher/${id}`,
        // data: data,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + global.access_token,
        },
      };
      axios(config)
        .then(response => {
          // console.log(response);
          console.log(response.data.data, 'publisher details');
          setList(response.data.data);
          if(response.data.data.active==1)
          setMandatory(true)
          else
          setMandatory(false)

          // props.navigation.navigate('Dashboard')
          // console.log(response);
          // global.access_token = response.data.result.token;
        })
        .catch(error => {
          // setError('Please Enter Correct Login Credentials');
          if (error.message == "Network Error") {
          Alert.alert(
            'Network Error',
            "Please try again after some time",
            [
              {
                text: 'Ok',
                onPress: () => console.log('Netwrork problem'),
              },
            ],
            { cancelable: false },
          );
        }
        console.log(error.response);
        Alert.alert(
          'error',
          error.response.data.error.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log('enter valid details'),
            },
          ],
          { cancelable: false },
        );
          console.log(error.response);
          console.log(error);
          console.log(error.response);
        });
      console.log('proceed to home screen');

      // value => this.verifyEmail(value)
    };
    getPublishers();
  }, []);

  getPublishers = () => {
    const id = props.navigation.getParam('pubId');
    const config = {
      url: `https://api.leadswatch.com/api/v1/publisher/${id}`,
      // data: data,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + global.access_token,
      },
    };
    axios(config)
      .then(response => {
        // console.log(response);
        console.log(response.data.data, 'publisher details');
        
        setList(response.data.data);
        if (response.data.data.active == 1) setMandatory(true);
        else setMandatory(false);

        // props.navigation.navigate('Dashboard')
        // console.log(response);
        // global.access_token = response.data.result.token;
      })
      .catch(error => {
        // setError('Please Enter Correct Login Credentials');
        if (error.message == "Network Error") {
          Alert.alert(
            'Network Error',
            "Please try again after some time",
            [
              {
                text: 'Ok',
                onPress: () => console.log('Netwrork problem'),
              },
            ],
            { cancelable: false },
          );
        }
        console.log(error.response);
        Alert.alert(
          'error',
          error.response.data.error.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log('enter valid details'),
            },
          ],
          { cancelable: false },
        );
        console.log(error.response);
        console.log(error);
        console.log(error.response);
      });
    console.log('proceed to home screen');

    // value => this.verifyEmail(value)
  };
  handleCompany=(value)=>{
  let jk = Object.assign({}, list, {company: value});
  setList(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk1 = Object.assign({}, formStyle, {
      company: errorBordername1,
    });
    setFormStyle(jk1);
  } else {
    let jk1 = Object.assign({}, formStyle, {
      company: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
handlePhNo=(value)=> {
  if (value.length < 11) {
    let jk = Object.assign({}, list, {phone: value});
    setList(jk);
    if (value.length < 9) {
      let jk1 = Object.assign({}, formStyle, {
      phoneNumber: errorBordername1,
    });
    setFormStyle(jk1);
    } else {
      let jk1 = Object.assign({}, formStyle, {
      phoneNumber: {color:"black"},
    });
    setFormStyle(jk1);
    }
  }
}
handleEmail=(value)=>{
  let jk = Object.assign({}, list, {email: value});
  setList(jk);
  boolvalue = checkEmail(value);
  if (boolvalue == false) {
    let jk1 = Object.assign({}, formStyle, {
      email: errorBordername1,
    });
    setFormStyle(jk1);
  } else {
    let jk1 = Object.assign({}, formStyle, {
      email: {},
    });
    setFormStyle(jk1);
  }
}
handleLastName=(value)=>{
  let jk = Object.assign({}, list, {lastname: value});
  setList(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk1 = Object.assign({}, formStyle, {
      lastname: errorBordername,
    });
    setFormStyle(jk1);
    setlname(false)
  } else {
    let jk1 = Object.assign({}, formStyle, {
      lastname: {width:wp(42.333)},
    });
    setFormStyle(jk1);
    setlname(true)
  }
}
handleFirstName=(value)=> {
  let jk = Object.assign({}, list, {firstname: value});
  setList(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk1 = Object.assign({}, formStyle, {
      firstname: errorBordername,
    });
    setFormStyle(jk1);
    setfname(false)
  } else {
    let jk1 = Object.assign({}, formStyle, {
      firstname: {width:wp(42.333)},
    });
    setFormStyle(jk1);
    setfname(true)
  }
}
handleMiddleName=(value)=> {
  let jk = Object.assign({}, list, {middlename: value});
  setList(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk1 = Object.assign({}, formStyle, {
      middlename: errorBordername1,
    });
    setFormStyle(jk1);
    // setfname(false)
  } else {
    let jk1 = Object.assign({}, formStyle, {
      middlename: {},
    });
    setFormStyle(jk1);
    // setfname(true)
  }
  if(value=="" || value==" "){
    let jk1 = Object.assign({}, formStyle, {
      middlename: {},
    });
    setFormStyle(jk1);
  }
}
checkString = str => {
    var regex = new RegExp('^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$');

    if (regex.test(str)) {
      return true;
    }

    return false;
  };
  checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  

  return (
        <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#F4F5F7",
          width: wp(100),
        }}>
         
          <View
          style={{
            // backgroundColor: "red",
            width: wp(100),
            height: hp(10.62),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <PageHeader
            title={"Publisher Profile"}
            myfunc={() => {
              props.navigation.navigate("PublishersList");
            }}
          ></PageHeader>
          </View>
         <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} enableOnAndroid contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>
            <View style={{height:hp(28.586),width:wp(100),backgroundColor:"white"}}>
          <View style={{ height: hp(5.295), width: wp(100) }}>
            <View style={{ height: hp(3.325) }} />
            
          </View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
            <View style={{height:wp(26),width:wp(26),borderRadius:wp(13),justifyContent:"center",alignItems:"center"}}>
              <TouchableOpacity style={{height:wp(25),width:wp(25)}}>
                <Image style={{height:'100%',width:"100%",borderRadius:wp(12.5)}} source={require("../../assets/png/gunduBoss.png")}/>
              </TouchableOpacity>
            </View>
           <View style={{height:hp(27)-hp(6)-hp(13),justifyContent:"space-around",alignItems:"center"}}> 
           <Text style={{ fontSize: 24,color:"#484393" }}>
              {list.firstname} {list.middlename} {list.lastname}
            </Text>
            <Text style={{color:"#00B0EB"}}>
              Publisher
            </Text>
            </View>
          </View>
        </View>
        {/* <View style={{height:hp(28.586),width:wp(100),backgroundColor:"white"}}>
          <View style={{height:hp(5.295),width:wp(100)}}>
            <View style={{height:hp(3.325)}}/>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <TouchableOpacity style={{flexDirection:"row"}}>
                <Text style={{width:20}}></Text>
                <Text>
                  Back
                </Text>
              </TouchableOpacity>
              
            </View>
          </View>
          <View style={{justifyContent:"center",alignItems:"center"}}>
            <View style={{height:150,width:150,borderWidth:1,borderRadius:75,justifyContent:"center",alignItems:"center"}}>
              <TouchableOpacity style={{height:140,width:140}}>
                <Image style={{height:'100%',width:"100%",borderRadius:70}} source={require("../../assets/png/gunduBoss.png")}/>
              </TouchableOpacity>
            </View>
           <View style={{height:hp(27)-hp(6)-200,justifyContent:"space-around",alignItems:"center"}}> 
            <Text style={{fontSize:24}}>
              {list.firstname} {list.lastname}
            </Text>
            <Text>
              Publisher
            </Text>
            </View>
          </View>
        </View> */}
        <View style={{justifyContent:"center",alignItems:"center", }}>
          <View style={{justifyContent:"center",alignItems:"center"}}>
            <View
              style={{
                marginLeft: "4%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
             
           <View style={{ flexDirection: "row" }}>
             
                  
                    <View>
                      <View style={{flexDirection:"row"}}>
                          <View style={{flexDirection:"column"}}>
                             <View style={{height:20}}/>
                            <MyTextInput
                            styles={formStyle.firstname}
                            value1={list.firstname}
                              myfunc={
                                handleFirstName
                              }
                              placeholder="First Name"
                              />
                              <Text></Text>
                           
                          </View>
                          <View style={{width:wp(1)}}/>
                          <View style={{flexDirection:"column"}}>
                            <View style={{height:20}}/>
                            <MyTextInput
                            styles={formStyle.lastname}
                              value1={list.lastname}
                              myfunc={handleLastName}
                              placeholder="Last Name"
                              />
                              <Text></Text>
                            {/* <Text>{errorValues.middlename}</Text> */}
                          </View>

                      </View>
                      <View style={{flexDirection:"column"}}>
                            <MyTextInput
                            styles={formStyle.middlename}
                              value1={list.middlename}
                              myfunc={handleMiddleName}
                              placeholder="Middle Name"
                              />
                              <Text></Text>
                            {/* <Text>{errorValues.middlename}</Text> */}
                      </View>
                      <View style={{flexDirection:"column"}}>
                            <MyTextInput
                            styles={formStyle.email}
                              value1={list.email}
                              myfunc={handleEmail}
                              placeholder="Email"
                              />
                              <Text></Text>
                            
                      </View>
                     
                      
                      <View style={{flexDirection:"column"}}>
                            <MyTextInput
                            styles={formStyle.company}
                              value1={list.company}
                              myfunc={handleCompany}
                              placeholder="Company"
                              />
                              <Text></Text>
                            
                      </View>
                      
                      <View style={{flexDirection:"column"}}>
                            <MyTextInput
                            styles={formStyle.phoneNumber}
                            styles={{width:wp(82.933)}}
                              value1={list.phone}
                              myfunc={handlePhNo}
                              placeholder="phone"
                              />
                              <Text></Text>
                            {/* <Text>{errorValues.middlename}</Text> */}
                      </View>                
                    </View>
                  
                </View>
              </View>
            </View>
             <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
            <Text> Active Status  </Text>
            <Switch
              onValueChange={value =>{ 
                console.log("changed value",value)
                setMandatory(value)
              // getPublishers();
              Alert.alert(
                'Alert',
                'be careful when toggling the active status',
                [
                  {
                    text: 'Ok',
                    onPress: () => console.log('successfully invited'),
                  },
                ],
                {cancelable: false},
              );
              
              }
                
              }
              value={mandatory}
            />
          </View>
            <MyButton style={{backgroundColor:"#00B0EB"}} myfunc={()=>{
              if(list.firstname==""|| list.lastname=="" || list.email=="" || list.company=="" || list.phone==""){
                Alert.alert(
                  'Make sure all fields are filled',
                  'One or More fields are empty',
                  [
                    {
                      text: 'Ok',
                      onPress: () => console.log('successfully invited'),
                    },
                  ],
                  {cancelable: false},
                );
              }else{
              const id = props.navigation.getParam('pubId');
              const getPublishersList = props.navigation.getParam(
                'getPublishersList',
              );
              const showToast = props.navigation.getParam(
                'showToast',
              );
              const data = {
                firstname: list.firstname,
                middlename: list.middlename,
                lastname: list.lastname,
                email: list.email,
                phone: list.phone,
                active: (mandatory)?1:0,
                company: list.company, // need to make it dynamic later
              };
              const config = {
                url: `https://api.leadswatch.com/api/v1/publisher/update/${id}`,
                data: data,
                method: 'put',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + global.access_token,
                },
              };
              axios(config)
                .then(response => {
                  console.log(response,'updated');
                  console.log('succesfully updated the values');
                  getPublishersList();
                  showToast();
                  
                   Alert.alert(
                      'Succesfull',
                      "Profile has Updated Succesfully",
                      [
                        {
                          text: 'Ok',
                          onPress: () => console.log('Profile updated'),
                        },
                      ],
                      { cancelable: false },
                    );
                  props.navigation.navigate('PublishersList');
                  global.updated=true
                  // console.log(response);
                  // global.access_token = response.data.result.token;
                })
                .catch(error => {
                  // setError('Please Enter Correct Login Credentials');
                  if (error.message == "Network Error") {
          Alert.alert(
            'Network Error',
            "Please try again after some time",
            [
              {
                text: 'Ok',
                onPress: () => console.log('Netwrork problem'),
              },
            ],
            { cancelable: false },
          );
        }
        console.log(error.response);
        Alert.alert(
          'error',
          "Enter Valid details", // change this to error.response.data.error.message, later 
          
          [
            {
              text: 'Ok',
              onPress: () => console.log('enter valid details'),
            },
          ],
          { cancelable: false },
        );
                  console.log(error.response, 'error updating the details');
                  console.log(error);
                });
              console.log('proceed to home screen');
              }
            }}>
            <Text style={{color:"white"}}>Update Details</Text>
          </MyButton>
           
            
          </View>
          
        
        </KeyboardAwareScrollView>
      </Container>
      
      
    
  );
};
export default PublisherById;
