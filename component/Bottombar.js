import React, { Component, useEffect, BackHandler} from 'react';
import {Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useHistory} from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
export default Bottombar = ({value}) => {
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/openSans.ttf'),
    Lato: require('../assets/fonts/lato.ttf'),
  });

  let history = useHistory();
  const [isLogin, setIsLogin] =React.useState(false);
  const checkLogin = async ()=>{
     if(await AsyncStorage.getItem('token'))
     {
         setIsLogin(true);
     }
  }
useEffect(()=> {
 checkLogin();
}, [])
    return (  
      <>
        <LinearGradient style={{height:56, width:"100%", flexDirection:'row', justifyContent:'space-evenly', paddingRight:20, paddingLeft:20}}   colors={['#000000', '#545454', '#000000']} start={[1, 0]} end={0,0.98}>
          <TouchableOpacity onPress={()=> isLogin? history.push('/') : history.push('/login')}  style={style.icon}>
              <Icon type='Feather' name="home" style={{fontSize:20 ,color:"#fff"}}/>
              <Text style={style.iconText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>isLogin? history.push('/applynow') : history.push('/login')}>
            <LinearGradient  
                    colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={0,2.29}
                    style={style.applynow}>
              <Text style={style.applynowText}>Apply</Text>
              <Text style={[style.applynowText, {marginBottom:10}]}>Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            <TouchableOpacity onPress={()=>isLogin? history.push('/profile') : history.push('/login')} style={style.icon} disabled={value}>
              <Icon type='Feather' name="user" style={{fontSize:20, color:"#fff"}}/>
              <Text style={style.iconText}>Profile</Text>
            </TouchableOpacity>
        </LinearGradient>
        </>
    );
  }

const style = StyleSheet.create({
  applynow:{width:88, height:88, backgroundColor:'yellow', borderRadius:50, position:'relative', bottom:15, borderWidth:5, justifyContent:'center'},
  applynowText:{fontWeight:'bold', fontSize:14, textAlign:'center', textTransform:'uppercase'},
  icon:{
    alignItems:'center',
    justifyContent:'center',
    width:56
  },
  iconText:{
    fontSize:12, 
    color:'#fff',
    fontFamily:'Lato'
  }
});