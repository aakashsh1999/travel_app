import React,{useState} from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import {H3} from 'native-base';
 import CalendarPicker from 'react-native-calendar-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonBar from '../../component/ButtonBar';
import {useHistory} from 'react-router-dom';
import Stepper from './Stepper';
export default BookAppointment = () =>{
    const history = useHistory();
        let jsonData;
        const [selectedStartDate, setSelectedStartDate] = useState(null);
        const [selectedEndDate, setSelectedEndDate] = useState(null);
      
        const onDateChange = async (date, type) => {
            const requestId = await AsyncStorage.getItem("applicationId");
            const url = `http://13.234.123.221/api/service/appointment/${requestId}`;

          //function to handle the date change
          if (type === 'END_DATE') {
            setSelectedEndDate(date);
          } 
          let dates = date.toString();
          dates = dates.split(" ")
              jsonData = {
                 "day": dates[0],
                 "month": dates[1],
                 "date": dates[2],
                 "year": dates[3]
            }
            console.log(dates);
            console.log(jsonData)
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
              history.push("/payment");
               console.log(result);
           } else {
              console.log('Thing was not saved to the database.');
            }
      
        };
        

        return (
            <>
            <ScrollView>   
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
            <ButtonBar/>
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