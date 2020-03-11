/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from 'react-native';
import GeneralStatusBarColor from './components/GeneralStatusBarColor';


import LoginNav from "./components/Navigation/LoginNav"
import Dashboard from "./components/Dashboard";
const App= (props) => {
  return (
    // <View style={{ flex: 1 }}>
    //   <GeneralStatusBarColor
    //     backgroundColor="#dcdcdc"
    //     barStyle="light-content"
    //   />
    //   <LoginNav />
    // </View>
    // <LoginNav/>
    
    // <SafeAreaView style={{flex:1,backgroundColor:"#F3F4F7",paddingTop: Platform.OS === 'android' ? 25 :0 }} forceInset={{ bottom: "never"}}>
    // xfgchvjbknlm;,lkhjvcxdxfgchvjbnm
    <LoginNav/>
        // xfgchvjbknlm;,lkhjvcxdxfgchvjbnm


    // </SafeAreaView>
    
    
    
  );
};




export default App;
