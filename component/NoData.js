import React from 'react';
import {View, Text} from 'react-native';
const NoData = ({text})=>{
        return <View style={{width:'100%', marginTop:50}}>
            <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold', color:"#9d9494"}}>Oops! You don't have any {text}</Text>
        </View>
}
export default NoData;