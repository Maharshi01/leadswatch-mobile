import React, {useState, useEffect} from 'react';
import { Text, View , TouchableOpacity, } from 'react-native';
import {Container , Content , Card , CardItem, Body} from 'native-base';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const DashCardBuy =({content,...props})=>{
    const [firstStyle,setfirstStyle]=useState([{borderRadius:20,borderWidth:1,borderColor:"white",width:60,justifyContent:"center",alignItems:"center",height:20,backgroundColor:"white"},{borderRadius:20,borderWidth:1,borderColor:"white",width:60,justifyContent:"center",alignItems:"center",height:20},{borderRadius:20,borderWidth:1,borderColor:"white",width:60,justifyContent:"center",alignItems:"center",height:20}])
    const [defaultStyle,setdefaultStyle]=useState({borderRadius:20,borderWidth:1,borderColor:"white",width:60,justifyContent:"center",alignItems:"center",height:20})
    const [customStyle,setcustomStyle]=useState({borderRadius:20,borderWidth:1,borderColor:"white",width:60,justifyContent:"center",alignItems:"center",height:20,backgroundColor:"white"})
    const [firstStyle1,setfirstStyle1]=useState([{fontSize:9,color:"black"},{fontSize:9,color:"white"},{fontSize:9,color:"white"}])
    const [defaultStyle1,setdefaultStyle1]=useState({fontSize:9,color:"white"})
    const [customStyle1,setcustomStyle1]=useState({fontSize:9,color:"black"})
    const [data,setData]=useState("");
    const [tada,setTada]=useState("");
    useEffect(()=>{
        // console.log(content,'lol')
        setData(content)
        setTada(content.weekcount)
    },[content])
    // console.log(data,"data")
    return(
        
        <Card style={{width:widthPercentageToDP(90.667),height:heightPercentageToDP(13.547),backgroundColor:"#F2782B",borderRadius:10}}>
            <CardItem style={{backgroundColor:"#7062F5",borderRadius:10}}>
                <Body style={{backgroundColor:"#7062F5"}}>
                    <Text style={{fontSize:18,color:"white",fontWeight:"bold"}}>Buyers</Text>
                    <Text style={{height:heightPercentageToDP(2)}}></Text>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={()=>{
                            setTada(data.weekcount)
                            styles=[...firstStyle]
                            styles[0]=customStyle
                            styles[1]=defaultStyle
                            styles[2]=defaultStyle
                            styles1=[...firstStyle1]
                            styles1[0]=customStyle1
                            styles1[1]=defaultStyle1
                            styles1[2]=defaultStyle1
                            setfirstStyle(styles)
                            setfirstStyle1(styles1)
                        }} style={firstStyle[0]}>
                            <Text style={firstStyle1[0]}>Week</Text>
                        </TouchableOpacity>
                        <Text style={{width:widthPercentageToDP(4)}}></Text>
                        <TouchableOpacity 
                        onPress={()=>{
                            setTada(data.monthcount)
                            styles=[...firstStyle]
                            styles[1]=customStyle
                            styles[0]=defaultStyle
                            styles[2]=defaultStyle
                            styles1=[...firstStyle1]
                            styles1[1]=customStyle1
                            styles1[0]=defaultStyle1
                            styles1[2]=defaultStyle1
                            setfirstStyle(styles)
                            setfirstStyle1(styles1)
                        }}
                        style={firstStyle[1]}>
                            <Text style={firstStyle1[1]}>Month</Text>
                        </TouchableOpacity>
                        <Text style={{width:widthPercentageToDP(4)}}></Text>
                        <TouchableOpacity
                            onPress={()=>{
                                setTada(data.yearcount)
                            styles=[...firstStyle]
                            styles[2]=customStyle
                            styles[1]=defaultStyle
                            styles[0]=defaultStyle
                            styles1=[...firstStyle1]
                            styles1[2]=customStyle1
                            styles1[1]=defaultStyle1
                            styles1[0]=defaultStyle1
                            setfirstStyle(styles)
                            setfirstStyle1(styles1)
                        }}
                        style={firstStyle[2]}>
                            <Text style={firstStyle1[2]}>Year</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{height:heightPercentageToDP(2)}}></Text>
                    <Text style={{fontSize:24,color:"white",fontWeight:"bold"}}>  {tada}</Text>
                </Body>
            </CardItem>
        </Card>
        
    );
}
export default DashCardBuy