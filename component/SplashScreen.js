
import React from 'react';
import {View, Text,SafeAreaView, Image} from 'react-native';
export default SplashScreen = ()=>{
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center'}}>
            <Image source={require('../assets/upper.png')}/>
            <Image source={require('../assets/eprologo.png')} style={{alignSelf:'center'}}/>
            <Image source={require('../assets/lower.png')}/>
        </SafeAreaView>
    );
}
