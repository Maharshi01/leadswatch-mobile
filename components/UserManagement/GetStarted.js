import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RightCircle from "../../assets/js/RightCircle"
import LeftCircle from "../../assets/js/LeftCircle"
import RightDown from "../../assets/js/RightDown"
import LeftDown from "../../assets/js/LeftDown"
import Logo1 from "../../assets/js/Logo1"
import MyButton from "../CustomComponents/MyButton";
import * as SecureStore from 'expo-secure-store';
import Loader from "../Navigation/Loader";
const GetStarted = props =>{
const [load, setLoad] = useState(true);
  useEffect(() => {
      console.log("inside useeffect")
    const getdata = async () => {
      const d = new Date()
      const storeDay = await SecureStore.getItemAsync("day")
      const storeMonth = await SecureStore.getItemAsync("month")
      const storeHour = await SecureStore.getItemAsync("hour")
      const access_token = await SecureStore.getItemAsync("at")
      const user_id = await SecureStore.getItemAsync("user_id")
      const role = await SecureStore.getItemAsync("role")
      const email = await SecureStore.getItemAsync("email")
      const subscription = await SecureStore.getItemAsync("subcription")
      console.log("email",email)
      global.email=email;
      const currentDay = "" + d.getDay()
      const currentMonth = "" + d.getMonth()
      const currentHour = "" + d.getHours()

      console.log("stored", storeDay, "day", storeHour, "hour", storeMonth, "month")
      console.log("current", currentDay, "day", currentHour, "hour", currentMonth, "month")
      if (currentMonth == storeMonth) {
        if (currentDay == storeDay) {
          if (currentHour - storeHour <= 4) {
            global.access_token = access_token
            global.user_id = user_id
            global.role = role
            global.subscription=subscription
            if(global.role==2)
             if(global.subscription==0){
              props.navigation.navigate('subcription');
             }
             else{
              props.navigation.navigate('MainNav');
             }
            
          else
               props.navigation.navigate('PublishNav');
            setTimeout(() => {
              console.log(load);
              setLoad(false);
            }, 2000);
          }
          else {
            SecureStore.deleteItemAsync('at')
            SecureStore.deleteItemAsync('user_id')
            SecureStore.deleteItemAsync('role')
            SecureStore.deleteItemAsync('day')
            SecureStore.deleteItemAsync('month')
            SecureStore.deleteItemAsync('hour')
            SecureStore.deleteItemAsync('email')
            SecureStore.deleteItemAsync('subcription')
            console.log("deleted")
            setLoad(false);
          }
        }
        else if (currentDay - storeDay == 1) {
          if ((storeHour == 20 && currentHour == 0) || (storeHour == 21 && currentHour == 1) || (storeHour == 22 && currentHour == 2) || (storeHour == 23 && currentHour == 3)) {
            global.access_token = access_token
            global.user_id = user_id
            global.role = role
            global.subscription=subscription
            if(global.role==2)
            if(global.subscription==0){
              props.navigation.navigate('subcription');
             }
             else{
              props.navigation.navigate('MainNav');
             }
          else
               props.navigation.navigate('PublishNav');
            setTimeout(() => {
              console.log(load);
              setLoad(false);
            }, 2000);
          }
          else {
            SecureStore.deleteItemAsync('at')
            SecureStore.deleteItemAsync('user_id')
            SecureStore.deleteItemAsync('role')
            SecureStore.deleteItemAsync('day')
            SecureStore.deleteItemAsync('month')
            SecureStore.deleteItemAsync('hour')
            SecureStore.deleteItemAsync('email')
            SecureStore.deleteItemAsync('subcription')
            console.log("deleted")
            setLoad(false);
          }
        }
        else {
          SecureStore.deleteItemAsync('at')
          SecureStore.deleteItemAsync('user_id')
          SecureStore.deleteItemAsync('role')
          SecureStore.deleteItemAsync('day')
          SecureStore.deleteItemAsync('month')
          SecureStore.deleteItemAsync('hour')
          SecureStore.deleteItemAsync('email')
          SecureStore.deleteItemAsync('subcription')
          console.log("deleted")
          setLoad(false);
        }
      }
      else {
        SecureStore.deleteItemAsync('at')
        SecureStore.deleteItemAsync('user_id')
        SecureStore.deleteItemAsync('role')
        SecureStore.deleteItemAsync('day')
        SecureStore.deleteItemAsync('month')
        SecureStore.deleteItemAsync('hour')
        SecureStore.deleteItemAsync('email')
        SecureStore.deleteItemAsync('subcription')
        console.log("deleted")
        setLoad(false);
      }
      // SecureStore.deleteItemAsync(key, options)
      // console.log(a,b,c,d,"key12")
    }
    getdata();
  }, [])
     return load ? (
    <Loader />
  ) : (
        <View style={{width:wp(100),height:hp(100),backgroundColor:"#F4F5F7"}}>
            <View style={{width:wp(100),height:hp(25),flexDirection:"row"}}>
            
          {/* <LogowithBg height={hp(26.974)} width={wp(100)}/> */}
                    <View style={{width:wp(33),justifyContent:"flex-end"}}>
                        <LeftCircle />
                    </View>
                    <View style={{width:wp(33),justifyContent:"center",alignItems:"center"}}>
                        
                    </View>
                    <View style={{width:wp(34),alignItems:"flex-end"}}>
                        <RightCircle />
                    </View>
          
            </View>
            <View style={{width:wp(100),height:hp(15),flexDirection:"row"}}>
                 <View style={{width:wp(18),justifyContent:"flex-end"}}>
                    
                </View>
                <View style={{width:wp(63),justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                    <Logo1 height={hp(15)} width={wp(30)}/>
                    <View style={{flexDirection:"column",width:wp(33),justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontSize:wp(7) , color:"#484393"}}>LEADS </Text>
                        <Text style={{fontSize:wp(7) , color:"#00B0EB"}}>WATCH </Text>
                    </View>
                </View>
                <View style={{width:wp(19),alignItems:"flex-end"}}>
                    
                </View>
                
            </View>
            <View style={{width:wp(100),height:hp(35),justifyContent:"center",alignItems:"center"}}>
                <MyButton myfunc={()=>{props.navigation.navigate("LoginPage")}} style={{width:wp(42),backgroundColor:"#00B0EB" }}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Sign in</Text>
                </MyButton>
                <View style={{height:hp(5)}} />
                <MyButton myfunc={()=>{props.navigation.navigate("SignupPage")}} style={{width:wp(42)}}>
                    <Text style={{color:"white",fontWeight:"bold"}}>Sign up</Text>
                </MyButton>
            </View>
            
            <View style={{width:wp(100),height:hp(25),flexDirection:"row"}}>
                 <View style={{width:wp(33),justifyContent:"flex-end"}}>
                        <LeftDown />
                    </View>
                    <View style={{width:wp(33),justifyContent:"center",alignItems:"center"}}>
                        
                    </View>
                    <View style={{width:wp(34),alignItems:"flex-end"}}>
                        <RightDown />
                    </View>
            </View>
        </View>
    );
}
export default GetStarted;