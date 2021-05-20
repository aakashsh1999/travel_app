import React from 'react';
import {Icon, Body, Button, List, ListItem} from 'native-base'; 
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker';


export default UploadDocuments  = () =>{
    const [fileName, setfilename] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [docsArray, updateMyArray] = React.useState([]);
    const history = useHistory();
    if (!localStorage.getItem("token") && !localStorage.getItem("id"))
        history.push("/login");

    const [services, setService] = React.useState(null);
    const slug = localStorage.getItem("serviceSlug");
    const service_url = `${process.env.REACT_APP_BASE_URL}/serviceCategory/${slug}`;


    React.useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        const service = await (await fetch(service_url, { method: "GET" })).json();
        const serviceData = {
            reqDocs: service.data.serviceDetail.reqDocs,
        };
        setService(serviceData);

    };
    if (!services) {
        return (<div />)
    }
    const requestId = localStorage.getItem("applicationId");
    const url = `${process.env.REACT_APP_BASE_URL}/service/upload/${requestId}`;
    const uploadWithFormData = async (event) => {
        event.preventDefault();

        console.log(file, fileName);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", fileName);
        console.log(...formData);
        const result = await (await fetch(url, {
            method: 'PUT',
            headers:{  'x-access-token':localStorage.getItem("token")},
            body: formData
        })).json();
       
      if(result.status===1)
        updateMyArray(oldArray => [...oldArray, fileName]);
    }
    const handleSubmitForm = (event) => {
        if(docsArray.length===services.reqDocs.length)
        history.push("/book");

    }


        return (
            <ScrollView style={{padding:16}}>
                <View style={style.uploadContainer}>
                <Text style={style.label, {textAlign:'center', margin:20, fontFamily:'Lato'}}>Scan and Upload Documents</Text>
                <TextInput style={style.input} placeholder='Upload file(s) from your computer' />
                <Button rounded style={style.button}> 
                    <Text style={{fontWeight:'bold', fontSize:15}}>UPLOAD</Text>
                </Button>
                </View>
                <View style={{marginTop:40, marginBottom:40}}>
                <Text style={style.label}>Documents Required</Text>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{borderColor:'#fff'}} >
                        <Icon type='Feather' name='square' style={style.iconStyle}/>
                        <Body>
                        <Text style={style.listText}>Lorem Ipsum is simply dummy text</Text>
                        </Body>
                    </ListItem>
                    </View>
            </ScrollView>
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
        rotation:135,
        fontSize:10,  backgroundColor:"#9d9494", color:"#9d9494"
    },
    listText:{fontSize:16,marginLeft:13, color:'#9d9494', fontFamily:'OpenSans'}
});