import { Container, Content, Icon, List, H3, ListItem, Body, Radio, Left, View, Picker, Form, Button} from 'native-base';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import {TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, BackHandler} from 'react-native';
import {useHistory, useLocation} from 'react-router';
import Stepper from './Stepper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonBar from '../../component/ButtonBar';
import { LinearGradient } from 'expo-linear-gradient';
import CardHeader from '../../component/CardHeader';

export default FillDetails= () =>{
    const scroll = React.createRef();
    const history = useHistory();
    const [validation, setValidation] = React.useState(true);
    const [user, setUser] = React.useState(null);   
    const [name, setName] = React.useState(null);
    const [dob, setDob] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [alias, setAlias] = React.useState("");
    const [lineOne, setLineOne] = React.useState("");
    const [lineTwo, setLineTwo] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [submitted,setSubmitted]= React.useState(false);

    React.useEffect(()=>{
             const backAction = () => {
          history.push('/apply');
           return true;
         };
      
         const backHandler = BackHandler.addEventListener(
           "hardwareBackPress",
           backAction
         );
         return () => backHandler.remove();
      });

React.useEffect(()=>{
        getUser();
}, []);

const invalidData = () => name === "" ||  dob === "" ||  type === "" || alias == "" || lineOne === "" || lineTwo === "" || state === "" ||  city=== "" || pincode === "" || country==="";
const getUser = async () => {
    const id= await AsyncStorage.getItem("id")
    let user = await (
        await fetch(`http://13.234.123.221/api/users/${id}`, {
            method: "GET",
            headers: {
                "x-access-token": await AsyncStorage.getItem("token"),
            },
        })
    ).json();
    user = user.data;
    setUser(user);
}

    const jsonPostData = {
        "name": name ? name : user && user?.name,
        "dob": dob,
        "type": type,
        "address":
        {
            "alias": alias ? alias : user?.address?.alias,
            "addressLineOne": lineOne ? lineOne : user && user.address?.addressLineOne,
            "addressLineTwo": lineTwo ? lineTwo : user && user.address?.addressLineTwo,
            "state": state ? state : user && user.address?.state,
            "city": city ? city : user && user.address?.city,
            "pincode": pincode ? pincode : user && user.address?.pincode,
            "country": country ? country : user && user.address?.country,
        }
    }    
const handleSubmitForm = async () => {       
setSubmitted(true);
if(invalidData())
{
    setValidation(true);    
    scroll.current?.scrollTo({y:0, animated:true})
}
else{
    const requestId = await AsyncStorage.getItem("applicationId");
    const url = `http://13.234.123.221/api/service/fill/${requestId}`;
        const result = await (await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': await AsyncStorage.getItem("token")   
            },
            body: JSON.stringify(jsonPostData)
        })).json();
            alert('Details saved successfully');
           history.push("/upload");
    }
    }
    if (!user) {
        return  <ActivityIndicator size="large" color="yellow" style={{alignSelf:'center', margin:20}} />
    }   
    return (
        <>
        <ScrollView style={{backgroundColor:'#fff'}} ref={scroll}>
            <H3 style={style.heading}>Fill Details</H3>
            <Stepper active='/fill'/>
            {validation && invalidData() && submitted &&
            <View style={{padding:16}}>
            <View style={{width:"100%", backgroundColor:'rgba(229, 24, 26, 0.1)', borderRadius:5, flexDirection:'row', alignItems:'center',padding:8, marginBottom:10}}>
                <Icon type='Feather' name='x' onPress={()=>setValidation(false)}/>
                  <Text style={{marginLeft:10, color:'#e5181a', fontSize:15, fontFamily:'Lato'}}>Please fill all the mandatory fields in order to proceed and complete the application request.</Text>
                </View>
            </View>
            }
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
                 <TextInput style={style.input} placeholder='Enter name' value={name} onChangeText={setName} defaultValue={user && user.name}/>
                 <View>
                 <Text style={style.label}>Date of Birth*</Text>
                   <DatePicker
                    style={{width:"100%"}}
                        mode="date"
                        placeholder="Choose date of Birth"
                        format="DD-MM-YYYY"
                        minDate="01-01-1950"
                        maxDate="01-01-2021"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"  
                        date={dob}
                        customStyles={{
                        dateIcon: {
                            display:'none',
                        },
                        dateInput: {
                            borderWidth:1,     
                            paddingRight:"60%",
                            borderColor:'#e6e6e6'
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) =>setDob(date)}
                    />
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
                 <TextInput style={style.input} placeholder='Enter address line 1' value={lineOne} onChangeText={setLineOne} defaultValue={ user && user.address?.addressLineOne}/>
                </View>
                 <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>Address Line 2*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 2' value={lineTwo}  onChangeText={setLineTwo} defaultValue={ user && user.address?.addressLineTwo}/>
                </View>    
                
                <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>City*</Text>
                 <TextInput style={style.input} placeholder='Enter city' value={city} onChangeText={setCity} defaultValue={ user && user.address?.city}/>
                </View>    

                <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>State</Text>
                 <TextInput style={style.input} placeholder='Enter city' value={state} onChangeText={setState} defaultValue={ user && user.address?.state}/>
                </View>    

                <View style={{paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>PIN Code*</Text>
                 <TextInput style={style.input} placeholder='Enter pin code' value={pincode} onChangeText={setPincode} defaultValue={(user && user.address?.pincode.toString())}/>
               </View>    

               <View style={{marginBottom:20, paddingLeft:16, paddingRight:16,}}>
                 <Text style={style.label}>Country*</Text>
                 <TextInput style={style.input} placeholder='Enter country name' value={country} onChangeText={setCountry} defaultValue={ user && user.address?.country}/>
                </View>    
        </ScrollView>
        <CardHeader/>
        <View style={{backgroundColor:'#fff', height:70, justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:16 ,flexDirection:'row'}}> 
        <TouchableOpacity onPress={() => history.push('/apply')}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                 <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}} >PREV</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmitForm}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={{width:137, height:38, borderRadius:20, }}>
                <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center',marginTop:9}}>NEXT</Text>
                </LinearGradient>
            </TouchableOpacity>
            </View>
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