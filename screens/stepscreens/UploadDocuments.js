import React from 'react';
import {Icon, Body, Button, List,H3, ListItem} from 'native-base'; 
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ButtonBar from '../../component/ButtonBar';
import Stepper from './Stepper';


export default UploadDocuments  = () =>{
         return (
             <>
            <ScrollView>
                <H3 style={style.heading}>Upload Documents</H3>
                <Stepper value='3'/>
                <View style={{padding:16}}>
                <View style={style.uploadContainer}>
                <Text style={style.label, {textAlign:'center', margin:20, fontFamily:'Lato'}}>Scan and Upload Documents</Text>
                <TextInput style={style.input} placeholder='Upload file(s) from your computer' />
                <Button rounded style={style.button}> 
                    <Text style={{fontWeight:'bold', fontSize:15}}>UPLOAD</Text>
                </Button>
                </View>
                <View style={{marginTop:40, marginBottom:40}}>
                <Text style={style.label}>Documents Required</Text>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    </View>
                    </View>
            </ScrollView>
            <ButtonBar/>
            </>
        )
}   


const style= StyleSheet.create({
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6,
        fontWeight:'500', fontFamily:'Lato'
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        textAlign:'center',
        paddingLeft:15,
        marginBottom:20
    },
    button:{width:137, alignSelf:'center', margin:15, backgroundColor:"#fff", borderWidth:1, borderColor:'#000',
    fontFamily:"Lato",
    justifyContent:'center'
    },
    uploadContainer : {marginTop:25, borderWidth:1, borderStyle:'dashed', borderColor:'#e6e6e6', justifyContent:'center', padding:20},
    iconStyle:{
        transform:[{rotate:'135deg'}],
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
    listText:{fontSize:16,marginLeft:13, color:'#9d9494', fontFamily:'OpenSans'},
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center',
        fontFamily:"Lato"
    }
});