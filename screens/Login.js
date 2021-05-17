import React, {useState} from 'react';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Container, Content} from 'native-base';
import Bottombar from '../component/Bottombar';
import {useHistory} from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Login =  () =>{     
    const history= useHistory();
  const url =  'http://13.234.123.221/api/login';
  const [gvalue, setGvalue] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [msg, setMsg] = React.useState(null);


  
  const handleSubmitForm = async () => {
        const jsonPostData = {
        'email': email,
        'password': password
      } 

      const res = await( await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonPostData)
      })).json();
      if (res.token) {
        await AsyncStorage.setItem('token', res.token);
        history.push('/home');
      }
 }
    return(
        <>
         <Content style={style.body}>
            <View style={style.loginBody}>
                <H3 style={style.title}>Login Into Your Account</H3>
                <View>
                <View>
                    <Text style={style.label}>Username</Text>
                     <TextInput style={style.input} placeholder='Enter username' onChangeText={setEmail} value={email}/>
                 </View>
                    <Text style={style.label}>Password</Text>
                     <TextInput style={style.input} placeholder='Enter password' onChangeText={setPassword} value={password}/>
                </View>
                {/* <View style={style.checboxContainer}>
                <CheckBox checked={false} />
                    <Text style={{padding:10}}>I'm not a Robot</Text>
                </View> */}
                <TouchableOpacity onPress={()=>history.push('/forget')}>
                <Text style={style.links}>Forget Password ?</Text>
                </TouchableOpacity>
                <Button rounded warning style={{width:"100%", justifyContent:'center'}} onPress={()=>handleSubmitForm()}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>LOGIN</Text>
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
        width:"100%", height:525, backgroundColor:'#fff', paddingLeft:12, paddingRight:12, marginTop:48
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
    }
});