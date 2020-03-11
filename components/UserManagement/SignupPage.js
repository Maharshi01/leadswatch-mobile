/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/
/*Todo:
1)Validation for Signup function
2)Error validation color for text inputs
3)add svg impages at end of each text input
4) remove error messages after adding border color
*/
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
  Picker,
} from 'react-native';
import {cca} from "./cc";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IOSPicker from 'react-native-ios-picker';
import Loader from "../Navigation/Loader";
import axios from "axios";
import Logo1 from "../../assets/js/Logo1"
import LogowithBg from "../../assets/js/LogowithBg"
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
// import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const SignupPage = props => {
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmpassword: '',
    company: '',
    token: "",
  });
  const [errorValues, setErrorValues] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmpassword: '',
    company: '',
    token: "",
  });
  const [load, setLoad] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [seeCPass, setSeeCPass] = useState(true);
  const [errorBorder, setErrorBorder] = useState({borderColor:"red",borderWidth:1});
  const [errorBordername, setErrorBordername] = useState({borderColor:"red",borderWidth:1});
  const [errorFont, setErrorFont] = useState({color:"red"});
  const [code,setcode]=useState("+1");
   const [formStyle, setFormStyle] = useState({
    firstname: {},
    lastname: {width:wp(86.933)},
    middlename: {width:wp(42.133)},
    email: '',
    phoneNumber: '',
    password: '',
    confirmpassword: '',
    company: '',
    token: "",
  });

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
  checkPassword = str => {
    // var regex = new RegExp ('(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;\'?/>;.<;,])(?!.*\s).*$');
    var regex= /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{";:;'?/>;.<;,])(?!.*\s).*$/;

    if (regex.test(str)) {
      console.log("true")
      return true;
    }
    console.log("false")
    return false;
  };
  SignUp=()=>{
    if(formValues.firstname == ""){
     handleFirstName("")
    }
    if(formValues.firstname == ""){
      console.log("enter firstname")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["firstname"]='Enter Valid First Name';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   firstname: errorBordername,
    // });
    jk1=formStyle
    jk1["firstname"]=errorBordername
    console.log(jk1)
    setFormStyle(jk1);
    }
    if(formValues.lastname == ""){
      console.log("enter lastname")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["lastname"]='Enter Valid Last Name';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   lastname: errorBordername,
    // });
    jk1=formStyle
    jk1.lastname=errorBordername
    console.log(jk1)
    setFormStyle(jk1);
    }
    if(formValues.email == ""){
      console.log("enter email")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["email"]='Enter Valid Email';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   email: errorBordername,
    // });
    jk1=formStyle
    jk1["email"]=errorBorder
    console.log(jk1)
    setFormStyle(jk1);
    }
    if(formValues.password == ""){
      console.log("enter pass")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["password"]='Enter Valid password';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   password: errorBordername,
    // });
    jk1=formStyle
    jk1["password"]=errorBorder
    console.log(jk1)
    setFormStyle(jk1);
    }
    if(formValues.confirmpassword == ""){
      console.log("enter pass2")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["confirmpassword"]='Enter Valid password';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   confirmpassword: errorBordername,
    // });
    jk1=formStyle
    jk1["confirmpassword"]=errorBorder
    console.log(jk1)
    setFormStyle(jk1);
    }
    if(formValues.phoneNumber == ""){
      console.log("enter ph number")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["phoneNumber"]='Enter Valid phoneNumber';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   phoneNumber: errorBordername,
    // });
    jk1=formStyle
    jk1["phoneNumber"]=errorBorder
    console.log(jk1)
    setFormStyle(jk1);
    }
    if(formValues.company == ""){
      console.log("enter company")
    //      let jk = Object.assign({}, errorValues, {
    //   firstname: 'Enter Valid First Name',
    // });
    jk=errorValues
    jk["company"]='Enter Valid company';
    setErrorValues(jk);
    // let jk1 = Object.assign({}, formStyle, {
    //   company: errorBordername,
    // });
    jk1=formStyle
    jk1["company"]=errorBorder
    console.log(jk1)
    setFormStyle(jk1);
    }

  if (errorValues.email != '' || errorValues.password != '' || errorValues.firstname != "" && errorValues.lastname!="" &&errorValues.middlename!="" && errorValues.phoneNumber!="" && errorValues.company!="" && errorValues.confirmpassword!="") {
    console.log("data has errors")
    Alert.alert(
      'Enter Valid Details',
      'One or More of the details entered is invalid',
      [
        {
          text: 'Ok',
          onPress: () => console.log('enter valid details'),
        },
      ],
      { cancelable: false },
    );
  }
  else if (formValues.password !== formValues.confirmpassword ){
    Alert.alert(
      'Enter Valid Details',
      'MAKE SURE BOTH THE PASSWORDS ARE SAME',
      [
        {
          text: 'Ok',
          onPress: () => console.log('enter valid details'),
        },
      ],
      { cancelable: false },
    );
  }
  else if (
    formValues.email != '' &&
    formValues.password === formValues.confirmpassword &&
    errorValues.email == '' &&
    errorValues.password == '' && 
    errorValues.firstname == "" &&
    errorValues.lastname =="" &&
    errorValues.middlename =="" && 
    errorValues.phoneNumber =="" &&
    errorValues.company =="" && 
    errorValues.confirmpassword==""
  ) {
    console.log(formValues.email, formValues.password);
    console.log(code,"code")
    const data = {
      firstname: formValues.firstname,
      middlename: formValues.middlename,
      lastname: formValues.lastname,
      email: formValues.email,
      password: formValues.password,
      phone: code+""+formValues.phoneNumber,
      company: formValues.company,
      invitation_code: formValues.token
    };
    const config = {
      url: 'https://api.leadswatch.com/api/v1/user/register',
      data: data,
      method: 'post',
    }; //post data to db
    axios(config)
      .then(response => {
        console.log(response);
        let mykeys=Object.keys(formValues)
        obj={}
        for(i=0;i<mykeys.length;i++){
          obj[mykeys[i]]=""
        }
        console.log(obj,"obj")
        setFormValues(obj);
        console.log(formValues,"form")
        //  let jk = Object.assign({}, formValues, { 
        //    firstname: "",
        //     middlename: '',
        //     lastname: "",
        //     email: "",
        //     password: "",
        //     confirmpassword:"",
        //     phone: "",
        //     company: "",
        //     invitation_code: "",
        //   });
        //  setFormValues(jk);
        //  let jk1 = Object.assign({}, formValues, { 
        //     phone: "",
        //     company: "",
        //     invitation_code: "",
        //   });
        //  setFormValues(jk1);
        props.navigation.navigate('LoginPage', { signup: true });
      })
      .catch(error => {
        console.log(formValues, 'haha');
        console.log(
          formValues.email,
          formValues.password,
          'mydata',
        );
        console.log(error);
        console.log(error.message, "msg");
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

        console.log(error.response.data.error.message);
        console.log('Error Signing up');
      });
  } else {
    Alert.alert(
      'Form Values cannot be empty',
      'Enter all details',
      [
        {
          text: 'Ok',
          onPress: () => console.log('enter valid details'),
        },
      ],
      { cancelable: false },
    );
  }
}
handleConfirmPassword=(value)=>{
  let jk = Object.assign({}, formValues, {
    confirmpassword: value,
  });
  setFormValues(jk);
  boolvalue = checkPassword(value);
  if (value != formValues.password) {
    let jk = Object.assign({}, errorValues, {
      confirmpassword: 'Both Passwords Must Be same',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      confirmpassword: errorBorder,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      confirmpassword: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      confirmpassword: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
handlePassword=(value)=>{
  let jk = Object.assign({}, formValues, { password: value });
  setFormValues(jk);
  boolvalue = this.checkPassword(value);
  console.log(value.length,"length")
  if (boolvalue == false || (value.length < 8)) {
    let jk = Object.assign({}, errorValues, {
      password: 'Enter Valid Password',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      password: errorBorder,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      password: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      password: {color:"black"},
    });
    setFormStyle(jk1);
  }
  if (value.length >= 8 && boolvalue==true) {
    let jk = Object.assign({}, errorValues, {
      password: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      password: {color:"black"},
    });
    setFormStyle(jk1);
  }
}

handleCode=(value)=>{
  let jk = Object.assign({}, formValues, { token: value });
  setFormValues(jk);
  console.log(cca)
   let jk1 = Object.assign({}, formStyle, {
      token: {color:"black"},
    });
    setFormStyle(jk1);
 
}
handleCompany=(value)=>{
  let jk = Object.assign({}, formValues, { company: value });
  setFormValues(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk = Object.assign({}, errorValues, {
      company: 'Enter Valid Name',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      company: errorBorder,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      company: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      company: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
handlePhNo=(value)=> {
  if (value.length < 11) {
    let jk = Object.assign({}, formValues, {
      phoneNumber: value,
    });
    setFormValues(jk);
    boolvalue = checkEmail(value);
    if (value.length < 9) {
      let jk = Object.assign({}, errorValues, {
        phoneNumber: 'Enter Valid Phone Number',
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
      phoneNumber: errorBorder,
    });
    setFormStyle(jk1);
    } else {
      let jk = Object.assign({}, errorValues, {
        phoneNumber: '',
      });
      setErrorValues(jk);
      let jk1 = Object.assign({}, formStyle, {
      phoneNumber: {color:"black"},
    });
    setFormStyle(jk1);
    }
  }
}
handleEmail=(value)=>{
  let jk = Object.assign({}, formValues, { email: value });
  setFormValues(jk);
  boolvalue = checkEmail(value);
  if (boolvalue == false) {
    let jk = Object.assign({}, errorValues, {
      email: 'Enter Valid email',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      email: errorBorder,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      email: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      email: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
handleLastName=(value)=>{
  let jk = Object.assign({}, formValues, { lastname: value });
  setFormValues(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk = Object.assign({}, errorValues, {
      lastname: 'Enter Valid LastName',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      lastname: errorBorder,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      lastname: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      lastname: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
handleFirstName=(value)=> {
  let jk = Object.assign({}, formValues, { firstname: value });
  setFormValues(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk = Object.assign({}, errorValues, {
      firstname: 'Enter Valid First Name',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      firstname: errorBordername,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      firstname: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      firstname: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
handleMiddleName=(value)=> {
  let jk = Object.assign({}, formValues, { middlename: value });
  setFormValues(jk);
  boolvalue = checkString(value);
  if (boolvalue == false) {
    let jk = Object.assign({}, errorValues, {
      middlename: 'Enter Valid Name',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      middlename: errorBordername,
    });
    setFormStyle(jk1);
  } else {
    let jk = Object.assign({}, errorValues, {
      middlename: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      middlename: {color:"black"},
    });
    setFormStyle(jk1);
  }
  if(value==""){
    let jk = Object.assign({}, errorValues, {
      middlename: '',
    });
    setErrorValues(jk);
    let jk1 = Object.assign({}, formStyle, {
      middlename: {color:"black"},
    });
    setFormStyle(jk1);
  }
}
  // useEffect(()=>{

  // })

  return load ? (
    <Loader />
  ) : (
     <Container
     style={{backgroundColor:"#F4F5F7",}}
     >
        <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>
          
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
          <Text style={{color:"#484393",fontWeight:"700"}}>Create account!</Text>
          <Text style={{height:hp(1.724)}} />
          </View>
          {/* ************************************************** */}
          {/* ************************************************** */}
          {/* <View style={{flexDirection:"row"}}> */}
            <View style={{flexDirection:"column"}}>
           <MyTextInput
           styles={formStyle.firstname}
            value1={formValues['firstname']}
            myfunc={handleFirstName}
            placeholder="First Name"
            />
            <Text></Text>
          {/* <Text>{errorValues.firstname}</Text> */}
          </View>
          {/* <View style={{width:wp(2.666)}} />
          <View style={{flexDirection:"column"}}>
           <MyTextInput
           styles={formStyle.middlename}
            value1={formValues['middlename']}
            myfunc={handleMiddleName}
            placeholder="MiddleName"
            />
            <Text></Text> */}
          {/* <Text>{errorValues.middlename}</Text> */}
         {/* </View> */}
          {/* </View> */}
           <MyTextInput
           styles={formStyle.lastname}
            value1={formValues['lastname']}
            myfunc={handleLastName}
            placeholder="Last Name"
            />
          <Text></Text>
          {/* <Text>{errorValues.lastname}</Text> */}
          <View style={[{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.email]}>
          <TextInputWithIcon
          styles={{}}
            value1={formValues.email}
            myfunc={handleEmail}
            placeholder="Email"
            />
            <Mail />
            <View style={{width:20}} />
            </View>
            <Text></Text>
          {/* <Text>{errorValues.email}</Text> */}
          <View style={{flexDirection:"row"}}>
            <View style={{flexDirection:"column"}}>
              <View style={[{flexDirection:"row",width:wp(42.133),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.password]}>
           <TextInputWithIcon
          //  styles={{width:wp(42.133)}}
            styles={{}}
            secureTextEntry={seePass}
            value1={formValues.password}
            myfunc={handlePassword}
            placeholder={"Password"}
            />
            <TouchableOpacity onPress={()=>{
              if(seePass==true)
              setSeePass(false)
              else
              setSeePass(true)
            }}>
            <Password />
            </TouchableOpacity>
            <View style={{width:20}} />
            </View>
            
          {/* <Text>{errorValues.password}</Text> */}
          </View>
          <View style={{width:wp(2.666)}} />
          <View style={{flexDirection:"column"}}>
            <View style={[{flexDirection:"row",width:wp(42.133),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.confirmpassword]}>
            <TextInputWithIcon
            // styles={{width:wp(42.133)}}
            styles={{}}
            secureTextEntry={seeCPass}
            value1={formValues['confirmpassword']}
            myfunc={handleConfirmPassword}
            placeholder={"Confirm Password"}
            />
            <TouchableOpacity onPress={()=>{
              if(seeCPass==true)
              setSeeCPass(false)
              else
              setSeeCPass(true)
            }}>
            <Password />
            </TouchableOpacity>
            <View style={{width:25}} />
            </View>
            
          {/* <Text>{errorValues.confirmpassword}</Text> */}
          </View>
          </View>
          <View style={{width:wp(86.933)}}>
            <Text></Text>
              <Text style={{fontSize:10,color:"#9B9B9B"}}>Use 8 or more characters with a mix of Capital letters , small letters ,numbers & symbols</Text>
            <Text></Text>
          </View>  
         
          <View style={[{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.phoneNumber]}>
           {Platform.OS == 'android'?(
             <View>  
            <Picker style={{ width: wp(30),borderRadius:10 }}
               selectedValue={code}
              onValueChange={value =>setcode(value)}
            >
            {cca.map((ele,idx)=>(
              <Picker.Item key={idx} label={ele.label} value={ele.value} color="#9B9B9B" />

            ))}
          </Picker>
          </View>
                    ):(
            <View>
            <IOSPicker
            style={{ width: wp(20),borderRadius:10 }}
              mode="modal"
               selectedValue={code}
              onValueChange={value =>setcode(value)}
            >
              
            {cca.map((ele,idx)=>(
              <Picker.Item key={idx} label={ele.label} value={ele.value} color="#9B9B9B" />

            ))}
            </IOSPicker>
            </View>
                    )}
        {Platform.OS == 'android'?(   
              <TextInputWithIcon
          styles={{width:wp(46)}}
            value1={formValues['phoneNumber']}
            myfunc={handlePhNo}
            placeholder="Phone Number"
            keyboardType="number-pad"
            />
          ):(
                <TextInputWithIcon
          styles={{width:wp(56)}}
            value1={formValues['phoneNumber']}
            myfunc={handlePhNo}
            placeholder="Phone Number"
            keyboardType="number-pad"
            />
            )}
          
            <Phone />
            <View style={{width:20}} />
            </View>
            <Text></Text>
          <View style={[{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.company]}>
          <TextInputWithIcon
          styles={{}}
            value1={formValues['company']}
            myfunc={handleCompany}
            placeholder="Company"
            />
            <Company />
            <View style={{width:20}} />
            </View>
            <Text></Text>
          {/* <Text>{errorValues.company}</Text> */}
          <View style={[{flexDirection:"row",width:wp(86.933),height:hp(5.911),backgroundColor:"white",borderRadius:40,justifyContent:"center",alignItems:"center"},formStyle.token]}>
             <TextInputWithIcon
             styles={{}}
            value1={formValues['token']}
            myfunc={handleCode}
            placeholder={"Invite Code"}
            />            
            <Voucher />
            <View style={{width:20}} />
            </View>
            <Text></Text>
          {/* <Text>{errorValues.token}</Text> */}
         
          <View style={{ }}>
            <MyButton myfunc={()=>this.SignUp()}>
            <Text style={{color:"white"}}>Signup</Text>
          </MyButton>
            <TouchableOpacity
              style={{justifyContent:"center",alignItems:"center" }}
              onPress={() => props.navigation.navigate('LoginPage')}>
                <Text style={{height:hp(1.724)}} />
              <Text style={{ color: "#484393"}}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
          <View style={{height:30}}></View>
        </KeyboardAwareScrollView>
      </Container>
    );
};;


export default SignupPage;


//removed content

  // useEffect(() => {
  //   performMyFunction = () => {
  //     try {
  //       // Retrieve the credentials
  //       console.log('before retrievign function');
  //       getDetails = async () => {
  //         console.log('started retrieval');
  //         // const credentials = await Keychain.getGenericPassword();
  //         if (credentials) {
  //           // setLoader(false);
  //           const data = {
  //             email: credentials.username,
  //             password: credentials.password,
  //           };
  //           const config = {
  //             url: 'https://api.leadswatch.com/api/v1/user/login',
  //             data: data,
  //             method: 'post',
  //           };
  //           axios(config)
  //             .then(response => {
  //               console.log(response);
  //               global.access_token = response.data.data.token;
  //               console.log(global.access_token);
  //               global.user_id = response.data.data.id;
  //               global.role = response.data.data.role_id;
  //               global.publisher = response.data.data.publisher;

  //               storeDetails = async () => {
  //                 const username = data.email;
  //                 const password = data.password;
  //                 console.log('storing variables');
  //                 // Store the credentials
  //                 await Keychain.setGenericPassword(username, password);
  //               };
  //               storeDetails();

  //               props.navigation.navigate('MainNav');
  //               setTimeout(() => {
  //                 console.log(load);
  //                 setLoad(false);
  //               }, 2000);
  //               console.log(
  //                 global.user_id,
  //                 'userid',
  //                 global.role,
  //                 'role',
  //               );
  //             })
  //             .catch(error => {
  //               console.log(error, 'error');
  //               console.log(error.message, 'message');

  //               Alert.alert(
  //                 'Some thing went Wrong',
  //                 'Please try again after some time',
  //                 [
  //                   {
  //                     text: 'Ok',
  //                     onPress: () => console.log('error has occured'),
  //                   },
  //                 ],
  //                 {cancelable: false},
  //               );
  //               console.log(load);
  //               setLoad(false);
  //               Keychain.resetGenericPassword();
  //             });

  //           console.log(
  //             'Credentials successfully loaded for user ' +
  //               credentials.username,
  //           );
  //         } else {
  //           console.log(load);
  //           setLoad(false);
  //           console.log('No credentials stored');
  //         }
  //         // console.log(load);
  //         // setLoad(false);
  //       };
  //       getDetails();
  //     } catch (error) {
  //       console.log(load);
  //       setLoad(false);
  //       console.log("Keychain couldn't be accessed!", error);
  //     }
  //   };
  //   performMyFunction();
  // }, []);
