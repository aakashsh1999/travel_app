import { Container, Content, Icon, List, ListItem, Body, Radio, Left, View, DatePicker, Picker, Form} from 'native-base';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {useHistory} from 'react-router';
import {BASE_URL} from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default FillDetails= () =>{

    const history = useHistory();
    if (!AsyncStorage.getItem("token") && !AsyncStorage.getItem("id"))
    history.push("/login");
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        const id=await AsyncStorage.getItem("id")
        let user = await (
            await fetch(`${BASE_URL}/users/${id}`, {
                method: "GET",
                headers: {
                    "x-access-token": AsyncStorage.getItem("token"),
                },
            })
        ).json();
            console.log(user);
        user = user.data;

        setUser(user || []);
    }
    const handleTypeChange = ({ value }) => { setType(value) };
    const handleAliasChange = ({ value }) => { setAlias(value) };
    
    const [name, setName] = React.useState(null);
    const [dob, setDob] = React.useState(new Date());
    const [type, setType] = React.useState(null);
    const [alias, setAlias] = React.useState(null);
    const [lineOne, setLineOne] = React.useState(null);
    const [lineTwo, setLineTwo] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [pincode, setPincode] = React.useState(null);
   
    const requestId = AsyncStorage.getItem("applicationId");
    const url = `${BASE_URL}/service//fill/${requestId}`
    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const jsonPostData = {
            "name": name?name:user.name,
            "dob": dob,
            "type": type,
            "address":
            {
                "alias": alias?alias:user.address.alias,
                "addressLineOne": lineOne?lineOne:user.address.addressLineOne,
                "addressLineTwo": lineTwo?lineTwo: user.address.addressLineTwo,
                "state": state?state:user.address.state,
                "city": city?city:user.address.city,
                "pincode": pincode?pincode:user.address.pincode,
                "country": country?country:user.address.country
            }
        }
        console.log(jsonPostData);
        const result = await (await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token':AsyncStorage.getItem("token")
            },
            body: JSON.stringify(jsonPostData)
        })).json();
        console.log(result);
        history.push("/upload");

    }
    if (!user) {
        <ActivityIndicator color='yellow'></ActivityIndicator>
    }
    return (
        <ScrollView style={{padding:16}}>
            <View style={{flexDirection:'row', marginTop:25}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio value='self' checked={type === 'self'} onPress={()=>handleTypeChange} selectedColor="#c7a006" color='#000' />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Self</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', marginLeft:40}}>
                <Radio selectedColor="#c7a006" color='#000'/>
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Other</Text>
                </View>
            </View>            
            <View style={{marginTop:20}}>
                 <Text style={style.label}>Name*</Text>
                 <TextInput style={style.input} placeholder='Enter name' value={name} onChangeText={setName} />
                 <View>
                 <Text style={style.label}>Date of Birth*</Text>
                        <DatePicker
                        value={dob}
                        placeHolderText={'Choose your Date of Birth'}
                        textStyle={'#000'}
                        onDateChange={e => console.log(e)}
                        onChange={e => console.log(e)}
                        placeHolderTextStyle={'#000'}
                        disabled={false}
                        locale={"en"}
                        />
                        {alert(dob)}
                </View>       
           </View>
           <View style={{flexDirection:'row', marginTop:15, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selectedColor="#c7a006" color='#000' />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Address 1</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',}}>
                <Radio selectedColor="#c7a006" color='#000' />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Address 2</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Radio selectedColor="#c7a006" color='#000' />
                <Text style={{fontSize:14,marginLeft:10, fontFamily:'OpenSans'}}>Address 3</Text>
                </View>
            </View>         
                <View style={{marginTop:20}}>
                 <Text style={style.label}>Address Line 1*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 1' value={lineOne} onChangeText={setLineOne}  />
                </View>
                 <View>
                 <Text style={style.label}>Address Line 2*</Text>
                 <TextInput style={style.input} placeholder='Enter address line 2' value={lineTwo} onChangeText={setLineTwo}/>
                </View>    
                
                <View>
                 <Text style={style.label}>City*</Text>
                 <TextInput style={style.input} placeholder='Enter city' value={city} onChangeText={setCity}/>
                </View>    
                <View>
                 <Text style={style.label}>PIN Code*</Text>
                 <TextInput style={style.input} placeholder='Enter pin code' value={pincode} onChangeText={setPincode}/>
               </View>    

               <View>
                 <Text style={style.label}>Country*</Text>
                 <Form>
                 <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your country"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="red"
                    style={{width:"100%", height:40}}
                    selectedValue={country}
                    onValueChange={setCountry} >
                    <Picker.Item label="India" value="india" />
                    <Picker.Item label="UAE" value="uae" />
                    </Picker>
                    </Form>
                </View>    
        </ScrollView>
    );
}

const style= StyleSheet.create({
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6,
        fontFamily:'Lato'
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        paddingLeft:15,
        marginBottom:18,
        fontFamily:'Lato'
    },
});