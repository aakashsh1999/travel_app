import React,{useEffect} from 'react';
import {Content, H2, List, ListItem, Left, Right, Body, Header,Switch,Icon, Button} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, View, Text,  Image, TouchableOpacity} from 'react-native';
import {useHistory} from 'react-router-dom';
import {useFonts} from 'expo-font';
export default MyDocument = () =>{
    let history = useHistory();
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });
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
    setApplication(application);
}
    return (<>
            <View style={{marginTop:20,margin:16}}>
                <View style={style.title}>
                <TouchableOpacity onPress={()=>history.push('/profile')}>
                <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,}}/>
                </TouchableOpacity>
                <Text style={style.heading}>My Documents</Text>
                </View>
                <Image source={require('../assets/clipath.png')} />
            </View>
        <Content style={{padding:16}}>
            <List style={style.list}>
              <ListItem style={{height:52, borderColor:"#fff"}}>
               <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>Emirates Id.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>Special ID.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>GDFRA permit.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>

                <ListItem style={{height:52, borderColor:"#fff"}}>
                 <Icon type='Feather' name='square' style={style.iconStyle}/>
                <Body>
                <Text style={{fontSize:14,marginLeft:16}}>Entry Permit.jpg</Text>
                </Body>
                <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                </ListItem>
            </List>
        </Content>
        </>
    );
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
    iconStyle:{
        transform:[{rotate:'135deg'}],
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
});