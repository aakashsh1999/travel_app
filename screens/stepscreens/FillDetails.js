import { Container, Content, Icon, List, H3, ListItem, Body, Radio, Left, View, Picker, Form, Button} from 'native-base';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {useHistory, useLocation} from 'react-router';
import Stepper from './Stepper';
import AsyncStorage from '@react-native-async-storage/async-storage';import ButtonBar from '../../component/ButtonBar';
export default FillDetails= () =>{
    const history = useHistory();
    if (!AsyncStorage.getItem("token") && !AsyncStorage.getItem("id"))
    history.push("/login");
    const [user, setUser] = React.useState('');
   
    const [name, setName] = React.useState(null);
    const [dob, setDob] = React.useState(new Date());
    const [type, setType] = React.useState(null);
    const [alias, setAlias] = React.useState(null);
    const [lineOne, setLineOne] = React.useState(null);
    const [lineTwo, setLineTwo] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [pincode, setPincode] = React.useState(null);
   
    const jsonPostData = {
        "name": name,
        "dob": dob,
        "type": type,
        "address":
        {

            "alias": alias,
            "addressLineOne": lineOne,
            "addressLineTwo": lineTwo,
            "state": state,
            "city": city,
            "pincode": pincode,
            "country": country, 
        }
    }
    const handleSubmitForm = async () => {
    const requestId = await AsyncStorage.getItem("applicationId");
    const url = `http://13.234.123.221/api/service//fill/${requestId}`;
        console.log(requestId);
        console.log(jsonPostData);
        const result = await (await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': await AsyncStorage.getItem("token")
            },
            body: JSON.stringify(jsonPostData)
        })).json();
        console.log(result);
        history.push("/upload");


    }
    if (!user) {
        <ActivityIndicator color='yellow'></ActivityIndicator>
    }
    return (
        <>
        <ScrollView>
            <H3 style={style.heading}>Fill Details</H3>
            <Stepper active='/fill'/>
            <View style={{flexDirection:'row', marginTop:25, paddingLeft:16, paddingRight:16}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio onPress={() => setType('self')} selected={type === 'self'} selectedColor="#c7a006" color='#000' />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Self</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:40}}>
                <Radio selectedColor="#c7a006" color='#000' onPress={() => setType('other')} selected={type === 'other'} />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Other</Text>
                </View>
            </View>            
            <View style={{marginTop:20, paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>Name*</Text>
                 <TextInput style={style.input} placeholder='Enter name' value={name} onChangeText={setName} />
                 <View>
                 <Text style={style.label}>Date of Birth*</Text>
                   <DatePicker
                        date={dob}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) =>setDob(date)}
      />
                 {/* <DatePicker
                    date={dob}
                    onDateChange={setDob}
                    />                 */}
                </View>       
           </View>
           <View style={{flexDirection:'row', marginTop:15, justifyContent:'flex-start', paddingLeft:16, paddingRight:16,}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selectedColor="#c7a006" color='#000' onPress={() => setAlias('Home')} selected={alias === 'Home'} />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Home</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:40}}>
                <Radio selectedColor="#c7a006" color='#000' onPress={() => setAlias('Office')} selected={alias === 'Office'} />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Office</Text>
                </View>
            </View>         
                <View style={{marginTop:20, paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>Address Line 1*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 1' value={lineOne} onChangeText={setLineOne}  />
                </View>
                 <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>Address Line 2*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 2' value={lineTwo} onChangeText={setLineTwo}/>
                </View>    
                
                <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>City*</Text>
                 <TextInput style={style.input} placeholder='Enter city' value={city} onChangeText={setCity}/>
                </View>    
                <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>PIN Code*</Text>
                 <TextInput style={style.input} placeholder='Enter pin code' value={pincode} onChangeText={setPincode}/>
               </View>    

               <View style={{marginBottom:20, paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>Country*</Text>
                 <TextInput style={style.input} placeholder='Enter country name' value={country} onChangeText={setCountry}/>
                </View>    
                <Button onPress={()=>handleSubmitForm()}><Text>Save</Text></Button>
        </ScrollView>
        <ButtonBar/>
        </>
    );
}

const style= StyleSheet.create({
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6,
        fontFamily:'Lato'
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        paddingLeft:15,
        marginBottom:18,
        fontFamily:'Lato'
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