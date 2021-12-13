import { Body, Button, Content, H2, Header, Icon, Picker, Left, List, ListItem, Right, Switch } from 'native-base';
import {
  Image, ScrollView, StyleSheet, Text, TextInput,
  SafeAreaView, TouchableOpacity, View, BackHandler, ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useEffect } from 'react';
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useHistory } from 'react-router-native';
import DatePicker from "react-native-datepicker";
import { LinearGradient } from 'expo-linear-gradient';

export default MyDocument = () => {

  let history = useHistory();


  const [name, setName] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [validTo, setValidTo] = React.useState(null);
  const [validFrom, setValidFrom] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [openPop, setOpen] = React.useState(false);
  const [openPopErr, setOpenErr] = React.useState(false);
  const [data, setData] = React.useState(new FormData());
  const [webview, setWebView] = React.useState('');
  const [documentList, setDocumentList] = React.useState([]);

  let today = new Date().toLocaleDateString().split('/').join('-')

  React.useEffect(() => {
    getMyDocs();
  }, []);

  const getMyDocs = async () => {
    if (await AsyncStorage.getItem('token') === null) {
      history.push('/login');
    }
    else {
      let documents = await (
        await fetch(`http://13.234.123.221:8000/document`, {
          method: "GET",
          headers: {
            "x-access-token": await AsyncStorage.getItem("token"),
          },
        })
      ).json();
      documents = documents?.data;
      setDocumentList(documents);
    }
  }

  React.useEffect(() => {
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

  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case 'pdf': return 'application/pdf';
      case 'jpg': return 'image/jpeg';
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
    }
  }


  const selectFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      });
      let formData = new FormData();
      // formData.append('file', file)
      let value = result.name.split('.').pop();
      formData.append('file', {
        uri: result.uri,
        name: result.name,
        type: getMimeType(value),
      })
      formData.append('name', name)
      formData.append('validTo', validTo)
      formData.append('validFrom', validFrom)
      formData.append('type', category);
      console.log(formData);
      setData(formData);
      setFile(result);
      console.log(file)
      // console.log(result)
    } catch (err) {
    }
  }

  const uploadFile = async () => {
    let url = `http://13.234.123.221:8000/document/upload`;
    let token = await AsyncStorage.getItem("token");

    if (file === null) {
      alert('Please select the document.')
    } else {

      if (file.type === "success") {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": token,
            },
            body: data,
          });
          const response = await res.json();
          if (response.status === 1) {
            alert("Document Added Successfully");
            getMyDocs();
          } else {
            alert("There has been an error");
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const generateLink = async (key) => {
    const jsonPostData = {
      key: key,
    };
    const url = `http://13.234.123.221:8000/download`;

    const resu = await (
      await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonPostData),
      })
    ).json();
    if (resu.status === 1) {
      setWebView(resu.data)
    }
  };


  const deleteDoc = async (id) => {
    const url = `http://13.234.123.221:8000/document/${id}`;
    const result = await (
      await fetch(url, {
        method: "DELETE",
        headers: {
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      })
    ).json();

    if (result.status === 1) {
      alert('Document deleted successfully.')
      getMyDocs();
    }
  };

  if (documentList) {
    <ActivityIndicator
      size="large"
      color="yellow"
      style={{ alignSelf: "center", margin: 20 }}
    />

  }

  if (webview) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <TouchableOpacity style={{ marginRight: 10, marginTop: 10, alignSelf: 'flex-end' }} onPress={() => setWebView(null)}>
        <Icon type='Feather' name='x' style={{ fontSize: 30, color: '#ffffff' }} />
      </TouchableOpacity>
      <WebView style={{ flex: 1 }} source={{ uri: webview }} />
    </SafeAreaView>
  }
  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View style={{ marginTop: 20, margin: 16 }}>
        <View style={style.title}>
          <TouchableOpacity onPress={() => history.push('/')}>
            <Icon type='FontAwesome' name="arrow-circle-o-left" style={{ fontSize: 16, marginBottom: 7, marginRight: 5 }} />
          </TouchableOpacity>
          <Text style={style.heading}>Upload Documents</Text>
        </View>
        <Image source={require('../assets/clipath.png')} />
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            {/* <Text style={style.label}>Valid from*</Text> */
            }
            <DatePicker
              mode="date"
              placeholder="Valid from"
              format="MM-DD-YYYY"
              minDate="01-01-1950"
              maxDate={today}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={validFrom}
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
              onDateChange={date => setValidFrom(date)}
            />
          </View>
          <View>
            {/* <Text style={style.label}>Valid To*</Text> */}
            <DatePicker
              mode="date"
              placeholder="Valid to"
              format="MM-DD-YYYY"
              minDate="01-01-1950"
              maxDate={"01-01-3000"}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={validTo}
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
              onDateChange={(date) => setValidTo(date)}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View style={{ width: '41%' }}>
            <Text style={style.label}>Name*</Text>
            <TextInput
              style={style.input}
              placeholder="Enter name"
              onChangeText={setName}
            />
          </View>
          <View style={{ width: '41%' }}>
            <Text style={style.label}>Choose Category*</Text>
            <View style={{ borderColor: '#e6e6e6', borderWidth: 1, borderRadius: 4 }}>
              <Picker
                mode="dropdown"
                placeholderStyle={{ color: "red" }}
                iosIcon={<Icon name="arrow-down" />}
                style={{ height: 40 }}
                selectedValue={''}
                onValueChange={value => {
                  setCategory(value)
                }}
              >
                <Picker.Item
                  label="Category"
                  disabled
                  value={null}
                  key={0}
                ></Picker.Item>
                <Picker.Item
                  label="Passport"
                  disabled
                  value={'Passport'}
                  key={1}
                ></Picker.Item>
                <Picker.Item
                  label="Visa"
                  disabled
                  value={'Visa'}
                  key={2}
                ></Picker.Item>
                <Picker.Item
                  label="Photograph"
                  disabled
                  value={'Photograph'}
                  key={3}
                ></Picker.Item>
                <Picker.Item
                  label="Driving License"
                  disabled
                  value={'Driving License'}
                  key={4}
                ></Picker.Item>
                {/* {subOpt?.map((ele, index) => (<Picker.Item label={ele.text} value={ele.value} key={index + 1} />))} */}
              </Picker>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View style={style.uploadInput}>
            <TouchableOpacity
              onPress={() => selectFile()}
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
          <TouchableOpacity onPress={() => uploadFile()} >
            <View style={{ justifyContent: "center" }}>
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

      <View style={{ marginTop: 20, margin: 16 }}>
        <View style={style.title}>
          <Text style={style.heading}>My Documents</Text>
        </View>
        <Image source={require('../assets/clipath.png')} />
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        {documentList ? documentList.map((data, index) =>
          <View style={{
            flexDirection:'row', borderColor: "#000000", borderWidth: 1, padding: 4, paddingRight: 10, paddingLeft: 10, borderRadius: 4, marginBottom: 15, justifyContent:'space-between' }}
            key={index}
          >
            <View style={{justifyContent: "space-between", marginBottom: 5 }}>
              <View style={{flexDirection:'row'}}><Text style={{fontWeight:'bold', textTransform:'uppercase'}}>Valid from : </Text><Text>{data?.validFrom}</Text></View>
              <View style={{flexDirection:'row'}}><Text style={{fontWeight:'bold', textTransform:'uppercase'}}>Valid To : </Text><Text>{data?.validTo}</Text></View>
              <View style={{flexDirection:'row'}}><Text style={{fontWeight:'bold', textTransform:'uppercase'}}>Name : </Text><Text>{data?.name}</Text></View>
              {/* <View style={{flexDirection:'row'}}><Text style={{fontWeight:'bold', textTransform:'uppercase'}}>File Name : </Text><Text>{data?.file?.name}</Text></View> */}
              <View style={{flexDirection:'row'}}><Text style={{fontWeight:'bold', textTransform:'uppercase'}}>Category : </Text><Text>{data?.type}</Text></View>
            </View>
            <View>
              <View style={{justifyContent: "center"}}>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4, margin: 4 }}>
                  <TouchableOpacity onPress={() => generateLink(data?.key)}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>View</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0, 1.5]} style={{ width: 100, height: 30, paddingTop: 7, borderRadius: 4, margin: 4 }}>
                  <TouchableOpacity onPress={() => deleteDoc(data?._id)}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'OpenSans', textAlign: 'center', margin: 'auto' }}>Delete</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>) :
         <ActivityIndicator
          size="large"
          color="yellow"
          style={{ alignSelf: "center", margin: 20 }}
        />}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
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
  uploadInput: {
    width: '41%',
    height: 40,
    textAlign:"center",
    borderColor: "#e9e9e9",
    borderWidth: 1,
  },
});