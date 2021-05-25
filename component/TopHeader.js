import { Body, Drawer, Header, Icon, Left } from 'native-base';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import { useHistory } from 'react-router-dom';

export default TopHeader = (props) => {
    const [showDrawer, setShowDrawer] =React.useState(false);
    const drawer = React.useRef(null);
    const openDrawer = () => {
        setShowDrawer(true); 
    };
    const closeDrawer = () => {
        setShowDrawer(false);
    };
    const SideBar = ()=>{
        const history = useHistory();

        return(
        <View style={style.container}>
        <View style={style.closeMenu}>
        <TouchableOpacity onPress={()=>setShowDrawer(false)}>
        <Icon type='Feather' name='x' style={style.Drawericon}/>
        </TouchableOpacity>
          <Text style={{fontSize:20, fontWeight:'bold', marginLeft:20, color:"#fff", fontFamily:'Lato'}}>Menu</Text>
        </View>        
        <View >     
        <TouchableOpacity onPress={()=>{setShowDrawer(false) ; history.push('/')}}>
        <Text style={style.menuItem}>Home</Text>  
        </TouchableOpacity>
        </View>
    
        <View >     
        <TouchableOpacity onPress={()=>{setShowDrawer(false) ; history.push('/about')}}>
        <Text style={style.menuItem}>About</Text>  
        </TouchableOpacity>
        </View>
        <View >     
        <TouchableOpacity onPress={()=>{setShowDrawer(false) ; history.push('/contact')}}>
        <Text style={style.menuItem}>Contact</Text>  
        </TouchableOpacity>
        </View>
        <View style={{position:'absolute',bottom:30,left:20}}>
        <Text style={{fontSize:14, color:'#fff', fontWeight:'400', marginBottom:15, fontFamily:'Lato'}}>Copyright &copy; 2021 Askepro</Text>
        <View style={style.bottomDetail}>
            <Text style={style.terms}>Terms and Condition</Text>
            <Text style={style.terms}>|</Text>
            <Text style={style.terms}>Privacy Policy</Text></View>
        </View>
        </View>
      )};
    
    return (
        <Drawer ref={drawer} content={<SideBar />} onClose={()=>closeDrawer()}  open={showDrawer}>
        <Header style={style.header}>
          <Left>
              <TouchableOpacity onPress={()=>openDrawer()}>
              <Icon type="Feather" name='align-left' style={{color:'black'}} />
              </TouchableOpacity>
          </Left>
          <Body style={style.body}>
          <Image
                source={require('../assets/headerIcon.png')}
                />
          </Body>
        </Header>
            {props.children}
        </Drawer>
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
        margin:15,
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

