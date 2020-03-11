/*
Created By Surya Teja
Created on : 4th October 2019
package:User Management
Last MOdified : 7th October 2019

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
} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const EditProfile = props => {
  const data = [
    {
      first_name: 'satwik',
      last_name: 'dondapati',
      email: 'satwik@gmail.com',
      phone: 8919289103,
      company: 'fission',
    },
  ];
  const [details, SetDetails] = useState(data);
  const [postDetails, setPostDetails] = useState([]);
  

  publisher_firstname = value => {
    let array2 = [...details];
    array2[0].first_name = value;
    SetDetails(array2);
  };
  publisher_lastname = value => {
    let array2 = [...details];
    array2[0].last_name = value;
    SetDetails(array2);
  };
  publisher_email = value => {
    let array2 = [...details];
    array2[0].email = value;
    SetDetails(array2);
  };
  publisher_company = value => {
    let array2 = [...details];
    array2[0].company = value;
    SetDetails(array2);
  };
  publisher_phone = value => {
    let array2 = [...details];
    array2[0].phone = value;
    SetDetails(array2);
  };
  return (
    <View style={{width: wp(100)}}>
      <View
        style={{
          backgroundColor: 'white',
          marginLeft: '5%',
          marginRight: '5%',
          marginBottom: '2%',
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
            <View style={{flexDirection: 'row'}}>
              <View></View>
              <TouchableOpacity>
                <View>
                  <Text style={{color: '#9B9B9B'}}>FirstName</Text>
                  <TextInput
                    placeholder="firstname"
                    value={details[0].first_name}
                    onChangeText={value => publisher_firstname(value)}
                  />
                  <Text style={{color: '#9B9B9B'}}>LastName</Text>
                  <TextInput
                    placeholder="lastname"
                    value={details[0].last_name}
                    onChangeText={value => publisher_lastname(value)}
                  />
                  <Text style={{color: '#9B9B9B'}}>Email</Text>
                  <TextInput
                    placeholder="email"
                    value={details[0].email}
                    onChangeText={value => publisher_email(value)}
                  />
                  <Text style={{color: '#9B9B9B'}}>Company</Text>
                  <TextInput
                    placeholder="company"
                    value={details[0].company}
                    onChangeText={value => publisher_company(value)}
                  />
                  <Text style={{color: '#9B9B9B'}}>Phone</Text>
                  <TextInput
                    placeholder="phone"
                    value={details[0].phone}
                    onChangeText={value => publisher_phone(value)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button title="Update Details"></Button>
      </View>
    </View>
  );
};

export default EditProfile;
