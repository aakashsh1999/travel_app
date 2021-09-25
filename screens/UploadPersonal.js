import { Body, Button, Content, H2, Header,Picker, Icon, Left, List, ListItem, Right, Switch } from 'native-base';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import DatePicker from "react-native-datepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useHistory } from 'react-router-dom';
import { LinearGradient } from 'expo-linear-gradient';

export default UploadPersonal = () => {
  let history = useHistory();
  const [loaded] = useFonts({
    OpenSans: require('../assets/fonts/openSans.ttf'),
    Lato: require('../assets/fonts/lato.ttf'),
  });
  const [application, setApplication] = React.useState([]);

  useEffect(() => {
    getData();
  }, [])



  React.useEffect(() => {
    const backAction = () => {
      history.push('/document');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const getData = async () => {
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    let application = await (
      await fetch(
        `http://13.234.123.221:8000/service/application/${id}`,
        {
          method: "GET",
          headers: {
            "x-access-token": token
          },
        }
      )
    ).json();
    setApplication(application);
  }
  return (<ScrollView style={{ backgroundColor: '#ffffff' }}>
    <View style={{ flexDirection: 'row',}}>
      <View style={{ marginTop: 20, margin: 16 }}>
      <View style={style.title}>
            <TouchableOpacity onPress={()=>history.push('/profile')}>
            <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:24, marginBottom:7,}}/>
            </TouchableOpacity>
            <Text style={style.heading}>Upload Documents</Text>
            </View>
            <Image source={require('../assets/clipath.png')} />
            </View>
      {/* <Icon type='Feather' name='upload' style={{ marginRight: 16, borderWidth: 1, paddingLeft: 4, borderRadius: 5, padding: 2, fontSize: 24 }} /> */}
    </View>
    <View style={{ paddingLeft: 16, paddingRight: 16 }}>
      {/* <View style={{ borderColor:"#000000", borderWidth:1, width:'100%', justifyContent:'space-between', flexDirection:"row", padding:8, alignItems:'center', borderRadius:4}}> */}
      {/* <Icon type='Feather' name='square' style={style.iconStyle}/> */}
      {/* <Text style={{fontSize:18}}>Emirates Idv.jpg</Text>
                <View>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4, marginBottom:10 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>View</Text>
                </TouchableOpacity>
               </LinearGradient>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>Download</Text>
                </TouchableOpacity>
               </LinearGradient>
                </View> */}
      {/* </View> */}
      <Text style={style.label}>Name*</Text>
      <TextInput
        style={style.input}
        placeholder="Enter name"
        onChangeText={'setName'}
      />

      <View style={{ borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 4 }}>
        <Picker
          mode="dropdown"
          placeholderStyle={{ color: "red" }}
          iosIcon={<Icon name="arrow-down" />}
          style={{ width: "100%", height: 40 }}
          selectedValue={''}
          onValueChange={key => {
            ''
          }}
        >
          <Picker.Item
            label="Select Category"
            disabled
            value={null}
            key={0}
          ></Picker.Item>
          <Picker.Item
            label="Pro Service"
            disabled
            value={null}
            key={0}
          ></Picker.Item>
          <Picker.Item
            label="Visa Service"
            disabled
            value={null}
            key={0}
          ></Picker.Item>
          {/* {subOpt?.map((ele, index) => (<Picker.Item label={ele.text} value={ele.value} key={index + 1} />))} */}
        </Picker>
      </View>
      <View>
        <Text style={style.label}>Valid from*</Text>
        <DatePicker
          style={{ width: "100%" }}
          mode="date"
          placeholder="Choose date of Birth"
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate="01-01-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          date={'application?.dob ? application.dob : dob'}
          customStyles={{
            dateIcon: {
              display: "none",
            },
            dateInput: {
              borderWidth: 1,
              paddingRight: "60%",
              borderColor: "#e6e6e6",
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={''}
          defaultValue={'application?.dob'}
        />
      </View>
      <View>
        <Text style={style.label}>Valid To*</Text>
        <DatePicker
          style={{ width: "100%" }}
          mode="date"
          placeholder="Choose date of Birth"
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate="01-01-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          date={'application?.dob ? application.dob : dob'}
          customStyles={{
            dateIcon: {
              display: "none",
            },
            dateInput: {
              borderWidth: 1,
              paddingRight: "60%",
              borderColor: "#e6e6e6",
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={'date) => setDob(date)'}
          defaultValue={'application?.dob'}
        />
      </View>
      <TouchableOpacity onPress={''} style={{marginTop:20}}>
        <View style={{justifyContent:"center"}}>
          <LinearGradient
            colors={["#c7a006", "#e7ed32", "#c7a006"]}
            start={[1, 0]}
            end={[0, 1.5]}
            style={{ width: 137, height: 38, borderRadius: 20 }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "OpenSans",
                textAlign: "center",
                marginTop: 9,
              }}
            >
              Submit
            </Text>
          </LinearGradient>
          </View>
        </TouchableOpacity>
    </View>
  </ScrollView>
  );
}


{/* <View style={{flexDirection:'column', justifyContent:'space-between'}}> */ }
{/* <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                <Icon type="Feather" name='download' style={{fontSize:20, color:'black'}}/> */}
{/* </View> */ }
const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginLeft: 5,
    fontFamily: 'Lato',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    transform: [{ rotate: '135deg' }],
    fontSize: 10, backgroundColor: "#9d9494", color: "#9d9494"
  },
  buttons: {
    width: 50,
    backgroundColor: '#fff'
  },


  label: {
    fontSize: 14,
    marginBottom: 7,
    marginTop: 10,
    fontFamily: "Lato",
  },
  input: {
    height: 40,
    borderColor: "#e9e9e9",
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 18,
    fontFamily: "Lato",
  },
 
});