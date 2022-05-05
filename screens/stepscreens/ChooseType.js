import {List, ListItem, Body, Radio,H3} from 'native-base';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, BackHandler, View } from 'react-native';
import {useHistory} from 'react-router-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import Stepper from './Stepper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ChooseType = () =>{
  const [service, setServices] = React.useState(null);
  const [checked, setChecked] = React.useState(null);
  const history = useHistory();
  let requestId;
  
  React.useEffect(()=>{
      const backAction = () => {
        history.push('/apply');
         return true;
       };
    
       const backHandler = BackHandler.addEventListener(
         "hardwareBackPress",
         backAction
       );
       return () => backHandler.remove();
    });   


    React.useEffect(() => {
      getSubServices();
    }, []);
  
    const getSubServices = async () => {
      const slug = await AsyncStorage.getItem('serviceSlug')
      const service_url = `http://3.109.106.108:8000/serviceCategory/${slug}`;
      const services = await (await fetch(service_url, { method: "GET" })).json();
      const serviceData = services.data.serviceDetail.map((e) => ({
        _id: e._id,
        name: e.name,
      }));
      setServices(serviceData);
    };
  
    const handleSubmit = async (subCatId,name) => {
      setChecked(subCatId);
    requestId = await AsyncStorage.getItem("applicationId");
    await AsyncStorage.setItem("subCatId",subCatId);
      const jsonPostData={
        "subCat": name
      }
     
      const url = `http://3.109.106.108:8000/service/type/${requestId}`;
      const result = await(await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem("token")
        },
        body: JSON.stringify(jsonPostData)
      })).json();
    }
  

  if(!service)
  {
    return  <ActivityIndicator size="large" color="yellow" style={{alignSelf:'center', margin:20}} />
  }
    return (
      <>
        <ScrollView style={{backgroundColor:'#fff'}}>
            <H3 style={style.heading}>Choose Type</H3>
            <Stepper active='/type'/>
                    <List style={{marginTop:10,borderColor:"#f4f4f4", borderWidth:1, paddingLeft:16, paddingRight:16, marginBottom:30}}>
                  {service && service.map((data) => <TouchableOpacity  onPress={()=>handleSubmit(data._id,data.name)} key={data._id}>
                        <ListItem style={{height:62, borderColor:"#fff", borderBottomColor:'#f4f4f4', borderBottomWidth:1}}>
                        <Radio selectedColor="#c7a006" color='#000' selected={checked === data._id} />
                        <Body>
                        <Text style={{fontSize:14,marginLeft:16}}>{data.name}</Text>
                        </Body>
                        </ListItem>
                        </TouchableOpacity> )}
                   </List>
        </ScrollView>  
        <View style={{backgroundColor:'#fff', height:70, justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:16 ,flexDirection:'row'}}>                
                <TouchableOpacity onPress={() => history.push('/apply')}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                 <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}} >PREV</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => checked !== null ? history.push('/fill') : alert('Please choose a service type.')}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5]} style={{width:137, height:38, borderRadius:20, }}>
                <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center',marginTop:9}}>NEXT</Text>
                </LinearGradient>
                </TouchableOpacity>
                 </View>
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