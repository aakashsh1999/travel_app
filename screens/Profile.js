import {H2, Container, Text, Content, Card, CardItem, Left, ListItem } from 'native-base';
import {View, Image, StyleSheet, ImageBackground, TextInput, ScrollView} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useHistory} from 'react-router-dom';
import Bottombar from '../component/Bottombar';

export default Profile = () =>{
    const history = useHistory();
        return (
            <Container>
            <Content >
            <View style={{marginTop:20, marginLeft:16}}>
                <H2 style={style.profileHeading}>Profile</H2>
                <Image source={require('../assets/clipath.png')} />
            </View>
            <ScrollView style={{padding:16}}>
            <Card style={style.card}>
            <ImageBackground source={require('../assets/profilebg.png')} style={style.image}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('../assets/headerIcon.png')} style={style.profileImage}/>
                <View style={{marginLeft:20}}>
                    <View>
                    <Text style={{fontSize:12, color:"#fff", marginTop:20}}>Name</Text>
                    <Text style={{color:'#fff', fontSize:16, marginTop:4}}>William Lawson</Text>
                    </View>
                    <View>
                    <Text style={{fontSize:12, color:'#fff', marginTop:20}}>Total Number of applications</Text>
                    <Text style={{color:'#fff', fontSize:16, marginTop:4}}>08</Text>
                    </View>
                </View>
            </View>
           </ImageBackground>
           <Content style={{paddingLeft:20, paddingRight:20, paddingBottom:20}}>
                    <View>
                    <Text style={style.infoHeading}>Phone Number</Text>
                    <Text style={style.infoText}>+971 9878654478</Text>
                    </View>
                    <View>
                    <Text style={style.infoHeading}>Email</Text>
                    <Text style={style.infoText}>lawson.william@gmail.com</Text>
                    </View>
                    <View>
                    <Text style={style.infoHeading}>Address</Text>
                    <Text style={style.infoText}>Marina Crown, King Salman Bin</Text>
                    <Text style={style.infoText}>Abdulaziz Al Saud St</Text>
                    <Text style={style.infoText}>Dubai, United Arab Emirates</Text>
                    </View>
            </Content>
            </Card>
            <View style={{borderColor:"#f4f4f4", borderWidth:1}}>
            <TouchableOpacity onPress={()=> history.push('/appointment')}>
            <ListItem style={style.list}>
            <Text>Appointments(11)</Text>
            </ListItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> history.push('/mydocument')}>
            <ListItem style={style.list}>
                <Text>My Documents</Text>
            </ListItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> history.push('/history')}>
            <ListItem style={style.list}>
                <Text>History</Text>
            </ListItem >
            </TouchableOpacity>
            <ListItem style={style.list}>
                <Text>Logout</Text>
            </ListItem>
            </View>
            </ScrollView>
            </Content>
            <Bottombar/>
            </Container>
        )
}

const style = StyleSheet.create({
    profileHeading:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:7
    },
       image: {
           width:"100%",
           height:150
      },
      profileImage:{
          width:100, height:100,
          marginTop:20
      }, 
      infoHeading:{
        fontSize:12, color:'#707070', marginTop:20
      },
      infoText:{
        color:'#000', fontSize:16, marginTop:4
      }, 
      card:{
        borderWidth:1, 
        borderColor:'#e6e6e6',
        marginBottom:20
      }, 
      list:{
          borderColor:'#fff', 
          height:62
      }
})