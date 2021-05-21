import React, {useEffect} from 'react';
import {Content, Icon, Card, CardItem, Right, Button} from 'native-base'
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {useHistory} from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default History = () =>{
    let history= useHistory();
    const [application, setApplication] = React.useState([]);
  
    useEffect(() => {
        getData();
    }, [])

const getData = async () =>{
    const id =await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    let application = await (
        await fetch(
          `http://13.234.123.221/api/service/application/${id}`,
          {
            method: "GET",
            headers: {
              "x-access-token":token
            },
          }
        )
      ).json();
    console.log(application);
    setApplication(application.data || []);
}
        return (
        <ScrollView>
         <View style={{marginTop:20,margin:16}}>
            <View style={style.title}>
            <TouchableOpacity onPress={()=>history.push('/profile')}>
            <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,}}/>
            </TouchableOpacity>
            <Text style={style.heading}>History</Text>
            </View>
            <Image source={require('../assets/clipath.png')} />
            </View>
            <Content style={{padding:16}}>
            {!application ? <ActivityIndicator color='red'/> : application.map((data)=>
                <Card style={style.card}>
                <CardItem header style={{borderBottomColor:'#e6e6e6', borderBottomWidth:1, justifyContent:'space-between',}}>
                <View>
                    <Text style={{fontSize:12, color:'#9d9494'}}>Service name</Text>
                    <Text style={style.itemText}>{data.serviceCategory && data.serviceCategory.name}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>history.push('/application')}>
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:25}}>
                        <Text style={{fontSize:12, fontWeight:'bold'}}>View Details</Text>
                        <Icon type='Feather' name='chevron-right'/>
                    </View>
                    </TouchableOpacity>
                </CardItem>
                <View style={{ flexDirection:'row', paddingLeft:15, paddingRight:15}}>   
                    <View style={{width:"33%"}}>
                    <Text style={style.itemHeading}>Date</Text>
                    <Text style={style.itemText}>22/01/2021</Text>
                    </View>
                    <View style={{width:"33%", marginLeft:15}} > 
                    <Text style={style.itemHeading}>Service Id</Text>
                    <Text style={style.itemText}>{data.serviceCategory && data.serviceCategory.scode}</Text>
                    </View>
                    <View style={{width:"33%"}}>
                    <Text style={style.itemHeading}>Status</Text>
                    <Text style={{fontSize:14, color:data.status==='Success'?'#0cbe0c':'#4ca0dd' }}>{data.serviceCategory && data.status}</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row', padding:15}}>                
                    <View style={{width:"33%"}}>
                    <Text style={style.itemHeading}>Transaction ID</Text>
                    <Text style={style.itemText}>XMBC3457XNT0</Text>
                    </View>
                    <View  style={{width:"33%", marginLeft:15}}>
                    <Text style={style.itemHeading}>Mode</Text>
                    <Text style={style.itemText}>Debit Card</Text>
                    </View>
                    <View>
                    <Text style={style.itemHeading}>Amount(AED)</Text>
                    <Text style={{color:'#000', fontSize:14, marginTop:5}}>350.00</Text>
                    </View>
                </View>
                </Card>
            )}   
            <Button rounded style={style.laodingButton}>
                <Text style={style.buttonText}>Load More</Text>
            </Button>
            </Content>
            </ScrollView>
        )
}

const style = StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:7,
        marginLeft:5,
        fontFamily:'Lato',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
    }, 
    itemHeading:{
        fontSize:12, color:'#9d9494', marginTop:10
    },
    itemText:{
        color:'#000', fontSize:14, marginTop:5,
        fontWeight:'500'
    },
    card:{
        borderWidth:1,
        borderColor:'#e6e6e6', 
        marginBottom:15,
    },
    laodingButton:{
    width:135, justifyContent:'center', backgroundColor:'#fff', height:40, borderColor:'#000', borderWidth:1, alignSelf:'center', margin:30
    },
    buttonText:{
        fontWeight:'bold', 
        fontSize:15,
        textTransform:'uppercase'
    }
});