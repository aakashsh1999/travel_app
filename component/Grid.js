import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default function ServiceGrid() {
  const service_url = `http://13.234.123.221/api/serviceCategory`;
  const [services, setServices] = React.useState(null);
  console.log(service_url);
  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const services = await (await fetch(service_url, { method: "GET" })).json();
    const serviceData = services.data.map((e) => ({
      _id: e._id,
      name: e.name,
      tv_type: e.tv_type,
      slug: e.slug,
      image: e.serviceDetail.image
    }));

    setServices(serviceData);
    console.log(services);
  };


  if(!services){
     return <View></View>
  }
  return (
    <FlatGrid
      itemDimension={120  }
      data={services}
      style={styles.gridView}
      spacing={5}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: '#fff' }]}>
            <Image style={{width:30, height:30,alignSelf:'center', margin:10}} source={{uri: 'data:image/png;base64,'+item.image}}/>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      )}
    />
  );
}


const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    justifyContent:'center',
    height: 100,
    padding:5, 
  },
  itemName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    textAlign:'center'
  },
});