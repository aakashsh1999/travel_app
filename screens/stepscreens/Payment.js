import { View, List, ListItem, Body, Icon, H3, Radio } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, Text, BackHandler, Touchable, TouchableOpacity, TouchableOpacityComponent} from 'react-native';
import ButtonBar from '../../component/ButtonBar';
import Stepper from './Stepper';
import CardHeader  from '../../component/CardHeader';
import {useHistory} from 'react-router-dom';
export default Payment = () =>{
const history=useHistory();

const [paymethod, choosePaymethod] =React.useState('debit');

    React.useEffect(()=>{
        const backAction = () => {
          history.push('/book');
           return true;
         };
      
         const backHandler = BackHandler.addEventListener(
           "hardwareBackPress",
           backAction   
         );
         return () => backHandler.remove();
      });

    return (
        <>
        <ScrollView style={{backgroundColor:'#fff'}}>
            <H3 style={style.heading}>Payment</H3>
            <Stepper active='/payment'/>
            <View style={{padding:16}}>
            <Text style={style.label}>Choose payment method</Text>

            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1,marginBottom:15}}>
            <TouchableOpacity onPress={() => choosePaymethod('debit')} style={{width:"100%"}}>
                <View style={{paddingBottom:15, padding:16, flexDirection:'row'}}>
                <Radio selected={paymethod ==='debit'} selectedColor="#c7a006" color='#000' />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Debit Card</Text>
                </View>
                </TouchableOpacity>
            </ListItem>

            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1 ,marginBottom:15}}>
            <TouchableOpacity onPress={() => choosePaymethod('credit')} style={{width:"100%"}}>
                <View style={{paddingBottom:15, padding:16, flexDirection:'row'}}>
                <Radio selected={paymethod ==='credit'} selectedColor="#c7a006" color='#000' />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Credit Card</Text>
                </View>
                </TouchableOpacity>
            </ListItem>

            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1,marginBottom:15}}>
            <TouchableOpacity onPress={() => choosePaymethod('net')} style={{width:"100%"}}>
                <View style={{paddingBottom:15, padding:16, flexDirection:'row'}}>
                <Radio selected={paymethod ==='net'} selectedColor="#c7a006" color='#000' />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Net Banking</Text>
                </View>
                </TouchableOpacity>
            </ListItem>
          
            </View>
        </ScrollView>
        <CardHeader/>
        <ButtonBar/>
        </>
    )

}

const style = StyleSheet.create({
    label:{
        fontSize:14, 
        marginTop:25,
        marginBottom:20,
        fontWeight:'500'
    }, 
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center',
        fontFamily:"Lato"
    }
});