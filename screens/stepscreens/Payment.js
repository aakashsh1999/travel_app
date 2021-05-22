import { View, List, ListItem, Body, Icon, H3, Radio } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, Text} from 'react-native';
import ButtonBar from '../../component/ButtonBar';
import Stepper from './Stepper';

export default Payment = () =>{
    return (
        <>
        <ScrollView>
            <H3 style={style.heading}>Payment</H3>
            <Stepper value='5'/>
            <View style={{padding:16}}>
            <Text style={style.label}>Choose payment method</Text>
            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1, marginBottom:15}}>
                <Radio selected={true} />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Debit Card</Text>
            </ListItem>
            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1, marginBottom:15}}>
                <Radio selected={false} />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Credit Card</Text>
            </ListItem>
            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1, marginBottom:15}}>
                <Radio selected={false} />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Net Banking</Text>
            </ListItem>
            </View>
        </ScrollView>
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