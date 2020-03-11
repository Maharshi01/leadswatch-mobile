import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    // Picker,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
    Card,
    CardItem,
    Icon,
    Picker,
    Textarea,
    Right,
    Footer,
    Toast,
    Body,
} from 'native-base';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import { Switch } from 'react-native-paper';
import BackArrow from '../../assets/js/BackArrow';
// import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import { CheckBox } from 'react-native-elements';

const Checked = ({ item, manageToggle, checked, ...props }) => {
    if (item.name == undefined) {
        return <Text></Text>
    }
    else {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center'
            }}
                key={item.id}>
                <Card
                    style={{
                        width: wp(90.66),
                        //height: hp(8.77),
                        borderRadius: 10,
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "transparent",
                        elevation: 0
                    }}>
                    <View
                        style={{
                            width: wp(90.66),
                            //height: hp(8.77),
                            borderRadius: 4,
                            flexDirection: "row",
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}>
                        <View>
                            <CheckBox
                                // style={{backgroundColor:"red"}}
                                checked={checked}
                                onPress={() => manageToggle(item.name, !checked)} />
                        </View>

                        {/* <View></View> */}
                        <Text style={styles.textStyle}> {item.name}</Text>
                        {/* <View style={{ width: wp(1.5) }}></View> */}
                        {/* <View style={{ justifyContent: "center", alignItems: 'center', borderColor: '#707070', borderRadius: 6, borderWidth: 1, width: wp(28) }}> */}
                        {/* <View style={{ borderColor: '#707070', borderRadius: 6, borderWidth: 1, width: wp(35) }}> */}
                        <Text style={styles.textStyle1}> {item.datatype}</Text>
                        {/* <Picker
                             mode="dropdown"
                             iosHeader="Select"
                             iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
                                selectedValue={item.datatype}
                                style={{height: 40, width: wp(35) }}
                            >
                                <Picker.Item color="#9B9B9B" label="String" value="string" />
                                <Picker.Item color="#9B9B9B" label="Number" value="number" />
                                <Picker.Item color="#9B9B9B" label="Boolean" value="boolean" />
                            </Picker> */}
                        {/* </View> */}
                        {/* <View style={{ width: wp(1.5) }}></View> */}
                        {/* <Text style={styles.textStyle3}>{item.mandatory}</Text> */}
                        <Text style={styles.textStyle3}>{item.mandatory ? <Text style={{ color: "#63E57D" }}>{"  "}Yes</Text> : <Text style={{ color: "#F53669" }}>{"  "}No</Text>}</Text>
                        {/* <Switch

                            // onValueChange={switchValue => setSwitch(switchValue)}
                            value={item.mandatory ? true : false}
                        /> */}
                    </View>
                </Card>
                <View style={{ height: hp(1) }}></View>




            </View >
        );
    }
}
export default Checked
const styles = StyleSheet.create({

    textStyle: {
        width: wp(25),
        // fontFamily: "Roboto",
        // backgroundColor: "red",
        fontSize: 16,
        color: "#00B0EB",
        fontWeight: "500"
    },
    textStyle1: {
        width: wp(25),
        // fontFamily: "Roboto",
        // backgroundColor: "red",
        fontSize: 16,
        color: "#00B0EB",
        fontWeight: "500"
    },
    textStyle3: {
        width: wp(20),
        // fontFamily: "Roboto",
        // backgroundColor: "red",
        fontSize: 16,
        color: "#00B0EB",
        fontWeight: "500"
    }
});