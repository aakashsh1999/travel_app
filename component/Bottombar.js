import React, { Component } from 'react';
import {Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useHistory} from 'react-router-dom';

export default Bottombar = () => {
  let history = useHistory();
    return (  
        <Footer style={{height:50}}>
          <FooterTab style={{ backgroundColor:'#000', paddingLeft:20, paddingRight:20}}>
            <Button vertical style={{marginTop:10}} onPress={()=> history.push('/')}>
              <Icon type='Feather' name="home" />
              <Text>Home</Text>
            </Button>
            <TouchableOpacity onPress={()=>history.push('/applynow')}>
              <View style={style.applynow}>
              <Text style={style.applynowText}>Apply</Text>
              <Text style={[style.applynowText, {marginBottom:15}]}>Now</Text>
              </View>
              </TouchableOpacity>
            <Button vertical style={{marginTop:10}} onPress={()=> history.push('/profile')}>
              <Icon type='Feather' name="user"/>
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }

const style = StyleSheet.create({
  applynow:{width:88, height:88, backgroundColor:'yellow', borderRadius:50, position:'relative', bottom:15, borderWidth:5, justifyContent:'center'},
  applynowText:{fontWeight:'bold', fontSize:14, textAlign:'center'},
});