import {Body, Button, Container, Content, H3, Icon, Input, Item} from 'native-base';
import {CheckBox, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bottombar from '../component/Bottombar';
import {LinearGradient} from 'expo-linear-gradient';
import {useHistory} from 'react-router-native';

export default Login =  () =>{     

  const history= useHistory();
  let response='';
  let idData;
  const url =  `http://13.234.123.221/api/login`;
  const [isLogin, setIsLogin] =React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const handleSubmitForm = async () => {
      
        const jsonPostData = {
        'email': email.toLowerCase(),
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
      response=res;
      if (response.status == 1 && response.token) {
        AsyncStorage.setItem('token', response.token);
        idData = await (
          await fetch(
            `http://13.234.123.221/api/users`,
            {
              method: "GET",
              headers: {
                'x-access-token':await AsyncStorage.getItem('token'),
              }
            })).json();

        idData = idData.data;
       await AsyncStorage.setItem('id', idData._id);
        await AsyncStorage.setItem('name', idData.name);
      }
      if (idData !==undefined) {
        setIsLogin(true);
        history.push('/');
      }
      else{
        alert('Invalid email or password. Try again!')
      }
 }
    return(
        <>
         <Content style={style.body}>
            <View style={style.loginBody}>
                <H3 style={style.title}>Login Into Your Account</H3>
              {email==="" || password===""?<View style={{width:"100%", backgroundColor:'rgba(229, 24, 26, 0.1)', borderRadius:5, flexDirection:'row', alignItems:'center', height:30,  marginBottom:10}}>
                  <Text style={{marginLeft:10, color:'#e5181a', fontSize:15, fontFamily:'Lato'}}>Please fill all the details for login.</Text>
                </View>
                : null
              }
                <View>  
                <View>
                    <Text style={style.label}>Email</Text>
                     <TextInput style={style.input} placeholder='Enter email' onChangeText={setEmail} value={email}/>
                 </View>
                    <Text style={style.label}>Password</Text>
                     <TextInput style={style.input} placeholder='Enter password' onChangeText={setPassword} secureTextEntry={true}  value={password}/>
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
                    colors={['#c7a006', '#ffff00', '#c7a006']} start={[1, 0]} end={[0,2.57]}
                     style={style.loginButton}
                    >
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
    body: {backgroundColor:"#000000", height:"100%",   
    paddingLeft:16, paddingRight:16
    },
    loginBody:{
        width:"100%", height:525, backgroundColor:'#ffffff', paddingLeft:12, paddingRight:12, marginTop:48
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
        color:"#000000",
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