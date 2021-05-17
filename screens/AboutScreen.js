import React from 'react';
import {CardItem, H2, Card, Container, H3} from 'native-base';
import {Image, Text, ScrollView, StyleSheet, View} from 'react-native';

export default AboutScreen = () =>{
    return (
            <ScrollView>
                <Image style={style.logo} source={require('../assets/aboutLogo.png')} />
                <View style={{marginTop:20, marginLeft:16}}>
                <H2 style={style.aboutHeading}>About</H2>
                <Image source={require('../assets/clipath.png')} />
               </View>
               <View style={{paddingRight:16, paddingLeft:16, marginTop:20, marginBottom:45}}>
                   <Text style={style.text}>
                   Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce
                   </Text>
               </View>
               <View style={{marginTop:20, marginLeft:16}}>
                <H2 style={style.aboutHeading}>Our Team</H2>
                <Image source={require('../assets/clipath.png')} />
               </View>
               <View style={{padding:16}}>

        {/* About Card */}
                <Card style={style.card}>
                    <CardItem header style={style.cardheader}>
                    <Image style={style.image} source={require('../assets/teamimg.png')} />
                    <View style={{marginRight:28}}>
                    <H3 style={{fontSize:18, lineHeight:22}}>Shakeb Khan</H3>
                    <H3 style={{fontSize:14, color:"#9d9494"}}>Chief Executive Officer, EPro</H3>
                     </View>
                    </CardItem>
                      <CardItem>
                    <Text style={style.text}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce
                    </Text>
                </CardItem>
               </Card>
               
               <Card style={style.card}>
                    <CardItem header style={style.cardheader}>
                    <Image style={style.image} source={require('../assets/teamimg.png')} />
                    <View style={{marginRight:28}}>
                    <H3 style={{fontSize:18, lineHeight:22}}>Shakeb Khan</H3>
                    <H3 style={{fontSize:14, color:"#9d9494"}}>Chief Executive Officer, EPro</H3>
                     </View>
                    </CardItem>
                      <CardItem>
                    <Text style={style.text}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five ce
                    </Text>
                </CardItem>
               </Card>
               </View>
            </ScrollView>
     );
}


const style= StyleSheet.create({
    logo:{
        flex:1,
        alignSelf:'center',
        margin:45
     }, 
    aboutHeading:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:7
    }, 
    text:{
        fontSize:16,
        color:'#9d9494', 
        lineHeight:22
    },
    image:{
        position: 'absolute',
        top:-22,
        left:20,
            },
    card:{
        position:'relative',
        borderWidth:1,
        borderColor:'#e6e6e6',
        marginBottom:60,
        marginTop:30
    },
    cardheader:{
        flex:1,
        justifyContent:'flex-end'
    }
});