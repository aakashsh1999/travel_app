import {Body, Button, Content, H2, Header, Icon,Picker, Left, List, ListItem, Right, Switch} from 'native-base';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, BackHandler } from 'react-native';
import React,{useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';
import {useHistory} from 'react-router-dom';
import DatePicker from "react-native-datepicker";
import { LinearGradient } from 'expo-linear-gradient';

export default MyDocument = () =>{
    let history = useHistory();
    const [loaded] = useFonts({
        OpenSans: require('../assets/fonts/openSans.ttf'),
        Lato: require('../assets/fonts/lato.ttf'),
      });
    const [application, setApplication] = React.useState([]);
    const [filename, setFilename] = React.useState("");

  
    useEffect(() => {
        getData();
    }, [])

    

React.useEffect(()=>{
    const backAction = () => {
      history.push('/');
       return true;
     };
  
     const backHandler = BackHandler.addEventListener(
       "hardwareBackPress",
       backAction
     );
     return () => backHandler.remove();
  });

const getData = async () =>{
    const id =await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    let application = await (
        await fetch(
          `http://13.234.123.221:8000/service/application/${id}`,
          {
            method: "GET",
            headers: {
              "x-access-token":token
            },
          }
        )
      ).json();
    setApplication(application);
}

//File Upload Function
const selectFile = async () => {
  try {
    token = await AsyncStorage.getItem("token");
    requestId = await AsyncStorage.getItem("applicationId");
    const url = `http://13.234.123.221:8000/service/upload/${requestId}`;

    file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: "application/*",
    });
    let formData = new FormData();
    const type = file.name.split(".");
    if (filename === "") {
      alert("Please select the document first.");
    } else {
      formData.append("name", filename);
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: `application/${type[type.length - 1]}`,
      });
    }

    // if (file.type === "success") {
      // const res = await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "x-access-token": token,
      //   },
      //   body: formData,
      // });
      // const response = await res.json();
      // if (response.status === 1) {
      //   updateMyArray((oldArray) => [...oldArray, filename]);
      // } else {
        alert("File uploaded");
      // }
    // }
  } catch (err) {
    // Expo didn't build with iCloud, expo turtle fallback
  }
};
    return (
    <ScrollView style={{backgroundColor:'#ffffff'}}>
            <View style={{marginTop:20,margin:16}}>
                <View style={style.title}>
                <TouchableOpacity onPress={()=>history.push('/')}>
                <Icon type='FontAwesome' name="arrow-circle-o-left" style={{fontSize:16, marginBottom:7,marginRight:5}}/>
                </TouchableOpacity>
                <Text style={style.heading}>Upload Documents</Text>
                </View>
                <Image source={require('../assets/clipath.png')} />
                </View>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
        {/* <Text style={style.label}>Valid from*</Text> */
        }
        <DatePicker
          mode="date"
          placeholder="Valid from"
          format="DD-MM-YYYY"
          minDate="01-01-1950"   
          maxDate="01-01-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: "none",
            },
            dateInput: {
              borderWidth: 1,
              paddingRight: "40%",
              borderColor: "#e6e6e6",
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={''}
        />
      </View>
      <View>
        {/* <Text style={style.label}>Valid To*</Text> */}
        <DatePicker
          mode="date"
          placeholder="Valid to"
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate="01-01-2021"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: "none",
            },
            dateInput: {
              borderWidth: 1,
              paddingRight: "40%",
              borderColor: "#e6e6e6",
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={'date) => setDob(date)'}
        />
      </View>
     </View>
      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
      <View style={{width:'41%'}}>     
      <Text style={style.label}>Name*</Text>
      <TextInput
        style={style.input}
        placeholder="Enter name"
        onChangeText={'setName'}
      />
      </View>
      <View style={{ width:'41%'}}>
      <Text style={style.label}>Choose Category*</Text>
      <View style={{ borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 4}}>
        <Picker
          mode="dropdown"
          placeholderStyle={{ color: "red" }}
          iosIcon={<Icon name="arrow-down" />}
          style={{height: 40 }}
          selectedValue={''}
          onValueChange={key => {
            ''
          }}
        >
          <Picker.Item
            label="Category"
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
      </View>
      </View>
      <View style={{justifyContent:'space-between',flexDirection:'row'}}>
      <View style={style.uploadInput}>
              <TouchableOpacity
                disabled={!filename}
                onPress={async () => await selectFile()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    fontSize: 16,
                    color: "#9d9494",
                  }}
                >
                  {"Upload file(s)"}
                </Text>
              </TouchableOpacity>
            </View>  
      <TouchableOpacity onPress={''} >
        <View style={{justifyContent:"center"}}>
          <LinearGradient
            colors={["#c7a006", "#e7ed32", "#c7a006"]}
            start={[1, 0]}
            end={[0, 1.5]}
            style={{ width: 145, height: 38, borderRadius: 5 }}
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
              Upload
            </Text>
          </LinearGradient>
          </View>
        </TouchableOpacity>
        </View>
        </View>

        <View style={{marginTop:20,margin:16}}>
                <View style={style.title}>
                <Text style={style.heading}>My Documents</Text>
                </View>
                <Image source={require('../assets/clipath.png')} />
                </View>
            <View style={{paddingLeft:16, paddingRight:16}}>
              <View style={{ borderColor:"#000000", borderWidth:1, width:'100%', padding:4, paddingRight:10, paddingLeft:10,  borderRadius:4,}}>
              <Text style={{marginBottom:5, marginTop:5}, }>Aadhar Card</Text>
                <View style={{justifyContent:"space-between", flexDirection:'row', marginBottom:5}}>
                  <Text>Valid from : 10-2-2021</Text><View style={{width:50}}></View><Text>Valid to: 10-2-2021</Text>
                  </View>
                  <View style={{justifyContent:"space-between", flexDirection:'row', marginBottom:5}}>
                  <Text style={{marginRight:50}}>Name : Demo User</Text><Text>Category: Pro-service</Text>
                  </View>
                <View>
                <View style={{flexDirection:'row', justifyContent:"space-between",marginTop:10}}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4, margin:4}}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>View</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4, margin:4}}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>Download</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4,  margin:4 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>Browse</Text>
                </TouchableOpacity>
              </LinearGradient>
                </View>
              </View>
              </View>
          </View>
        </ScrollView>
    );
}


{/* <View style={{flexDirection:'column', justifyContent:'space-between'}}> */}
                {/* <Icon type="Feather" name='eye' style={{fontSize:20, color:'black'}}/>
                <Icon type="Feather" name='download' style={{fontSize:20, color:'black'}}/> */}
                {/* </View> */}
const style = StyleSheet.create({
    heading:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:7,
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
    buttons:{
        width:50,
        backgroundColor:'#fff'
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
    uploadInput: {
      width:'41%',
      height: 40,
      borderColor: "#e9e9e9",
      borderWidth: 1,
      paddingLeft: 15,
    },
});