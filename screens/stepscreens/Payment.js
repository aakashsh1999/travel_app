import { View, ListItem, H3, Radio, Form, Picker, Icon,Card, CardItem, Left } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet, Text, BackHandler, TouchableOpacity, SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';
import Stepper from './Stepper';
import { LinearGradient } from 'expo-linear-gradient';
import {useHistory} from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { conformsTo } from 'lodash';
export default Payment = () =>{

const history = useHistory();
const [paymethod, choosePaymethod] = React.useState(null);
const [adFees, setFees] = React.useState(0);
const [showCard, setShowCard] = React.useState(null);
const [service, setServices] = React.useState(null);
const [payment,showPayment] = React.useState(true);
const [paymentUrl, setPaymentUrl] = React.useState(null);
let reference;
// React.useEffect(()=>{
//  const backAction = () => {
//  history.push('/apply');
//   return true;
// };

// const backHandler = BackHandler.addEventListener(
//   "hardwareBackPress",
//   backAction
// );
// return () => backHandler.remove();
// });


//Getting the Fees Data
React.useEffect(() => {
  getServices();
}, []);


const getServices = async () => {
  const slug = await AsyncStorage.getItem("serviceSlug");
  const subIdCard =await AsyncStorage.getItem("subCatId")
  const service_url = `http://13.234.123.221:8000/serviceCategory/${slug}`;
  const services = await (await fetch(service_url, { method: "GET" })).json();
  const serviceData = services.data;
  let sub=serviceData.serviceDetail.find(e=>e._id=== subIdCard);
  setServices(sub);
};

 const handleSubmit = async (state)=>{

  if(state==="Failed")
    {
       alert("There has been issue with your payment, please craete a new Application");
       history.push("/");
  }
  else if(paymethod == null)
  {
         alert('Please select a payment method.');
  }
   else{
    const requestId = await AsyncStorage.getItem("applicationId");
    const url = `http://13.234.123.221:8000/service/payment/${requestId}`
     const jsonData = {
       "price": service.price + adFees,
       "type": paymethod,
       "status": state,
     }    
       const result = await (await fetch(url, {
         method: 'PUT',
         headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json',
           'x-access-token':await AsyncStorage.getItem("token")
         },
         body: JSON.stringify(jsonData)
       })).json();
       if (result.status === 1){
         console.log(result);
       setPaymentUrl(result.url)
       await AsyncStorage.setItem("reference", result.reference)
       }
   }
}
//Function 
async function checkStatus(){
  reference = await AsyncStorage.getItem('reference'); 
  const url = `http://13.234.123.221:8000/payment/verify/${reference}`;
  const result = await fetch(url,{
    method:'GET',
  })
  setPaymentUrl(false)
    const data = await result.json();
    const state = data.data._embedded.payment[0].state;
    if(state =='STARTED'){
        history.push('/payment');
    }else if(state ==='FAILED'){
      alert("There has been issue with your payment, please craete a new Application");
      history.push("/");
    }
}


if(!service)
{
return null
}
if(paymentUrl){
  return <SafeAreaView style={{ flex: 1 }}>
  <TouchableOpacity onPress={async ()=>await checkStatus()} style={{marginTop:20, marginRight:20, alignSelf:'flex-end'}}>
    <Icon type='Feather' name='x' style={{fontSize:30}}/>
  </TouchableOpacity>
  <WebView style={{ flex: 1 }} source={{ uri : paymentUrl }} />
</SafeAreaView>
}


return (
        <>
        <ScrollView style={{backgroundColor:'#fff'}}>
            <H3 style={style.heading}>Payment</H3>
            <Stepper active='/payment'/>
            <View style={{padding:16}}>
            <Text style={style.label}>Choose payment method</Text>
            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1,marginBottom:15}}>
            <TouchableOpacity onPress={() => choosePaymethod('Debit Card')} style={{width:"100%"}}>
                <View style={{paddingBottom:15, padding:16, flexDirection:'row'}}>
                <Radio selected={paymethod ==='Debit Card'} selectedColor="#c7a006" color='#000' />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Debit Card</Text>
                </View>
                </TouchableOpacity>
            </ListItem>

            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1 ,marginBottom:15}}>
            <TouchableOpacity onPress={() => choosePaymethod('Credit Card')} style={{width:"100%"}}>
                <View style={{paddingBottom:15, padding:16, flexDirection:'row'}}>
                <Radio selected={paymethod ==='Credit Card'} selectedColor="#c7a006" color='#000' />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Credit Card</Text>
                </View>
                </TouchableOpacity>
            </ListItem>

            <ListItem style={{height:62, borderColor:"#f4f4f4", borderWidth:1,marginBottom:15}}>
            <TouchableOpacity onPress={() => choosePaymethod('Net Banking')} style={{width:"100%"}}>
                <View style={{paddingBottom:15, padding:16, flexDirection:'row'}}>
                <Radio selected={paymethod ==='Net Banking'} selectedColor="#c7a006" color='#000' />   
                <Text style={{fontSize:14,marginLeft:16}}>Pay via Net Banking</Text>
                </View>
                </TouchableOpacity>
            </ListItem>
            <Text style={style.label}>Priority</Text>
            <Form>
            <ListItem style={{height:50, borderColor:"#e6e6e6", borderWidth:1,marginBottom:15}}>
                <Picker
                  mode="dropdown"
                  placeholderStyle={{ color: "red" }}
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: "100%", height: 40}}
                  placeholder='Priority'
                  selectedValue={adFees}
                  onValueChange={(value) => {
                    setFees(value);
                  }}
                >
             <Picker.Item
                    label="Normal"
                    disabled
                    value={0}
                    style={style.label}
                    key={0}
                  ></Picker.Item>
                  
                  <Picker.Item
                    label="Urgent"
                    style={style.label}
                    disabled
                    value={50}
                    key={1}
                  ></Picker.Item>
                </Picker>
                </ListItem>
              </Form>
              </View>
        </ScrollView>
        <View>
        {showCard ? 
            <Card>
            <CardItem style={{justifyContent:'space-between', borderBottomColor:'#e6e6e6', borderBottomWidth:1}}>
              <H3 style={{fontSize:16, fontFamily:'Lato', fontWeight:'bold', color:'#000', width:'90%'}}>{service && service.name}</H3>
              <TouchableOpacity onPress={()=>setShowCard(false)}>
              <Icon type='Feather' name='x'/>
              </TouchableOpacity>
            </CardItem>
                  {/* <CardItem style={{flexDirection:'column'}}>  
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%",  marginBottom:20} }>
                          <View style={{width:120 }}>
                          <Text style={ style.itemHeading}>Processing Time:</Text>
                          </View>
                          <Text style={style.itemText}>{service.processT} Hours</Text>
                          </View>
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                            <View style={{width:120}}>
                          <Text style={style.itemHeading}>Stay Period:</Text>
                          </View>
                          <Text style={style.itemText}>{service.stay} days</Text>
                          </View>
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                          <View style={{width:120}}>
                          <Text style={style.itemHeading}>Validity:</Text>
                          </View>
                          <Text style={style.itemText}>{service.validity} days</Text>
                          </View>
                
                          <View style={{flexDirection:'row', alignItems:'baseline', width:"100%", marginBottom:20} } >
                          <View style={{width:120}}>
                          <Text style={style.itemHeading}>Entry:</Text>
                          </View>
                          <Text style={style.itemText}>{service.entry}</Text>
                          </View>
                        </CardItem> */}
          </Card> 
        : null }
          <LinearGradient colors={['#000000', '#545454', '#000000']} start={[1, 0]} end={[0,1.5]}>
          <ListItem style={{borderBottomColor:'#fff'}}>
            <Left style={{alignItems:'center'}}>
              <Text style={{color:'#fff', fontSize:14, fontFamily:'Lato'}}>Fees</Text>
              <TouchableOpacity onPress={()=>setShowCard(true)}>
              <Icon type='Feather' name='info'  style={{color:'#ffff', fontSize:18, marginLeft:14, fontWeight:'500', fontFamily:'Lato'}}/>
              </TouchableOpacity>
              </Left>
                <Text style={{color:'#fff',fontSize:20, fontFamily:'Lato', textAlignVertical:'center'}}>{parseInt(service.price + adFees)} AED</Text>
              </ListItem>
              </LinearGradient>
              <LinearGradient colors={['#c7a006', '#e7ed32', '#c7a006']} start={[1, 0]} end={[0,1.5] }
              style={{width:"100%", height:2}}
              ></LinearGradient>
        </View>
        <View style={{backgroundColor:'#fff', height:60, justifyContent:'space-between', alignItems:'center', paddingLeft:16, paddingRight:16 ,flexDirection:'row'}}>                
                <TouchableOpacity onPress={()=>handleSubmit('Complete')}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                 <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}} >YES</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleSubmit('Failed')}>
                <View style={{width:137, justifyContent:'center', height:38, borderWidth:1, backgroundColor:'#fff', borderRadius:50}}>
                <Text style={{fontSize:15, fontWeight:'bold', fontFamily:'OpenSans', textAlign:'center'}}>NO</Text>
                </View>
                </TouchableOpacity>
                 </View>    
        </>
    )

}

const style = StyleSheet.create({
    label:{
        fontSize:14, 
        marginTop:25,
        marginBottom:20,
        fontWeight:'500'
    }, 
    heading:{
        marginTop:20,
        fontSize:16, 
        fontWeight:'bold',
        marginBottom:10,
        textAlign:'center',
        fontFamily:"Lato"
    },
    itemHeading:{
        fontSize:14, color:'#9d9494', marginTop:10,
        fontFamily:'OpenSans'
    },
    itemText:{
        color:'#000', fontSize:14, marginTop:5,
        fontWeight:'500',
        fontFamily:'OpenSans',
        marginLeft:10
    },
});