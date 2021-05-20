import React, {useState, useEffect} from 'react';
// import Config from 'react-native-config';
import { BASE_URL } from '../react-native.config';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Container, Content} from 'native-base';
import Bottombar from '../component/Bottombar';
import {useHistory} from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';

export default Login =  () =>{     
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/openSans.ttf'),
    Lato: require('../assets/fonts/lato.ttf'),
  });

  const history= useHistory();
  const url =  `${BASE_URL}/login`;
  console.log(url);
  const [isLogin, setIsLogin] =React.useState(false);
  const [gvalue, setGvalue] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [msg, setMsg] = React.useState(null);

//   useEffect(() => {
//       checkLogin();
//   }, [])

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

      let idData = await (
        await fetch(
          `${BASE_URL}/users`,
          {
            method: "GET",
            headers: {
              'x-access-token': res.token
            }
          })).json();
      idData = idData.data;
      await AsyncStorage.setItem('id', idData._id);
      alert(idData._id);
      
      if (res.token) {
        await AsyncStorage.setItem('token', res.token);
        setIsLogin(true);
        history.push('/');
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
                <TouchableOpacity  onPress={()=>handleSubmitForm()}>
                <LinearGradient   
                    colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.57}
                    style={style.loginButton}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>LOGIN</Text>
                </LinearGradient>
                </TouchableOpacity>
                
                 <TouchableOpacity onPress={()=>history.push('/create')}>
                <Text style={style.links}>New to Epro? Sign Up here</Text>
                </TouchableOpacity>
            </View>
        </Content>
        <Bottombar value={isLogin}/>
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
        fontFamily:'Lato',
        textAlign:'center'
    },
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6,
        fontFamily:'Lato',
    }, 
    input:{
      fontFamily:'Lato',
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        color:"#000",
        paddingLeft:15,
        marginBottom:18
    },
    links:{
      fontFamily:'Lato',
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
    loginButton:{
      fontFamily:'Lato',
      width:"100%", 
      height:38,
      flexDirection:'row',
      justifyContent:'center',
      borderRadius:50,
      alignItems:'center'
    }
});