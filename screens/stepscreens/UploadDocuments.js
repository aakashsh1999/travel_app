import React from 'react';
import {Icon, Body, Button, List,H3, ListItem, Form, Picker, Item, Label} from 'native-base'; 
import { ScrollView, Text, View, StyleSheet, TextInput, BackHandler, TouchableOpacity } from 'react-native';
import ButtonBar from '../../component/ButtonBar';
import {useHistory} from 'react-router-dom';
import Stepper from './Stepper';
import * as DocumentPicker from 'expo-document-picker';
import CardHeader from '../../component/CardHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default UploadDocuments  = () =>{
    let token, requestId, file;
    const [filename, setFilename] = React.useState('');
    const [docsArray, updateMyArray] = React.useState([]);
    const history = useHistory();
    const [services, setService] = React.useState(null);

    React.useEffect(() => {
        getServices();
    }, []);

    React.useEffect(()=>{
        const backAction = () => {
          history.push('/fill');
           return true;
         };
      
         const backHandler = BackHandler.addEventListener(
           "hardwareBackPress",
           backAction
         );
         return () => backHandler.remove();
      });

    const selectFile = async () => {
        try {
            token = await AsyncStorage.getItem('token');
            requestId = await AsyncStorage.getItem('applicationId');
            const url = `http://13.234.123.221/api/service/upload/${requestId}`;

           file = await DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: true,
            multiple: false,
            type: 'application/*'
          });
          let formData = new FormData();
          const type = file.name.split('.');
          formData.append("name", filename);
          formData.append("file", {uri:file.uri, name:file.name, type:`application/${type[type.length-1]}`});
          console.log(formData);
    
          if (file.type === "success") {
            const res = await fetch(url, {
                method: "PUT",
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': token
                },                
                body: formData,
              });
              const response=res.json();
              console.log(response.status);
                 if(response.status===1){
                     alert('File uploaded succesfully');
                     updateMyArray(oldArray => [...oldArray, filename]);
                     history.push('/book');
                 }
                else{
                    alert('File already Uploaded')
                }
          }
    
        } catch (err) {
          // Expo didn't build with iCloud, expo turtle fallback
    
        }
      }
      //Getting the List of Document
    const getServices = async () => { 
    const slug =await AsyncStorage.getItem("serviceSlug");

    const service_url = `http://13.234.123.221/api/serviceCategory/${slug}`;
        const service = await (await fetch(service_url, { method: "GET" })).json();
        const serviceData = service.data;
        setService(serviceData);
    }
         return (
             <>
            <ScrollView>
                <H3 style={style.heading}>Upload Documents</H3>
                <Stepper active='/upload'/>
                <View style={{padding:16}}>
        <View>
            <Label style={style.label}>Choose a document</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
             style={{ width: undefined, height:40 }}
             selectedValue={filename}
             onValueChange={(value)=>setFilename(value)}
            >
             {services && 
                services.serviceDetail.reqDocs.map((ele, index) => <Picker.Item label={ele} value={ele} key={index} />)}
            </Picker>
          </View>   
                <View style={style.uploadContainer}>
                <Text style={style.label, {textAlign:'center', margin:20, fontFamily:'Lato'}}>Scan and Upload Documents</Text>
                <View style={style.uploadInput}>
                <TouchableOpacity onPress={async () => await selectFile()}>
                <Text style={{textAlign:'center',marginTop:10, fontSize:16, color:'#9d9494'}}>{file ? file.name :'Upload file(s) from your computer'}</Text>
                </TouchableOpacity>
                </View>
                 {/* <Button rounded style={style.button} onPress={() => handleSubmitForm()}> 
                    <Text style={{fontWeight:'bold', fontSize:15, color:"#000"}}>UPLOAD</Text>
                </Button>  */}
                </View>
                <View style={{marginTop:40, marginBottom:10}}>
                <Text style={style.label}>Documents Required</Text>
                {services ?  (services.serviceDetail && services.serviceDetail.reqDocs.map((data, index)=> <ListItem style={{height:52, borderBottomColor:'#fff'}} key={index}>
                    <Icon type='Feather' name='square' style={style.iconStyle}/>
                    <Body>
                    <Text style={{fontSize:14,marginLeft:16, color:'#9d9494'}}>{data}</Text>
                    </Body>
                    </ListItem>
                 )) : (<Text style={{fontSize:14, fontWeight:'bold', marginTop:10}}>No Data</Text>)
                         }
                    </View>
                    <View style={{marginTop:10, marginBottom:40}}>
                <Text style={style.label}>Documents Submitted</Text>
                {docsArray?(docsArray.map((data, index)=> <ListItem style={{height:52, borderBottomColor:'#fff'}} key={index}>
                    <Icon type='Feather' name='square' style={style.iconStyle}/>
                    <Body>
                    <Text style={{fontSize:14,marginLeft:16, color:'#9d9494'}}>{data}</Text>
                    </Body>
                    </ListItem>)): <Text style={{fontSize:14, fontWeight:'bold', marginTop:10}}>Sorry! You don't have any submitted document</Text>} 
                    </View>
            </View>
            </ScrollView>
            <CardHeader/>
            <ButtonBar/>
            </>
        )
}   


const style= StyleSheet.create({
    label:{
        fontSize:14, 
        marginBottom:7,
        marginTop:6,
        fontWeight:'500', fontFamily:'Lato'
    }, 
    input:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        textAlign:'center',
        paddingLeft:15,
        marginBottom:20
    },
    button:{width:137, alignSelf:'center', margin:15, backgroundColor:"#fff", borderWidth:1, borderColor:'#000',
    fontFamily:"Lato",
    justifyContent:'center'
    },
    uploadContainer : {marginTop:25, borderWidth:1, borderStyle:'dashed', borderColor:'#e6e6e6', justifyContent:'center', padding:20},
    iconStyle:{
        transform:[{rotate:'135deg'}],
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
    listText:{fontSize:16,marginLeft:13, color:'#9d9494', fontFamily:'OpenSans'},
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center',
        fontFamily:"Lato"
    },
    uploadInput:{
        height:40,
        borderColor:'#e9e9e9',
        borderWidth:1,
        paddingLeft:15,
        marginBottom:20
    },
});