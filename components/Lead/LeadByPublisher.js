/* created by D.satwik
  Created on 10/4/2019
  modified on 10/4/2019
  Leads of the publisher 
*/
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Button,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
// import Back from '../../assets/svg/back.svg';

const LeadByPublisher = props => {
  const [searchbarValue, setSearch] = useState('');

  const [deals, setDeals] = useState([
    {
      name: 'satwik',
      age: 21,
    },
    {
      name: 'uday',
      age: 21,
    },
    {
      name: 'surya',
      age: 21,
    },
    {
      name: 'maharshi',
      age: 65,
    },
    {
      name: 'suchtith',
      age: 43,
    },
  ]);

  //const[showLeads,setShowLeads] = useState(true);
  //const [showCampaigns, setShowCampaigns] = useState(false);
  const [myDeals, setMyDeals] = useState(deals);

  const deals_list =
    deals.length > 0 ? (
      deals.map(deal => (
        <TouchableOpacity>
          <View
            style={{
              marginTop: '5%',
              marginBottom: '5%',
              width: wp(92),
              marginLeft: 15,

              borderRadius: 8,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 3,
              elevation: 5,
              shadowOpacity: 1.0,
            }}>
            <View bordered style={{width: wp(92)}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: '2%',
                  marginLeft: '2%',
                  backgroundColor: 'rgba(82, 82, 82, 0.5)',
                  borderRadius: 5,
                }}>
                {/* <Drop height={16} width={16} /> */}
                <Text
                  style={{
                    // marginLeftL: '4%',
                    fontWeight: '900',
                    color: 'white',
                    // position: 'absolute',
                    // child
                  }}>
                  {deal.name}
                </Text>
                <Text
                  style={{
                    // marginLeftL: '4%',
                    fontWeight: '900',
                    color: 'white',
                  }}>
                  {deal.age}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text></Text>
    );
  return (
    <Container style={{width: wp(100), backgroundColor: '#F0F0F0'}}>
      <Content keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: wp(100),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <View style={{marginLeft: '2%'}}>
            {/* <Back
              onPress={() => props.navigation.goBack(null)}
              width={16}
              height={16}
            /> */}
          </View>
          <View style={{marginLeft: '30%'}}>
            <Text style={{fontSize: 27, color: 'black', fontWeight: 'bold'}}>
              LEADS
            </Text>
          </View>
        </View>

        <View style={{width: wp(100)}}>
          <View
            style={{
              borderRadius: 35,
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              marginTop: '4%',
              marginBottom: '2%',
              width: wp(92),
              marginLeft: 10,
            }}>
            <View style={{width: 20}}></View>

            <View style={{width: 20}}></View>
            <TextInput
              style={{width: '100%', height: 50}}
              value={searchbarValue}
              placeholder="Search Properties"
              placeholderTextColor="black"
              onChangeText={value => {
                setSearch(value);
                value = value.toLowerCase();
                filterData = [...myDeals];
                anotherData = [...filterData];
                if (value != '') {
                  anotherData = filterData.filter(item => {
                    let prope = item.name + ' ' + item.age;

                    prope = prope.toLowerCase();
                    return prope.includes(value);
                  });
                }
                setDeals(anotherData);
              }}
            />
          </View>

          <View style={{width: wp(92)}}>{deals_list}</View>
        </View>
      </Content>
    </Container>
  );
};
export default LeadByPublisher;
