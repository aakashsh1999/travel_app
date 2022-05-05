import { Text, H3, Button} from 'native-base';
import React from 'react';
import { ScrollView, Image, View, StyleSheet, BackHandler} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useHistory } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';

export default Success = () =>{
    const history= useHistory();
    
  const [loaded] = useFonts({
    Lato: require('../../assets/fonts/lato.ttf'),
  });

  
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

  //Getting user Payment Status
    const [data, setData]=React.useState(null);
    React.useEffect(() => {
        getServices();
      }, []);
      async function getServices(){
        const requestId =  await AsyncStorage.getItem("applicationId");
        const service_url = `http://3.109.106.108:8000/service/${requestId}`;
        const service = await (await fetch(service_url, { method: "GET" })).json();
        setData(service);
    };

    //Formatting of Date
      function dateFormat(d) {
        const date = new Date(d).toLocaleString();
        let dateArray =date.split(" ");
        let finaldate;
        if(dateArray.length==5)
        {
        finaldate = `${dateArray[2]} ${dateArray[1]} ${dateArray[4]}`
        }
        else{
          finaldate= `${dateArray[3]} ${dateArray[1]} ${dateArray[5]}`
        }
        return finaldate;
      };
  
      if(!data){
          return(<View></View>)
      }
        return (
            <>
            <ScrollView style={{padding:16, backgroundColor:'#fff'}}>
                <View style={{padding:20, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/checked.png')} style={{margin:20}}/>
                    <Text style={{textAlign:'center', fontSize:16, color:'#9d9494'}}>Your payment was successful and we have also reserved the slot for your appointment.
                    You can keep track of your application from your “History”.</Text>
                </View>
                <H3 style={{marginTop:20, fontWeight:'bold', fontSize:19, marginBottom:20}}>{data.serviceCategory.name}</H3>
                <View style={ style.listContainer}>   
                    <View style={{width:"60%"}}>
                    <Text style={style.itemHeading}>Date</Text>
                    <Text style={style.itemText}>{dateFormat(data.transaction.createdAt)}</Text>
                    </View>
                    <View style={{width:"40%"}}> 
                    <Text style={style.itemHeading}>Service Id</Text>
                    <Text style={style.itemText}>{data.serviceCategory.scode}</Text>
                    </View>
                </View>
                <View style={style.listContainer}>                
                    <View style={{width:"60%"}}> 
                    <Text style={style.itemHeading}>Mode</Text>
                    <Text style={style.itemText}>{data.transaction.ptype}</Text>
                    </View>
                    <View style={{width:"40%"}}>
                    <Text style={style.itemHeading}>Amount(AED)</Text>
                    <Text style={{marginTop:7}}>{data.transaction.amount}</Text>
                    </View>
                </View>
                <View style={style.listContainer}>
                <View style={{width:"60%"}}>
                    <Text style={style.itemHeading}>Transaction ID</Text>
                    <Text style={style.itemText}>{data.transaction._id}</Text>
                    </View>
                <View style={{width:"40%"}}>
                    <Text style={style.itemHeading}>Status</Text>
                    <View style={{width:100, borderRadius:24, backgroundColor:'rgba(12,190,12, 0.2)', marginTop:7, paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:14, color:'rgb(12,190,12)', opacity:1.0}}>{data.transaction.status}</Text>
                    </View>
                    </View>
                </View>
                {/* <Button rounded style={style.laodingButton}>
                    <Text style={style.buttonText}>Download Reciept</Text>
                </Button> */}
                <TouchableOpacity onPress={()=>history.push('/')}>
                <LinearGradient colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={[0,2.52]} style={{
                        width:190, 
                        height:38,
                        flexDirection:'row',
                        justifyContent:'center',
                        borderRadius:50,
                        alignItems:'center',
                        alignSelf:'center',
                        marginTop:40,
                        marginBottom:40 
                            }}>
                    <Text style={style.buttonText}>Go To Home</Text>
                </LinearGradient>
             </TouchableOpacity>
            </ScrollView>
            </>
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
        color:'#000', fontSize:14, marginTop:7,
        fontWeight:'500'
    },
    card:{
        borderWidth:1,
        borderColor:'#e6e6e6', 
        marginBottom:15
    },
    laodingButton:{
    margin:40,
    width:190,
     justifyContent:'center', backgroundColor:'#fff', height:40, borderColor:'#000', borderWidth:1, alignSelf:'center',
    },
    buttonText:{
        fontWeight:'bold', 
        color:'#000',
        fontSize:15,
        textTransform:'uppercase'
    },
    listContainer:{justifyContent:'flex-start', flexDirection:'row',marginBottom:15}
});