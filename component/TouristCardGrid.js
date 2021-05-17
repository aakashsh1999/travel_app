import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import {H3, Card , CardItem, } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';

export default function TouristGrid() {
  const service_url = `http://13.234.123.221/api/serviceCategory`;
  let ser=[];
  const [service, setServices] = React.useState(null);
  console.log(service_url);
  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    for(el of services.data){
      if(el.tv_type)
      ser.push(el);
      console.log(el);  
    }
      setServices(ser);
  };
  
  if(!service){
     return <View><Text>Hello</Text></View>
  }
  return (
  service.map((data)=> 
   <Card style={{borderWidth:1, borderColor:'#e6e6e6', marginBottom:20}}>
  <CardItem style={{borderBottomWidth:1, borderColor:'#e6e6e6'}}>
  <View style={{marginTop:10, marginBottom:10}}>
      <H3 style>{data.serviceDetail.hours} Hours</H3>
      <H3 style={{fontSize:14}}>Transit Visa + Insurance (Covid)</H3>
  </View>
  </CardItem>
  <CardItem body>
   <View style={{justifyContent:'center'}}>
   {/* <FlatGrid
    itemDimension={100}
    data={service}
    style={styles.gridView}
    spacing={5}
    renderItem={({ item }) => (
      <View style={{ backgroundColor: '#fff' }}>
        <Text style={{fontSize:12, color:'#9d9494', marginTop:10}}>{item.name}</Text>
        <Text style={{color:'#000', fontSize:14, marginTop:5}}>{item.fees}</Text>
      </View>
    )}
  /> */}
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
  itemName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
});