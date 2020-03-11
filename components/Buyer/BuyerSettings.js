/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
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
  Picker
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BuyerSettings = props => {
const [buyer,setBuyer]=useState([
 
])

const [modeSelected,setModeSelected]=useState()
const [bearer,setBearer]=useState(false)
const [apikey,setApiKey]=useState(false)
const [key,setKey]=useState(false)
// param_change=value=>{
// setKey(true)
// }
const handleAuth=(value)=>{
   if(value==="Bearer Token"){
     setBearer(true)
   }
   else if(value==="Api Key"){
    setBearer(false)  
    setApiKey(true)
   }
   else{
     setBearer(false)
     setApiKey(false)
   }
}
  return (
    
    
          <View style={{width: wp(100)}}>
            <View
      style={{
        backgroundColor: 'white',
        marginLeft: '5%',
        marginRight:'5%',  
        marginBottom:'2%',             
        borderRadius: 5,
        elevation: 4,
      }}>

      <View
        style={{
          marginLeft: '4%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          
        }}>
          
          <View style={{justifyContent: 'flex-start'}}>
            <View style={{flexDirection: 'column'}}>
            
              <View>
                <Text>Url</Text>
                <TextInput placeholder='URL' style={{color:'#9B9B9B'}}></TextInput>
                <Text>Method</Text>
                <TextInput placeholder='Method'style={{color:'#9B9B9B'}}></TextInput>
                <View >
                <Text>Params</Text>
                <View style={{flexDirection:'row',justifyContent:"space-evenly"}}>
                <TextInput placeholder="key"
                onChangeText={value => setKey(true)}/>
                <TextInput placeholder="value"/>
               <TextInput placeholder="Description"/>
               <TextInput placeholder="Action"/>
               </View>
               {key &&

                    <View style={{flexDirection:'row',justifyContent:"space-evenly"}}>
                    <TextInput placeholder="key"
                    onChangeText={value => {
                      
                     setKey(true)}}/>
                    <TextInput placeholder="value"/>
                   <TextInput placeholder="Description"/>
                   <TextInput placeholder="Action"/>
                   </View>
                    
               }
               </View>
                <Text>Authorization</Text>
                <Picker
                  selectedValue={modeSelected}
                  style={{
                    height: 20,
                    width: 300,
                    paddingBottom: 30,
                    marginLeft: 8,
                  }}
                  onValueChange={itemValue => {
                    setModeSelected(itemValue);
                    handleAuth(itemValue);
                  }}>
                  <Picker.Item
                    color="#9B9B9B"
                    label="No Auth"
                    value="No Auth"
                  />
                  <Picker.Item
                    color="#9B9B9B"
                    label="Bearer Token"
                    value="Bearer Token"
                  />
                  <Picker.Item
                    color="#9B9B9B"
                    label="Api Key"
                    value="Api Key"
                  />
                  
                </Picker>
                {bearer &&
                   <View>
                     <Text>Token</Text>
                     <TextInput placeholder="token"/>
                   </View>
                }
                 {apikey &&
                   <View >
                     <Text>Key</Text>
                     <TextInput placeholder="Key"/>
                     <Text>Value</Text>
                     <TextInput placeholder="value"/>
                     
                   </View>
                }
                
             
                <Text>Headers</Text>
                <TextInput placeholder="key"/>
                <TextInput placeholder="value"/>
                <Text>Body</Text>
                <TextInput placeholder="Body"/>
                <Text>Response</Text>
                <TextInput placeholder="Response"/>
              </View>
             
            </View>
            
          </View>

      </View>
      
    </View>
    <Button title="Save Route Settings" onPress={()=>{props.navigation.navigate('BuyerList')}}></Button>
          </View>
  );
};

export default BuyerSettings;
