import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, BackHandler } from 'react-native';
import {Body, Button, Card, Content, H2, H3, Icon, Left} from 'native-base';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font';
import {useHistory} from 'react-router-dom';

export default Appointment =  () =>{
     
const [loaded] = useFonts({
          Lato: require('../assets/fonts/lato.ttf'),
        });
          
    let history = useHistory();
    const [appointment, setAppointment] = React.useState([]);
    useEffect(() => {
        getData();
    }, [])

    

React.useEffect(()=>{
    const backAction = () => {
      history.push('/profile');
       return true;
     };
  
     const backHandler = BackHandler.addEventListener(
       "hardwareBackPress",
       backAction
     );
     return () => backHandler.remove();
  });

const getData = async () =>{
    const id =await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    let appointment = await (
        await fetch(
          `http://13.234.123.221/api/service/appointment/${id}`,
          {
            method: "GET",
            headers: {
              "x-access-token":token
            },
          }
        )
      ).json();
setAppointment(appointment || []);
}
if(!appointment) {
return  <ActivityIndicator size="large" color='yellow' style={{alignSelf:'center', margin:20}} />
}
return ( 
        <ScrollView style={{backgroundColor:'#fff'}}>
        <View style={{marginTop:20,margin:16}}>
            <View style={style.title}>
            <TouchableOpacity onPress={()=>history.push('/profile')}>
            <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,}}/>
            </TouchableOpacity>
            <Text style={style.heading}>Appointments ({appointment.count})</Text>
            </View>
            <Image source={require('../assets/clipath.png')} />
        </View>
        <Content style={[{padding:16}]}>
        {!appointment.data ? <ActivityIndicator color='red'/> : appointment.data.map((data)=> 
         <Card style={style.card} key={data._id}>
            <Left>
                <View style={style.labelBox}>
                    <H3 style={style.labelheading}>{data.appt_date}</H3>
                    <Text>{data.appt_month} {data.appt_year}</Text>
                </View>
            </Left>
            <View style={{width:240, marginRight:10}}>
                <LinearGradient  
                style={{width:90, height:19, justifyContent:'center', marginTop:2, borderRadius:50}}
                    colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.57}>
                    <Text style={{textAlign:'center', fontSize:12, fontFamily:'Lato', padding:5, textTransform:'uppercase', fontWeight:"500"}}>Upcoming</Text>
                </LinearGradient>
                <Text style={{fontSize:14, fontWeight:'500', marginBottom:10, fontFamily:'Lato', marginTop:14}}>{data.title}</Text>
                <Text style={{color:"#9d9494", fontFamily:'Lato'}}>11:00 - 12:00</Text>
             </View>
            </Card>
        )}
        </Content>
        </ScrollView>
        );
}   

const style = StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:7,
        marginLeft:5,
        fontFamily:'Lato',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
    }, 
    labelBox:{
        width:70,
        justifyContent:'center',
        alignItems:'center',
        height:70, 
        backgroundColor:'#f7f7f7',
        borderRadius:5
    },
    labelheading:{
        fontWeight:'bold',
        fontSize:25,
        fontFamily:'Lato'
    }, 
    card:{
        borderWidth:1, 
        borderColor:'#e6e6e6',
        padding:10, flexDirection:'row',
        marginBottom:20
    }, 
    InactiveHeading:{
        fontWeight:'bold',
        fontSize:25, 
        fontFamily:'Lato',
        color:"#9d9494"
    }, 
});