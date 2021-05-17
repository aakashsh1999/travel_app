import React from 'react';
import { Container, Left, Body, Right, Button, Icon, Card, CardItem, Title, Content, H1, H2, H3, Grid } from 'native-base';
import {Image, Text, ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import ServiceGrid from '../component/Grid';
import TouristGrid from '../component/TouristCardGrid';
import Bottombar from '../component/Bottombar';

export default Homescreen = () =>{

    return (<>
            <Content>
            <ScrollView style={{backgroundColor:'#fff', marginBottom:80}}>
            <Card>
                <Image style={{width:"100%", position: 'relative'}}
                source={require('../assets/homeBg.png')}
                />
                <View style={{ position: 'absolute', bottom: 24,  left: 15}}>
                 <H1 style={style.heading}>Mainland Company</H1>
                 <H1 style={style.heading}>Registration in UAE</H1>
                 </View>
            </Card>
            <View style={{marginTop:20, marginLeft:16, backgroundColor:"#fff"}}>
                <H2 style={style.ourServices}>Our Services</H2>
                <Image source={require('../assets/clipath.png')} />
            </View>
            <View style={{width:"100%", paddingLeft:16, paddingRight:16, paddingTop:10}}>
            <Text style={style.paraText}>
            We provide all types services ranging from your tourist visa needs to forming a company in UAE.
            </Text>
            </View>
            <ServiceGrid/>
           <View style={{marginTop:20, marginLeft:16}}>
                <H2 style={style.ourServices}>Tourist Services</H2>
                <Image source={require('../assets/clipath.png')} />
            </View>
            <View style={{padding:15}}>
            <TouristGrid/>            
            </View>
            </ScrollView></Content>
            <Bottombar/>
            </>
     );
}

const style = StyleSheet.create({
        heading:{
            fontSize:34,
            fontWeight: 'bold',
        },
        ourServices:{
            fontSize:24,
            fontWeight:'bold',
            marginBottom:7
        },
        paraText:{
            fontSize:14,
            color:'#9d9494'
        }
});