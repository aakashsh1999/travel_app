import React from 'react'
import { Container, Content, Icon, List, ListItem, Body, Radio,H3, Left } from 'native-base';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, BackHandler, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHistory, useLocation} from 'react-router-dom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import Stepper from './Stepper';

const ChooseMode = () => {
    const history = useHistory();
    const [checked, setChecked] = React.useState("");
    
    const handleSubmit = async (val) => {
        const requestId = await AsyncStorage.getItem("applicationId");
        const url =`http://13.234.123.221:8000/service/mode/${requestId}`;
        await AsyncStorage.setItem("mode", val);
        const result = await (await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': await AsyncStorage.getItem("token")
            },
            body: JSON.stringify({ "mode": val })
        })).json();

        if(checked === ""){
            alert('Please select service mode.');
        }
        else if (val === 'Online')
            history.push("/upload");
        else if (val === 'Offline')
            history.push("/book");  
    }

    return (
        <>
        <View>
        <H3 style={style.heading}>Choose Service Mode</H3>
            <Stepper active='/mode'/>
                    <List style={{marginTop:10,borderColor:"#f4f4f4", borderWidth:1, paddingLeft:16, paddingRight:16, marginBottom:30}}>
                        <TouchableOpacity onPress={()=>setChecked('Offline')}>
                        <ListItem style={{height:62, borderColor:"#fff", borderBottomColor:'#f4f4f4', borderBottomWidth:1}}>
                        <Radio selectedColor="#c7a006" color='#000' selected={checked =='Offline'}/>
                        <Body>
                        <Text style={{fontSize:14,marginLeft:16}}>Offline</Text>
                        </Body>
                        </ListItem>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setChecked('Online')}>
                        <ListItem style={{height:62, borderColor:"#fff", borderBottomColor:'#f4f4f4', borderBottomWidth:1}}>
                        <Radio selectedColor="#c7a006" color='#000' selected={checked =='Online'}/>
                        <Body>
                        <Text style={{fontSize:14,marginLeft:16}}>Online</Text>
                        </Body>
                        </ListItem>
                        </TouchableOpacity>
                   </List>  
                   </View>
                   <View style={{position:'absolute', bottom:70, width:'100%'}}>
                   <CardHeader/>
                   </View>
                <View style={{width:'100%',backgroundColor:'#fff', height:70, justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:16 ,flexDirection:'row', position:'absolute', bottom:0}}>                
                <TouchableOpacity onPress={() => history.push('/fill')}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                 <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}}>PREV</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit(checked)}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={{width:137, height:38, borderRadius:20, }}>
                <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center',marginTop:9}}>NEXT</Text>
                </LinearGradient>
                </TouchableOpacity>
                 </View>
        </>
    )
}

export default ChooseMode

const style = StyleSheet.create({
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center',
        fontFamily:"Lato"
    }
  });
