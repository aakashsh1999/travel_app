import React, {useEffect} from 'react';
import { Card, H1, H2,} from 'native-base';
import {Image, Text, ScrollView, StyleSheet, View, LogBox} from 'react-native';
import ServiceGrid from '../component/Grid';
import TouristGrid from '../component/TouristCardGrid';
import Bottombar from '../component/Bottombar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useHistory } from 'react-router';
import {useFonts} from 'expo-font'; 

export default Homescreen = () =>{


    const history = useHistory();
    const [isLogin, setIsLogin] =React.useState(false);
    const video = React.useRef(null);
    const checkLogin = async ()=>{
       if(await AsyncStorage.getItem('token'))
       {
           setIsLogin(true);
        }        
    }
  useEffect(()=> {
    checkLogin();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

    return (
         <>
         <ScrollView style={{backgroundColor:'#fff'}}>
            <Card>
                {/* <Image style={{width:"100%", position: 'relative'}}
                source={require('../assets/homeBg.png')}
                /> */}
                <Video  
                    style={{width:'100%', height:300, opacity:0.5}}
                    ref={video} 
                    source={require('../assets/demo.mp4')}
                    resizeMode='cover'
                    status={'Play'}
                    isMuted
                    shouldPlay={true}
                    isLooping 
                     /> 
                <View style={{ position: 'absolute', bottom: 24,  left: 15}}>
                 <H1 style={style.heading}>Leading Immigration</H1>
                 <H1 style={style.heading}>Consultants in Dubai</H1>
                 <Text style={{fontSize:14, color:"#ffffff",fontFamily:'Lato', marginTop:5}}>Our business is to make your business easier in the UAE.</Text>
                 </View>
            </Card>
            <View style={{marginTop:20, marginLeft:16, backgroundColor:"#fff"}}>
                <H2 style={style.ourServices}>Our Services</H2>
                <Image source={require('../assets/clipath.png')} />
            </View>
            <View style={{width:"100%", paddingLeft:16, paddingRight:16, paddingTop:10}}>
            <Text style={style.paraText}>
            We provide all types services ranging from your tourist visa needs to forming a company in UAE.
            </Text>
            </View>
            <ServiceGrid/>
           {/* <View style={{marginTop:20, marginLeft:16}}>
                <H2 style={style.ourServices}>Tourist Services</H2>
                <Image source={require('../assets/clipath.png')} />
            </View>
            <View style={{padding:15}}>
            <TouristGrid/>            
            </View> */}
            </ScrollView>
            <Bottombar/>
            </>
     );
}
const style = StyleSheet.create({
        heading:{
            fontSize:34,
            fontWeight: 'bold',
            fontFamily:'Lato',
            color:'#ffffff'
        },
        ourServices:{
            fontSize:24,
            fontWeight:'bold',
            marginBottom:7,
            fontFamily:'Lato'
        },
        paraText:{
            fontSize:14,
            color:'#9d9494', 
            fontFamily:'OpenSans'
        }
});