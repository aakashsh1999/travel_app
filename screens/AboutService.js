import { Content, View, Container, H2, H3, List, ListItem, Icon, Body} from 'native-base';
import React from 'react';
import {BASE_URL} from 'react-native-config';
import { ScrollView, Text , StyleSheet, Image} from 'react-native';
import {useParams} from 'react-router';
const AboutService  = () =>{
    const [service, setService] = React.useState({});
    const { slug } = useParams();
    const service_url = `http://13.234.123.221/api/serviceCategory/${slug}`;
  
    React.useEffect(() => { getServiceSlugDetail(); }, []);  
    const getServiceSlugDetail = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = services.data; 

    setService(serviceData);
    console.log(serviceData);
         };
  return (<>
              <ScrollView>
                            <View style={{paddingTop:20, paddingLeft:16, paddingRight:16, backgroundColor:'#000'}}>
                                <H2 style={style.ourServices}>{service.name}</H2>
                                <Image source={require('../assets/clipath.png')} />    
                                <Text style={style.paraText}>
                                {service.description}
                                </Text>
                            </View>
                            <View>
                                <H3 style={style.subheading}>Overview</H3>
                                <Text style={style.paraText2}>{service.serviceDetail && service.serviceDetail.overview}</Text>
                            </View>
                            <View>
                                <H3 style={style.subheading}>How to Apply</H3>
                              {service.serviceDetail && service.serviceDetail.serviceHowToApply.map((data)=>
                                <ListItem style={{height:52, borderBottomColor:'#fff'}}>
                                <Icon type='Feather' name='square' style={style.iconStyle}/>
                                <Body>
                                <Text style={{fontSize:14,marginLeft:16, color:'#9d9494'}}>{data}</Text>
                                </Body>
                                </ListItem>
                                )}
                            </View>
                                <H3 style={style.subheading}>Documents Required</H3>
                                {service.serviceDetail && service.serviceDetail.reqDocs.map((data)=>
                                <ListItem style={{height:52, borderBottomColor:'#fff'}}>
                                <Icon type='Feather' name='square' style={style.iconStyle}/>
                                <Body>
                                <Text style={{fontSize:14,marginLeft:16, color:'#9d9494'}}>{data}</Text>
                                </Body>
                                </ListItem>
                                )}
                    </ScrollView>
                    </>)
}   
export default AboutService;

const style = StyleSheet.create({
    subheading:{
        marginLeft:16,
        marginTop:10,
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Lato',
        color:'#000' 
    },
    iconStyle:{
        transform:[{rotate:'135deg'}],
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
    ourServices:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:7,
        fontFamily:'Lato',
        color:'#fff'
    },
    paraText:{
        fontSize:16,
        marginTop:20,
        color:'#fff', 
        fontFamily:'Lato',
        marginBottom:20
    },
    
    paraText2:{
        fontSize:16,
        marginTop:10,
        color:'#9d9494', 
        fontFamily:'Lato',
        marginBottom:20,
        paddingLeft:16, paddingRight:16
    },
});