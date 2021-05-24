import React, { Component } from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Content} from 'native-base';
import { useHistory } from 'react-router-dom';

export default TopHeader = () => {
    const history = useHistory();
    const [showDrawer, setShowDrawer] =React.useState(false);
    return (
        <>
        <Header style={style.header}>
          <Left>
              <TouchableOpacity onPress={()=>setShowDrawer(true)}>
              <Icon type="Feather" name='align-left' style={{color:'black'}} />
              </TouchableOpacity>
          </Left>
          <Body style={style.body}>
          <Image
                source={require('../assets/headerIcon.png')}
                />
          </Body>
        </Header>
        {showDrawer ? 
        <View style={style.container}>
                    <View style={style.closeMenu}>
                    <TouchableOpacity onPress={()=>setShowDrawer(false)}>
                    <Icon type='Feather' name='x' style={style.Drawericon}/>
                    </TouchableOpacity>
                      <Text style={{fontSize:20, fontWeight:'bold', marginLeft:20, color:"#fff", fontFamily:'Lato'}}>Menu</Text>
                    </View>        
                    <View style={{padding:20, elevation:200, zIndex:200}}>     
                    <TouchableOpacity onPress={()=>history.push('/')}>
                    <Text style={style.menuItem}>Home</Text>  
                    </TouchableOpacity>
                    </View>

                    <View style={{padding:20, elevation:200, zIndex:200}}>     
                    <TouchableOpacity onPress={()=>history.push('/about')}>
                    <Text style={style.menuItem}>About</Text>  
                    </TouchableOpacity>
                    </View>
                    <View style={{padding:20, elevation:200, zIndex:200}}>     
                    <TouchableOpacity onPress={()=>history.push('/contact')}>
                    <Text style={style.menuItem}>Contact</Text>  
                    </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute',bottom:30,left:20}}>
                    <Text style={{fontSize:14, color:'#fff', fontWeight:'400', marginBottom:15, fontFamily:'Lato'}}>Copyright &copy; 2020 Askepro</Text>
                    <View style={style.bottomDetail}>
                        <Text style={style.terms}>Terms and Condition</Text>
                        <Text style={style.terms}>|</Text>
                        <Text style={style.terms}>Privacy Policy</Text></View>
                    </View>
                    </View>  : null }
         </>
    );
  }

const style =StyleSheet.create({    
    body:{
        flex:1, 
        marginLeft:77,
        paddingTop:10,
        paddingBottom:10,
    },
    header:{
        backgroundColor:"white",
        borderColor:"#fff"
    },
    icon:{
        color:'black'
    },


    container:{
        width:300,
        bottom:56,
        left:0,
        elevation:100,
        zIndex:100,
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
    Drawericon:{
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