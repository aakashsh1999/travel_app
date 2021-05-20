import React from 'react';
import {Container, Content, Icon, Body, ListItem, Text, List, Left} from 'native-base'; 
import { StyleSheet, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import {useHistory} from 'react-router-native';
import { useFonts } from 'expo-font';
export default SlideDrawer = () =>{
    const [loaded] = useFonts({
        Lato: require('../assets/fonts/lato.ttf'),
      });
      
    let history=useHistory();
        return (
            <View style={style.container}>
                    <View style={style.closeMenu}>
                    <Icon type='Feather' name='x' style={style.icon}/>
                      <Text style={{fontSize:20, fontWeight:'bold', marginLeft:20, color:"#fff", fontFamily:'Lato'}}>Menu</Text>
                    </View>
                    <View style={{padding:20}}>             
                    <TouchableOpacity onPress={()=>history.push('/')}>
                    <Text style={style.menuItem}>Home</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>history.push('/about')}>
                    <Text style={style.menuItem}>About</Text>  
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>history.push('/contact')}>
                    <Text style={style.menuItem}>Contact</Text>  
                    </TouchableOpacity>
                    <View>
                    <View style={{position:'relative', top:380}}>
                    <Text style={{fontSize:14, color:'#fff', fontWeight:'400', marginBottom:15, fontFamily:'Lato'}}>CopyRight &copy; 2020 Askepro</Text>
                    <View style={style.bottomDetail}>
                        <Text style={style.terms}>Terms and Condition</Text>
                        <Text style={style.terms}>|</Text>
                        <Text style={style.terms}>Privacy Policy</Text></View>
                    </View>
                    </View>
                    </View>
            </View>
        )

}

const style= StyleSheet.create({
    container:{
        width:300,
        height:"100%",
        backgroundColor:"#333333"
    }, 
    closeMenu:{
        flexDirection:'row', 
        height:64,
        alignItems:'center',
        paddingLeft:18,
        borderBottomWidth:1, 
        borderBottomColor:"#dedede"
    }, 
    icon:{
        fontSize:30, 
        color:"#fff"
    }, 
    menuItem:{
        fontSize:20,
        fontWeight:'bold', 
        color:"#fff", 
        marginBottom:30,
       fontFamily:'Lato'
    }, 
    bottomDetail:{
        flexDirection:"row", 
    },
    terms:{
        fontSize:12,
        fontWeight:'400', 
        fontFamily:'Lato',
        color:'#fff',
        marginRight:15,
    }
});