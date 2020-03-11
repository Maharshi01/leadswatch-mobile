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

const TextInputWithIcon=({myfunc,value1,styles,...props})=>{
    return(
        <TextInput {...props} placeholder={props.placeholder} style={[{width:"90%",paddingLeft:20},styles]} value={value1} onChangeText={(value)=>{
            myfunc(value)
        }}>
        {/* <Text style={{width:10}}/> */}
        </TextInput>
    );
}

export default TextInputWithIcon;