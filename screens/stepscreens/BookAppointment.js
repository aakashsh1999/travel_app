import React,{useState} from 'react';
import { ScrollView, StyleSheet, View, Text, BackHandler, TouchableOpacity} from 'react-native';
import {H3} from 'native-base';
 import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHistory} from 'react-router-native';
import Stepper from './Stepper';
import {LinearGradient} from 'expo-linear-gradient';
import CardHeader from '../../component/CardHeader';
export default BookAppointment = () =>{
    const history = useHistory();
        let jsonData;
        let dates;
        const [selectedStartDate, setSelectedStartDate] = useState(null);
        const [selectedEndDate, setSelectedEndDate] = useState(null);

        React.useEffect(()=>{
            const backAction = () => {
              history.push('/mode');
               return true;
             };
          
             const backHandler = BackHandler.addEventListener(
               "hardwareBackPress",
               backAction
             );
             return () => backHandler.remove();
          });

        const onDateChange = async (date, type) => {
            const requestId = await AsyncStorage.getItem("applicationId");
            const url = `http://3.109.106.108:8000/service/appointment/${requestId}`;

          //function to handle the date change
          if (type === 'END_DATE') {
            setSelectedEndDate(date);
          } 
           dates = date.toString();
          dates = dates.split(" ")
              jsonData = {
                 "day": dates[0],
                 "month": dates[1],
                 "date": dates[2],
                 "year": dates[3]
            }
            if(dates){
            const result = await(await fetch(url, {
                method: 'PUT',
                   headers: {
                       'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'x-access-token':await AsyncStorage.getItem("token")
                  },
                   body: JSON.stringify(jsonData)
               })).json();
           } 

        };
        

        return (
            <>
            <ScrollView style={{backgroundColor:'#fff'}}>   
                 <H3 style={style.heading}>Book an Appointment</H3>
                 <Stepper active='/book'/>
                 <View style={{paddingLeft:16, paddingRight:16}}>
                <Text style={style.label}>Choose your preferred Date</Text>
                <View style={{marginTop:20, marginBottom:20, borderWidth:1, borderColor:'#e6e6e6'}}>
                <CalendarPicker
                   weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                   previousTitle={'<'}
                   previousTitleStyle={{fontSize:20, color:"#9d9494"}}
                   nextTitle={'>'}
                   nextTitleStyle={{fontSize:20, color:"#9d9494"}}
                   textStyle={{color:'#9d9494'}}
                   monthTitleStyle={{color:"#9d9494"}}
                   yearTitleStyle={{color:"#9d9494"}}
                   dayLabelsWrapper={{borderColor:'#fff'}}
                   headerWrapperStyle={{padding:16}}
                   selectedDayStyle={{backgroundColor:'#000'}}
                   selectedDayTextStyle={{color:'#fff'}}
                   todayBackgroundColor={'#000'}
                   todayTextStyle={{color:'#fff'}}
                   onDateChange={onDateChange}
                 />
                 </View>
                 </View>
            </ScrollView>
            <CardHeader/>
            <View style={{backgroundColor:'#fff', height:70, justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:16 ,flexDirection:'row'}}>                
                <TouchableOpacity onPress={() => history.push('/mode')}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                 <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}} >PREV</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dates ?  history.push('/payment') : alert('Please select appointment date.')}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={{width:137, height:38, borderRadius:20, }}>
                <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center',marginTop:9}}>NEXT</Text>
                </LinearGradient>
                </TouchableOpacity>
                 </View>
            </>
        )
}

const style = StyleSheet.create({
    label:{
        fontSize:14, 
        marginTop:25,
        fontWeight:'500'
    }, 
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center',
        fontFamily:"Lato"
    }
});