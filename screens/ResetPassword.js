import React from 'react';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Content} from 'native-base';
import Bottombar from '../component/Bottombar';
import {Link, useHistory} from 'react-router-dom';  
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';
export default ResetPassword =  () => {       
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });

    let history= useHistory();
    const url = 'http://13.234.123.221/api/forget/password';
    const [otp, setOtp] = React.useState('');
    const [confirm, setConfirmPassword] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async () =>{
        const email = await AsyncStorage.getItem('email');
        const jsonData= {'otp':parseInt(otp), 'new_password':password, 'confirm_password':confirm, 'email':email};
        const res = await ( await fetch(url, {
            method: "POST",
            headers: {
              Accept: "application/json",   
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          })).json();
          if(res.status===1)
          { 
              history.push('/login');
          }
          console.log(res);
    }

    return(
        <>
        <Content style={style.body}>
            <View style={style.loginBody}>
                <H3 style={style.title}>Reset Your Password</H3>
                <View>
                <View>
                        <Text style={style.label}>Password</Text>
                        <TextInput                       
                        style={style.input}
                        onChangeText={setPassword}
                        value={password} 
                        textContentType='password'
                        placeholder='Enter your password'
                        />
                </View>
                
                <View>
                    <Text style={style.label}>Confirm Password</Text>
                    <TextInput style={style.input} placeholder='Re-enter your password' onChangeText={setConfirmPassword} value={confirm} textContentType='password'/>
                </View>
                <View>
                    <Text style={style.label}>Enter OTP</Text>
                    <TextInput style={style.input} placeholder='Enter your OTP' onChangeText={setOtp} value={otp}/>
                </View>

                </View>
                 <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.57} style={style.loginButton}>                    
                    <Text style={{fontSize:15, fontWeight:'bold'}}>SUBMIT</Text>
                    </LinearGradient>
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
        width:"100%", backgroundColor:'#fff', paddingLeft:12, paddingRight:12, marginTop:"20%"
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
        marginBottom:7,fontFamily:'Lato',
        marginTop:6
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        color:"#000",fontFamily:'Lato',
        paddingLeft:15,
        marginBottom:18
    },
    links:{
        textDecorationLine:'underline',
        fontSize:14, 
        lineHeight:17,
        margin:30,fontFamily:'Lato',
        textAlign:'center'
    },
    loginButton:{
        width:"100%", 
        height:38,
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:50,
        alignItems:'center',
        marginTop:20, 
        fontFamily:'Lato',
        marginBottom:50
      }
});