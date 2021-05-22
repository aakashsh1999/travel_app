import { Text, H3, Button} from 'native-base';
import React from 'react';
import { ScrollView, Image, View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useHistory } from 'react-router';
import ButtonBar from '../../component/ButtonBar';

export default Success = () =>{
    const history= useHistory();
        return (
            <>
            <ScrollView style={{padding:16}}>
                <View style={{padding:20, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../assets/checked.png')} style={{margin:20}}/>
                    <Text style={{textAlign:'center', fontSize:16, color:'#9d9494'}}>Your payment was successful and we have also reserved the slot for your appointment.
                    You can keep track of your application from your “History”.</Text>
                </View>
                <H3 style={{marginTop:20, fontWeight:'bold', fontSize:19}}>Company Formation Services</H3>
                <View style={ style.listContainer}>   
                    <View>
                    <Text style={style.itemHeading}>Date</Text>
                    <Text style={style.itemText}>22/01/2021</Text>
                    </View>
                    <View style={{marginLeft:120}}> 
                    <Text style={style.itemHeading}>Service Id</Text>
                    <Text style={style.itemText}>BXCJCR34</Text>
                    </View>
                </View>
                <View style={style.listContainer}>                
                    <View>
                    <Text style={style.itemHeading}>Mode</Text>
                    <Text style={style.itemText}>Debit Card</Text>
                    </View>
                    <View style={{marginLeft:130}}>
                    <Text style={style.itemHeading}>Amount(AED)</Text>
                    <Text>350.00</Text>
                    </View>
                </View>
                <View style={style.listContainer}>
                <View>
                    <Text style={style.itemHeading}>Transaction ID</Text>
                    <Text style={style.itemText}>XMBC3457XNT0</Text>
                    </View>
                <View style={{marginLeft:90}}>
                    <Text style={style.itemHeading}>Status</Text>
                    <View style={{borderRadius:24, backgroundColor:'#4ca0dd', marginTop:5, paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:14, color:'blue', opacity:1.0}}>In-Progress</Text>
                    </View>
                    </View>
                </View>
                <Button rounded style={style.laodingButton}>
                    <Text style={style.buttonText}>Download Reciept</Text>
                </Button>
                
                <TouchableOpacity onPress={()=>history.push('/')}>
                <LinearGradient colors={['#c7a006', 'yellow', '#c7a006']} start={[1, 0]} end={[0,2.52]} style={{
                        width:190, 
                        height:38,
                        flexDirection:'row',
                        justifyContent:'center',
                        borderRadius:50,
                        alignItems:'center',
                        alignSelf:'center'
                            }}>
                    <Text style={style.buttonText}>Go To Home</Text>
                </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            <ButtonBar/>
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
        color:'#000', fontSize:14, marginTop:5,
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
    listContainer:{justifyContent:'flex-start', flexDirection:'row'}
});