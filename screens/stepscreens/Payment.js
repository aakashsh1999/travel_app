import { View, List, ListItem, Body, Icon, Radio } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, Text} from 'react-native';

export default Payment = () =>{
    return (
        <ScrollView style={{padding:16}}>
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
        </ScrollView>
    )

}

const style = StyleSheet.create({
    label:{
        fontSize:14, 
        marginTop:25,
        marginBottom:20,
        fontWeight:'500'
    }, 
});