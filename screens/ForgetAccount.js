import React from 'react';
import {ImageBackground , CheckBox, StyleSheet, Text, View, TextInput, BackHandler, TouchableOpacity} from 'react-native';
import {H3, Button, Item, Body, Input, Content} from 'native-base';
import PhoneInput from "react-native-phone-number-input";
import Bottombar from '../component/Bottombar';
import { useHistory } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
export default ForgetAccount =  () =>{     
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });

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

    if (data.status==1){
    await AsyncStorage.setItem('email', data.email);
     history.push('/reset');
    }
    else{
        alert('Please enter a valid Email');
    }
    
}



React.useEffect(()=>{
    const backAction = () => {
      history.push('/login');
       return true;
     };
  
     const backHandler = BackHandler.addEventListener(
       "hardwareBackPress",
       backAction
     );
     return () => backHandler.remove();
  });
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
                    <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.57} style={style.loginButton}>                    
                    <Text style={{fontSize:15, fontWeight:'bold'}}>SUBMIT</Text>
                    </LinearGradient>
                    </TouchableOpacity>
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
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        color:"#000",
        paddingLeft:15,
        marginBottom:18,
        fontFamily:'Lato',
    },
    links:{
        textDecorationLine:'underline',
        fontSize:14, 
        lineHeight:17,
        margin:30,
        textAlign:'center',
        fontFamily:'Lato',
    },
    loginButton:{
        width:"100%", 
        height:38,
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:50,
        fontFamily:'Lato',
        alignItems:'center'
      }
});