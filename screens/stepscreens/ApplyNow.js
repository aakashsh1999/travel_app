import { Container, Content, Icon, List, ListItem, Body, Radio,H3, Left } from 'native-base';
import React from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHistory, useLocation} from 'react-router-dom';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonBar from '../../component/ButtonBar';
import Stepper from './Stepper';
import CardHeader from '../../component/CardHeader';

export default ApplyNow = () =>{
    const service_url = `http://13.234.123.221/api/serviceCategory`;
    const [service, setServices] = React.useState(null);
    const [checked, setChecked] = React.useState(null);
    const history = useHistory();
    const location = useLocation();
  
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
       setChecked(service.name);
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
          'x-access-token':  await AsyncStorage.getItem("token")
        },
        body: JSON.stringify(jsonPostData)
       })).json();
      await AsyncStorage.setItem("applicationId", result.data._id);
      history.push('/fill');
     }
     console.log(location);
  if(!service)
  {
      return <ActivityIndicator color='yellow'></ActivityIndicator>
  }
    return (
      <>
        <ScrollView style={{backgroundColor:'#fff'}}>
            <H3 style={style.heading}>Choose Service</H3>
            <Stepper active='/apply'/>
                    <List style={{marginTop:10,borderColor:"#f4f4f4", borderWidth:1, paddingLeft:16, paddingRight:16, marginBottom:30}}>
                        {service && service.map((data)=> 
                        <TouchableOpacity onPress={()=>handleSubmit(data.name,data.slug)} key={data._id}>
                        <ListItem style={{height:62, borderColor:"#fff", borderBottomColor:'#f4f4f4', borderBottomWidth:1}}>
                        <Radio selectedColor="#c7a006" color='#000' selected={checked === data.name}/>
                        <Body>
                        <Text style={{fontSize:14,marginLeft:16}}>{data.name}</Text>
                        </Body>
                        </ListItem>
                        </TouchableOpacity>
                        )}
                   </List>
        </ScrollView>  
        <CardHeader/>
        <ButtonBar/>
      </>
    )
}

const style = StyleSheet.create({
  heading:{
      marginTop:20,
      fontSize:16, 
      fontWeight:'bold',
      marginBottom:10,
      textAlign:'center',
      fontFamily:"Lato"
  }
});