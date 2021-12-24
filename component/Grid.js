import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useFonts } from 'expo-font';
import { Icon } from 'native-base';
import { useHistory } from 'react-router-native';


export default function ServiceGrid() {
  const history = useHistory();
  const service_url = `http://13.234.123.221:8000/serviceCategory`;
  const [services, setServices] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [noData, setNoData] = React.useState(false);

  React.useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    let services = await (await fetch(service_url, { method: "GET" })).json();
    // services = services?.data.filter((el) => el.category?.length!==0)
    if(!services?.data || services?.data.length===0) 
    {
      setNoData(true);
    }
    else{
      
      const serviceData = services?.data.map((e) => ({
        _id: e._id,
        name: e.name,
        tv_type: e.tv_type,
        slug: e.slug,
        image: e.image
      }));
      setServices(serviceData);
    }
    setLoading(false);
  };


  function routePage(slug) {
    history.push(`/aboutservice/${slug}`)
  }



  if(loading){
     return <ActivityIndicator size="large" color="yellow" style={{alignSelf:'center', margin:20}} />
  }
  if(!loading && noData){

        return (<View style={{height:100, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
             <Icon type="FontAwesome" name="ban" style={{marginRight:5, fontSize:18, color:'#333333'}} />
          <Text style={{fontSize:15, fontWeight:'700'}}>Services not found.</Text>
        </View>)
      
    }
      
  return (
    <FlatGrid
      itemDimension={120}
      data={services}
      style={styles.gridView}
      spacing={5}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => routePage(item?.slug)}>
          <View style={[styles.itemContainer, { backgroundColor: '#fff' }]}>
            {item.image ? <Image style={{ width: 30, height: 30, alignSelf: 'center', margin: 10 }} source={{ uri: 'data:image/png;base64,' + item.image }} /> : <View></View>}
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
    justifyContent: 'center',
    height: 100,
    padding: 5,
  },
  itemName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'OpenSans'
  },
});