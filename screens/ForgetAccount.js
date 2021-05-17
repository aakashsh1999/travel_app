import React from 'react';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Content} from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import Bottombar from '../component/Bottombar';
import { useHistory } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ForgetAccount =  () =>{     
    const url =  'http://13.234.123.221/api/check';
    const history= useHistory();
    const [email, setEmail] = React.useState('');

    const jsonPostData = {
        'email': email,
      }

const handleSubmit = async () =>{
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonPostData)
      });
      const data = await result.json()

    if (data.status==1)
    await AsyncStorage.setItem('email', data.email);
    history.push('/reset')
    
}
    return(
        <>
        <Content style={style.body}>
            <View style={style.loginBody}>
                <H3 style={style.title}>Forget Password</H3>
                <View>
                <View>
                <Text style={style.label}>Email</Text>
               <TextInput style={style.input} placeholder='Enter your email' onChangeText={setEmail} value={email}/>
                </View>
                </View>
                <Button rounded warning style={{width:"100%", justifyContent:'center'}} onPress={()=>handleSubmit()}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>SUBMIT</Text>
                </Button>
                <TouchableOpacity onPress={()=>history.push('/create')}>
                <Text style={style.links}>New to Epro? Sign Up here</Text>
                </TouchableOpacity>
            </View>
        </Content>
        <Bottombar/>
        </>
    )

}

const style = StyleSheet.create({
    body: {backgroundColor:"#000", height:"100%", 
    paddingLeft:16, paddingRight:16
    },
    loginBody:{
        width:"100%", backgroundColor:'#fff', paddingLeft:12, paddingRight:12, marginTop:'50%'
    },
    title:{
        fontSize:26,
        marginTop:32,
        marginBottom:32,
        fontWeight:'bold',
        textAlign:'center'
    },
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        color:"#000",
        paddingLeft:15,
        marginBottom:18
    },
    links:{
        textDecorationLine:'underline',
        fontSize:14, 
        lineHeight:17,
        margin:30,
        textAlign:'center'
    },
    checboxContainer:{
        height:58, 
        padding:20,
        backgroundColor:"#f7f7f7",
        flexDirection:'row',
        alignItems:'center'
    },
    resend:{
        fontSize:14,
        color:"#9d9494",
        marginBottom:40, 
        textAlign:'center'
    }
});