import React from 'react';
import {BASE_URL} from 'react-native-config';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Content} from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import Bottombar from '../component/Bottombar';
import {Link, useHistory} from 'react-router-native'
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';
export default CreateAccount =  () => {       
    let history= useHistory();
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });

    const url = `${BASE_URL}/create`;
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const[email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async () =>{
        const jsonData= {'name':name, 'email':email, 'phone':parseInt(phone), 'password':password};
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
              await AsyncStorage.setItem(res.token);
              console.log(res.token);
              history.push('/');
          }
    }
    return(
        <>
        <Content style={style.body}>
            <View style={style.loginBody}>
                <H3 style={style.title}>Create An Account</H3>
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
                <TouchableOpacity  onPress={()=>handleSubmit()}>
                <LinearGradient   
                    colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.57}
                    style={style.loginButton}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>SUBMIT</Text>
                </LinearGradient>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>history.push('/')}>
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