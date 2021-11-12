import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import {useFonts} from 'expo-font';
import { useHistory } from 'react-router-dom';


export default function ServiceGrid() {
  const history = useHistory();
  const service_url = `http://13.234.123.221:8000/serviceCategory`;
  const [services, setServices] = React.useState(null);

  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/openSans.ttf'),
    Lato: require('../assets/fonts/lato.ttf'),
  });
  
  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    let services = await (await fetch(service_url, { method: "GET" })).json();
    // services = services?.data.filter((el) => el.category?.length!==0)
    const serviceData = services?.data.map((e) => ({
      _id: e._id,
      name: e.name,
      tv_type: e.tv_type,
      slug: e.slug,
      image: e.image
    }));
    setServices(serviceData);
  };


  function routePage(slug){
      history.push(`/aboutservice/${slug}`)
  }


  if(!services){
     return  <ActivityIndicator size="large" color="yellow" style={{alignSelf:'center', margin:20}} />
  }

  return (
    <FlatGrid
      itemDimension={120}
      data={services}
      style={styles.gridView}
      spacing={5}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=> routePage(item?.slug)}>
        <View style={[styles.itemContainer, { backgroundColor: '#fff' }]}>
         {item.image ? <Image style={{width:30, height:30,alignSelf:'center', margin:10}} source={{uri: 'data:image/png;base64,'+item.image}}/>: <View></View>}
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        </TouchableOpacity>
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
    textAlign:'center',
    fontFamily:'OpenSans'
  },
});