import { Card, CardItem, H3, Icon, Left, ListItem, Right } from 'native-base';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {useFonts} from 'expo-font';
export default CardHeader = () =>{
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/openSans.ttf'),
    Lato: require('../assets/fonts/lato.ttf'),
  }); 
  const service_url = `http://13.234.123.221/api/serviceCategory`;
  const [service, setServices] = React.useState(null);

  React.useEffect(() => {
    getServices();
  }, []);


  const getServices = async () => {
    const serviceName = await AsyncStorage.getItem("serviceName");
    const services = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = services.data;

    setServices(serviceData);
  };

const [showCard, setShowCard] = React.useState(false);
if(!service)
{
  return null
}
return (  
        <View>
        {showCard ? 
            <Card>
            <CardItem style={{justifyContent:'space-between', borderBottomColor:'#e6e6e6', borderBottomWidth:1}}>
              <H3 style={{fontSize:16, fontFamily:'Lato', fontWeight:'bold', color:'#000'}}>{service[0].name}</H3>
              <TouchableOpacity onPress={()=>setShowCard(false)}>
              <Icon type='Feather' name='x'/>
              </TouchableOpacity>
            </CardItem>
                  <CardItem style={{flexDirection:'column'}}>  
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%",  marginBottom:20} }>
                          <View style={{width:120 }}>
                          <Text style={ style.itemHeading}>Processing Time:</Text>
                          </View>
                          <Text style={style.itemText}>{service[0].processT} Hours</Text>
                          </View>
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                            <View style={{width:120}}>
                          <Text style={style.itemHeading}>Stay Period:</Text>
                          </View>
                          <Text style={style.itemText}>{service[0].stay} days</Text>
                          </View>
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                            <View style={{width:120}}>
                          <Text style={style.itemHeading}>Validity:</Text>
                          </View>
                          <Text style={style.itemText}>{service[0].validity} days</Text>
                          </View>
                
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                          <View style={{width:120}}>
                          <Text style={style.itemHeading}>Entry:</Text>
                          </View>
                          <Text style={style.itemText}>{service[0].entry}</Text>
                          </View>
                        </CardItem>
          </Card> 
        : null }
          <LinearGradient colors={['#000000', '#545454', '#000000']} start={[1, 0]} end={[0,1.5]}>
          <ListItem style={{borderBottomColor:'#fff'}}>
            <Left style={{alignItems:'center'}}>
              <Text style={{color:'#fff', fontSize:14, fontFamily:'Lato'}}>Fees</Text>
              <TouchableOpacity onPress={()=>setShowCard(true)}>
              <Icon type='Feather' name='info'  style={{color:'#ffff', fontSize:18, marginLeft:14, fontWeight:'500', fontFamily:'Lato'}}/>
              </TouchableOpacity>
              </Left>
                <Text style={{color:'#fff',fontSize:20, fontFamily:'Lato', textAlignVertical:'center'}}>300 AED</Text>
              </ListItem>
              </LinearGradient>
              <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5] }
              style={{width:"100%", height:2}}
              ></LinearGradient>
        </View>
  );
}


const style=StyleSheet.create({
  itemHeading:{
    fontSize:14, color:'#9d9494', marginTop:10,
    fontFamily:'OpenSans'
},
itemText:{
    color:'#000', fontSize:14, marginTop:5,
    fontWeight:'500',
    fontFamily:'OpenSans',
    marginLeft:10
},
});