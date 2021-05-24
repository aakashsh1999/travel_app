import React from 'react';
import {Icon, Body, Button, List,H3, ListItem} from 'native-base'; 
import { ScrollView, Text, View, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ButtonBar from '../../component/ButtonBar';
import {useHistory} from 'react-router-dom';
import Stepper from './Stepper';
import CardHeader from '../../component/CardHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default UploadDocuments  = () =>{

    // try {
    //     const res = await DocumentPicker.pick({
    //       type: [DocumentPicker.types.allFiles],
    //     });
    //     console.log(
    //       res.uri,
    //       res.type, // mime type
    //       res.name,
    //       res.size
    //     );
    //   } catch (err) {
    //     if (DocumentPicker.isCancel(err)) {
    //       // User cancelled the picker, exit any dialogs or menus and move on
    //     } else {
    //       throw err;
    //     }
    //   }

    const [fileName, setfilename] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [docsArray, updateMyArray] = React.useState([]);
    const history = useHistory();

    const [services, setService] = React.useState(null);
    React.useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => { 
    const slug =await AsyncStorage.getItem("serviceSlug");
    const service_url = `http://13.234.123.221/api/serviceCategory/${slug}`;
        const service = await (await fetch(service_url, { method: "GET" })).json();
        const serviceData = service.data;
        setService(serviceData);
        console.log(service);

    };
    if (!services) {
        return (<View>
               <ButtonBar/>
        </View>)
    }

         return (
             <>
            <ScrollView>
                <H3 style={style.heading}>Upload Documents</H3>
                <Stepper active='/upload'/>
                <View style={{padding:16}}>
                <View style={style.uploadContainer}>
                <Text style={style.label, {textAlign:'center', margin:20, fontFamily:'Lato'}}>Scan and Upload Documents</Text>
                <TouchableOpacity>
                <Text style={style.input}>Upload file(s) from your computer</Text>
                </TouchableOpacity>
                <Button rounded style={style.button}> 
                    <Text style={{fontWeight:'bold', fontSize:15}}>UPLOAD</Text>
                </Button>
                </View>
                <View style={{marginTop:40, marginBottom:40}}>
                <Text style={style.label}>Documents Required</Text>
                {services.serviceDetail && services.serviceDetail.reqDocs.map((data, index)=> <ListItem style={{height:52, borderBottomColor:'#fff'}} key={index}>
                    <Icon type='Feather' name='square' style={style.iconStyle}/>
                    <Body>
                    <Text style={{fontSize:14,marginLeft:16, color:'#9d9494'}}>{data}</Text>
                    </Body>
                    </ListItem>
                         )}
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
    }
});