/**
 * Created by Uday on 12/09/2019
 * package =settings sub module Account Card on file
 *
 * last modified 12/09/2019
 *
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
  Button,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Toast,
  Root,
} from 'native-base';
import axios from 'axios';



import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CardOnFile = props => {
  const [custom1, setCustom1] = useState();
  const [custom2, setCustom2] = useState();
  //data replacing api
  const [cardValues, setCard] = useState(['', '', '']);
  const [cardlist, setCardList] = useState([]);
//   useEffect(() => {
//     const config = {
//       url: 'http://69.55.49.121:3002/user/cards-list',
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + global.access_token,
//       },
//     };

//     axios(config)
//       .then(response => {
//         console.log(response);
//         setCardList(response.data.result);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);
//   function handleBack() {
//     props.navigation.navigate('AccountPage');
//   }
//   function save_card() {
//     if (cardValues[0] != '' && cardValues[1] != '' && cardValues[2] != '') {
//       if (cardValues[0].length == 16) {
//         if (cardValues[1].length == 6) {
//           if (cardValues[2].length == 3) {
//             const data = {
//               card_name: 'user',
//               card_number: custom1,
//               card_expirydate: custom2,
//               card_cvc: cardValues[2],
//             };
//             console.log('Data', data);
//             console.log(global.access_token);
//             const config = {
//             //   url: 'http://69.55.49.121:3002/user/save-card',
//               data: data,
//               method: 'post',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + global.access_token,
//               },
//             };
//             console.log('hello');
//             axios(config)
//               .then(response => {
//                 if (response.data.status_code == 200) {
//                   Toast.show({
//                     text: 'Successully Saved Card Details',
//                     buttonText: '',
//                     duration: 3000,
//                     position: 'top',
//                     style: {backgroundColor: 'rgba(76,122,214,0.5)'},
//                   });
//                 }
//                 console.log('response in card on file' + response);

//                 //console.log('Successully saved card details');
//               })
//               .catch(error => {
//                 Alert.alert(
//                   'Alert',
//                   'Please Enter Details Correctly',
//                   [
//                     {
//                       text: 'ok',

//                       style: 'ok',
//                     },
//                   ],
//                   {cancelable: false},
//                 );

//                 // setError("Please Enter Correct card details")
//                 console.log(error);
//               });
//           } else {
//             Alert.alert(
//               'Alert',
//               'Please Enter CVV correctly',
//               [
//                 {
//                   text: 'ok',

//                   style: 'ok',
//                 },
//               ],
//               {cancelable: false},
//             );
//           }
//         } else {
//           Alert.alert(
//             'Alert',
//             'Please Enter Correct Expiry Date',
//             [
//               {
//                 text: 'ok',

//                 style: 'ok',
//               },
//             ],
//             {cancelable: false},
//           );
//         }
//       } else {
//         Alert.alert(
//           'Alert',
//           'Please Enter Correct Card Number',
//           [
//             {
//               text: 'ok',

//               style: 'ok',
//             },
//           ],
//           {cancelable: false},
//         );
//       }
//     } else {
//       Alert.alert(
//         'Alert',
//         'Please Enter all Details',
//         [
//           {
//             text: 'ok',

//             style: 'ok',
//           },
//         ],
//         {cancelable: false},
//       );
//     }
//   }
  cardno = value => {
    if (value.length < 17) {
      let array2 = [...cardValues];
      array2[0] = value;
      setCard(array2);
    }
  };
  cardexpiry = value => {
    if (value.length < 7) {
      let array2 = [...cardValues];
      array2[1] = value;
      setCard(array2);
    }
  };
  cardcvc = value => {
    if (value.length < 4) {
      let array2 = [...cardValues];
      array2[2] = value;
      setCard(array2);
    }
  };
  return (
    <Root>
      <Container>
        <Content keyboardShouldPersistTaps={'handled'}>
          
          <Card transparent>
            <CardItem
              style={{height: 65, width: 240, marginLeft: 68, marginRight: 67}}>
              <Body style={{height: 45}}>
                <Text
                  style={{
                    fontSize: 14,
                    // fontFamily: 'Roboto',
                    color: '#9B9B9B',
                    marginLeft: 25,
                  }}>
                  Update your Card on file:
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    // fontFamily: 'Roboto',
                    color: '#9B9B9B',
                    
                  }}>
                  Complete the following to update the Card
                </Text>
                <Text style={{
                    fontSize: 10,
                    // fontFamily: 'Roboto',
                    color: '#9B9B9B',
                    
                  }}>associated with your Leads Watch Account 
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card
            bordered
            style={{
              marginTop: 10,
              marginLeft: 15,
              width: wp(92),

              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowRadius: 3,
              elevation: 5,
              shadowOpacity: 1.0,
            }}>
            <CardItem style={{width: 332, padding: 0}}>
              
                <Text>Card Number</Text>
                <TextInput
                  placeholder={'0000 0000 0000 0000'}
                  value={cardlist.card_number}
                  onChangeText={value => {
                    setCustom1(value);
                  }}></TextInput>
                {/* <TextInput keyboardType="numeric" placeholder="1234 1234 1234 1234" style={{ height: 45, marginLeft: 5, fontWeight: "bold", fontFamily: 'Roboto', fontSize: 12 }} value={cardValues[0]} onChangeText={(value) => cardno(value)}></TextInput> */}
              
            </CardItem>
            <CardItem button style={{width: 332, padding: 0, borderRadius: 8}}>
              
                <Text>Expiration Date</Text>
                <TextInput
                  placeholder={'MM/YYYY'}
                  value={cardlist.card_expirydate}
                  onChangeText={(value)=>{
                    setCustom2(value);
                  }}
                  ></TextInput>
                {/* <TextInput keyboardType="numeric" placeholder="MMYYYY   " style={{ height: 45, marginLeft: 5, fontWeight: "bold", fontFamily: 'Roboto', fontSize: 12 }} value={cardValues[1]} onChangeText={(value) => cardexpiry(value)} /> */}
              
            </CardItem>
            <CardItem button style={{width: 332, borderRadius: 8, padding: 0}}>
              
                <Text
                  style={{
                    marginLeft: 8,
                    color: '#4C7AD6',
                    fontWeight: 'bold',
                    // fontFamily: 'Roboto',
                    fontSize: 13,
                  }}>
                  CVV
                </Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder="CVV"
                  style={{
                    paddingBottom: 30,
                    height: 55,
                    marginBottom: 15,
                    marginLeft: 5,
                    fontWeight: 'bold',
                    // fontFamily: 'Roboto',
                    fontSize: 12,
                  }}
                  value={cardlist.card_cvc}
                  onChangeText={value => cardcvc(value)}
                />
              
            </CardItem>
          </Card>
          <View style={styles.main_view}>
            <TouchableOpacity >
              
                <Text style={styles.buttonText}> Complete </Text>
              
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    </Root>
  );
};
export default CardOnFile;
const styles = StyleSheet.create({
  main_view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  LinearGradientStyle: {
    height: 60,
    paddingLeft: 15,
    paddingTop: 12,
    paddingRight: 15,
    borderRadius: 5,
    width: wp(92),
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 7,
    color: '#fff',
    backgroundColor: 'transparent',
  },
});
