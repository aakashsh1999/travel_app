import React from 'react';
import {CardItem, H2, Card, Container, H3} from 'native-base';
import {Image, Text, ScrollView,StyleSheet, View, BackHandler} from 'react-native';
import {useFonts} from 'expo-font';
import {useHistory} from 'react-router-native';
export default AboutScreen = () =>{
    let history = useHistory();

    React.useEffect(()=>{
    const backAction = () => {
        history.push('/');
        return true;
        };
    
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );
        return () => backHandler.remove();
    });      

      const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });

    return (
            <ScrollView style={{backgroundColor:'#fff'}}>
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
                   <CardItem header>
                    <Image style={style.image} source={require('../assets/client1.jpg')} />
                    <View style={{marginLeft:20, flex:1}}>
                    <H3 style={{fontSize:18, lineHeight:22, fontFamily:'Lato', fontWeight:'500'}}>Shefeek Ismail</H3>
                    <H3 style={{fontSize:14, color:"#9d9494", fontFamily:'OpenSans', fontWeight:'500'}}>FOUNDER, ASK E PRO</H3>
                     </View>
                    </CardItem>
                      <CardItem>
                    <Text style={style.text}>
                    Welcome to ASKEPRO, It’s very happy to see you pleasured on our aids on your much important moments of life till the date. We extremely made the days to have our services related to your Documentation and Data oriented works which changes your way of life. We will undertake changes And innovations for a greater customer experience by which we accurately identify the needs of customers to provide them with unexpected benefits and values, exceeding their expectations, to create a truly positive customer experience. All ASK E PRO employees will continue to dedicate themselves to maximizing customer values through growth and development. We ask for your steadfast support and interest.
                    </Text>
                </CardItem>
               </Card>
               
               <Card style={style.card}>
                    <CardItem header>
                    <Image style={style.image} source={require('../assets/client2.jpg')} />
                    <View style={{marginLeft:20, flex:1}}>
                    <H3 style={{fontSize:18, lineHeight:22, fontFamily:'Lato', fontWeight:'500'}}>Hamad Mohammed</H3>
                    <H3 style={{fontSize:18, lineHeight:22, fontFamily:'Lato', fontWeight:'500'}}>Bakhit Suhail Alrashdi</H3>
                    <H3 style={{fontSize:14, color:"#9d9494", fontFamily:'OpenSans', fontWeight:'500'}}>CO-FOUNDER, ASK E PRO</H3>
                     </View>
                    </CardItem>
                      <CardItem>
                    <Text style={style.text}>
                    We are pleased to welcome you to our networks website. The history of ASKEPRO began in 2005. Since then, ASKEPRO has been engaging in various services based on its widely stemming reach from its local and global networks, strong sourcing base, and excellent technical capacities. ASKEPRO is always with its customers in their lives as a trustworthy partner that provides a much better help to their life changing moments. We at ASKEPRO will try our best to make the lives of our customers more comfortable and prosperous.
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
        width: 100,
        height:100,
          },
          
    card:{
        position:'relative',
        borderWidth:1,
        borderColor:'#e6e6e6',
        marginBottom:60,
        marginTop:20
    },
});