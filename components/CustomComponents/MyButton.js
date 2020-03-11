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

const MyButton = (props) => {
  return (
    <TouchableOpacity

      style={[{
        width: wp(86.933), height: hp(5.911), backgroundColor: "#484393", borderRadius: 40, justifyContent: "center", alignItems: "center"
      }, props.style]} onPress={() => {
        props.myfunc()
      }}>
      {props.children}
    </TouchableOpacity>
  );
}

export default MyButton;