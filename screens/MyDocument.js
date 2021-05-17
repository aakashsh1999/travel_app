import React from 'react';
import {Content, H2, List, ListItem, Left, Right, Body, Header,Switch,Icon, Button} from 'native-base';
import { ScrollView, StyleSheet, View, Text,  Image, TouchableOpacity} from 'react-native';
import {useHistory} from 'react-router-dom';
export default MyDocument = () =>{
    let history = useHistory();
    
    return (<>
            <View style={{marginTop:20,margin:16}}>
                <View style={style.title}>
                <TouchableOpacity onPress={()=>history.push('/profile')}>
                <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,}}/>
                </TouchableOpacity>
                <Text style={style.heading}>My Documents</Text>
                </View>
                <Image source={require('../assets/clipath.png')} />
            </View>
        <Content style={{padding:16}}>
            <List style={style.list}>
              <ListItem style={{height:52, borderColor:"#fff"}}>
               <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>Emirates Id.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>Special ID.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>GDFRA permit.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>Entry Permit.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={{fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"}}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>XYZ Government ID.jpg</Text>
                </Body>
                 <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>
            </List>
        </Content>
        </>
    );
}

const style = StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:7,
        marginLeft:5,
        fontFamily:'Lato',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
    }, 
    iconStyle:{
        rotation:135,
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
});