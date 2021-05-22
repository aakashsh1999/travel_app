import { Container, Content, Icon, List, ListItem, Body, Radio, Left } from 'native-base';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHistory} from 'react-router-dom';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default ApplyNow = () =>{
    const service_url = `http://13.234.123.221/api/serviceCategory`;
    const [service, setServices] = React.useState(null);
    const history = useHistory();
  
    React.useEffect(() => {
      getServices();
    }, []);
  
    const getServices = async () => {
      const services = await (await fetch(service_url, { method: "GET" })).json();
      const serviceData = services.data.map((e) => ({
        _id: e._id,
        name: e.name,
        scode: e.scode,
        slug: e.slug,
      }));
      setServices(serviceData);
    };
  console.log(service);
     const handleSubmit = async (name,slug) => {
      await AsyncStorage.setItem("serviceSlug",slug);
      const jsonPostData={
         "serviceName": name
      }
      let userId = await AsyncStorage.getItem('id')
      const url=`http://13.234.123.221/api/service/${userId}`
      const result = await(await fetch(url, {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token':await AsyncStorage.getItem("token")
        },
        body: JSON.stringify(jsonPostData)
       })).json();
       
      await AsyncStorage.setItem("applicationId", result.data._id);
      history.push('/fill');
     }
     
  if(!service)
  {
      return <ActivityIndicator color='yellow'></ActivityIndicator>
  }
    return (
        <Content>
            <View>
                    <List style={{marginTop:45, borderColor:"#f4f4f4", borderWidth:1, paddingLeft:16, paddingRight:16, marginBottom:30}}>
                        {service && service.map((data)=> 
                        <TouchableOpacity onPress={()=>handleSubmit(service.name,service.slug)}>
                        <ListItem style={{height:62, borderColor:"#fff", borderBottomColor:'#f4f4f4', borderBottomWidth:1}} key={service._id}>
                        <Radio selectedColor="#c7a006" color='#000'/>
                        <Body>
                        <Text style={{fontSize:14,marginLeft:16}}>{data.name}</Text>
                        </Body>
                        </ListItem>
                </TouchableOpacity>
                        )}
                   </List>
            </View>
        </Content>
    )
}
