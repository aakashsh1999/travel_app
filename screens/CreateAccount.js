import React from 'react';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Content} from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import Bottombar from '../component/Bottombar';
import {Link, useHistory} from 'react-router-dom'
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default CreateAccount =  () => {     
    let history= useHistory();
    const url = 'http://13.234.123.221/api/create';
    const [name, setName] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const[email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const handleSubmit = async () =>{
        const jsonData= {'name':name, 'email':email, 'phone':parseInt(phone), 'password':password};
        const res = await( await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
          })).json();
            alert(res.status)
          if (res.status===1) {
            await AsyncStorage.setItem('token', res.token);
            history.push('/login');
          }
      
    }
    return(
        <>
        <Content style={style.body}>
            <View style={style.loginBody}>
                <H3 style={style.title}>Create An Account</H3>
                {email==="" || password==="" || phone==="" || name==="" ?<View style={{width:"100%", backgroundColor:'rgba(229, 24, 26, 0.1)', borderRadius:5, flexDirection:'row', alignItems:'center', height:30,  marginBottom:10}}>
                  <Text style={{marginLeft:10, color:'#e5181a', fontSize:15, fontFamily:'Lato'}}>Please fill all the details.</Text>
                </View>
                : null
              }
                <View>
                <View>
                        <Text style={style.label}>Name</Text>
                        <TextInput
                        style={style.input}
                        placeholder='Enter your name'
                        onChangeText={setName}
                        value={name} />
                        
                </View>

                <View>
                    <Text style={style.label}>Mobile Number</Text>
                    <View style={{borderWidth:1, borderColor:"#e6e6e6"}}>
                   <PhoneInput
                        defaultCode="IN"
                        layout="second"
                        withDarkTheme
                        placeholder="Enter your phone number"
                        onChangeText={setPhone}
                        value={phone}
                    />
                    </View>
                </View>
                
                <View style={{marginTop:20}}>
                    <Text style={style.label}>Enter Email</Text>
                    <TextInput style={style.input} placeholder='Enter your email' onChangeText={setEmail} value={email}/>
                </View>
                <View>
                    <Text style={style.label}>Enter Password</Text>
                    <TextInput style={style.input} placeholder='Enter your password' onChangeText={setPassword} value={password}/>
                </View>

                </View>
                <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient   
                    colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.57}
                    style={style.loginButton}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>SUBMIT</Text>
                </LinearGradient>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>history.push('/login')}>
                 <Text style={style.links}>Already an existing customer? Login here</Text>
                </TouchableOpacity>
            </View>
        </Content>
        <Bottombar/>
        </>
    )

}

const style = StyleSheet.create({
    body: {backgroundColor:"#000", height:"100%", flex:1,
    paddingLeft:16, paddingRight:16
    },
    loginBody:{
        width:"100%", backgroundColor:'#fff', paddingLeft:12, paddingRight:12, marginTop:25
    },
    title:{
        fontSize:26,
        marginTop:32,
        marginBottom:20,
        fontFamily:'Lato',
        fontWeight:'bold',
        textAlign:'center'
    },
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
        color:"#000",
        paddingLeft:15,
        marginBottom:18,
        fontFamily:'Lato'
    },
    links:{
        textDecorationLine:'underline',
        fontSize:14, 
        lineHeight:17,
        margin:30,
        textAlign:'center',
         fontFamily:'Lato'
    },
    checboxContainer:{
        height:58, 
        padding:20,
        backgroundColor:"#f7f7f7",
        flexDirection:'row',
        alignItems:'center'
    },
    loginButton:{
        width:"100%", 
        height:38,
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:50,
        alignItems:'center',
        fontFamily:'Lato'
      }
});