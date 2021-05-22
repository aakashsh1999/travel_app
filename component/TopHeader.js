import React, { Component } from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon} from 'native-base';
import {Link} from 'react-router-native';
import {SlideDrawer} from './Drawer';
import { Drawer } from 'native-base';

export default TopHeader = () => {
    return (
        <>
        <Header style={style.header}>
          <Left>
          <Link to="/drawer">
              <Icon type="Feather" name='align-left' style={{color:'black'}} />
              </Link>   
          </Left>
          <Body style={style.body}>
          <Image
                source={require('../assets/headerIcon.png')}
                />
          </Body>
        </Header>
           
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
    }
});