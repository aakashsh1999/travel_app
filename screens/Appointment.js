import React from 'react';
import {Card, Content, Icon, H3, H2, Left, Body, Button} from 'native-base';
import { ScrollView, Text, View, StyleSheet, Image} from 'react-native';
import {useHistory} from 'react-router-dom';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Appointment =  () =>{
    let history = useHistory();
        return ( 
        <ScrollView>
        <View style={{marginTop:20,margin:16}}>
            <View style={style.title}>
            <TouchableOpacity onPress={()=>history.push('/profile')}>
            <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,}}/>
            </TouchableOpacity>
            <Text style={style.heading}>Appointments(11)</Text>
            </View>
            <Image source={require('../assets/clipath.png')} />
        </View>
        <Content style={[{padding:16}]}>
            {/* Active Card */}

            <Card style={style.card}>
            <Left>
                <View style={style.labelBox}>
                    <H3 style={style.labelheading}>23</H3>
                    <Text>Jan 21</Text>
                </View>
            </Left>
            <View style={{width:200, marginRight:50}}>
                <Button rounded style={{width:90, height:19, justifyContent:'center', backgroundColor:'yellow', marginTop:2}}>
                    <Text>Upcoming</Text>
                </Button>
                <Text style={{fontSize:14, fontWeight:'500', marginBottom:10, marginTop:14}}>Appointment with AMER 
                executive in Dubai Media City</Text>
                <Text style={{color:"#9d9494"}}>11:00 - 12:00</Text>
             </View>
            </Card>

            {/* //Inactive Card  */}
            <Card style={style.card}>
            <Left>
                <View style={style.labelBox}>
                    <H3 style={style.InactiveHeading}>23</H3>
                    <Text style={{color:'#9d9494'}}>Jan 21</Text>
                </View>
            </Left>
            <View style={{width:200, marginRight:50}}>
                <Text style={{justifyContent:'center', color:"#9d9494", marginTop:2}}>
                 Past Appointment</Text>
                <Text style={{fontSize:14, fontWeight:'500', marginBottom:10, marginTop:14}}>Appointment with AMER 
                executive in Dubai Media City</Text>
                <Text style={{color:"#9d9494"}}>11:00 - 12:00</Text>
             </View>
            </Card>

            
            {/* //Inactive Card  */}
            <Card style={style.card}>
            <Left>
                <View style={style.labelBox}>
                    <H3 style={style.InactiveHeading}>23</H3>
                    <Text style={{color:'#9d9494'}}>Jan 21</Text>
                </View>
            </Left>
            <View style={{width:200, marginRight:50}}>
                <Text style={{justifyContent:'center', color:"#9d9494", marginTop:2}}>
                 Past Appointment</Text>
                <Text style={{fontSize:14, fontWeight:'500', marginBottom:10, marginTop:14}}>Appointment with AMER 
                executive in Dubai Media City</Text>
                <Text style={{color:"#9d9494"}}>11:00 - 12:00</Text>
             </View>
            </Card>
        </Content>
        </ScrollView>
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
    labelBox:{
        width:70,
        justifyContent:'center',
        alignItems:'center',
        height:70, 
        backgroundColor:'#f7f7f7',
        borderRadius:5
    },
    labelheading:{
        fontWeight:'bold',
        fontSize:25
    }, 
    card:{
        borderWidth:1, 
        borderColor:'#e6e6e6',
        padding:10, flexDirection:'row',
        marginBottom:20
    }, 
    InactiveHeading:{
        fontWeight:'bold',
        fontSize:25, 
        color:"#9d9494"
    }, 
});