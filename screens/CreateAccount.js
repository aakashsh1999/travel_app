import React from 'react';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Content} from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import Bottombar from '../component/Bottombar';
import {Link, useHistory} from 'react-router-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default CreateAccount =  () => {       
    let history= useHistory();
    const url = 'http://13.234.123.221/api/create';
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
              history.push('/home');
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
                
                <View>
                    <Text style={style.label}>Enter Email</Text>
                    <TextInput style={style.input} placeholder='Enter your email' onChangeText={setEmail} value={email}/>
                </View>
                <View>
                    <Text style={style.label}>Enter Password</Text>
                    <TextInput style={style.input} placeholder='Enter your password' onChangeText={setPassword} value={password}/>
                </View>

                </View>
                <Button rounded warning style={{width:"100%", justifyContent:'center'}}>
                        <Text style={{fontSize:15, fontWeight:'bold'}} onPress={handleSubmit}>SUBMIT</Text>
                    </Button>
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
        width:"100%", backgroundColor:'#fff', paddingLeft:12, paddingRight:12, marginTop:48
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