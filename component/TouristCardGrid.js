import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import {Card, CardItem, H3,} from 'native-base';

import { FlatGrid } from 'react-native-super-grid';
import React from 'react';

export default function TouristGrid() {
  const service_url = `http://13.234.123.221/api/serviceCategory`;
  let ser=[];
  const [service, setServices] = React.useState(null);
  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    for(el of services.data){
      if(el.tv_type)
      ser.push(el);
    }
      setServices(ser);
  };
  
  if(!service){
     return <View>
        <ActivityIndicator size="large" color="yellow" style={{alignSelf:'center', margin:20}} />
     </View>
  }
  return (
  service.map((data)=> 
   <Card style={{borderWidth:1, borderColor:'#e6e6e6', marginBottom:20}} key={data._id}>
  <CardItem style={{borderBottomWidth:1, borderColor:'#e6e6e6'}}>
  <View style={{marginTop:10, marginBottom:10}}>
      <H3 style={{fontFamily:'Lato', fontWeight:'bold'}}>{data.serviceDetail.hours} Hours</H3>
      <H3 style={{fontSize:14, fontFamily:'OpenSans'}}>Transit Visa + Insurance (Covid)</H3>
  </View>
  </CardItem>
  <CardItem body>
     <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
     <View style={{ backgroundColor: '#fff' }}>
        <Text style={styles.gridHeading}>Processing Time</Text>
        <Text style={styles.text}>Upto {data.serviceDetail.processT} Days</Text>
      </View>
      
     <View style={{ backgroundColor: '#fff' }}>
        <Text style={styles.gridHeading}>Stay Period</Text>
        <Text style={styles.text}>{data.serviceDetail.stayPeriod} Days</Text>
      </View>
      
     <View style={{ backgroundColor: '#fff' }}>
        <Text style={styles.gridHeading}>Validity</Text>
        <Text style={styles.text}>{data.serviceDetail.validity} Days</Text>
      </View>
   </View>
   </CardItem>
   <CardItem>
   <View style={{flexDirection:'row', width:'100%',}}>
     <View style={{ backgroundColor: '#fff' }}>
        <Text style={styles.gridHeading}>Entry</Text>
        <Text style={styles.text}>{data.serviceDetail.entry}</Text>
      </View>
     <View style={{ backgroundColor: '#fff', marginLeft:'37%' }}>
        <Text style={styles.gridHeading}>Fees</Text>
        <Text style={{color:'#000', fontSize:20, fontWeight:'bold', marginTop:5, fontFamily:"OpenSans"}}>{data.serviceDetail.price}</Text>
      </View>      
   </View>
   </CardItem>
</Card>)
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    flex:1,
    justifyContent:'center'
  },
  gridHeading:{
    fontSize:12, color:'#9d9494',
    fontFamily:'OpenSans'
  },
  text:{color:'#000', fontSize:14, marginTop:5, fontFamily:'OpenSans'}
});