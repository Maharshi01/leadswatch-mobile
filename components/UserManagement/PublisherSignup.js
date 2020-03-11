/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

*/
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
const PublisherSignup = props => {
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    phoneNumber: '',
    password: '',
    confirmpassword: '',
  });
  const [errorValues, setErrorValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmpassword: '',
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
    var regex = new RegExp('^[a-zA-Z0-9@*&]*$');

    if (regex.test(str)) {
      return true;
    }
    return false;
  };
  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: wp(100),
        marginTop: Platform.OS === 'ios' ? 30 : 0,
      }}
      enabled>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: wp(96),
        }}>
        <TextInput
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['firstname']}
          onChangeText={value => {
            let jk = Object.assign({}, formValues, {firstname: value});
            setFormValues(jk);
            boolvalue = checkString(value);
            if (boolvalue == false) {
              let jk = Object.assign({}, errorValues, {
                firstname: 'Enter Valid First Name',
              });
              setErrorValues(jk);
            } else {
              let jk = Object.assign({}, errorValues, {
                firstname: '',
              });
              setErrorValues(jk);
            }
          }}
          placeholder="FirstName"></TextInput>
        <Text>{errorValues.firstname}</Text>
        <Text style={{height: 30}}></Text>
        <TextInput
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['lastname']}
          onChangeText={value => {
            let jk = Object.assign({}, formValues, {lastname: value});
            setFormValues(jk);
            boolvalue = checkString(value);
            if (boolvalue == false) {
              let jk = Object.assign({}, errorValues, {
                lastname: 'Enter Valid LastName',
              });
              setErrorValues(jk);
            } else {
              let jk = Object.assign({}, errorValues, {
                lastname: '',
              });
              setErrorValues(jk);
            }
          }}
          placeholder="LastName"></TextInput>
        <Text>{errorValues.lastname}</Text>
        <Text style={{height: 30}}></Text>
        <TextInput
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['email']}
          onChangeText={value => {
            let jk = Object.assign({}, formValues, {email: value});
            setFormValues(jk);
            boolvalue = checkEmail(value);
            if (boolvalue == false) {
              let jk = Object.assign({}, errorValues, {
                email: 'Enter Valid email',
              });
              setErrorValues(jk);
            } else {
              let jk = Object.assign({}, errorValues, {
                email: '',
              });
              setErrorValues(jk);
            }
          }}
          placeholder="Email"></TextInput>
        <Text>{errorValues.email}</Text>
        <Text style={{height: 30}}></Text>
        <TextInput
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['phoneNumber']}
          onChangeText={value => {
            if (value.length < 11) {
              let jk = Object.assign({}, formValues, {phoneNumber: value});
              setFormValues(jk);
              boolvalue = checkEmail(value);
              if (value.length < 9) {
                let jk = Object.assign({}, errorValues, {
                  phoneNumber: 'Enter Valid Phone Number',
                });
                setErrorValues(jk);
              } else {
                let jk = Object.assign({}, errorValues, {
                  phoneNumber: '',
                });
                setErrorValues(jk);
              }
            }
          }}
          placeholder="PhoneNumber"></TextInput>
        <Text>{errorValues.phoneNumber}</Text>
        <Text style={{height: 30}}></Text>
        <TextInput
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['Company']}
          onChangeText={value => {
            let jk = Object.assign({}, formValues, {company: value});
            setFormValues(jk);
            boolvalue = checkString(value);
            if (boolvalue == false) {
              let jk = Object.assign({}, errorValues, {
                company: 'Enter Valid Name',
              });
              setErrorValues(jk);
            } else {
              let jk = Object.assign({}, errorValues, {
                company: '',
              });
              setErrorValues(jk);
            }
          }}
          placeholder="Company"></TextInput>
        <Text>{errorValues.company}</Text>
        <Text style={{height: 30}}></Text>
        <TextInput
          secureTextEntry={true}
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['password']}
          onChangeText={value => {
            let jk = Object.assign({}, formValues, {password: value});
            setFormValues(jk);
            boolvalue = checkPassword(value);
            if (boolvalue == false || value.length < 8) {
              let jk = Object.assign({}, errorValues, {
                password: 'Enter Valid Password',
              });
              setErrorValues(jk);
            } else {
              let jk = Object.assign({}, errorValues, {
                password: '',
              });
              setErrorValues(jk);
            }
            if (value.length == 8) {
              let jk = Object.assign({}, errorValues, {
                password: '',
              });
              setErrorValues(jk);
            }
          }}
          placeholder="Password"></TextInput>
        <Text>{errorValues.password}</Text>
        <Text style={{height: 30}}></Text>
        <TextInput
          secureTextEntry={true}
          style={{borderWidth: 1, minHeight: 50, width: wp(80)}}
          value={formValues['confirmpassword']}
          onChangeText={value => {
            let jk = Object.assign({}, formValues, {confirmpassword: value});
            setFormValues(jk);
            boolvalue = checkPassword(value);
            if (value != formValues.password) {
              let jk = Object.assign({}, errorValues, {
                password: 'Both Passwords Must Be same',
              });
              setErrorValues(jk);
            } else {
              let jk = Object.assign({}, errorValues, {
                password: '',
              });
              setErrorValues(jk);
            }
          }}
          placeholder="ConfirmPassword"></TextInput>
        <Text>{errorValues.password}</Text>
        <Text style={{height: 30}}></Text>
        <TouchableOpacity
          onPress={() => {
            if (
              formValues.email != '' &&
              formValues.password === formValues.confirmpassword &&
              errorValues.firstname == '' &&
              errorValues.lastname == '' &&
              errorValues.email == '' &&
              errorValues.company == '' &&
              errorValues.phoneNumber == '' &&
              errorValues.password == '' &&
              errorValues.confirmpassword == ''
            ) {
              console.log(formValues.email, formValues.password);
              const data = {
                firstname: formValues.firstname,
                middlename: '',
                lastname: formValues.lastname,
                email: formValues.email,
                phone: formValues.phoneNumber,
                company: formValues.company,
                password: formValues.password,
                role_id: 3,
              };
              const config = {
                url: 'https://api.leadswatch.com/api/v1/user/register',
                data: data,
                method: 'post',
              }; //post data to db
              axios(config)
                .then(response => {
                  console.log(response);
                  props.navigation.navigate('LoginPage');
                })
                .catch(error => {
                  Alert.alert(
                    'SignUp Failed',
                    'Please Try again after some time',
                    [
                      {
                        text: 'Ok',
                        onPress: () => console.log('enter valid details'),
                      },
                    ],
                    {cancelable: false},
                  );
                  // console.log(formValues, 'haha');
                  // console.log(formValues.email, formValues.password, 'mydata');
                  console.log(error);
                  console.log(error.response);
                  console.log('Error Signing up');
                });
            } else {
              Alert.alert(
                'Enter Valid Details , no field can be empty',
                'One or More of the details entered is invalid',
                [
                  {
                    text: 'Ok',
                    onPress: () => console.log('enter valid details'),
                  },
                ],
                {cancelable: false},
              );
            }
          }}>
          <Text>Signup as Publisher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('LoginPage')}>
          <Text style={{}}>Already have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignupPage')}>
          <Text style={{}}>Not a Publisher?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default PublisherSignup;
