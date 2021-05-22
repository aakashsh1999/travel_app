import React from 'react';
import {CardItem, H2, Card, Container, H3} from 'native-base';
import {Image, Text, ScrollView, StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
export default AboutScreen = () =>{
    
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });

    return (
            <ScrollView>
                <Image style={style.logo} source={require('../assets/aboutLogo.png')} />
                <View style={{marginTop:20, alignSelf:'center'}}>
                <H2 style={style.aboutHeading}>About</H2>
                <Image source={require('../assets/aboutstrip.png')} />
               </View>
               <View style={{paddingRight:16, paddingLeft:16, marginTop:20, marginBottom:45}}>
                   <Text style={style.aboutText}>
                   With an objective of successfully set-up businesses in UAE, Askepro was established in 2014, in Dubai. With a streamlined approach, we ensure that all our experienced consultants help you navigate through all the processes that are needed to relocate, establish or start a venture from scratch. Cost-effectiveness and transparent communication are constantly emphasised on because our business’s success lies in yours.</Text>
                
<Text style={style.aboutText}>With an expert advisory and experience in dealing with clients from various industries, our experience is reflected on our approach towards your requirements and the quick turn-around time also ensures that you do not miss an opportunity in succeeding.</Text>
<Text style={style.aboutText}>Get in-touch for all business requirements and relocation queries and we’ll contact you with the best way forward.
Experience success with UAE and take your business to new heights with Askepro.</Text>
<Text style={style.aboutText}>Contact us, today!</Text>
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
                    <H3 style={{fontSize:18, lineHeight:22, fontFamily:'Lato', fontWeight:'500'}}>Shakeb Khan</H3>
                    <H3 style={{fontSize:14, color:"#9d9494", fontFamily:'OpenSans', fontWeight:'500'}}>Chief Executive Officer, EPro</H3>
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
                    <H3 style={{fontSize:18, lineHeight:22, fontFamily:'Lato', fontWeight:'500'}}>Shakeb Khan</H3>
                    <H3 style={{fontSize:14, color:"#9d9494", fontFamily:'OpenSans', fontWeight:'500'}}>Chief Executive Officer, EPro</H3>
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
        fontSize:18,
        fontWeight:'bold',
        marginLeft:14,
        marginBottom:7,
        fontFamily:'Lato'
    }, 
    text:{
        fontSize:16,
        color:'#9d9494', 
        fontFamily:'OpenSans',
        lineHeight:22,
        
    },
    aboutText:{
        fontSize:16,
        color:'#9d9494', 
        fontFamily:'OpenSans',
        lineHeight:22,
        textAlign:'center',
        marginBottom:30
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
        marginTop:20
    },
    cardheader:{
        flex:1,
        justifyContent:'flex-end'
    }
});