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
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Logo1 from "../../assets/js/Logo1"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import MyButton from "../CustomComponents/MyButton";
import MyTextInput from "../CustomComponents/MyTextInput";
import TextInputWithIcon from "../CustomComponents/TextInputWithIcon";
// import * as Keychain from 'react-native-keychain';
import Mail from "../../assets/js/Mail"
import Password from "../../assets/js/Password"
import Phone from "../../assets/js/Phone"
import Company from "../../assets/js/Company"
import Voucher from "../../assets/js/Voucher"
import { Container, Content } from 'native-base';
import RightCircle from "../../assets/js/RightCircle"
import LeftCircle from "../../assets/js/LeftCircle"
import Logo from "../../assets/js/Logo"
const ForgotPassword = props => {
  const [email, setEmail] = useState('');
  const [message, setmessage] = useState('');
  const [formStyle,setFormStyle]= useState({});
 const [errorBorder, setErrorBorder] = useState({borderColor:"red",borderWidth:1,color:"red"});
  verifyEmail = () => {
    if(Object.keys(formStyle).length>1){
        Alert.alert(
            'Invalid Email',
            "Please enter Valid Email",
            [
              {
                text: 'Ok',
                onPress: () => console.log('Netwrork problem'),
              },
            ],
            { cancelable: false },
          );
    }
    else if (email !== '') {
      const data = {
        email: email,
      };
      const config = {
        
        url: 'https://api.leadswatch.com/api/v1/user/forgotpassword',
        data: data,
        method: 'post',
      };
      axios(config)
        .then(response => {
          console.log(response);
          setmessage('a link has been sent to your email for password reset');
          props.navigation.navigate('ForgotPassword2',{emailid:email});
          console.log('Successully sent OTP to mail');
        })
        .catch(error => {
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
          console.log(error);
          console.log(error.response);
        });
    } else {
      //write some validations later
        Alert.alert(
          'Empty Fields',
          "Make sure you enter Email",
          [
            {
              text: 'Ok',
              onPress: () => console.log('enter valid details'),
            },
          ],
          { cancelable: false },
        );
    }
  };
   checkEmail = str => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str)) {
      return true;
    }
    return false;
  };
  handleEmail=(value)=>{
    setEmail(value)
  boolvalue = checkEmail(value);
  if (boolvalue == false) {
      setFormStyle(errorBorder)
    
  } else {
   
    setFormStyle({});
  }
  }
  return (
    <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#F4F5F7",
          width: wp(100),
        }}>
        <Content
        keyboardShouldPersistTaps={'handled'}
          style={{}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            
            width: wp(100),
          }}>
          
           <View style={{height:hp(23.974),width:wp(100),flexDirection:"row"}}>
          {/* <LogowithBg height={hp(26.974)} width={wp(100)}/> */}
          <View style={{width:wp(15),justifyContent:"flex-end"}}>
            <LeftCircle />
          </View>
          {/* <View style={{width:wp(38),justifyContent:"center",alignItems:"center"}}>
            <Logo />
            <Text style={{color:"#484393",fontWeight:"bold"}}>L E A D S W A T C H</Text>
          </View> */}
           <View style={{width:wp(70),justifyContent:"center",alignItems:"flex-end",flexDirection:"row"}}>
                    <Logo1 height={hp(15)} width={wp(30)}/>
                    <View style={{flexDirection:"column",height:hp(15), width:wp(33),justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontSize:wp(7) , color:"#484393",fontWeight:"bold"}}>LEADS </Text>
                        
                        <Text style={{fontSize:wp(7) , color:"#00B0EB",fontWeight:"bold"}}>WATCH </Text>
                    </View>
          </View>
          <View style={{width:wp(15),alignItems:"flex-end"}}>
            <RightCircle />
          </View>
          </View>
        <View style={{width:wp(86.933)}}>
            <Text style={{height:hp(1.724)}} />
          <Text style={{color:"#484393",fontWeight:"700"}}>Forgot Password!</Text>
          <Text style={{height:hp(1.724)}} />
          </View>
          <View style={[{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle]}>
          <TextInputWithIcon
            value1={email}
            myfunc={this.handleEmail}
            placeholder="Email Address"
            />
            <Mail />
            <View style={{width:20}} />
            </View>
        
        <View style={{width:wp(86.933)}}>
            <Text style={{height:hp(3)}} />
          <Text style={{color:"#484393",fontWeight:"700"}}>Enter Your email Address, you will recieve an OTP</Text>
          <Text style={{height:hp(1.724)}} />
          </View>
        <MyButton myfunc={()=>this.verifyEmail()}>
            <Text style={{color:"white",fontWeight:"bold"}}>C O N T I N U E</Text>
        </MyButton>
        <View style={{height: hp(10.872)}} />

        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignupPage')}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#484393'}}>Create an account</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  
  container: {
    width: wp(100),
    alignItems: 'center',
    flexGrow: 1,
  }
});
export default ForgotPassword;
