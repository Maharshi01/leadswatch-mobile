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
import { Container, Content, Root,Toast } from 'native-base';
import RightCircle from "../../assets/js/RightCircle"
import LeftCircle from "../../assets/js/LeftCircle"
import Logo from "../../assets/js/Logo"

const ForgotPassword2 = props => {
  const [email, setEmail] = useState('');
  const [otp, setotp] = useState('');
  const [pass, setpass] = useState('');
  const [pass2, setpass2] = useState('');
  const [message, setmessage] = useState('');
  const [seePass , setSeePass] = useState(true);
  const [seeCPass , setSeeCPass] = useState(true);

useEffect(()=>{
Toast.show({
        text: 'OTP HAS BEEN SENT TO YOUR MAIL ID',
        textStyle:{textAlign:'center'},
        buttonText: '',
        duration: 3000,
        position: 'center',
        style: {backgroundColor: 'rgba(0,0,0,0.5)',top:'20%'},
      });
},[])

  verifyEmail = str => {
    if (pass != '' && pass2 != '' && otp != '') {
      if (pass == pass2) {
        //check for valid email id and set the error messages
        // https://api.shadow.properties/user/reset-password
        const data = {
          email: props.navigation.getParam('emailid'),
          verification_code: Number(otp),
          password: pass,
        };
        const config = {
          url: 'https://api.leadswatch.com/api/v1/user/resetpassword',
          data: data,
          method: 'post',
        };
        axios(config)
          .then(response => {
            console.log(response);
            props.navigation.navigate('LoginPage');
            console.log('Successully changed password');
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
           
            console.log(error);
            console.log(error.response);
          });
        console.log('proceed to home screen');

        setmessage('a link has been sent to your email for password reset');
      } else {
        // Alert.alert("Passwords Are not equal");
        Alert.alert(
          'Alert',
          'Passwords Are Not Equal',
          [
            {
              text: 'ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'ok',
            },
          ],
          {cancelable: false},
        );
      }
    } else {
      Alert.alert(
        'Alert',
        'Enter Valid Data',
        [
          {
            text: 'ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'ok',
          },
        ],
        {cancelable: false},
      );
    }
  };
  return (
    <Root>
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
            <Text style={{height:hp(3)}} />
          <Text style={{color:"#484393",fontWeight:"700"}}>Reset Password!</Text>
          <Text style={{height:hp(1.724)}} />
          </View>
          <View style={{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"}}>
          <TextInputWithIcon
            secureTextEntry={seePass}
            value1={pass}
            myfunc={setpass}
            placeholder="Enter Password"
            />
            <TouchableOpacity onPress={()=>{
              setSeePass(!seePass)
            }}>
            <Password />
            </TouchableOpacity>
            <View style={{width:20}} />
            </View>
            <View style={{height: wp(5.333)}} />
          <View style={{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"}}>
          <TextInputWithIcon
            secureTextEntry={seeCPass}
            value1={pass2}
            myfunc={setpass2}
            placeholder="ReEnter Password"
            />
            <TouchableOpacity onPress={()=>{
              setSeeCPass(!seeCPass)
            }}>
            <Password />
            </TouchableOpacity>
            <View style={{width:20}} />
            </View>


        <View style={{height: wp(5.333)}} />
        <MyTextInput
          //  styles={{width:wp(42.133)}}
            value1={otp}
            myfunc={setotp}
            placeholder="One Time Password(Check your mail)"
            />      
        <View style={{height: hp(3.446)}} />
        <MyButton myfunc={()=>this.verifyEmail()}>
            <Text style={{color:"white",fontWeight:"bold"}}>C O N T I N U E</Text>
        </MyButton>
        
        <View style={{height: hp(8.872)}} />

        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignupPage')}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#484393'}}>Create an account</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  </Root>
  );
};
const styles = StyleSheet.create({
  
});
export default ForgotPassword2;
