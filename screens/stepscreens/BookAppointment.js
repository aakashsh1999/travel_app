import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default BookAppointment = () =>{
        return (
            <ScrollView style={{padding:16}}>   
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
                 />
                 </View>
            </ScrollView>
        )
}

const style = StyleSheet.create({
    label:{
        fontSize:14, 
        marginTop:25,
        fontWeight:'500'
    }, 
});