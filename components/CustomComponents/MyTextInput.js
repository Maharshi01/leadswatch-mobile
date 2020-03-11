import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyTextInput=({myfunc,value1,styles,...props})=>{
    return(
        <TextInput {...props} placeholder={props.placeholder} style={[{width:wp(86.933),height:hp(5.911),paddingLeft:20,backgroundColor:"white",borderRadius:40},styles]} value={value1} onChangeText={(value)=>{
            myfunc(value)
        }}>
        
        </TextInput>
    );
}

export default MyTextInput;